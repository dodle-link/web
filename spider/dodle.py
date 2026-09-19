from __future__ import annotations

import argparse
import http.cookiejar
import os
import ssl
import sys
import time
import urllib.parse
from contextlib import contextmanager
from pathlib import Path
from typing import Dict, List, Optional
from urllib.error import HTTPError, URLError
from urllib.request import (
    HTTPBasicAuthHandler,
    HTTPPasswordMgrWithDefaultRealm,
    HTTPSHandler,
    ProxyHandler,
    Request,
    build_opener,
)

# --- Custom Exception ---

class NativeError(Exception):
    """Custom exception for internal application errors."""
    pass

# --- Helper Functions ---

def build_parser() -> argparse.ArgumentParser:
    """Builds the command-line argument parser."""
    parser = argparse.ArgumentParser(add_help=False, prog="dodle-spider")

    parser.add_argument("-h", "--help", action="store_true", help="Show this help message and exit.")

    # Request options
    parser.add_argument("-X", "--request", dest="method", default="GET", help="HTTP method (e.g., GET, POST).")
    parser.add_argument("-G", "--get", action="store_true", help="Set request method to GET.")
    parser.add_argument("-I", "--head", action="store_true", help="Set request method to HEAD.")
    parser.add_argument("-L", "--location", action="store_true", help="Handle Location header.")
    
    # Header options
    parser.add_argument("-H", "--header", action="append", default=[], help="Append HTTP headers (name:value).")
    
    # Data handling options
    parser.add_argument("-d", "--data", "--data-raw", dest="data", action="append", default=[], help="Append raw data payload.")
    parser.add_argument("--data-urlencode", action="append", default=[], help="Append data to be URL-encoded.")
    
    # Verbosity and Control
    parser.add_argument("-v", "--verbose", action="store_true", help="Enable verbose output.")
    parser.add_argument("-s", "--silent", action="store_true", help="Suppress non-error output.")
    parser.add_argument("-k", "--insecure", action="store_true", help="Allow insecure connections (disable SSL verification).")
    parser.add_argument("-o", "--output", help="Write output to a local file instead of stdout.")
    parser.add_argument("-O", "--remote-name", action="store_true", help="Save output using the remote file's name.")
    
    # Timeouts and Retries
    parser.add_argument("--connect-timeout", type=float, default=30.0, help="Connection timeout in seconds.")
    parser.add_argument("--max-time", type=float, default=300.0, help="Maximum time allowed for the request in seconds.")
    parser.add_argument("--retry", type=int, default=0, help="Number of retries on failure.")
    
    # Proxy and User Auth
    parser.add_argument("--proxy", help="HTTP/S proxy to use.")
    parser.add_argument("--noproxy", action="store_true", help="Do not use proxy settings.")
    parser.add_argument("-u", "--user", help="Username[:password] for Basic Authentication.")
    parser.add_argument("-b", "--cookie", action="append", default=[], help="Append cookies (name=value or a cookie-jar file).")
    
    # URL handling
    parser.add_argument("--url", action="append", dest="urls", default=[], help="List of URLs to spider.")
    parser.add_argument("urls_positional", nargs="*", help="URLs to spider (required).")
    
    return parser

def print_help() -> None:
    """Prints the usage help message."""
    print("Usage: dodle-spider [options] <url1> [url2] ...")
    print("\nNative options:")
    print("  -X, --request <METHOD>       HTTP method (e.g., GET, POST). Default: GET.")
    print("  -H, --header <name:value>     Append HTTP headers.")
    print("  -d, --data, --data-raw         Append raw data payload.")
    print("  --data-urlencode              Append data to be URL-encoded.")
    print("  -G, --get, -I, --head, -L      Request types (GET, HEAD, Location).")
    print("  -v, --verbose, -s, --silent    Verbosity control.")
    print("  -k, --insecure                Allow insecure connections (disable SSL verification).")
    print("  -u, --user                   Username for Basic Auth.")
    print("  -b, --cookie                 Append cookies.")
    print("  -o, --output                 Specify local output directory.")
    print("  --remote-name                Name for remote download destination.")
    print("  --connect-timeout, --max-time Timeouts.")
    print("  --retry                      Number of retries.")
    print("  --proxy, --noproxy           Proxy configuration.")
    print("  --url                        List of URLs to crawl.")

def parse_cookie(cookie_values: List[str]) -> Optional[str]:
    """Builds a raw 'Cookie' header value from -b/--cookie arguments.

    Each value may be a cookie-jar file path (Netscape format) or a raw
    'name=value[; name=value...]' string.
    """
    if not cookie_values:
        return None

    parts: List[str] = []
    for cookie_value in cookie_values:
        if os.path.isfile(cookie_value):
            jar = http.cookiejar.MozillaCookieJar(cookie_value)
            try:
                jar.load(ignore_discard=True, ignore_expires=True)
            except Exception as e:
                raise NativeError(f"Failed to load cookie file {cookie_value}: {e}")
            parts.extend(f"{cookie.name}={cookie.value}" for cookie in jar)
            continue

        for item in cookie_value.split(";"):
            item = item.strip()
            if not item:
                continue
            if "=" not in item:
                raise NativeError(f"Malformed cookie entry encountered: {item}")
            parts.append(item)

    return "; ".join(parts) if parts else None

def request_headers(values: List[str]) -> Dict[str, str]:
    """Parses a list of 'name:value' strings into a dictionary."""
    headers = {}
    for value in values:
        if ":" not in value:
            raise NativeError(f"invalid header format: {value}. Expected 'name:value'")
        name, header_value = value.split(":", 1)
        headers[name.strip()] = header_value.strip()
    return headers

def prepare_data(args: argparse.Namespace) -> bytes | None:
    """Prepares the body data for the request."""
    parts: List[str] = list(args.data or [])

    for entry in args.data_urlencode or []:
        if "=" in entry:
            name, value = entry.split("=", 1)
            parts.append(f"{name}={urllib.parse.quote_plus(value)}")
        else:
            parts.append(urllib.parse.quote_plus(entry))

    if not parts:
        return None

    return "&".join(parts).encode("utf-8")

def handle_response(response, url: str, args: argparse.Namespace) -> None:
    """Handles the HTTP response, logging and saving content."""
    
    # Print response details if verbose
    if args.verbose:
        print(f"HTTP/{response.version / 10:.1f} {response.status} {response.reason} for {url}", file=sys.stderr)
        for name, value in response.headers.items():
            print(f"  {name}: {value}", file=sys.stderr)
        print("-" * 40, file=sys.stderr)

    content = response.read()
    
    # Determine destination: explicit -o output, derived from -O/--remote-name, or stdout
    destination: Optional[Path] = None
    if args.output:
        destination = Path(args.output)
    elif args.remote_name:
        name = Path(urllib.parse.urlsplit(url).path).name
        destination = Path(name or "downloaded_file")

    if destination is not None:
        try:
            destination.write_bytes(content)
            if not args.silent:
                print(f"Successfully saved content to: {destination}", file=sys.stderr)
        except OSError as e:
            raise NativeError(f"Error saving file to {destination}: {e}")
    elif not args.silent:
        # Print content to stdout if not saving to a file
        sys.stdout.buffer.write(content)

@contextmanager
def open_connection(url: str, method: str, headers: Dict[str, str], body: bytes | None, timeout: float, args: argparse.Namespace):
    """
    Context manager that performs the HTTP request and yields the response.
    Configures TLS verification, proxy, and basic auth handlers per-request.
    """
    handlers = []

    if args.insecure:
        ctx = ssl.create_default_context()
        ctx.check_hostname = False
        ctx.verify_mode = ssl.CERT_NONE
        handlers.append(HTTPSHandler(context=ctx))

    if args.noproxy:
        handlers.append(ProxyHandler({}))
    elif args.proxy:
        handlers.append(ProxyHandler({"http": args.proxy, "https": args.proxy}))

    if args.user:
        username, _, password = args.user.partition(":")
        password_manager = HTTPPasswordMgrWithDefaultRealm()
        password_manager.add_password(None, url, username, password)
        handlers.append(HTTPBasicAuthHandler(password_manager))

    opener = build_opener(*handlers)
    request = Request(url, data=body, headers=headers, method=method)

    response = opener.open(request, timeout=timeout)
    try:
        yield response
    finally:
        response.close()
        if args.verbose:
            print(f"Connection to {url} closed", file=sys.stderr)

def run_native(args: argparse.Namespace) -> int:
    """Main logic to iterate through URLs and perform requests."""
    urls = [*args.urls, *args.urls_positional]
    
    if not urls:
        raise NativeError("No URL specified for spidering.")

    headers = request_headers(args.header)
    cookie_header = parse_cookie(args.cookie)
    if cookie_header and not any(name.lower() == "cookie" for name in headers):
        headers["Cookie"] = cookie_header

    body = prepare_data(args)

    # Determine HTTP method
    method = args.method.upper()
    if args.head:
        method = "HEAD"
    if args.get:
        method = "GET"

    if method not in ("GET", "POST", "HEAD", "PUT", "DELETE", "PATCH", "OPTIONS"):
        raise NativeError(f"Unsupported HTTP method specified: {method}")

    timeout = args.max_time or args.connect_timeout

    print(f"Starting spider with {len(urls)} URL(s). Method: {method}", file=sys.stderr)

    for url in urls:
        max_attempts = args.retry + 1

        for attempt in range(1, max_attempts + 1):
            try:
                print(f"\nAttempt {attempt}/{max_attempts}: Requesting {url} with method {method}", file=sys.stderr)

                with open_connection(url, method, headers, body, timeout, args) as response:
                    handle_response(response, url, args)

                # Success
                break

            except (HTTPError, URLError, TimeoutError) as error:
                if attempt >= max_attempts:
                    if not args.silent:
                        print(f"Fatal error for {url} after {max_attempts} attempts. Error: {error}", file=sys.stderr)
                    # Propagate the final error
                    raise
                wait_time = 2 ** attempt  # Exponential backoff
                print(f"Request failed for {url}. Retrying in {wait_time} seconds. Error: {error}", file=sys.stderr)
                time.sleep(wait_time)

    return 0

def main(argv: list[str] | None = None) -> None:
    """Main execution function."""
    parser = build_parser()
    
    try:
        args = parser.parse_args(argv)
    except argparse.ArgumentError as e:
        print(f"Error parsing arguments: {e}", file=sys.stderr)
        print_help()
        sys.exit(2)

    if args.help:
        print_help()
        sys.exit(0)

    if args.verbose:
        print(f"dodle-spider version 1.1.0", file=sys.stderr)

    try:
        result = run_native(args)
        sys.exit(result)
    except NativeError as e:
        print(f"ERROR: {e}", file=sys.stderr)
        sys.exit(2)
    except Exception as e:
        # Catch any unexpected critical errors
        print(f"An unexpected critical error occurred: {e}", file=sys.stderr)
        sys.exit(3)

if __name__ == "__main__":
    main()

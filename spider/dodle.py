from __future__ import annotations

import argparse
import base64
import os
import sys
import time
import urllib.parse
from pathlib import Path
import json  # Added missing import for JSON handling
from typing import Any, Dict, List, Optional
from urllib.error import HTTPError, URLError
from urllib.request import (
    HTTPBasicAuthHandler,
    HTTPCookieProcessor,
    HTTPPasswordMgrWithDefaultRealm,
    Request,
    build_opener,
    install_opener,
)

# --- Custom Exception ---

class NativeError(Exception):
    """Custom exception for internal application errors."""
    pass

# --- Helper Functions ---

def build_parser() -> argparse.ArgumentParser:
    """Builds the command-line argument parser."""
    parser = argparse.ArgumentParser(add_help=False, prog="dodle-spider")
    
    # Request options
    parser.add_argument("-X", "--request", dest="method", default="GET", help="HTTP method (e.g., GET, POST).")
    parser.add_argument("-G", "--get", action="store_true", help="Set request method to GET.")
    parser.add_argument("-I", "--head", action="store_true", help="Set request method to HEAD.")
    parser.add_argument("-L", "--location", action="store_true", help="Handle Location header.")
    
    # Header options
    parser.add_argument("-H", "--header", action="append", default=[], help="Append HTTP headers (name:value).")
    
    # Data handling options
    parser.add_argument("-d", "--data", "--data-raw", dest="data", action="append, store_true", default=None, help="Append raw data payload.")
    parser.add_argument("--data-urlencode", action="append", default=[], help="Append data to be URL-encoded.")
    
    # Verbosity and Control
    parser.add_argument("-v", "--verbose", action="store_true", help="Enable verbose output.")
    parser.add_argument("-s", "--silent", action="store_true", help="Suppress non-error output.")
    parser.add_argument("-k", "--insecure", action="store_true", help="Allow insecure connections (disable SSL verification).")
    parser.add_argument("-O", "--remote-name", action="store_true", help="Specify remote name for output saving.")
    
    # Timeouts and Retries
    parser.add_argument("--connect-timeout", type=float, default=30.0, help="Connection timeout in seconds.")
    parser.add_argument("--max-time", type=float, default=300.0, help="Maximum time allowed for the request in seconds.")
    parser.add_argument("--retry", type=int, default=0, help="Number of retries on failure.")
    
    # Proxy and User Auth
    parser.add_argument("--proxy", help="HTTP/S proxy to use.")
    parser.add_argument("--noproxy", action="store_true", help="Do not use proxy settings.")
    parser.add_argument("-u", "--user", help="Username for Basic Authentication.")
    parser.add_argument("-b", "--cookie", action="append", help="Append cookies.")
    
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

def parse_cookie(cookie_value: Optional[str]) -> Dict[str, str]:
    """Parses cookie strings into a dictionary."""
    # We rely on the standard http.cookiejar for structure
    jar = http.cookiejar.CookieJar()
    if not cookie_value:
        return dict(jar)
    
    if os.path.isfile(cookie_value):
        try:
            jar.load(cookie_value, ignore_discard=True, ignore_expires=True)
            return dict(jar)
        except Exception as e:
            raise NativeError(f"Failed to load cookie file {cookie_value}: {e}")
            
    # Parse from string
    for item in cookie_value.split(";"):
        item = item.strip()
        if not item:
            continue
            
        if "=" in item:
            try:
                name, cookie_value_str = item.split("=", 1)
                # Note: cookie_value_str might contain URL-encoded values. 
                # We keep it as is for the CookieJar object.
                jar.set_cookie(http.cookiejar.Cookie(0, name, cookie_value_str, None, False,
                    "", False, False, "/", True, False, None, None, {}))
            except ValueError:
                # Handle malformed cookie entries
                raise NativeError(f"Malformed cookie entry encountered: {item}")

    return dict(jar)

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
    raw_data = list(args.data or [])
    url_encoded_data = list(args.data_urlencode or [])
    
    if not raw_data and not url_encoded_data:
        return None

    encoded_parts = []
    
    # Combine raw data into a URL-encoded string if no explicit URL encoding was provided
    if not url_encoded_data:
        encoded_parts.extend(raw_data)
    else:
        # Use the explicitly provided URL-encoded data
        encoded_parts.extend(url_encoded_data)

    if not encoded_parts:
        return None
        
    # Combine the parts using '&'
    body = "&".join(encoded_parts).encode('utf-8')
    return body

def load_json_data(data: str) -> Any:
    """Loads and parses a string as JSON, handling errors."""
    try:
        return json.loads(data)
    except json.JSONDecodeError as e:
        raise NativeError(f"Invalid JSON data received: {e}")

def handle_response(response: Request, method: str, headers: Dict[str, str], url: str, timeout: float, args: argparse.Namespace) -> None:
    """Handles the HTTP response, logging and saving content."""
    
    # Print response details if verbose
    if args.verbose:
        print(f"HTTP/{response.version / 10:.1f} {response.status} {response.reason} for {url}", file=sys.stderr)
        for name, value in response.headers.items():
            print(f"  {name}: {value}", file=sys.stderr)
        print("-" * 40, file=sys.stderr)

    content = response.read()
    
    # Determine destination
    destination = Path(args.output)
    if args.remote_name:
        # Use the base URL path/name if remote_name is specified
        destination = Path(url.split("?", 1)[0]).name or "downloaded_file"
        
    if destination and not args.silent:
        try:
            destination.write_bytes(content)
            print(f"Successfully saved content to: {destination}", file=sys.stderr)
        except IOError as e:
            print(f"Error saving file to {destination}: {e}", file=sys.stderr)
            
    elif not args.silent:
        # Print content to stdout if not saving to a file
        sys.stdout.buffer.write(content)

def open_connection(url: str, method: str, headers: Dict[str, str], body: bytes | None, timeout: float, args: argparse.Namespace) -> Request:
    """
    Context manager to establish a configured network request.
    Sets up cookie jar, password manager, proxy, and basic auth handlers.
    """
    cookie_jar = parse_cookie(args.cookie)
    password_manager = HTTPPasswordMgrWithDefaultRealm()
    opener = build_opener(HTTPCookieProcessor(cookie_jar))
    
    # Add Proxy Handler
    if args.proxy:
        try:
            # Dynamically import ProxyHandler safely
            from urllib.request import ProxyHandler
            opener.add_handler(ProxyHandler({"http": args.proxy, "https": args.proxy}))
        except ImportError:
            raise NativeError("ProxyHandler module not found.")
            
    # Setup Basic Authentication
    if args.user and ":" not in args.user:
        # Assuming no password for simplicity, relying on the provided user
        password_manager.add_password(None, url, args.user, "")
        opener.add_handler(HTTPBasicAuthHandler(password_manager))
        
    install_opener(opener)
    
    request = Request(url, data=body, headers=headers, method=method)
    
    try:
        yield request
    finally:
        if args.verbose:
            print(f"Connection to {url} closed", file=sys.stderr)

def run_native(args: argparse.Namespace) -> int:
    """Main logic to iterate through URLs and perform requests."""
    urls = [*args.urls, *args.urls_positional]
    
    if not urls:
        raise NativeError("No URL specified for spidering.")

    headers = request_headers(args.header)
    body = prepare_data(args)
    
    # Determine HTTP method
    method = args.method or ("HEAD" if args.head else "POST" if body else "GET")
    if args.get:
        method = "GET"

    # Set request method if explicitly provided
    if args.method and method not in ("GET", "POST", "HEAD", "PUT", "DELETE"):
        raise NativeError(f"Unsupported HTTP method specified: {method}")

    print(f"Starting spider with {len(urls)} URL(s). Method: {method}", file=sys.stderr)

    for url in urls:
        attempt = 0
        max_attempts = args.retry + 1
        
        while attempt < max_attempts:
            try:
                print(f"\nAttempt {attempt + 1}/{max_attempts}: Requesting {url} with method {method}", file=sys.stderr)
                
                with open_connection(url, method, headers, body, args.max_time or args.connect_timeout, args) as request:
                    handle_response(request, method, headers, url, args.max_time or args.connect_timeout, args)
                
                # Success
                break
            
            except (HTTPError, URLError, TimeoutError) as error:
                attempt += 1
                if attempt < max_attempts:
                    wait_time = 2 ** attempt  # Exponential backoff
                    print(f"Request failed for {url}. Retrying in {wait_time} seconds. Error: {error}", file=sys.stderr)
                    time.sleep(wait_time)
                else:
                    if not args.silent:
                        print(f"Fatal error for {url} after {max_attempts} attempts. Error: {error}", file=sys.stderr)
                    # Propagate the final error
                    raise 
        else:
            # If the loop completes without a break, it means all retries failed
            raise NativeError(f"Failed to complete request for {url} after {max_attempts} attempts.")
            
    return 0

def main(argv: list[str] | None = None) -> None:
    """Main execution function."""
    parser = build_parser()
    
    try:
        args = parser.parse_args(argv)
    except argparse.ArgumentError as e:
        print(f"Error parsing arguments: {e}", file=sys.stderr)
        parser.print_help()
        sys.exit(2)

    if args.verbose:
        print(f"dodle-spider version 1.1.0", file=sys.stderr)

    try:
        result = run_native(args)
        sys.exit(result)
    except NativeError as e:
        print(f"ERROR: {e}", file=sys.stderr)
        sys.exit(2)
    except Exception as e:
        # Catch any unexpected system errors
        print(f"An unexpected critical error occurred: {e}", file=sys.stderr)
        sys.exit(3)

if __name__ == "__main__":
    # Ensure that the necessary module is available during execution
    if not hasattr(sys, 'exit'):
        sys.exit = lambda code: None 
    main()

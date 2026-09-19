from __future__ import annotations

import argparse
import base64
import os
import shutil
import sys
import time
import urllib.parse
from pathlib import Path
from urllib.error import HTTPError, URLError
from urllib.parse import urlencode
from urllib.request import (
    HTTPBasicAuthHandler,
    HTTPCookieProcessor,
    HTTPPasswordMgrWithDefaultRealm,
    Request,
    build_opener,
    install_opener,
)

from typing import *
from contextlib import contextmanager

class NativeError(Exception):
    pass

def build_parser() -> argparse.ArgumentParser:
    parser = argparse.ArgumentParser(add_help=False, prog="dodle-spider")
    parser.add_argument("-h", "--help", action="store_true")
    parser.add_argument("-X", "--request", dest="method")
    parser.add_argument("-H", "--header", action="append", default=[])
    parser.add_argument("-d", "--data", "--data-raw", dest="data", action="append")
    parser.add_argument("--data-urlencode", action="append", default=[])
    parser.add_argument("-G", "--get", action="store_true")
    parser.add_argument("-I", "--head", action="store_true")
    parser.add_argument("-L", "--location", action="store_true")
    parser.add_argument("-i", "--include", action="store_true")
    parser.add_argument("-v", "--verbose", action="store_true")
    parser.add_argument("-s", "--silent", action="store_true")
    parser.add_argument("-k", "--insecure", action="store_true")
    parser.add_argument("-u", "--user")
    parser.add_argument("-b", "--cookie", action="append")
    parser.add_argument("-o", "--output")
    parser.add_argument("-O", "--remote-name", action="store_true")
    parser.add_argument("--connect-timeout", type=float)
    parser.add_argument("--max-time", type=float)
    parser.add_argument("--retry", type=int, default=0)
    parser.add_argument("--proxy")
    parser.add_argument("--noproxy")
    parser.add_argument("--url", action="append", dest="urls", default=[])
    parser.add_argument("--version", action="store_true")
    parser.add_argument("urls_positional", nargs="*")
    return parser

def print_help() -> None:
    print("Usage: dodle-spider [options] <url>")
    print("Native options: -X -H -d --data-urlencode -G -I -L -i -v -s -k -u -b -o -O")
    print("               --connect-timeout --max-time --retry --proxy --noproxy --url")
    print("Options outside the native feature set use the configured transfer backend.")

def parse_cookie(value: str | None) -> Dict[str, str]:
    jar = http.cookiejar.CookieJar()
    if not value:
        return jar
    if os.path.isfile(value):
        jar.load(value, ignore_discard=True, ignore_expires=True)
        return dict(jar)
    for item in value.split(";"):
        if "=" in item:
            name, cookie_value = item.strip().split("=", 1)
            jar.set_cookie(http.cookiejar.Cookie(0, name, cookie_value, None, False,
                "", False, False, "/", True, False, None, False, None, None, {}))
    return dict(jar)

def request_headers(values: list[str]) -> Dict[str, str]:
    headers = {}
    for value in values:
        if ":" not in value:
            raise NativeError(f"invalid header: {value}")
        name, header_value = value.split(":", 1)
        headers[name.strip()] = header_value.strip()
    return headers

def prepare_data(args: argparse.Namespace) -> bytes | None:
    values = list(args.data or [])
    values.extend(args.data_urlencode)
    if not values:
        return None
    encoded = []
    for value in args.data_urlencode:
        if "=" in value:
            key, item = value.split("=", 1)
            encoded.append((key, item))
    raw = [value for value in args.data or []]
    body = urlencode(encoded).encode() if encoded else "&".join(raw).encode()
    return body

def load_json_data(data: str) -> Any:
    try:
        return json.loads(data)
    except json.JSONDecodeError as e:
        raise NativeError(f"invalid JSON data: {e}")

def handle_response(response: Request, method: str, headers: Dict[str, str], url: str, timeout: float) -> None:
    if args.include or args.verbose:
        print(f"HTTP/{response.version / 10:.1f} {response.status} {response.reason}", file=sys.stderr if args.verbose else sys.stdout)
        for name, value in response.headers.items():
            print(f"{name}: {value}", file=sys.stderr if args.verbose else sys.stdout)
        print(file=sys.stderr if args.verbose else sys.stdout)
    content = response.read()
    destination = args.output
    if args.remote_name:
        destination = Path(url.split("?", 1)[0]).name or "download"
    if destination:
        Path(destination).write_bytes(content)
    elif not args.silent:
        sys.stdout.buffer.write(content)

@contextmanager
def open_connection(url: str, method: str, headers: Dict[str, str], body: bytes | None, timeout: float) -> Request:
    cookie_jar = parse_cookie(args.cookie)
    password_manager = HTTPPasswordMgrWithDefaultRealm()
    opener = build_opener(HTTPCookieProcessor(cookie_jar))
    if args.proxy:
        opener.add_handler(__import__("urllib.request", fromlist=["ProxyHandler"]).ProxyHandler({"http": args.proxy, "https": args.proxy}))
    if args.noproxy:
        os.environ["NO_PROXY"] = args.noproxy
    if args.user and ":" not in args.user:
        password_manager.add_password(None, url, args.user, "")
        opener.add_handler(HTTPBasicAuthHandler(password_manager))
    install_opener(opener)
    try:
        request = Request(url, data=body, headers=headers, method=method)
        yield request
    finally:
        if args.verbose:
            print(f"Connection to {url} closed", file=sys.stderr)

def run_native(args: argparse.Namespace) -> int:
    urls = [*args.urls, *args.urls_positional]
    if args.help:
        print_help()
        return 0
    if args.version:
        print("dodle-spider 1.1.0")
        return 0
    if not urls:
        raise NativeError("no URL specified")

    headers = request_headers(args.header)
    body = prepare_data(args)
    method = args.method or ("HEAD" if args.head else "POST" if body else "GET")
    if args.get:
        method = "GET"
    if body is not None and "Content-Type" not in headers:
        headers["Content-Type"] = "application/x-www-form-urlencoded"
    if args.user:
        token = base64.b64encode(args.user.encode()).decode()
        headers.setdefault("Authorization", f"Basic {token}")

    try:
        for url in urls:
            if args.get and body:
                separator = "&" if "?" in url else "?"
                url = url + separator + body.decode()
                body = None
            with open_connection(url, method, headers, body, args.max_time or args.connect_timeout) as request:
                handle_response(request, method, headers, url, args.max_time or args.connect_timeout)
    except (HTTPError, URLError, TimeoutError) as error:
        if not args.silent:
            print(f"dodle-spider: {error}", file=sys.stderr)
        return 22 if isinstance(error, HTTPError) else 6
    return 0

def main(argv: list[str] | None = None) -> None:
    arguments = list(sys.argv[1:] if argv is not None else sys.argv)
    parser = build_parser()
    try:
        args = parser.parse_args(arguments)
    except argparse.ArgumentError as e:
        print(f"error: {e}", file=sys.stderr)
        parser.print_help()
        raise SystemExit(2)

    if args.verbose:
        print(f"dodle-spider {sys.argv[0]} version 1.1.0", file=sys.stderr)

    try:
        result = run_native(args)
        sys.exit(result)
    except NativeError as e:
        print(f"error: {e}", file=sys.stderr)
        raise SystemExit(2)

if __name__ == "__main__":
    main()

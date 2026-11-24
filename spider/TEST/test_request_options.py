import contextlib
import gzip
import http.server
import io
import json
from pathlib import Path
import shutil
import ssl
import subprocess
import tempfile
import threading
import time
import unittest
from unittest.mock import patch
from urllib.error import URLError

from dodle import NativeError, build_parser, open_connection, parse_cookie, prepare_data, request_headers, run_native


class TrackingServer(http.server.ThreadingHTTPServer):
    request_method = None
    request_headers = None
    request_body = None


class RequestHandler(http.server.BaseHTTPRequestHandler):
    def do_PATCH(self):
        self.server.request_method = self.command
        self.server.request_headers = dict(self.headers.items())
        self.server.request_body = self.rfile.read(int(self.headers.get("Content-Length", "0")))
        self.send_response(200)
        self.end_headers()
        self.wfile.write(b"ok")

    def do_GET(self):
        if self.path == "/gzip":
            body = gzip.compress(b"decoded response")
            self.send_response(200)
            self.send_header("Content-Encoding", "gzip")
            self.send_header("Content-Length", str(len(body)))
            self.end_headers()
            self.wfile.write(body)
            return

        self.send_error(404)

    def log_message(self, format, *args):
        pass


class RequestOptionTests(unittest.TestCase):
    @classmethod
    def setUpClass(cls):
        cls.server = TrackingServer(("127.0.0.1", 0), RequestHandler)
        cls.thread = threading.Thread(target=cls.server.serve_forever, daemon=True)
        cls.thread.start()
        cls.base_url = f"http://127.0.0.1:{cls.server.server_port}"

    @classmethod
    def tearDownClass(cls):
        cls.server.shutdown()
        cls.server.server_close()
        cls.thread.join()

    def test_json_body_sets_json_headers_and_validates_input(self):
        args = build_parser().parse_args(["--json", '{"name":"Ada"}', self.base_url])
        headers = {}

        self.assertEqual(prepare_data(args, headers), b'{"name":"Ada"}')
        self.assertEqual(headers["Content-Type"], "application/json")
        self.assertEqual(json.loads(prepare_data(args, {})), {"name": "Ada"})

        invalid = build_parser().parse_args(["--json", "not-json", self.base_url])
        with self.assertRaises(NativeError):
            prepare_data(invalid, {})

    def test_form_upload_builds_multipart_body(self):
        with tempfile.TemporaryDirectory() as directory:
            upload = Path(directory) / "note.txt"
            upload.write_text("hello", encoding="utf-8")
            args = build_parser().parse_args(["-F", "name=Ada", "-F", f"file=@{upload}", self.base_url])
            headers = {}
            body = prepare_data(args, headers)

        boundary = headers["Content-Type"].split("boundary=", 1)[1]
        self.assertIn(f"--{boundary}".encode(), body)
        self.assertIn(b'name="name"', body)
        self.assertIn(b'name="file"; filename="note.txt"', body)
        self.assertIn(b"hello", body)
        self.assertTrue(body.endswith(f"--{boundary}--\r\n".encode()))

    def test_urlencoded_data_and_header_parsing(self):
        args = build_parser().parse_args(["--data-urlencode", "q=two words", self.base_url])
        self.assertEqual(prepare_data(args, {}), b"q=two+words")
        self.assertEqual(request_headers(["X-Note: a:b"]), {"X-Note": "a:b"})
        with self.assertRaises(NativeError):
            request_headers(["missing-colon"])

    def test_raw_cookie_values_are_combined(self):
        self.assertEqual(parse_cookie(["a=1; b=two", "c=3"]), "a=1; b=two; c=3")

    def test_custom_method_headers_and_body_reach_server(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "response.txt"
            args = build_parser().parse_args([
                "--silent", "--output", str(output), "--request", "PATCH",
                "--header", "X-Check: present", "--data", "payload", self.base_url
            ])
            with contextlib.redirect_stdout(io.StringIO()), contextlib.redirect_stderr(io.StringIO()):
                self.assertEqual(run_native(args), 0)
            self.assertEqual(output.read_bytes(), b"ok")

        self.assertEqual(self.server.request_method, "PATCH")
        self.assertEqual(self.server.request_headers["X-Check"], "present")
        self.assertEqual(self.server.request_body, b"payload")

    def test_compressed_response_is_decoded(self):
        with tempfile.TemporaryDirectory() as directory:
            output = Path(directory) / "response.txt"
            args = build_parser().parse_args([
                "--silent", "--compressed", "--output", str(output), f"{self.base_url}/gzip"
            ])
            with contextlib.redirect_stdout(io.StringIO()), contextlib.redirect_stderr(io.StringIO()):
                self.assertEqual(run_native(args), 0)
            self.assertEqual(output.read_bytes(), b"decoded response")

    def test_retry_recovers_after_a_transient_server_error(self):
        class RetryHandler(http.server.BaseHTTPRequestHandler):
            attempts = 0

            def do_GET(self):
                type(self).attempts += 1
                if type(self).attempts == 1:
                    self.send_error(503)
                    return
                self.send_response(200)
                self.end_headers()
                self.wfile.write(b"recovered")

            def log_message(self, format, *args):
                pass

        server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), RetryHandler)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            url = f"http://127.0.0.1:{server.server_port}"
            output = io.StringIO()
            output.buffer = io.BytesIO()
            with patch("sys.stdout", output), contextlib.redirect_stderr(io.StringIO()):
                args = build_parser().parse_args(["--silent", "--retry", "1", url])
                with patch("dodle.time.sleep") as wait:
                    self.assertEqual(run_native(args), 0)
            self.assertEqual(RetryHandler.attempts, 2)
            self.assertEqual(output.buffer.getvalue(), b"recovered")
            wait.assert_called_once_with(2)
        finally:
            server.shutdown()
            server.server_close()
            thread.join()

    def test_request_timeout_is_enforced(self):
        class SlowHandler(http.server.BaseHTTPRequestHandler):
            def do_GET(self):
                time.sleep(0.2)
                try:
                    self.send_response(200)
                    self.end_headers()
                except OSError:
                    pass

            def log_message(self, format, *args):
                pass

        server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), SlowHandler)
        thread = threading.Thread(target=server.serve_forever, daemon=True)
        thread.start()
        try:
            url = f"http://127.0.0.1:{server.server_port}"
            args = build_parser().parse_args(["--connect-timeout", "0.03", url])
            with self.assertRaises((URLError, TimeoutError)):
                with open_connection(url, "GET", {}, None, args.connect_timeout, args):
                    self.fail("slow response unexpectedly completed")
        finally:
            server.shutdown()
            server.server_close()
            thread.join()

    def test_tls_verification_is_enabled_unless_insecure_is_requested(self):
        openssl = shutil.which("openssl")
        if not openssl:
            self.skipTest("openssl is required to generate a temporary self-signed certificate")

        class Handler(http.server.BaseHTTPRequestHandler):
            def do_GET(self):
                self.send_response(200)
                self.end_headers()
                self.wfile.write(b"secure test response")

            def log_message(self, format, *args):
                pass

        with tempfile.TemporaryDirectory() as directory:
            certificate = Path(directory) / "certificate.pem"
            private_key = Path(directory) / "private-key.pem"
            subprocess.run([
                openssl, "req", "-x509", "-newkey", "rsa:2048", "-nodes",
                "-keyout", str(private_key), "-out", str(certificate), "-days", "1",
                "-subj", "/CN=127.0.0.1", "-addext", "subjectAltName=IP:127.0.0.1"
            ], check=True, stdout=subprocess.DEVNULL, stderr=subprocess.DEVNULL)
            server = http.server.ThreadingHTTPServer(("127.0.0.1", 0), Handler)
            context = ssl.SSLContext(ssl.PROTOCOL_TLS_SERVER)
            context.load_cert_chain(certificate, private_key)
            server.socket = context.wrap_socket(server.socket, server_side=True)
            thread = threading.Thread(target=server.serve_forever, daemon=True)
            thread.start()

            try:
                url = f"https://127.0.0.1:{server.server_port}"
                verified_args = build_parser().parse_args([url])
                with self.assertRaises((URLError, ssl.SSLError)):
                    with open_connection(url, "GET", {}, None, 5.0, verified_args):
                        self.fail("untrusted certificate was unexpectedly accepted")

                insecure_args = build_parser().parse_args(["--insecure", url])
                with open_connection(url, "GET", {}, None, 5.0, insecure_args) as response:
                    self.assertEqual(response.read(), b"secure test response")
            finally:
                server.shutdown()
                server.server_close()
                thread.join()


if __name__ == "__main__":
    unittest.main()
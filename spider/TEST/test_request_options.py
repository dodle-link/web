import contextlib
import gzip
import http.server
import io
import json
from pathlib import Path
import tempfile
import threading
import unittest

from dodle import NativeError, build_parser, parse_cookie, prepare_data, request_headers, run_native


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


if __name__ == "__main__":
    unittest.main()
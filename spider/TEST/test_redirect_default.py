import http.server
import socketserver
import threading
import unittest

from dodle import build_parser, open_connection


class RedirectDefaultTests(unittest.TestCase):
    def test_redirects_are_followed_by_default(self):
        class Handler(http.server.BaseHTTPRequestHandler):
            def do_GET(self):
                if self.path == "/redirect":
                    self.send_response(302)
                    self.send_header("Location", "/final")
                    self.end_headers()
                elif self.path == "/final":
                    self.send_response(200)
                    self.send_header("Content-Type", "text/plain")
                    self.end_headers()
                    self.wfile.write(b"ok")
                else:
                    self.send_response(404)
                    self.end_headers()

            def log_message(self, format, *args):
                pass

        httpd = socketserver.TCPServer(("127.0.0.1", 0), Handler)
        port = httpd.server_address[1]
        thread = threading.Thread(target=httpd.serve_forever, daemon=True)
        thread.start()

        try:
            url = f"http://127.0.0.1:{port}/redirect"
            args = build_parser().parse_args([url])
            with open_connection(url, "GET", {}, None, 5.0, args) as response:
                self.assertEqual(response.status, 200)
                self.assertEqual(response.read().decode("utf-8"), "ok")
        finally:
            httpd.shutdown()
            httpd.server_close()


if __name__ == "__main__":
    unittest.main()

from html.parser import HTMLParser
from pathlib import Path
from urllib.parse import unquote, urlsplit
import unittest


ROOT = Path(__file__).resolve().parents[1]


class LocalReferenceParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.references = []

    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            if name in {"href", "src"} and value:
                self.references.append(value)


class SiteLinkTests(unittest.TestCase):
    def test_local_html_references_resolve_to_files(self):
        missing = []
        pages = sorted(ROOT.rglob("*.html"))

        for page in pages:
            parser = LocalReferenceParser()
            parser.feed(page.read_text(encoding="utf-8"))
            for reference in parser.references:
                parsed = urlsplit(reference)
                if parsed.scheme or parsed.netloc or not parsed.path:
                    continue

                relative_path = Path(unquote(parsed.path).lstrip("/")) if parsed.path.startswith("/") else Path(unquote(parsed.path))
                target = (ROOT / relative_path if parsed.path.startswith("/") else page.parent / relative_path).resolve()
                if target.is_dir():
                    target /= "index.html"
                if not target.is_file():
                    missing.append(f"{page.relative_to(ROOT)} -> {reference}")

        self.assertEqual(missing, [], "Broken local HTML references:\n" + "\n".join(missing))
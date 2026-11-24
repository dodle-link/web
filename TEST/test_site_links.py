from html.parser import HTMLParser
from pathlib import Path
import re
from urllib.parse import unquote, urlsplit
import unittest


ROOT = Path(__file__).resolve().parents[1]


class LocalReferenceParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.references = []
        self.ids = []

    def handle_starttag(self, tag, attrs):
        for name, value in attrs:
            if name in {"href", "src"} and value:
                self.references.append((name, value))
            elif name == "id" and value:
                self.ids.append(value)


def local_target(page, path):
    decoded_path = unquote(path)
    target = ROOT / decoded_path.lstrip("/") if path.startswith("/") else page.parent / decoded_path
    target = target.resolve()
    return target / "index.html" if target.is_dir() else target


def local_css_references(stylesheet):
    contents = stylesheet.read_text(encoding="utf-8")
    return re.findall(r"url\(\s*(['\"]?)(.*?)\1\s*\)", contents, re.IGNORECASE)


class SiteLinkTests(unittest.TestCase):
    def test_local_html_references_resolve_to_files(self):
        missing = []
        missing_fragments = []
        duplicate_ids = []
        pages = sorted(
            page for page in ROOT.rglob("*.html")
            if "node_modules" not in page.parts and "test-results" not in page.parts
        )

        for page in pages:
            parser = LocalReferenceParser()
            parser.feed(page.read_text(encoding="utf-8"))
            duplicate_ids.extend(
                f"{page.relative_to(ROOT)} -> {identifier}"
                for identifier in set(parser.ids)
                if parser.ids.count(identifier) > 1
            )
            for name, reference in parser.references:
                parsed = urlsplit(reference)
                if parsed.scheme or parsed.netloc:
                    continue

                target = local_target(page, parsed.path) if parsed.path else page
                if parsed.path and not target.is_file():
                    missing.append(f"{page.relative_to(ROOT)} -> {reference}")
                elif name == "href" and parsed.fragment:
                    target_parser = LocalReferenceParser()
                    target_parser.feed(target.read_text(encoding="utf-8"))
                    if unquote(parsed.fragment) not in target_parser.ids:
                        missing_fragments.append(f"{page.relative_to(ROOT)} -> {reference}")

        self.assertEqual(missing, [], "Broken local HTML references:\n" + "\n".join(missing))
        self.assertEqual(missing_fragments, [], "Broken local fragments:\n" + "\n".join(missing_fragments))
        self.assertEqual(duplicate_ids, [], "Duplicate HTML IDs:\n" + "\n".join(duplicate_ids))

    def test_local_css_references_resolve_to_files(self):
        missing = []
        stylesheets = (
            stylesheet for stylesheet in ROOT.rglob("*.css")
            if "node_modules" not in stylesheet.parts and "test-results" not in stylesheet.parts
        )
        for stylesheet in sorted(stylesheets):
            for quote, reference in local_css_references(stylesheet):
                parsed = urlsplit(reference.strip())
                if parsed.scheme or parsed.netloc or not parsed.path:
                    continue
                target = (stylesheet.parent / unquote(parsed.path)).resolve()
                if not target.is_file():
                    missing.append(f"{stylesheet.relative_to(ROOT)} -> {reference}")

        self.assertEqual(missing, [], "Broken local CSS references:\n" + "\n".join(missing))
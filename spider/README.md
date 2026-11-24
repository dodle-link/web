# Dodle Spider

Dodle Spider is an independently installable Python command-line HTTP client in the Dodle Web repository. It is not part of the static site; the Pages deployment excludes the `spider/` directory.

## Requirements

- Python 3.10 or newer

## Install in a virtual environment

From the repository root:

```sh
python3 -m venv .venv
. .venv/bin/activate
python -m pip install ./spider
dodle --help
dodle-spider --help
```

To install from a source checkout without packaging it:

```sh
cd spider
python3 dodle.py https://example.com
```

## Examples

```sh
dodle https://example.com
dodle -I https://example.com
dodle -H 'Accept: application/json' https://api.example.com
dodle -X POST --json '{"name":"Ada"}' https://api.example.com/items
dodle -F 'name=Ada' -F 'file=@note.txt' https://example.com/upload
dodle --retry 2 --max-time 30 https://example.com
dodle -L -o page.html https://example.com
```

Redirects are followed by default. Set `--no-location` to stop at the first redirect or `--max-redirs N` to limit the number followed. TLS verification is enabled by default; `--insecure` disables it and should only be used for a deliberate local test. Verbose output can include credentials, cookies, and request headers, so treat it as sensitive.

## Tests

From the repository root:

```sh
(cd spider && python3 -m unittest discover -s TEST -p 'test_*.py')
python3 -m compileall -q spider
```

The CI workflow also installs the package into a clean virtual environment and checks both installed command names.

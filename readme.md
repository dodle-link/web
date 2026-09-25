# Dodle Search v1.3.0

Version: `1.3.0`

A minimal, distraction-free search homepage that sends queries to Google.

## Repository

This directory is maintained as a separate Git repository:

`git@github.com:dodle-link/web.git`

It is independent from the sibling `noesis` repository. Noesis browser assets
are loaded from `https://noesis.dodle.link/` at runtime.

## Features

- Clean responsive layout for desktop and mobile
- Dark mode enabled by default
- Light mode preference persisted in `localStorage`
- Search suggestions and a "I'm Feeling Curious" shortcut with localized, deduplicated prompts
- The curiosity shortcut provides 100,000 lazily generated prompts per supported language
- Search results open in a new tab
- The hosted Noe pixel responds to the visitor's real-time presence: movement, keyboard activity, and visibility all feed its energy state
- This page does not render a literal energy cube; instead, the current cursor acts as the virtual energy source when the pixel needs energy

## Run locally

This is a static site with no build step or dependencies. Serve it with a static file server. The Noe pixel JavaScript and CSS are loaded from the hosted Noesis UI, not from a local `noesis` checkout:

```sh
python3 -m http.server 8000 -d ..
```

Then visit `http://localhost:8000/web/index.html`.

## Noe pixel behavior

The local bridge in `script/me.js` creates a lightweight "here and now" state for the hosted Noe pixel. It tracks:

- active pointer movement and keyboard input
- idle time and tab visibility
- a live `window.noeEnergy` value that decays when the visitor is idle and recharges when they are interacting

When the pixel needs energy, it targets the current cursor position as a virtual energy source rather than expecting a real cube element to exist in the page. This keeps the experience self-contained to the browser and lets the page feel responsive without adding extra DOM objects.

## Changelog

See [CHANGELOG_v1.3.0.md](doc/CHANGELOG_v1.3.0.md) for the latest release
history. The [v1.0.0 changelog](doc/CHANGELOG_v1.0.0.md) covers the initial
release.

## Dodle Spider

`spider/dodle.py` is a Python command-line client for HTTP and HTTPS requests.
It provides a style request interface using Python's standard library.

Run it from the Spider directory:

```sh
cd spider
python3 dodle.py https://example.com
python3 dodle.py -I https://example.com
python3 dodle.py -H 'Accept: application/json' https://api.example.com
python3 dodle.py -X POST -d '{"name":"Ada"}' https://api.example.com/items
python3 dodle.py -L -o page.html https://example.com
```

Install it as a command:

```sh
cd spider
python3 install.py
export PATH="$HOME/Library/Python/$(python3 -c 'import sys; print(f"{sys.version_info.major}.{sys.version_info.minor}")')/bin:$PATH"
dodle google.com
```

The installer prints the correct PATH command for your Python installation.
Redirects are followed by default, so `dodle google.com` works without `-L`.
Use `dodle --no-location google.com` when the request should stop at the first redirect.

Native support includes arbitrary methods, headers, raw and JSON request data,
multipart forms, uploads, basic authentication, cookies, redirects, proxies,
TLS certificates, compression, ranges, resumed downloads, timeouts, retries,
response headers, failure handling, write-out summaries, and verbose output.
Verbose mode can expose credentials and cookies, so use it only when
appropriate.

## Files

- `index.html` - Page structure and hosted Noe pixel bootstrap
- `css/styles.css` - Responsive layout and theme styles
- `script/me.js` - Cursor-driven "here and now" energy bridge for the Noe pixel
- `script/script.js` - Search controls and theme persistence
- `spider/dodle.py` - Command-line HTTP and HTTPS client
- `spider/install.py` - Spider command installer
- `spider/pyproject.toml` - Spider package metadata

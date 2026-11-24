# Dodle Search v1.4.0

Version: `1.4.0`

A minimal, distraction-free search homepage that sends queries to Google.

## Repository

This directory is maintained as a separate Git repository:

`git@github.com:dodle-link/web.git`

It is independent from the sibling `noesis` repository. The pixel experience is
served from this repository and does not load browser assets from
`https://noesis.dodle.link/` at runtime.

## Features

- Clean responsive layout for desktop and mobile
- Dark mode enabled by default
- Light mode preference persisted in `localStorage`
- Seven interface languages with a locally stored language preference
- Search operator controls and interpretation of supported natural-language queries
- An "I'm Feeling Curious" shortcut that fills the search field with a localized prompt, drawing topic-and-pattern combinations without replacement until each language's set is exhausted
- Search results open in a new tab
- The local Noe pixel responds to pointer, keyboard, scroll, touch, and focus activity through a browser-side agent
- Noe can be turned off on the homepage; the preference is stored locally, and an existing model is retained
- The pixel responds to a nearby pointer, while the agent's energy affects its speed
- A [World Ideas page](ideas/index.html) showing popular Wikipedia articles based on the previous UTC day's pageviews, fetched from Wikimedia
- A [blog](blog/index.html) with articles about discovery
- A [Node page](node/readme.md) for a locally stored, optionally synchronized key-value document

## Run locally

The site has no build step and can be served with a static file server. The Noe pixel JavaScript and CSS are served from this repository; a local `noesis` checkout is not required. From this directory, run:

```sh
python3 -m http.server 8000
```

Then visit `http://localhost:8000/index.html`.

## Test and release

Install the browser-test tools once, then run the checks before opening a pull
request:

```sh
npm ci
npx playwright install chromium firefox webkit
node --test script/TEST/*.js
npm run test:browser
python3 -m unittest discover -s TEST -p 'test_*.py'
(cd spider && python3 -m unittest discover -s TEST -p 'test_*.py')
python3 -m compileall -q spider
```

The Playwright suite runs in Chromium, Firefox, and WebKit and includes axe checks on the main,
About, and Privacy pages in both themes. It also checks the core localized
flows, keyboard operation, reduced motion, narrow viewports, Noe model
recovery/state bounds, search submission, and the absence of third-party requests
on the homepage and Privacy page. These automated checks do not replace manual assistive
technology testing. Before a release, spot-check the current Chrome, Firefox,
and Safari releases, including mobile Safari and Chrome.

Release checklist:

- Update the relevant changelog and homepage/README version together. Spider has
	its own package version in `spider/pyproject.toml`.
- Run the checks above and verify all local page assets and links.
- Manually check keyboard operation, language switching, theme persistence, and
	search submission on desktop and mobile.
- Review privacy statements if browser storage, interaction handling, search
	destinations, or hosting configuration changes.
- For a Spider release, verify the installed `dodle` and `dodle-spider` commands
	from a clean Python environment.

## Noe pixel behavior

The local bridge in `script/me.js` runs a browser-side agent for the Noe pixel. It includes:

- pointer movement, keyboard input, scrolling, touch, and focus activity
- energy and curiosity state, rules, bounded memory, and mutable behavior
- a model stored locally, with state and rules exposed through `window.noeEnergy` and `window.noeSelf`

The pixel's movement reacts to a nearby pointer and its speed varies with the agent's energy. It does not use a separate energy cube element.

## Changelog

See [CHANGELOG_v1.4.0.md](doc/CHANGELOG_v1.4.0.md) for the latest release
history. The [v1.0.0 changelog](doc/CHANGELOG_v1.0.0.md) covers the initial
release.

## Dodle Spider

`spider/dodle.py` is an independently installable Python command-line client
for HTTP and HTTPS requests. It uses Python's standard library. The Pages
workflow excludes `spider/` from the deployed site. See the dedicated
[Spider guide](spider/README.md) for installation, options, and testing.

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

- `index.html` - Page structure and local Noe pixel bootstrap
- `css/styles.css` - Responsive layout and theme styles
- `script/me.js` - Cursor-driven "here and now" energy bridge for the Noe pixel
- `script/script.js` - Search controls and theme persistence
- `script/words.js` - Localized curiosity prompt sources
- `ideas/index.html` and `script/ideas.js` - Wikipedia pageview trends
- `blog/index.html` - Blog index
- `node/index.html` - Shared key-value page; see the [Node guide](node/readme.md)
- `spider/dodle.py` - Command-line HTTP and HTTPS client
- `spider/install.py` - Spider command installer
- `spider/pyproject.toml` - Spider package metadata

# Dodle Search v1.0.0

Version: `1.0.0`

A minimal, distraction-free search homepage that sends queries to Google.

## Repository

This directory is maintained as a separate Git repository:

`git@github.com:dodle-link/web.git`

It is independent from the sibling `noesis` repository. Noesis browser assets
are loaded from `https://noesis.dodle.link/noe-ui/` at runtime.

## Features

- Clean responsive layout for desktop and mobile
- Dark mode enabled by default
- Light mode preference persisted in `localStorage`
- Search suggestions and a "I'm Feeling Curious" shortcut
- Search results open in a new tab

## Run locally

This is a static site with no build step or dependencies. Serve it with a static file server. The Noe pixel JavaScript and CSS are loaded from the hosted Noesis UI, not from a local `noesis` checkout:

```sh
python3 -m http.server 8000 -d ..
```

Then visit `http://localhost:8000/web/index.html`.

## Changelog

See [CHANGELOG_v1.0.0.md](doc/CHANGELOG_v1.0.0.md) for the release history.

## Files

- `index.html` - Page structure and content
- `css/styles.css` - Responsive layout and theme styles
- `js/script.js` - Search controls and theme persistence

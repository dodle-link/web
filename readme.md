# Dodle Search

A minimal, distraction-free search homepage that sends queries to Google.

## Features

- Clean responsive layout for desktop and mobile
- Dark mode enabled by default
- Light mode preference persisted in `localStorage`
- Search suggestions and a "I'm Feeling Curious" shortcut
- Search results open in a new tab

## Run locally

This is a static site with no build step or dependencies. Open `index.html` directly in a browser, or serve the directory with any static file server:

```sh
python3 -m http.server
```

Then visit `http://localhost:8000`.

## Files

- `index.html` - Page structure and content
- `styles.css` - Responsive layout and theme styles
- `script.js` - Search controls and theme persistence

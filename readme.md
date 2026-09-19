# Dodle Search

A minimal, distraction-free search homepage that sends queries to Google.

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

## Files

- `index.html` - Page structure and content
- `css/styles.css` - Responsive layout and theme styles
- `js/script.js` - Search controls and theme persistence

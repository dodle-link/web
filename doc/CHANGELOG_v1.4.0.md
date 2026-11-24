# Dodle Web v1.4.0 Changelog

## Changes since the initial 1.4.0 entry

### Search and localization

- Added search operator controls, examples, duplicate detection, and interpretation of supported natural-language queries
- Changed curiosity prompts to fill the search field for editing; topic-and-pattern combinations are sampled without replacement until each language's set is exhausted
- Removed the search cooldown; consecutive searches and curiosity prompts remain available
- Improved translations, persistent language and theme preferences, and keyboard navigation in language menus

### Pages and Noe

- Added the Privacy and About pages, a localized blog, and the World Ideas page using Wikimedia pageview data
- Added Dodle Node, a locally stored key-value document with optional peer synchronization
- Added a local animated Noe pixel, model storage and recovery, and a persistent homepage toggle
- Connected the pixel's movement to the pointer and its speed to the agent's energy

### Testing and deployment

- Added JavaScript and site-link tests, including a homepage and README version alignment check
- Added Playwright coverage across Chromium, Firefox, and WebKit, including accessibility, localization, search, and Noe behavior
- Updated GitHub Actions testing and GitHub Pages deployment

## Initial 1.4.0 entry

## Search

- Added a cooldown and status messaging to search interactions (the cooldown was subsequently removed)

## Curiosity prompts

- Expanded localized topic and context prompts for greater diversity and educational engagement
- Added lazy generation of prompts per supported language; the current implementation uses topic-and-pattern combinations
- Refined prompt construction, validation, and language configuration

## Noe pixel (`script/me.js`)

- Added a browser-side AI agent with energy and curiosity state, rule-based decisions, and mutable behavior programs
- Connected pointer, keyboard, scroll, touch, and focus activity to the agent's perception and feedback loop
- Added bounded memory and model import/export, with state and rules exposed through `window.noeEnergy` and `window.noeSelf`
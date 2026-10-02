# Dodle Web v1.4.0 Changelog

## Search

- Added a cooldown and status messaging to search interactions

## Curiosity prompts

- Expanded localized topic and context prompts for greater diversity and educational engagement
- Added lazy generation of up to 100,000 prompts per supported language
- Refined prompt construction, validation, and language configuration

## Noe pixel (`script/me.js`)

- Added a browser-side AI agent with energy and curiosity state, rule-based decisions, and mutable behavior programs
- Connected pointer, keyboard, scroll, touch, and focus activity to the agent's perception and feedback loop
- Added bounded memory and model import/export, with state and rules exposed through `window.noeEnergy` and `window.noeSelf`
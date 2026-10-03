# `me.js`

`me.js` is the browser-side DODLE AI agent used by the Noe pixel integration. It creates an agent with energy, curiosity, confidence, and stability state; chooses actions using rules and a behavior program; records bounded memory; and exposes a small interface on `window` for the page and hosted pixel to inspect or influence it.

## Loading

This is a classic browser script, not an ES module. The page loads it after the page markup and the other local scripts:

```html
<script src="script/me.js"></script>
```

It expects browser globals including `window`, `document`, `localStorage`, typed arrays, `TextEncoder`, and `TextDecoder`. It does not export its internal classes or functions as module exports.

## Runtime behavior

On load, the script attempts to restore a model from the `dodle-ai-model` local-storage key. If it cannot load one, it creates a new model. It then listens for `mousemove`, `keydown`, `scroll`, `touchstart`, and `focus` events and feeds each event into an agent step.

The agent's model includes a small neural network, initial goals, priority rules, a mutable behavior program, current state, and up to 200 memory entries. Rules take precedence over the behavior program when selecting an action. A completed step updates state, learns from its reward, and synchronizes the model.

## Browser API

- `window.noeAI` exposes the `AIEngine` class, including `step(input)`, `getState()`, `getMemory()`, `getRules()`, `getBehavior()`, `exportModel()`, and `AIEngine.importModel(buffer)`.
- `window.noeEnergy.aiState` returns the current state; `rules` returns the current rules; `needsEnergy` is true when energy is below 20 or curiosity is below 40; `recharge(amount)` adds energy for a positive amount and increases curiosity by 5, capped at 100; `nearestCube` estimates the cursor's distance from the `#conscious-pixel` element or the viewport center.
- `window.noeSelf.state` and `getState()` return the current state; `rules` returns the current rules; `decide` exposes the agent decision method.

The state contains `energy`, `curiosity`, `confidence`, `stability`, `cycle`, `lastAction`, `lastReward`, `createdAt`, and `updatedAt`. The numeric state values are intended to stay within 0 to 100.

## Model files

`exportModel()` returns a binary `ArrayBuffer` in the DODL format. `AIEngine.importModel(buffer)` validates the format and model version before creating an agent from it. Serialized models are limited to 1 MB, with bounded memory, rules, and behavior-program lengths.

## Persistence notes

The `dodle-ai-model` local-storage value contains the DODL binary model encoded as base64. Values written by the earlier JSON-based implementation are not compatible; if one is encountered, the script initializes and stores a new model.

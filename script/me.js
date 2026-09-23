(function () {
  const storageKey = 'dodle-self';
  const idleAfterMs = 45000; // time of inactivity before "feeling" fully decays

  let identity;
  try {
    identity = JSON.parse(localStorage.getItem(storageKey));
  } catch (error) {
    identity = null;
  }
  if (!identity || !identity.id || !identity.born) {
    identity = { id: crypto.randomUUID(), born: Date.now() };
    localStorage.setItem(storageKey, JSON.stringify(identity));
  }

  const sessionStart = Date.now();
  let lastActivity = Date.now();
  let lastPointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let energyLevel = 72;

  const state = {
    id: identity.id,
    born: identity.born,
    now: sessionStart,
    uptimeMs: 0,
    sessionMs: 0,
    visible: !document.hidden,
    presence: 'here',
    feeling: 1,
  };

  function markActivity(event) {
    lastActivity = Date.now();
    if (event && typeof event.clientX === 'number') {
      lastPointer = { x: event.clientX, y: event.clientY };
    }
    energyLevel = Math.min(100, energyLevel + 6);
  }

  function tick() {
    const now = Date.now();
    state.now = now;
    state.uptimeMs = now - state.born;
    state.sessionMs = now - sessionStart;
    state.visible = !document.hidden;

    const idleMs = now - lastActivity;
    state.feeling = state.visible ? Math.max(0, 1 - idleMs / idleAfterMs) : 0;
    state.presence = !state.visible ? 'away' : state.feeling > 0 ? 'here' : 'idle';

    if (state.visible) {
      // When the visitor is interacting, the cursor acts like a local energy source.
      const pointerEnergy = Math.min(35, Math.max(0, 35 * state.feeling));
      const decay = idleMs > 1000 ? Math.min(12, (idleMs - 1000) / 3000) : 0;
      energyLevel = Math.min(100, Math.max(0, energyLevel + pointerEnergy * 0.5 - decay));
    } else {
      energyLevel = Math.max(0, energyLevel - 12);
    }

    window.dispatchEvent(new CustomEvent('noe:moment', { detail: { ...state, energy: energyLevel } }));
    return { ...state, energy: energyLevel };
  }

  ['mousemove', 'keydown', 'scroll', 'touchstart', 'focus'].forEach(eventName => {
    window.addEventListener(eventName, markActivity, { passive: true });
  });

  document.addEventListener('visibilitychange', () => {
    if (!document.hidden) markActivity();
    tick();
  });

  setInterval(tick, 1000);
  tick();

  // Bridge the "here and now" feeling into limbric.js through the global energy hook.
  // The cursor acts as the active energy source when the page has no literal energy cube.
  window.noeEnergy = {
    get currentLevel() {
      return energyLevel;
    },
    get needsEnergy() {
      return energyLevel < 45 || state.feeling < 0.45;
    },
    get nearestCube() {
      const pixel = document.getElementById('conscious-pixel');
      const rect = pixel ? pixel.getBoundingClientRect() : { left: lastPointer.x, top: lastPointer.y, width: 0, height: 0 };
      const pixelX = rect.left + rect.width / 2;
      const pixelY = rect.top + rect.height / 2;
      const dx = lastPointer.x - pixelX;
      const dy = lastPointer.y - pixelY;
      return { x: lastPointer.x, y: lastPointer.y, distance: Math.sqrt(dx * dx + dy * dy) };
    },
    recharge(amount) {
      energyLevel = Math.min(100, energyLevel + amount);
      lastActivity = Date.now();
      tick();
    },
  };

  window.noeSelf = {
    get state() {
      return { ...state, energy: energyLevel };
    },
    moment: tick,
  };
})();

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

    window.dispatchEvent(new CustomEvent('noe:moment', { detail: { ...state } }));
    return { ...state };
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

  // Bridge the "here and now" feeling into limbric.js's existing energy hook, so the hosted
  // Noe pixel's vitality and seeking behavior reflect how present the visitor is right now.
  window.noeEnergy = {
    get currentLevel() {
      return state.feeling * 100;
    },
    get needsEnergy() {
      return state.feeling < 0.5;
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
      const desired = Math.min(100, this.currentLevel + amount) / 100;
      lastActivity = Date.now() - Math.max(0, idleAfterMs * (1 - desired));
      tick();
    },
  };

  window.noeSelf = {
    get state() {
      return { ...state };
    },
    moment: tick,
  };
})();

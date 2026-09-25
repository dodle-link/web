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

  // Tunable behavior knobs, adjusted live by the self-modifying AI below.
  const rules = {
    energyLow: 45,
    feelingLow: 0.45,
    activityEnergy: 6, // scales how much cursor interaction feeds energy
    idleDecay: 2, // scales how fast idle energy decays
  };

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
      const pointerCap = rules.activityEnergy * 5;
      const pointerEnergy = Math.min(pointerCap, Math.max(0, pointerCap * state.feeling));
      const decay = idleMs > 1000 ? Math.min(12, (idleMs - 1000) / 3000) * (rules.idleDecay / 2) : 0;
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
      return energyLevel < rules.energyLow || state.feeling < rules.feelingLow;
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
    get rules() {
      return { ...rules };
    },
    moment: tick,
  };

  // ============================================================
  // Tiny Self-Modifying AI
  // Observes noeSelf's state and nudges `rules` to keep energy/feeling healthy.
  // ============================================================
  const AI = {
    intervalMs: 5_000,
    learningRate: 0.15,
    mutationLimit: 5,

    memory: [],
    rules, // shared reference, mutations here take effect immediately in tick()
    lastObservation: null,

    model: {
      weights: {
        energy: 0.40,
        feeling: 0.40,
        idle: 0.20,
      },
    },

    observe() {
      const s = window.noeSelf.state;

      return {
        energy: s.energy / 100,
        feeling: s.feeling,
        idle:
          s.presence === 'idle' ? 1 :
          s.presence === 'away' ? 1 :
          0,
      };
    },

    think(observation) {
      const w = this.model.weights;

      const activation =
        observation.energy * w.energy +
        observation.feeling * w.feeling -
        observation.idle * w.idle;

      if (activation < 0.35) {
        return { type: 'increase_activity_reward', amount: 1 };
      }

      if (activation > 0.75) {
        return { type: 'reduce_energy_gain', amount: 1 };
      }

      return { type: 'nothing' };
    },

    propose(action) {
      return { ...action, timestamp: Date.now() };
    },

    validate(proposal) {
      if (!proposal) return false;

      if (!Number.isFinite(proposal.amount)) {
        return proposal.type === 'nothing';
      }

      if (Math.abs(proposal.amount) > this.mutationLimit) {
        return false;
      }

      const allowed = [
        'increase_activity_reward',
        'reduce_energy_gain',
        'nothing',
      ];

      return allowed.includes(proposal.type);
    },

    mutate(proposal) {
      if (!this.validate(proposal)) {
        return false;
      }

      switch (proposal.type) {
        case 'increase_activity_reward':
          this.rules.activityEnergy = Math.min(20, this.rules.activityEnergy + proposal.amount);
          break;

        case 'reduce_energy_gain':
          this.rules.activityEnergy = Math.max(0, this.rules.activityEnergy - proposal.amount);
          break;

        case 'nothing':
          break;
      }

      this.memory.push({ proposal, rules: { ...this.rules } });

      if (this.memory.length > 100) {
        this.memory.shift();
      }

      return true;
    },

    learn(observation, result) {
      // Small online-learning step; not an LLM, just an adaptive weight nudge.
      const reward = result?.reward ?? 0;
      const direction = reward > 0 ? 1 : -1;

      this.model.weights.energy += this.learningRate * direction * observation.energy;
      this.model.weights.feeling += this.learningRate * direction * observation.feeling;
      this.model.weights.idle -= this.learningRate * direction * observation.idle;

      for (const key in this.model.weights) {
        this.model.weights[key] = Math.max(-1, Math.min(1, this.model.weights[key]));
      }
    },

    cycle() {
      const observation = this.observe();
      const action = this.think(observation);
      const proposal = this.propose(action);
      const changed = this.mutate(proposal);

      // Reward is based on how energy/feeling moved since the last cycle.
      let reward = changed ? 0.1 : 0;
      if (this.lastObservation) {
        const delta =
          (observation.energy - this.lastObservation.energy) +
          (observation.feeling - this.lastObservation.feeling);
        reward += delta;
      }
      this.lastObservation = observation;

      this.learn(observation, { reward });

      return { observation, proposal, changed, rules: { ...this.rules } };
    },
  };

  window.noeAI = AI;

  setInterval(() => AI.cycle(), AI.intervalMs);
})();

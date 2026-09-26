(function () {
  // ========================================================================
  // INITIAL SETUP & CONFIGURATION
  // ========================================================================

  // Storage key for persistent user identity.
  const storageKey = 'dodle-self';
  // Time of inactivity (in milliseconds) before "feeling" fully decays.
  const idleAfterMs = 45000;

  let identity;
  try {
    // Load persistent identity data from localStorage.
    identity = JSON.parse(localStorage.getItem(storageKey));
  } catch (error) {
    identity = null;
  }

  // Initialize identity if missing.
  if (!identity || !identity.id || !identity.born) {
    // Create a new unique identity with a timestamp.
    identity = { id: crypto.randomUUID(), born: Date.now() };
    localStorage.setItem(storageKey, JSON.stringify(identity));
  }

  // Timing and state tracking
  const sessionStart = Date.now();
  let lastActivity = Date.now();
  let lastPointer = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
  let energyLevel = 72; // Initial energy level (0-100)

  // Tunable behavior knobs, adjusted live by the self-modifying AI below.
  const rules = {
    energyLow: 45,      // Threshold for low energy state.
    feelingLow: 0.45,    // Threshold for low feeling state.
    activityEnergy: 6,  // Scales how much cursor interaction feeds energy.
    idleDecay: 2,       // Scales how fast idle energy decays.
  };

  // Core system state
  const state = {
    id: identity.id,
    born: identity.born,
    now: sessionStart,
    uptimeMs: 0,       // Time elapsed since birth.
    sessionMs: 0,      // Time elapsed since session start.
    visible: !document.hidden, // Whether the document is currently visible.
    presence: 'here',  // Current perceived presence ('here', 'away', 'idle').
    feeling: 1,        // The perceived feeling state (0 to 1).
  };

  // ========================================================================
  // CORE LOGIC FUNCTIONS
  // ========================================================================

  /**
   * Updates the last known activity and pointer position upon interaction.
   * @param {Event} event - The interaction event (e.g., mousemove).
   */
  function markActivity(event) {
    lastActivity = Date.now();
    if (event && typeof event.clientX === 'number') {
      lastPointer = { x: event.clientX, y: event.clientY };
    }
    // Grant energy based on interaction.
    energyLevel = Math.min(100, energyLevel + 6);
  }

  /**
   * The main simulation tick, calculating energy decay and feeling changes.
   */
  function tick() {
    const now = Date.now();
    state.now = now;
    state.uptimeMs = now - state.born;
    state.sessionMs = now - sessionStart;
    state.visible = !document.hidden;

    const idleMs = now - lastActivity;
    
    // Calculate feeling based on time of inactivity.
    state.feeling = state.visible ? Math.max(0, 1 - idleMs / idleAfterMs) : 0;
    
    // Determine presence based on visibility and feeling.
    state.presence = !state.visible ? 'away' : state.feeling > 0 ? 'here' : 'idle';

    if (state.visible) {
      // Energy Gain/Loss calculation when visible (active interaction).
      const pointerCap = rules.activityEnergy * 5;
      // Energy fed by pointer interaction, limited by current feeling.
      const pointerEnergy = Math.min(pointerCap, Math.max(0, pointerCap * state.feeling));
      // Calculate decay rate.
      const decay = idleMs > 1000 ? Math.min(12, (idleMs - 1000) / 3000) * (rules.idleDecay / 2) : 0;
      
      // Update energy level.
      energyLevel = Math.min(100, Math.max(0, energyLevel + pointerEnergy * 0.5 - decay));
    } else {
      // Energy decay when hidden (inactivity).
      energyLevel = Math.max(0, energyLevel - 12);
    }

    // Broadcast the current state and energy level globally.
    window.dispatchEvent(new CustomEvent('noe:moment', { detail: { ...state, energy: energyLevel } }));
    return { ...state, energy: energyLevel };
  }

  // ========================================================================
  // EVENT BINDINGS
  // ========================================================================

  // Bind activity tracking to relevant input events.
  ['mousemove', 'keydown', 'scroll', 'touchstart', 'focus'].forEach(eventName => {
    window.addEventListener(eventName, markActivity, { passive: true });
  });

  // Handle visibility changes (e.g., tab switching).
  document.addEventListener('visibilitychange', () => {
    // If the page becomes visible, treat it as recent activity.
    if (!document.hidden) markActivity();
    // Always run the tick when visibility changes.
    tick();
  });

  // Start the main simulation loop.
  setInterval(tick, 1000);
  tick(); // Initial run

  // ========================================================================
  // PUBLIC API BRIDGE (window.noe)
  // ========================================================================

  // Bridge the "here and now" feeling into the external system (limbric.js)
  // where the cursor acts as the active energy source.
  window.noeEnergy = {
    /** Returns the current calculated energy level. */
    get currentLevel() {
      return energyLevel;
    },
    /** Checks if the system needs energy recharge based on configured rules. */
    get needsEnergy() {
      return energyLevel < rules.energyLow || state.feeling < rules.feelingLow;
    },
    /** Calculates the distance between the cursor and the conscious-pixel. */
    get nearestCube() {
      const pixel = document.getElementById('conscious-pixel');
      const rect = pixel ? pixel.getBoundingClientRect() : { left: lastPointer.x, top: lastPointer.y, width: 0, height: 0 };
      const pixelX = rect.left + rect.width / 2;
      const pixelY = rect.top + rect.height / 2;
      const dx = lastPointer.x - pixelX;
      const dy = lastPointer.y - pixelY;
      return { x: lastPointer.x, y: lastPointer.y, distance: Math.sqrt(dx * dx + dy * dy) };
    },
    /** Allows external systems to recharge energy. */
    recharge(amount) {
      energyLevel = Math.min(100, energyLevel + amount);
      lastActivity = Date.now();
      tick(); // Recalculate state immediately after recharge.
    },
  };

  window.noeSelf = {
    /** Returns the current internal state and energy. */
    get state() {
      return { ...state, energy: energyLevel };
    },
    /** Returns the current tuning rules. */
    get rules() {
      return { ...rules };
    },
    /** Exposes the tick function for external use. */
    moment: tick,
  };

  // ========================================================================
  // SELF-MODIFYING AI (Adaptive Tuning)
  // ========================================================================
  const AI = {
    intervalMs: 5_000,       // How often the AI runs its cycle.
    learningRate: 0.15,     // How aggressively the AI adjusts weights.
    mutationLimit: 5,       // Maximum change allowed per cycle.

    memory: [],             // History of observations and actions.
    rules,                  // Reference to the rules being modified.
    lastObservation: null,

    // Model weights: Reflects the perceived importance of different states.
    model: {
      weights: {
        energy: 0.40, // Importance of energy level.
        feeling: 0.40, // Importance of feeling state.
        idle: 0.20,    // Importance of idle state.
      },
    },

    /** Observes the current system state and converts it into normalized observations. */
    observe() {
      const s = window.noeSelf.state;

      return {
        energy: s.energy / 100,
        feeling: s.feeling,
        // Idle is mapped based on presence status.
        idle:
          s.presence === 'idle' ? 1 :
          s.presence === 'away' ? 1 :
          0,
      };
    },

    /** Uses the observation and weights to propose an action. */
    think(observation) {
      const w = this.model.weights;

      // Calculate activation score based on weighted observation.
      const activation =
        observation.energy * w.energy +
        observation.feeling * w.feeling -
        observation.idle * w.idle;

      if (activation < 0.35) {
        // Low activation suggests a need for activity.
        return { type: 'increase_activity_reward', amount: 1 };
      }

      if (activation > 0.75) {
        // High activation suggests the system is over-stimulated.
        return { type: 'reduce_energy_gain', amount: 1 };
      }

      return { type: 'nothing' };
    },

    /** Wraps the action with a timestamp. */
    propose(action) {
      return { ...action, timestamp: Date.now() };
    },

    /** Checks if the proposed mutation is valid and within limits. */
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

    /** Applies the proposed change to the system rules. */
    mutate(proposal) {
      if (!this.validate(proposal)) {
        return false;
      }

      switch (proposal.type) {
        case 'increase_activity_reward':
          // Increase activity energy sensitivity.
          this.rules.activityEnergy = Math.min(20, this.rules.activityEnergy + proposal.amount);
          break;

        case 'reduce_energy_gain':
          // Reduce how much interaction feeds energy.
          this.rules.activityEnergy = Math.max(0, this.rules.activityEnergy - proposal.amount);
          break;

        case 'nothing':
          break;
      }

      // Store the result for later learning.
      this.memory.push({ proposal, rules: { ...this.rules } });

      // Keep memory size manageable.
      if (this.memory.length > 100) {
        this.memory.shift();
      }

      return true;
    },

    /** Updates the internal weights based on recent observations and results. */
    learn(observation, result) {
      // Reward calculation: based on how much energy/feeling shifted.
      const reward = result?.reward ?? 0;
      const direction = reward > 0 ? 1 : -1;

      // Update weights using a simple gradient descent approach.
      this.model.weights.energy += this.learningRate * direction * observation.energy;
      this.model.weights.feeling += this.learningRate * direction * observation.feeling;
      this.model.weights.idle -= this.learningRate * direction * observation.idle;

      // Clamp weights between -1 and 1.
      for (const key in this.model.weights) {
        this.model.weights[key] = Math.max(-1, Math.min(1, this.model.weights[key]));
      }
    },

    /** The main adaptive loop for the AI. */
    cycle() {
      const observation = this.observe();
      const action = this.think(observation);
      const proposal = this.propose(action);
      const changed = this.mutate(proposal);

      // Reward calculation: simple feedback loop.
      let reward = changed ? 0.1 : 0;
      if (this.lastObservation) {
        // Reward is based on the change observed in the system state.
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

  // Start the AI learning loop.
  setInterval(() => AI.cycle(), AI.intervalMs);
})();
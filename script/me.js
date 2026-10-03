"use strict";

/* =========================================================
 * CONFIG (DODLE RL Parameters)
 * ========================================================= */
const CONFIG = {
    VERSION: 2, // Updated version for the integrated system

    MAX_FILE_SIZE: 1024 * 1024, // 1 MB
    TARGET_FILE_SIZE: 950 * 1024,

    INPUT_SIZE: 16,
    HIDDEN_SIZE: 32,
    OUTPUT_SIZE: 8,

    MEMORY_LIMIT: 200,
    RULE_LIMIT: 64,
    BEHAVIOR_LIMIT: 128,

    LEARNING_RATE: 0.02,

    MIN_WEIGHT: -5,
    MAX_WEIGHT: 5,

    STATE_MIN: 0,
    STATE_MAX: 100
};


/* =========================================================
 * UTILITIES (Shared)
 * ========================================================= */
function clamp(value, min, max) {
    return Math.max(min, Math.min(max, value));
}

function randomFloat(min, max) {
    return min + Math.random() * (max - min);
}

function randomInt(min, max) {
    return Math.floor(randomFloat(min, max + 1));
}

function uuidBytes() {
    const bytes = new Uint8Array(16);

    if (crypto && crypto.getRandomValues) {
        crypto.getRandomValues(bytes);
    } else {
        for (let i = 0; i < bytes.length; i++) {
            bytes[i] = randomInt(0, 255);
        }
    }
    // Convert bytes to a standard UUID format string for easier JSON handling
    return Array.from(bytes).map(b => b.toString(16).padStart(2, '0')).join('');
}

function now() {
    return Date.now();
}

class Random {
    constructor(seed = now()) {
        this.seed = Number(seed) >>> 0 || 1;
    }

    next() {
        let value = this.seed;
        value ^= value << 13;
        value ^= value >>> 17;
        value ^= value << 5;
        this.seed = value >>> 0;
        return this.seed / 0x100000000;
    }

    float(min, max) {
        return min + this.next() * (max - min);
    }
}

function encodeModelForStorage(buffer) {
    const bytes = new Uint8Array(buffer);
    let binary = "";
    for (let offset = 0; offset < bytes.length; offset++) {
        binary += String.fromCharCode(bytes[offset]);
    }
    return btoa(binary);
}

function decodeModelFromStorage(encoded) {
    const binary = atob(encoded);
    const bytes = new Uint8Array(binary.length);
    for (let offset = 0; offset < binary.length; offset++) {
        bytes[offset] = binary.charCodeAt(offset);
    }
    return bytes.buffer;
}


/* =========================================================
 * INITIAL STATE (DODLE Model State)
 * ========================================================= */
function createInitialState() {
    return {
        energy: 72,
        curiosity: 50,
        confidence: 50,
        stability: 80,

        cycle: 0,

        lastAction: null,
        lastReward: 0,

        createdAt: now(),
        updatedAt: now()
    };
}


/* =========================================================
 * GOALS (DODLE Objectives)
 * ========================================================= */
function createInitialGoals() {
    return [
        {
            id: "survive",
            priority: 100,
            target: {
                energyMin: 20
            }
        },
        {
            id: "explore",
            priority: 50,
            target: {
                curiosityMin: 60
            }
        },
        {
            id: "learn",
            priority: 40,
            target: {
                confidenceMin: 50
            }
        }
    ];
}


/* =========================================================
 * RULES (DODLE Rule Engine)
 * ========================================================= */
function createInitialRules() {
    return [
        {
            id: "rest-low-energy",
            condition: {
                type: "less-than",
                variable: "energy",
                value: 20
            },
            action: {
                type: "rest"
            },
            priority: 100,
            enabled: true,
            success: 0,
            failure: 0
        },
        {
            id: "explore-high-curiosity",
            condition: {
                type: "greater-than",
                variable: "curiosity",
                value: 70
            },
            action: {
                type: "explore"
            },
            priority: 60,
            enabled: true,
            success: 0,
            failure: 0
        },
        {
            id: "observe-default",
            condition: {
                type: "always"
            },
            action: {
                type: "observe"
            },
            priority: 10,
            enabled: true,
            success: 0,
            failure: 0
        }
    ];
}


/* =========================================================
 * BEHAVIOR PROGRAM (DODLE Stack-based Logic)
 * ========================================================= */
function createInitialBehavior() {
    return [
        ["READ", "energy"],
        ["LESS_THAN", 20],
        ["IF"],
        ["ACTION", "rest"],
        ["ELSE"],
        ["READ", "curiosity"],
        ["GREATER_THAN", 70],
        ["IF"],
        ["ACTION", "explore"],
        ["ELSE"],
        ["ACTION", "observe"],
        ["END"],
        ["END"]
    ];
}


/* =========================================================
 * SMALL NEURAL NETWORK (DODLE Core)
 * ========================================================= */
class TinyNetwork {
    constructor(random = new Random()) {
        this.inputSize = CONFIG.INPUT_SIZE;
        this.hiddenSize = CONFIG.HIDDEN_SIZE;
        this.outputSize = CONFIG.OUTPUT_SIZE;

        this.weights1 = new Float32Array(this.inputSize * this.hiddenSize);
        this.bias1 = new Float32Array(this.hiddenSize);
        this.weights2 = new Float32Array(this.hiddenSize * this.outputSize);
        this.bias2 = new Float32Array(this.outputSize);

        this.initialize(random);
    }

    initialize(random) {
        for (let i = 0; i < this.weights1.length; i++) {
            this.weights1[i] = random.float(-0.1, 0.1);
        }
        for (let i = 0; i < this.weights2.length; i++) {
            this.weights2[i] = random.float(-0.1, 0.1);
        }
        this.bias1.fill(0);
        this.bias2.fill(0);
    }

    relu(x) {
        return Math.max(0, x);
    }

    forward(input) {
        const hidden = new Float32Array(this.hiddenSize);
        const output = new Float32Array(this.outputSize);

        // Input -> Hidden
        for (let h = 0; h < this.hiddenSize; h++) {
            let sum = this.bias1[h];
            for (let i = 0; i < this.inputSize; i++) {
                sum += input[i] * this.weights1[h * this.inputSize + i];
            }
            hidden[h] = this.relu(sum);
        }

        // Hidden -> Output
        for (let o = 0; o < this.outputSize; o++) {
            let sum = this.bias2[o];
            for (let h = 0; h < this.hiddenSize; h++) {
                sum += hidden[h] * this.weights2[o * this.hiddenSize + h];
            }
            output[o] = sum;
        }

        return { hidden, output };
    }

    learn(input, target, learningRate) {
        const result = this.forward(input);
        const hidden = result.hidden;
        const output = result.output;
        const outputErrors = new Float32Array(this.outputSize);

        // Update the output layer and retain its errors for backpropagation.
        for (let o = 0; o < this.outputSize; o++) {
            const outputError = target[o] - output[o];
            outputErrors[o] = outputError;
            for (let h = 0; h < this.hiddenSize; h++) {
                const index = o * this.hiddenSize + h;
                this.weights2[index] += learningRate * outputError * hidden[h];
                this.weights2[index] = clamp(this.weights2[index], CONFIG.MIN_WEIGHT, CONFIG.MAX_WEIGHT);
            }
            this.bias2[o] += learningRate * outputError[o];
        }

        // Hidden Layer Update (Backpropagate error to weights 1)
        for (let h = 0; h < this.hiddenSize; h++) {
            let error = 0;
            for (let o = 0; o < this.outputSize; o++) {
                error += outputErrors[o] * this.weights2[o * this.hiddenSize + h];
            }
            if (hidden[h] <= 0) {
                error = 0;
            }
            for (let i = 0; i < this.inputSize; i++) {
                const index = h * this.inputSize + i;
                this.weights1[index] += learningRate * error * input[i];
                this.weights1[index] = clamp(this.weights1[index], CONFIG.MIN_WEIGHT, CONFIG.MAX_WEIGHT);
            }
            this.bias1[h] += learningRate * error;
        }
    }
}

/* =========================================================
 * MEMORY (DODLE Memory Store)
 * ========================================================= */
class MemoryStore {
    constructor(memory = []) {
        this.items = memory;
    }

    add(memory) {
        this.items.push({
            id: uuidBytes(),
            timestamp: now(),
            input: memory.input,
            action: memory.action,
            result: memory.result,
            reward: memory.reward,
            importance: clamp(memory.importance ?? 50, 0, 100)
        });
        this.limit();
    }

    limit() {
        while (this.items.length > CONFIG.MEMORY_LIMIT) {
            this.items.sort((a, b) => a.importance - b.importance);
            this.items.shift();
        }
    }

    getRecent(count = 10) {
        return this.items.slice(-count);
    }

    clear() {
        this.items.length = 0;
    }
}


/* =========================================================
 * RULE ENGINE (DODLE Rule Engine)
 * ========================================================= */
class RuleEngine {
    constructor(rules = []) {
        this.rules = rules;
    }

    evaluateCondition(condition, state) {
        if (!condition) return false;

        switch (condition.type) {
            case "always": return true;
            case "less-than": return Number(state[condition.variable]) < condition.value;
            case "greater-than": return Number(state[condition.variable]) > condition.value;
            case "equals": return state[condition.variable] === condition.value;
            default: return false;
        }
    }

    getApplicable(state) {
        return this.rules
            .filter(rule => rule.enabled && this.evaluateCondition(rule.condition, state))
            .sort((a, b) => b.priority - a.priority);
    }

    select(state) {
        const applicable = this.getApplicable(state);
        return applicable.length > 0 ? applicable[0] : null;
    }

    reward(ruleId, reward) {
        const rule = this.rules.find(r => r.id === ruleId);
        if (rule) {
            if (reward > 0) {
                rule.success++;
                rule.priority += 1;
            } else {
                rule.failure++;
                rule.priority -= 1;
            }
            rule.priority = clamp(rule.priority, 0, 1000);
        }
    }

    evolve() {
        // Disable consistently failing rules
        this.rules.forEach(rule => {
            const total = rule.success + rule.failure;
            if (total < 10) return;

            const successRate = rule.success / total;
            if (successRate < 0.1) {
                rule.enabled = false;
            }
        });

        // Keep rule count bounded
        if (this.rules.length > CONFIG.RULE_LIMIT) {
            this.rules.sort((a, b) => b.priority - a.priority);
            this.rules = this.rules.slice(0, CONFIG.RULE_LIMIT);
        }
    }
}


/* =========================================================
 * BEHAVIOR INTERPRETER (DODLE Behavior Engine)
 * ========================================================= */
class BehaviorEngine {
    constructor(program = []) {
        this.program = program;
    }

    run(state) {
        let action = "observe";
        let index = 0;
        const stack = [];
        let skip = false;

        while (index < this.program.length) {
            const instruction = this.program[index];
            const op = instruction[0];
            const arg = instruction[1];

            switch (op) {
                case "READ":
                    stack.push(state[arg]);
                    break;
                case "LESS_THAN":
                    stack.push(Number(stack.pop()) < arg);
                    break;
                case "GREATER_THAN":
                    stack.push(Number(stack.pop()) > arg);
                    break;
                case "IF":
                    const condition = Boolean(stack.pop());
                    stack.push({ type: "if", condition, active: condition });
                    skip = !condition;
                    break;
                case "ELSE":
                    const block = stack.pop();
                    if (block && block.type === "if") {
                        block.active = !block.condition;
                        stack.push(block);
                        skip = !block.active;
                    }
                    break;
                case "ACTION":
                    if (!skip) {
                        action = arg;
                    }
                    break;
                case "END":
                    skip = false;
                    break;
            }
            index++;
            if (index > CONFIG.BEHAVIOR_LIMIT) break;
        }
        return action;
    }

    mutate(random) {
        if (this.program.length >= CONFIG.BEHAVIOR_LIMIT) return;

        const actions = ["rest", "explore", "observe", "learn"];

        const mutations = [
            () => {
                this.program.push(["ACTION", actions[randomInt(0, actions.length - 1)]]);
            },
            () => {
                if (this.program.length > 3) {
                    const index = randomInt(0, this.program.length - 1);
                    this.program.splice(index, 1);
                }
            },
            () => {
                const index = randomInt(0, this.program.length - 1);
                const instruction = this.program[index];

                if (instruction[0] === "LESS_THAN" || instruction[0] === "GREATER_THAN") {
                    instruction[1] = randomInt(5, 95);
                }
            }
        ];

        mutations[randomInt(0, mutations.length - 1)]();
    }
}


/* =========================================================
 * MODEL (DODLE Core)
 * ========================================================= */
function createModel() {
    const random = new Random(randomInt(1, 0xffffffff));

    const network = new TinyNetwork(random);

    return {
        version: CONFIG.VERSION,
        id: uuidBytes(),
        createdAt: now(),
        updatedAt: now(),
        randomSeed: random.seed,

        network: {
            inputSize: network.inputSize,
            hiddenSize: network.hiddenSize,
            outputSize: network.outputSize,
            weights1: network.weights1,
            bias1: network.bias1,
            weights2: network.weights2,
            bias2: network.bias2
        },
        memory: [],
        rules: createInitialRules(),
        behavior: createInitialBehavior(),
        state: createInitialState(),
        goals: createInitialGoals()
    };
}


/* =========================================================
 * MODEL VALIDATION & Serialization (DODLE Persistence)
 * ========================================================= */
function validateModel(model) {
    if (model.memory.length > CONFIG.MEMORY_LIMIT) throw new Error("Memory limit exceeded.");
    if (model.rules.length > CONFIG.RULE_LIMIT) throw new Error("Rule limit exceeded.");
    if (model.behavior.length > CONFIG.BEHAVIOR_LIMIT) throw new Error("Behavior limit exceeded.");
    return true;
}

const MAGIC = new Uint8Array([0x44, 0x4f, 0x44, 0x4c]); // DODL

function serializeModel(model) {
    validateModel(model);
    model.updatedAt = now();
    const encoder = new TextEncoder();
    const metadata = {
        version: model.version, id: Array.from(model.id), createdAt: model.createdAt, updatedAt: model.updatedAt, randomSeed: model.randomSeed, memory: model.memory, rules: model.rules, behavior: model.behavior, state: model.state, goals: model.goals, networkShape: { inputSize: model.network.inputSize, hiddenSize: model.network.hiddenSize, outputSize: model.network.outputSize }
    };
    const metadataBytes = encoder.encode(JSON.stringify(metadata));
    const arrays = [model.network.weights1, model.network.bias1, model.network.weights2, model.network.bias2];
    let networkBytes = arrays.reduce((sum, arr) => sum + arr.byteLength, 0);
    const HEADER_SIZE = 16;
    const totalSize = HEADER_SIZE + metadataBytes.byteLength + networkBytes;

    if (totalSize > CONFIG.MAX_FILE_SIZE) throw new Error(`Model exceeds 1 MB: ${totalSize} bytes`);

    const buffer = new ArrayBuffer(totalSize);
    const bytes = new Uint8Array(buffer);
    bytes.set(MAGIC, 0);
    const view = new DataView(buffer);
    view.setUint16(4, CONFIG.VERSION, true);
    view.setUint16(6, 0, true);
    view.setUint32(8, metadataBytes.byteLength, true);
    view.setUint32(12, networkBytes, true);

    let offset = HEADER_SIZE;
    bytes.set(metadataBytes, offset);
    offset += metadataBytes.byteLength;

    arrays.forEach(array => {
        bytes.set(new Uint8Array(array.buffer, array.byteOffset, array.byteLength), offset);
        offset += array.byteLength;
    });
    return buffer;
}

function deserializeModel(buffer) {
    const bytes = new Uint8Array(buffer);
    const view = new DataView(buffer);

    if (bytes.length < 16 || !bytes.slice(0, 4).every((val, i) => val === MAGIC[i])) {
        throw new Error("Invalid DODL model file.");
    }

    const version = view.getUint16(4, true);
    if (version !== CONFIG.VERSION) throw new Error("Unsupported model version.");

    const metadataSize = view.getUint32(8, true);
    const networkSize = view.getUint32(12, true);
    const HEADER_SIZE = 16;
    if (HEADER_SIZE + metadataSize + networkSize !== buffer.byteLength) throw new Error("Corrupt model size.");

    const decoder = new TextDecoder();
    const metadataBytes = bytes.slice(HEADER_SIZE, HEADER_SIZE + metadataSize);
    const metadata = JSON.parse(decoder.decode(metadataBytes));

    const inputSize = metadata.networkShape.inputSize;
    const hiddenSize = metadata.networkShape.hiddenSize;
    const outputSize = metadata.networkShape.outputSize;

    const weights1 = new Float32Array(inputSize * hiddenSize);
    const bias1 = new Float32Array(hiddenSize);
    const weights2 = new Float32Array(hiddenSize * outputSize);
    const bias2 = new Float32Array(outputSize);

    let offset = HEADER_SIZE + metadataSize;

    function readFloat32Array(byteLength) {
        const slice = buffer.slice(offset, offset + byteLength);
        offset += byteLength;
        return new Float32Array(slice);
    }

    const model = {
        version: metadata.version,
        id: new Uint8Array(metadata.id),
        createdAt: metadata.createdAt,
        updatedAt: metadata.updatedAt,
        randomSeed: metadata.randomSeed,
        network: {
            inputSize, hiddenSize, outputSize,
            weights1: readFloat32Array(weights1.byteLength),
            bias1: readFloat32Array(bias1.byteLength),
            weights2: readFloat32Array(weights2.byteLength),
            bias2: readFloat32Array(bias2.byteLength)
        },
        memory: metadata.memory,
        rules: metadata.rules,
        behavior: metadata.behavior,
        state: metadata.state,
        goals: metadata.goals
    };

    validateModel(model);
    return model;
}

function loadStoredModel(storage, key) {
    const storedModel = storage.getItem(key);
    if (!storedModel) return null;
    return deserializeModel(decodeModelFromStorage(storedModel));
}

function saveStoredModel(storage, key, model) {
    storage.setItem(key, encodeModelForStorage(serializeModel(model)));
}


/* =========================================================
 * AI ENGINE (DODLE Agent Core)
 * ========================================================= */
class AIEngine {
    constructor(model = createModel()) {
        this.model = model;
        this.random = new Random(model.randomSeed);

        // Restore network weights
        this.network = new TinyNetwork(this.random);
        this.network.weights1 = model.network.weights1;
        this.network.bias1 = model.network.bias1;
        this.network.weights2 = model.network.weights2;
        this.network.bias2 = model.network.bias2;

        this.memory = new MemoryStore(model.memory);
        this.rules = new RuleEngine(model.rules);
        this.behavior = new BehaviorEngine(model.behavior);
        this.state = model.state;
        this.goals = model.goals;
    }

    encodeInput(input) {
        const vector = new Float32Array(CONFIG.INPUT_SIZE);
        vector[0] = this.state.energy / 100;
        vector[1] = this.state.curiosity / 100;
        vector[2] = this.state.confidence / 100;
        vector[3] = this.state.stability / 100;

        if (input && typeof input === "object") {
            if (typeof input.value === "string") {
                vector[4] = Math.min(input.value.length / 100, 1);
            }
            if (input.type === "user_input") {
                vector[5] = 1;
            }
        }
        vector[6] = Math.min(this.memory.items.length / CONFIG.MEMORY_LIMIT, 1);
        return vector;
    }

    observe(input) {
        return { input, timestamp: now(), state: { ...this.state } };
    }

    interpret(perception) {
        const input = this.encodeInput(perception.input);
        return this.network.forward(input);
    }

    decide(perception) {
        // 1. Check Rules (Highest Priority)
        const rule = this.rules.select(this.state);
        if (rule) {
            return { type: rule.action.type, ruleId: rule.id };
        }

        // 2. Fallback to Behavior Program
        const action = this.behavior.run(this.state);
        return { type: action, ruleId: null };
    }

    async execute(action) {
        // State Transition Logic
        switch (action.type) {
            case "rest":
                this.state.energy = clamp(this.state.energy + 10, CONFIG.STATE_MIN, CONFIG.STATE_MAX);
                this.state.curiosity = clamp(this.state.curiosity - 2, 0, 100);
                break;
            case "explore":
                this.state.energy = clamp(this.state.energy - 8, CONFIG.STATE_MIN, CONFIG.STATE_MAX);
                this.state.curiosity = clamp(this.state.curiosity - 10, 0, 100);
                break;
            case "learn":
                this.state.energy = clamp(this.state.energy - 3, CONFIG.STATE_MIN, CONFIG.STATE_MAX);
                this.state.confidence = clamp(this.state.confidence + 5, 0, 100);
                break;
            case "observe":
                this.state.energy = clamp(this.state.energy - 1, CONFIG.STATE_MIN, CONFIG.STATE_MAX);
                break;
            default:
                this.state.energy = clamp(this.state.energy - 1, CONFIG.STATE_MIN, CONFIG.STATE_MAX);
        }

        this.state.curiosity = clamp(this.state.curiosity, 0, 100);

        return { action: action.type, success: true, timestamp: now() };
    }

    evaluate(perception, action, result) {
        let reward = 0;

        if (this.state.energy >= 20) reward += 1;
        if (action.type === "rest" && this.state.energy > 50) reward -= 0.2;
        if (action.type === "explore") reward += 0.5;

        return { reward, perception, action, result };
    }

    learn(evaluation) {
        const input = this.encodeInput(evaluation.perception.input);
        const target = new Float32Array(CONFIG.OUTPUT_SIZE).fill(evaluation.reward);

        this.network.learn(input, target, CONFIG.LEARNING_RATE);

        if (evaluation.action.ruleId) {
            this.rules.reward(evaluation.action.ruleId, evaluation.reward);
        }

        this.memory.add({
            input: evaluation.perception.input,
            action: evaluation.action.type,
            result: evaluation.result,
            reward: evaluation.reward,
            importance: Math.abs(evaluation.reward) * 50 + 50
        });

        // Occasionally mutate behavior
        if (this.random.next() < 0.05) {
            this.behavior.mutate(this.random);
        }

        this.rules.evolve();
    }

    updateState(evaluation) {
        this.state.lastAction = evaluation.action.type;
        this.state.lastReward = evaluation.reward;
        this.state.cycle++;
        this.state.updatedAt = now();

        if (evaluation.reward > 0) {
            this.state.curiosity += 1;
        } else {
            this.state.curiosity -= 1;
        }
        this.state.curiosity = clamp(this.state.curiosity, 0, 100);
    }

    async step(input) {
        const perception = this.observe(input);
        const interpretation = this.interpret(perception);
        const action = this.decide(perception);
        const result = await this.execute(action);
        const evaluation = this.evaluate(perception, action, result);

        this.learn(evaluation);
        this.updateState(evaluation);
        this.syncModel();

        return { perception, interpretation, action, result, evaluation, state: this.state };
    }

    syncModel() {
        this.model.updatedAt = now();
        this.model.randomSeed = this.random.seed;
        this.model.network.weights1 = this.network.weights1;
        this.model.network.bias1 = this.network.bias1;
        this.model.network.weights2 = this.network.weights2;
        this.model.network.bias2 = this.network.bias2;
        this.model.memory = this.memory.items;
        this.model.rules = this.rules.rules;
        this.model.behavior = this.behavior.program;
        this.model.state = this.state;
    }

    exportModel() {
        this.syncModel();
        return serializeModel(this.model);
    }

    static importModel(buffer) {
        const model = deserializeModel(buffer);
        return new AIEngine(model);
    }

    getState() {
        return this.state;
    }

    getMemory() {
        return this.memory.items;
    }

    getRules() {
        return this.rules.rules;
    }

    getBehavior() {
        return this.behavior.program;
    }
}


/* =========================================================
 * GLOBAL API BRIDGE (Window Interface)
 * ========================================================= */
window.noeAI = AIEngine;

// =========================================================
// INITIAL SETUP & PERSISTENCE (Browser Integration)
// =========================================================

// Storage key for persistent identity.
const storageKey = 'dodle-ai-model';
let aiInstance = null;

try {
    const model = loadStoredModel(localStorage, storageKey);
    if (model) {
        aiInstance = new AIEngine(model);
        console.log("DODLE AI: Model loaded successfully.");
    }
} catch (error) {
    console.error("DODLE AI: Failed to load model from storage.", error);
}

// Initialize instance if no model was loaded
if (!aiInstance) {
    const initialModel = createModel();
    aiInstance = new AIEngine(initialModel);
    try {
        saveStoredModel(localStorage, storageKey, aiInstance.model);
    } catch (error) {
        console.error("DODLE AI: Failed to save model to storage.", error);
    }
    console.log("DODLE AI: New model initialized and saved.");
}


// =========================================================
// USER INTERACTION & REAL-TIME FEEDBACK
// =========================================================

/**
 * Updates internal state based on cursor activity (simulating perception).
 * This function links the browser input to the AI's perception stream.
 * @param {Event} event - The interaction event (e.g., mousemove).
 */
let lastPointer = null;

function markActivity(event) {
    const pointer = event.touches?.[0] || event;
    if (Number.isFinite(pointer.clientX) && Number.isFinite(pointer.clientY)) {
        lastPointer = { x: pointer.clientX, y: pointer.clientY };
    }

    // This simulates a "user_input" event for the AI
    aiInstance.step({
        type: "user_input",
        value: `pos: (${event.clientX}, ${event.clientY})`
    })
    .then(result => {
        // Optional: Log the AI's decision
        // console.log(`[DODLE AI] Action: ${result.action.type}, Reward: ${result.evaluation.reward.toFixed(2)}`);
    });
}

// Bind activity tracking to relevant input events.
['mousemove', 'keydown', 'scroll', 'touchstart', 'focus'].forEach(eventName => {
    window.addEventListener(eventName, markActivity, { passive: true });
});

// =========================================================
// PUBLIC API BRIDGE (window.noe)
// =========================================================

window.noeEnergy = {
    /** Returns the current state of the DODLE agent. */
    get aiState() {
        return aiInstance.getState();
    },
    /** Returns the current tuning rules (for debugging/visualization). */
    get rules() {
        return aiInstance.getRules();
    },
    /** Checks if the system needs a major energy boost. */
    get needsEnergy() {
        return aiInstance.getState().energy < 20 || aiInstance.getState().curiosity < 40;
    },
    /** Allows external systems to artificially recharge energy. */
    recharge(amount) {
        if (amount > 0) {
            aiInstance.state.energy = clamp(aiInstance.state.energy + amount, CONFIG.STATE_MIN, CONFIG.STATE_MAX);
            aiInstance.state.curiosity = Math.min(100, aiInstance.state.curiosity + 5);
            aiInstance.step({ type: "user_input", value: `recharged by ${amount}` });
        }
    },
    /** Calculates the distance between the cursor and the conscious-pixel. */
    get nearestCube() {
        const pixel = document.getElementById('conscious-pixel');
        const rect = pixel ? pixel.getBoundingClientRect() : { left: window.innerWidth / 2, top: window.innerHeight / 2, width: 0, height: 0 };
        const pixelX = rect.left + rect.width / 2;
        const pixelY = rect.top + rect.height / 2;
        const pointer = lastPointer || { x: window.innerWidth / 2, y: window.innerHeight / 2 };
        const dx = pointer.x - pixelX;
        const dy = pointer.y - pixelY;
        return { x: pointer.x, y: pointer.y, distance: Math.sqrt(dx * dx + dy * dy) };
    },
};

window.noeSelf = {
    /** Returns the current internal state and energy of the AI. */
    get state() {
        return aiInstance.getState();
    },
    /** Returns the current tuning rules. */
    get rules() {
        return aiInstance.getRules();
    },
    /** Exposes the agent's core decision-making function. */
    decide: perception => aiInstance.decide(perception),
    /** Exposes the agent's state for external observation. */
    getState: () => aiInstance.getState(),
};

console.log("DODLE AI System Initialized and Running.");
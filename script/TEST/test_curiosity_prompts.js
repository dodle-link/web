'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const words = fs.readFileSync(path.join(__dirname, '..', 'words.js'), 'utf8');
const context = { window: {} };
vm.runInNewContext(words, context);
vm.runInNewContext('Math.random = () => 0', context);

const source = vm.runInNewContext(
  'buildLanguagePromptSource(["Astronomy", "Music"], ["What is {topic}?", "How does {topic} work?"])',
  context
);

test('creates focused topic-and-question prompts', () => {
  assert.equal(source.length, 4);
  assert.equal(source.get(0), 'What is Astronomy?');
  assert.equal(source.get(3), 'How does Music work?');
});

test('samples every prompt once before restarting the cycle', () => {
  const firstCycle = Array.from({ length: source.length }, () => source.getRandom());

  assert.equal(new Set(firstCycle).size, source.length);
  assert.equal(source.getRandom(), firstCycle[0]);
});

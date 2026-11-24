'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

class Element {
  constructor(document, language) {
    this.document = document;
    this.dataset = language ? { language } : {};
    this.attributes = new Map();
    this.listeners = new Map();
    this.hidden = false;
    this.tabIndex = 0;
  }

  addEventListener(type, listener) {
    const listeners = this.listeners.get(type) || [];
    listeners.push(listener);
    this.listeners.set(type, listeners);
  }

  dispatch(type, properties = {}) {
    const event = {
      target: this,
      preventDefault() { this.defaultPrevented = true; },
      ...properties
    };
    for (const listener of this.listeners.get(type) || []) listener(event);
    return event;
  }

  setAttribute(name, value) { this.attributes.set(name, value); }
  getAttribute(name) { return this.attributes.get(name) || null; }
  focus() { this.document.activeElement = this; }
  closest(selector) { return selector === '.language-switcher' ? this.switcher : null; }
}

function makeMenu() {
  const document = {
    activeElement: null,
    listeners: new Map(),
    addEventListener(type, listener) { this.listeners.set(type, listener); }
  };
  const switcher = new Element(document);
  switcher.contains = element => [toggle, ...options, menu].includes(element);
  const toggle = new Element(document);
  const menu = new Element(document);
  const options = ['en', 'fr', 'de'].map(language => new Element(document, language));
  for (const element of [toggle, menu, ...options]) element.switcher = switcher;
  options[0].setAttribute('aria-selected', 'true');
  menu.hidden = true;

  const context = { document, window: {} };
  const source = fs.readFileSync(path.join(__dirname, '..', 'language-menu.js'), 'utf8');
  vm.runInNewContext(source, context);
  const selections = [];
  context.window.initLanguageMenu(toggle, menu, options, language => selections.push(language));

  return { document, toggle, menu, options, selections };
}

test('opens on click and supports arrow, Home, and End navigation', () => {
  const { document, toggle, menu, options } = makeMenu();

  toggle.dispatch('click');
  assert.equal(menu.hidden, false);
  assert.equal(toggle.getAttribute('aria-expanded'), 'true');
  assert.equal(document.activeElement, options[0]);

  menu.dispatch('keydown', { key: 'ArrowDown' });
  assert.equal(document.activeElement, options[1]);
  menu.dispatch('keydown', { key: 'End' });
  assert.equal(document.activeElement, options[2]);
  menu.dispatch('keydown', { key: 'Home' });
  assert.equal(document.activeElement, options[0]);
});

test('Escape closes and restores focus; selecting an option invokes the callback', () => {
  const { document, toggle, menu, options, selections } = makeMenu();

  toggle.dispatch('keydown', { key: 'ArrowDown' });
  menu.dispatch('keydown', { key: 'Escape' });
  assert.equal(menu.hidden, true);
  assert.equal(toggle.getAttribute('aria-expanded'), 'false');
  assert.equal(document.activeElement, toggle);

  toggle.dispatch('click');
  options[1].dispatch('click');
  assert.deepEqual(selections, ['fr']);
  assert.equal(menu.hidden, true);
  assert.equal(document.activeElement, toggle);
});
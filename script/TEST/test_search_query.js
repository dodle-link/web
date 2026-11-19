'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.join(__dirname, '..', '..');
const script = fs.readFileSync(path.join(__dirname, '..', 'script.js'), 'utf8');
const context = {
  window: { localStorage: { getItem() { return null; } } },
  document: {
    documentElement: { classList: { toggle() {} } },
    readyState: 'loading',
    addEventListener() {}
  }
};
vm.runInNewContext(script, context);

test('keeps the homepage version aligned with the README', () => {
  const homepage = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
  const readme = fs.readFileSync(path.join(root, 'readme.md'), 'utf8');
  const homepageVersion = homepage.match(/<meta name="version" content="([^"]+)"/);
  const readmeVersion = readme.match(/^Version: `([^`]+)`$/m);

  assert.ok(homepageVersion, 'homepage version metadata exists');
  assert.ok(readmeVersion, 'README version exists');
  assert.equal(homepageVersion[1], readmeVersion[1]);
});

test('preserves explicit operators', () => {
  assert.equal(context.interpretQuery('filetype:pdf climate report'), 'filetype:pdf climate report');
  assert.equal(context.interpretQuery('site:example.com climate pdf'), 'site:example.com climate pdf');
  assert.equal(context.interpretQuery('intext:accessibility report'), 'intext:accessibility report');
  assert.equal(context.interpretQuery('define:serendipity'), 'define:serendipity');
});

test('detects an existing operator without matching ordinary words', () => {
  assert.equal(context.hasSearchOperator('site:example.com climate', 'site:'), true);
  assert.equal(context.hasSearchOperator('site:example.com climate', 'filetype:'), false);
  assert.equal(context.hasSearchOperator('research:climate', 'site:'), false);
  assert.equal(context.hasSearchOperator('climate -weather', '-'), false);
});

test('does not rewrite filenames or ordinary file-type mentions', () => {
  assert.equal(context.interpretQuery('report.pdf'), 'report.pdf');
  assert.equal(context.interpretQuery('PDF accessibility'), 'PDF accessibility');
  assert.equal(context.interpretQuery('meaning of pdf'), 'meaning of pdf');
});

test('converts clear natural-language file-type requests', () => {
  assert.equal(context.interpretQuery('climate report pdf files'), 'climate report filetype:pdf');
  assert.equal(context.interpretQuery('climate report as pdf'), 'climate report filetype:pdf');
});

test('preserves quoted phrases', () => {
  assert.equal(context.interpretQuery('"pdf about climate"'), '"pdf about climate"');
});

test('keeps existing natural-language operator conversions', () => {
  assert.equal(context.interpretQuery('reports after 2020'), 'reports after:2020-01-01');
  assert.equal(context.interpretQuery('birds without cats'), 'birds -cats');
});
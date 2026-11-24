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
  assert.equal(context.interpretQuery('"sans chats"', 'fr'), '"sans chats"');
});

test('keeps existing natural-language operator conversions', () => {
  assert.equal(context.interpretQuery('reports after 2020'), 'reports after:2020-01-01');
  assert.equal(context.interpretQuery('birds without cats'), 'birds -cats');
});

test('translates common search phrasing for every non-English locale', () => {
  const examples = [
    ['ja', '検索 2020年以降の気候', 'after:2020-01-01の気候'],
    ['zh', '搜索 2020年以后 气候', 'after:2020-01-01 气候'],
    ['th', 'ค้นหา หลังปี 2020 ภูมิอากาศ', 'after:2020-01-01 ภูมิอากาศ'],
    ['ko', '검색해줘 2020년 이후 기후', 'after:2020-01-01 기후'],
    ['fr', 'rechercher après 2020 climat', 'after:2020-01-01 climat'],
    ['de', 'suche nach nach 2020 Klima', 'after:2020-01-01 Klima']
  ];

  for (const [language, input, expected] of examples) {
    assert.equal(context.interpretQuery(input, language), expected, language);
  }
});

test('localizes site and exclusion phrasing with non-Latin search terms', () => {
  const examples = [
    ['ja', 'example.com で 気候', 'site:example.com 気候'],
    ['zh', '在 example.com 网站 气候', 'site:example.com 气候'],
    ['th', 'บน example.com เว็บไซต์ ภูมิอากาศ', 'site:example.com ภูมิอากาศ'],
    ['ko', 'example.com 사이트에서 기후', 'site:example.com 기후'],
    ['fr', 'sur example.com climat', 'site:example.com climat'],
    ['de', 'auf example.com Klima', 'site:example.com Klima'],
    ['ja', '猫を除く 鳥', '-猫 鳥'],
    ['zh', '排除 猫 鸟', '-猫 鸟'],
    ['th', 'ไม่รวม แมว นก', '-แมว นก'],
    ['ko', '고양이 제외 새', '-고양이 새'],
    ['fr', 'sans chats oiseaux', '-chats oiseaux'],
    ['de', 'ohne Kinder Vögel', '-Kinder Vögel']
  ];

  for (const [language, input, expected] of examples) {
    assert.equal(context.interpretQuery(input, language), expected, `${language}: ${input}`);
  }
});
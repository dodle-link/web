'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const test = require('node:test');
const vm = require('node:vm');

const root = path.resolve(__dirname, '..', '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('homepage, README, and package versions match', () => {
  const pkg = JSON.parse(read('package.json'));
  const homepage = read('index.html').match(/<meta name="version" content="([^"]+)"/)[1];
  const readme = read('readme.md').match(/^# Dodle Search v(\S+)/m)[1];

  assert.equal(homepage, pkg.version);
  assert.equal(readme, pkg.version);
  assert.ok(fs.existsSync(path.join(root, 'doc', `CHANGELOG_v${pkg.version}.md`)));
});

test('every interface language defines the same translation keys', () => {
  const context = { window: {} };
  vm.runInNewContext(read('script/translations.js'), context);
  const translations = context.window.dodleTranslations;
  const expected = Object.keys(translations.en).sort();

  for (const [language, strings] of Object.entries(translations)) {
    assert.deepEqual(Object.keys(strings).sort(), expected, `${language} keys differ from en`);
  }
});

test('sitemap lists every public page', () => {
  const sitemap = read('sitemap.xml');
  const pages = ['about.html', 'privacy.html', 'blog/index.html', 'blog/traditional-snacks/index.html'];

  for (const page of pages) {
    const url = `https://dodle.link/${page.replace(/index\.html$/, '')}`;
    assert.ok(sitemap.includes(`<loc>${url}</loc>`), `sitemap is missing ${url}`);
  }
});

test('blog feed lists every article', () => {
  const feed = read('blog/feed.xml');
  assert.ok(feed.includes('https://dodle.link/blog/traditional-snacks/'));
});

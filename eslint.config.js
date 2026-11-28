'use strict';

const js = require('@eslint/js');
const globals = require('globals');

module.exports = [
  { ignores: ['node_modules/**', 'node/.venv/**', 'test-results/**', 'playwright-report/**', 'spider/**', '_site/**'] },
  js.configs.recommended,
  { rules: { 'no-empty': ['error', { allowEmptyCatch: true }], 'no-unused-vars': ['error', { args: 'none' }] } },
  {
    files: ['script/**/*.js'],
    languageOptions: { sourceType: 'script', globals: { ...globals.browser } }
  },
  {
    files: ['script/me.js', 'script/noe-pixel.js'],
    languageOptions: { globals: { readPreference: 'readonly' } }
  },
  {
    files: ['script/node.js'],
    languageOptions: { sourceType: 'module' }
  },
  {
    files: ['script/TEST/*.js', 'browser-tests/*.js', '*.js'],
    languageOptions: { sourceType: 'commonjs', globals: { ...globals.node, ...globals.browser } }
  }
];

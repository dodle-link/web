'use strict';

const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './browser-tests',
  fullyParallel: true,
  reporter: 'list',
  projects: [
    { name: 'chromium', use: { browserName: 'chromium' } },
    { name: 'firefox', use: { browserName: 'firefox' } },
    { name: 'webkit', use: { browserName: 'webkit' } }
  ],
  use: {
    baseURL: 'http://127.0.0.1:4173',
    viewport: { width: 1280, height: 900 }
  },
  webServer: {
    command: 'python3 -m http.server 4173 --bind 127.0.0.1',
    url: 'http://127.0.0.1:4173/index.html',
    reuseExistingServer: !process.env.CI,
    stdout: 'ignore',
    stderr: 'ignore'
  }
});
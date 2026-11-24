'use strict';

const AxeBuilder = require('@axe-core/playwright').default;
const { test, expect } = require('@playwright/test');

test.beforeEach(async ({ page }) => {
  await page.goto('/index.html');
});

test('search opens an isolated tab with the interpreted query', async ({ page }) => {
  await page.locator('#search-form').evaluate(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      window.submittedSearch = {
        action: form.action,
        target: form.target,
        rel: form.rel,
        query: form.elements.q.value
      };
    });
  });
  await page.locator('#search-input').fill('climate report as pdf');
  await page.getByRole('button', { name: 'Search', exact: true }).click();
  const submission = await page.evaluate(() => window.submittedSearch);
  expect(submission).toEqual({
    action: 'https://www.google.com/search',
    target: '_blank',
    rel: 'noopener noreferrer',
    query: 'climate report filetype:pdf'
  });
});

test('search submits the visible query without JavaScript', async ({ browser }) => {
  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await context.route('https://www.google.com/search**', route => route.fulfill({ body: 'Search results' }));
  await page.goto('/index.html');
  await page.locator('#search-input').fill('climate report');
  const [results] = await Promise.all([
    context.waitForEvent('page'),
    page.getByRole('button', { name: 'Search', exact: true }).click()
  ]);
  await results.waitForLoadState();
  expect(new URL(results.url()).searchParams.get('q')).toBe('climate report');
  await context.close();
});

test('consecutive searches and curiosity prompts remain available', async ({ page }) => {
  await page.locator('#search-form').evaluate(form => {
    form.addEventListener('submit', event => {
      event.preventDefault();
      window.searchCount = (window.searchCount || 0) + 1;
    });
  });
  await page.locator('#search-input').fill('climate');
  const search = page.getByRole('button', { name: 'Search', exact: true });
  await search.click();
  await search.click();
  expect(await page.evaluate(() => window.searchCount)).toBe(2);
  await page.getByRole('button', { name: "I'm Feeling Curious" }).click();
  await page.getByRole('button', { name: 'Try another' }).click();
});

test('theme and language preferences survive reloads', async ({ page }) => {
  await page.getByRole('button', { name: 'Switch to light mode' }).click();
  await expect(page.locator('html')).not.toHaveClass(/dark/);
  await page.getByRole('button', { name: 'Choose language' }).click();
  await page.getByRole('option', { name: 'Français' }).click();
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  await expect(page.getByRole('button', { name: 'Rechercher', exact: true })).toBeVisible();

  await page.reload();
  await expect(page.locator('html')).toHaveAttribute('lang', 'fr');
  await expect(page.locator('html')).not.toHaveClass(/dark/);
});

test('every supported language updates the search controls', async ({ page }) => {
  const locales = [
    ['en', 'Search'], ['ja', '検索'], ['zh', '搜索'], ['th', 'ค้นหา'],
    ['ko', '검색'], ['fr', 'Rechercher'], ['de', 'Suchen']
  ];

  for (const [language, buttonLabel] of locales) {
    await page.locator('.language-toggle').click();
    await page.locator(`[data-language="${language}"]`).click();
    await expect(page.locator('html')).toHaveAttribute('lang', language);
    await expect(page.locator('#search-input')).toHaveAttribute('placeholder', /.+/);
    await expect(page.locator('.search-button')).toHaveText(buttonLabel);
  }
});

for (const path of ['/index.html', '/about.html', '/privacy.html']) {
  test(`translations are complete: ${path}`, async ({ page }) => {
    const locales = ['en', 'ja', 'zh', 'th', 'ko', 'fr', 'de'];
    for (const language of locales) {
      await page.goto(path);
      await page.evaluate(() => localStorage.removeItem('dodle-language'));
      await page.reload();
      const englishTitle = await page.title();
      const englishHeading = await page.locator('main h1').textContent();
      if (language !== 'en') {
        await page.locator('.language-toggle').click();
        await page.locator(`[data-language="${language}"]`).click();
        await expect(page).not.toHaveTitle(englishTitle);
        if (path !== '/index.html') {
          await expect(page.locator('main h1')).not.toHaveText(englishHeading);
        }
      }
      const missing = await page.locator('[data-i18n]').evaluateAll(elements =>
        elements.filter(element => {
          const text = element.textContent.trim();
          return !text || text === 'undefined' || text === element.dataset.i18n;
        }).map(element => element.dataset.i18n)
      );
      expect(missing, `${path} (${language})`).toEqual([]);
      await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /.+/);
      const canonical = new URL(await page.locator('link[rel="canonical"]').getAttribute('href'));
      expect(canonical.pathname).toBe(path === '/index.html' ? '/' : path);
    }
  });
}

test('language menu supports keyboard selection in the browser', async ({ page }) => {
  const toggle = page.locator('.language-toggle');
  await toggle.focus();
  await toggle.press('ArrowDown');
  await expect(page.locator('[data-language="en"]')).toBeFocused();
  await page.locator('#language-menu').press('End');
  await expect(page.locator('[data-language="de"]')).toBeFocused();
  await page.locator('#language-menu').press('Escape');
  await expect(toggle).toBeFocused();
  await expect(page.locator('#language-menu')).toBeHidden();
});

test('curiosity prompts are editable and announced', async ({ page }) => {
  await page.getByRole('button', { name: "I'm Feeling Curious" }).click();
  await expect(page.locator('#search-input')).not.toHaveValue('');
  await expect(page.locator('.search-status')).not.toHaveText('');
  await expect(page.getByRole('button', { name: 'Try another' })).toBeVisible();
});

test('mobile layout has no horizontal page overflow', async ({ page }) => {
  for (const width of [320, 375, 768]) {
    await page.setViewportSize({ width, height: 812 });
    await page.reload();
    const dimensions = await page.evaluate(() => ({
      viewport: document.documentElement.clientWidth,
      content: document.documentElement.scrollWidth
    }));
    expect(dimensions.content, `viewport width ${width}`).toBeLessThanOrEqual(dimensions.viewport);
  }
});

test('reduced motion disables decorative animation', async ({ page }) => {
  await page.emulateMedia({ reducedMotion: 'reduce' });
  const duration = await page.locator('#page-title').evaluate(element =>
    getComputedStyle(element).animationDuration
  );
  expect(duration.split(',').every(value => parseFloat(value) <= 0.001)).toBe(true);
});

test('Noe recovers from corrupt storage and round-trips valid models', async ({ page }) => {
  await page.evaluate(() => localStorage.setItem('dodle-ai-model', 'not-a-model'));
  await page.reload();
  const result = await page.evaluate(() => {
    const agent = new window.noeAI();
    const exported = agent.exportModel();
    const imported = window.noeAI.importModel(exported);
    let invalidModelRejected = false;
    try {
      window.noeAI.importModel(new ArrayBuffer(16));
    } catch {
      invalidModelRejected = true;
    }
    return {
      state: window.noeEnergy.aiState,
      sourceState: agent.getState(),
      importedState: imported.getState(),
      invalidModelRejected,
      storedModel: localStorage.getItem('dodle-ai-model')
    };
  });

  expect(result.state.energy).toBeGreaterThanOrEqual(0);
  expect(result.state.energy).toBeLessThanOrEqual(100);
  expect(result.importedState.energy).toBe(result.sourceState.energy);
  expect(result.invalidModelRejected).toBe(true);
  expect(result.storedModel).not.toBe('not-a-model');
});

test('Noe keeps bounded memory and state during repeated activity', async ({ page }) => {
  const result = await page.evaluate(async () => {
    const agent = new window.noeAI();
    for (let index = 0; index < 250; index++) {
      await agent.step({ type: 'user_input', value: `activity ${index}` });
    }
    const state = agent.getState();
    return {
      memoryLength: agent.getMemory().length,
      stateValues: [state.energy, state.curiosity, state.confidence, state.stability]
    };
  });
  expect(result.memoryLength).toBeLessThanOrEqual(200);
  expect(result.stateValues.every(value => value >= 0 && value <= 100)).toBe(true);
});

test('Noe coalesces rapid mouse movement into one step per frame', async ({ page }) => {
  const steps = await page.evaluate(async () => {
    let count = 0;
    window.noeAI.prototype.step = () => {
      count++;
      return Promise.resolve();
    };
    for (let index = 0; index < 30; index++) {
      window.dispatchEvent(new MouseEvent('mousemove', { clientX: index, clientY: index }));
    }
    await new Promise(resolve => requestAnimationFrame(resolve));
    return count;
  });
  expect(steps).toBe(1);
});

test('Noe can be disabled, persists, and starts again on demand', async ({ page }) => {
  const toggle = page.getByRole('checkbox', { name: 'Noe' });
  await expect(toggle).toBeChecked();
  await toggle.uncheck();
  await expect(page.locator('#conscious-pixel')).toHaveCount(0);
  await page.evaluate(() => localStorage.removeItem('dodle-ai-model'));
  await page.reload();
  await expect(toggle).not.toBeChecked();
  await expect(page.locator('#conscious-pixel')).toHaveCount(0);
  expect(await page.evaluate(() => localStorage.getItem('dodle-ai-model'))).toBeNull();
  const steps = await page.evaluate(async () => {
    let count = 0;
    window.noeAI.prototype.step = () => { count++; return Promise.resolve(); };
    window.dispatchEvent(new MouseEvent('mousemove', { clientX: 10, clientY: 10 }));
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));
    await new Promise(resolve => requestAnimationFrame(resolve));
    return count;
  });
  expect(steps).toBe(0);
  await toggle.check();
  await expect(page.locator('#conscious-pixel')).toHaveCount(1);
  await page.reload();
  await expect(toggle).toBeChecked();
});

test('privacy page loads without third-party requests', async ({ page }) => {
  const externalRequests = [];
  const requests = [];
  page.on('request', request => {
    requests.push(request.url());
    if (new URL(request.url()).origin !== new URL(page.url()).origin) {
      externalRequests.push(request.url());
    }
  });
  await page.goto('/index.html');
  await expect(page.getByRole('heading', { name: 'dodle' })).toBeVisible();
  await page.evaluate(() => document.fonts.ready);
  const initialRequests = requests.length;
  await page.mouse.move(160, 240);
  await page.keyboard.press('Tab');
  await page.waitForTimeout(100);
  expect(requests).toHaveLength(initialRequests);
  await page.goto('/privacy.html');
  await expect(page.getByRole('heading', { name: 'Privacy' })).toBeVisible();
  expect(externalRequests).toEqual([]);
});

test('homepage remains usable when browser storage is unavailable', async ({ page }) => {
  await page.addInitScript(() => {
    Object.defineProperty(window, 'localStorage', {
      configurable: false,
      get() { throw new DOMException('Storage disabled', 'SecurityError'); }
    });
  });
  await page.goto('/index.html');
  await expect(page.getByRole('heading', { name: 'dodle' })).toBeVisible();
  await expect(page.locator('#search-input')).toBeVisible();
});

for (const path of ['/index.html', '/privacy.html', '/about.html']) {
  for (const colorScheme of ['light', 'dark']) {
    test(`accessibility scan: ${path} (${colorScheme})`, async ({ page }) => {
      await page.emulateMedia({ colorScheme });
      await page.goto(path);
      const results = await new AxeBuilder({ page })
        .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
        .analyze();
      expect(results.violations).toEqual([]);
    });
  }
}
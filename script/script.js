window.noeWebPixel = true;

function readPreference(key, fallback) {
  try {
    return window.localStorage.getItem(key) || fallback;
  } catch {
    return fallback;
  }
}

function savePreference(key, value) {
  try {
    window.localStorage.setItem(key, value);
  } catch {}
}

const languageControlLabels = {
  en: 'Choose language', ja: '言語を選択', zh: '选择语言', th: 'เลือกภาษา',
  ko: '언어 선택', fr: 'Choisir la langue', de: 'Sprache auswählen'
};

document.documentElement.classList.toggle('dark', readPreference('dodle-theme', 'dark') !== 'light');

function init() {
  const form = document.querySelector('.search-form');
  const input = document.querySelector('#search-input');
  const searchQuery = document.querySelector('#search-query');
  const clearButton = document.querySelector('.clear-button');
  const themeToggle = document.querySelector('.theme-toggle');
  const noeToggle = document.querySelector('#noe-toggle');
  const luckyButton = document.querySelector('.lucky-button');
  const searchStatus = document.querySelector('.search-status');
  const languageToggle = document.querySelector('.language-toggle');
  const languageMenu = document.querySelector('.language-menu');
  const languageOptions = [...document.querySelectorAll('[data-language]')];
  let currentLanguage = 'en';
  let hasGeneratedPrompt = false;

  noeToggle.checked = readPreference('dodle-noe', 'on') === 'on';
  noeToggle.parentElement.hidden = false;
  noeToggle.addEventListener('change', () => {
    savePreference('dodle-noe', noeToggle.checked ? 'on' : 'off');
    window.noeActivity.setEnabled(noeToggle.checked);
    window.noePixel.setEnabled(noeToggle.checked);
  });

  const translations = window.dodleTranslations;

  function setTheme(isDark) {
    document.documentElement.classList.toggle('dark', isDark);
    document.body.classList.toggle('dark', isDark);
    themeToggle.setAttribute('aria-pressed', String(isDark));
    const language = translations[document.documentElement.lang] || translations.en;
    themeToggle.setAttribute('aria-label', isDark ? language.themeLight : language.themeDark);
    savePreference('dodle-theme', isDark ? 'dark' : 'light');
  }

  setTheme(readPreference('dodle-theme', 'dark') !== 'light');
  themeToggle.addEventListener('click', () => setTheme(!document.body.classList.contains('dark')));

  function setLanguage(language) {
    const selectedLanguage = translations[language] ? language : 'en';
    const translation = translations[selectedLanguage];
    currentLanguage = selectedLanguage;
    document.documentElement.lang = selectedLanguage;
    document.title = translation.pageTitle;
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.dataset.i18n;
      if (translation[key]) element.textContent = translation[key];
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(element => {
      const key = element.dataset.i18nAria;
      if (translation[key]) element.setAttribute('aria-label', translation[key]);
    });
    input.placeholder = translation.searchPlaceholder;
    luckyButton.textContent = hasGeneratedPrompt ? translation.curiousAgain : translation.curiousButton;
    clearButton.setAttribute('aria-label', translation.clear);
    languageToggle.textContent = languageOptions.find(option => option.dataset.language === selectedLanguage).textContent;
    languageToggle.setAttribute('aria-label', `${languageToggle.textContent}, ${languageControlLabels[selectedLanguage]}`);
    languageMenu.setAttribute('aria-label', languageControlLabels[selectedLanguage]);
    const description = document.querySelector('[data-i18n-meta="description"]');
    if (description) description.content = translation.description || 'A simple search page for a less distracting web.';
    themeToggle.setAttribute('aria-label', document.body.classList.contains('dark') ? translation.themeLight : translation.themeDark);
    languageOptions.forEach(option => option.setAttribute('aria-selected', String(option.dataset.language === selectedLanguage)));
    savePreference('dodle-language', selectedLanguage);
  }

  window.initLanguageMenu(languageToggle, languageMenu, languageOptions, setLanguage);
  setLanguage(readPreference('dodle-language', 'en'));

  const operatorTools = document.querySelector('.operator-tools');
  let previousPointerX = null;
  function updateOperatorShadows() {
    const maxScrollLeft = operatorTools.scrollWidth - operatorTools.clientWidth;
    operatorTools.classList.toggle('has-left-shadow', operatorTools.scrollLeft > 0);
    operatorTools.classList.toggle('has-right-shadow', maxScrollLeft > 1 && operatorTools.scrollLeft < maxScrollLeft - 1);
  }
  operatorTools.addEventListener('scroll', updateOperatorShadows, { passive: true });
  document.querySelector('.operator-help').addEventListener('toggle', updateOperatorShadows);
  window.addEventListener('resize', updateOperatorShadows);
  updateOperatorShadows();

  operatorTools.addEventListener('pointerenter', event => {
    previousPointerX = event.pointerType === 'mouse' ? event.clientX : null;
  });
  operatorTools.addEventListener('pointermove', event => {
    if (event.pointerType !== 'mouse') return;
    if (previousPointerX !== null) operatorTools.scrollLeft += event.clientX - previousPointerX;
    previousPointerX = event.clientX;
  });
  operatorTools.addEventListener('pointerleave', () => {
    previousPointerX = null;
  });

  function updateClearButton() {
    clearButton.classList.toggle('visible', input.value.length > 0);
  }

  const operatorExamples = document.querySelector('.operator-examples');
  const operatorExample = operatorExamples.querySelector('code');
  const operatorExampleSeparator = operatorExamples.querySelector('.operator-example-separator');
  const secondaryOperatorExample = operatorExamples.querySelectorAll('code')[1];
  input.addEventListener('input', updateClearButton);
  document.querySelectorAll('[data-insert-operator]').forEach(button => {
    button.addEventListener('click', () => {
      const insertion = button.dataset.insertOperator;
      operatorExample.textContent = button.dataset.example;
      operatorExampleSeparator.hidden = true;
      secondaryOperatorExample.hidden = true;
      if (hasSearchOperator(input.value, insertion)) {
        input.focus();
        return;
      }

      const start = input.selectionStart ?? input.value.length;
      const end = input.selectionEnd ?? input.value.length;
      const before = input.value.slice(0, start);
      const separator = before && !/\s$/.test(before) ? ' ' : '';
      input.value = `${before}${separator}${insertion}${input.value.slice(end)}`;
      const cursor = before.length + separator.length + insertion.length + Number(button.dataset.insertCursor || 0);
      input.setSelectionRange(cursor, cursor);
      updateClearButton();
      input.focus();
    });
  });
  clearButton.addEventListener('click', () => {
    input.value = '';
    updateClearButton();
    input.focus();
  });

  luckyButton.addEventListener('click', () => {
    const languageWords = window.lazyCuriousWordsByLanguage[currentLanguage];
    const promptSource = languageWords || window.lazyCuriousWordsByLanguage.en;
    const prompt = promptSource.getRandom();
    if (!prompt) return;

    hasGeneratedPrompt = true;
    input.value = prompt;
    updateClearButton();
    searchStatus.textContent = (translations[currentLanguage] || translations.en).promptReady;
    luckyButton.textContent = (translations[currentLanguage] || translations.en).curiousAgain;
  });

  form.addEventListener('submit', () => {
    searchStatus.textContent = '';
    searchQuery.value = interpretQuery(input.value, currentLanguage);
  });
  input.removeAttribute('name');
  searchQuery.disabled = false;
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

const localizedQueryRules = {
  ja: [
    [/^(?:検索して|検索|探して)\s*/u, ''],
    [/([\w.-]+\.[a-z]{2,})\s*で/u, 'site:$1 '],
    [/([\p{L}\p{N}_-]+)\s*を除く/u, '-$1'],
    [/([0-9]{4})年以降/u, 'after:$1-01-01'],
    [/([0-9]{4})年以前/u, 'before:$1-01-01']
  ],
  zh: [
    [/^(?:请)?(?:搜索|查找)\s*/u, ''],
    [/在\s*([\w.-]+\.[a-z]{2,})\s*(?:网站|上)/u, 'site:$1 '],
    [/(?:排除|不含)\s*([\p{L}\p{N}_-]+)/u, '-$1'],
    [/([0-9]{4})年以后/u, 'after:$1-01-01'],
    [/([0-9]{4})年之前/u, 'before:$1-01-01']
  ],
  th: [
    [/^(?:ช่วย)?ค้นหา\s*/u, ''],
    [/บน\s*([\w.-]+\.[a-z]{2,})(?:\s*เว็บไซต์)?/u, 'site:$1 '],
    [/ไม่รวม\s*([\p{L}\p{N}_-]+)/u, '-$1'],
    [/หลังปี\s*([0-9]{4})/u, 'after:$1-01-01'],
    [/ก่อนปี\s*([0-9]{4})/u, 'before:$1-01-01']
  ],
  ko: [
    [/^(?:검색해(?:줘| 주세요)?|찾아줘)\s*/u, ''],
    [/([\w.-]+)\s*사이트에서/u, 'site:$1 '],
    [/([\p{L}\p{N}_-]+)\s*제외/u, '-$1'],
    [/([0-9]{4})년\s*이후/u, 'after:$1-01-01'],
    [/([0-9]{4})년\s*이전/u, 'before:$1-01-01']
  ],
  fr: [
    [/^(?:rechercher|cherche|trouve)\s+/iu, ''],
    [/\bsur\s+([\w.-]+\.[a-z]{2,})/iu, 'site:$1'],
    [/\bsans\s+([\p{L}\p{N}_-]+)/iu, '-$1'],
    [/\baprès\s+([0-9]{4})\b/iu, 'after:$1-01-01'],
    [/\bavant\s+([0-9]{4})\b/iu, 'before:$1-01-01']
  ],
  de: [
    [/^(?:suche nach|finde)\s+/iu, ''],
    [/\bauf\s+([\w.-]+\.[a-z]{2,})/iu, 'site:$1'],
    [/\bohne\s+([\p{L}\p{N}_-]+)/iu, '-$1'],
    [/\bnach\s+([0-9]{4})\b/iu, 'after:$1-01-01'],
    [/\bvor\s+([0-9]{4})\b/iu, 'before:$1-01-01']
  ]
};

function interpretQuery(value, language = 'en') {
  let query = value.trim();
  if (!query) return query;

  // drop conversational wrappers so the rest of the operators can match cleanly
  query = query.replace(/^(?:please\s+)?(?:can you\s+)?(?:search for|look up|find me|find|show me|tell me about)\s+/gi, '');

  if (/["']/.test(query)) {
    return query.replace(/\s+/g, ' ').trim();
  }

  for (const [pattern, replacement] of localizedQueryRules[language] || []) {
    query = query.replace(pattern, replacement);
  }

  if (/(?:^|\s)(?:site|filetype|after|before|define|intitle|inurl):/i.test(query)) {
    return query.replace(/\s+/g, ' ').trim();
  }

  query = query.replace(/\b(?:on|from|at)\s+([\w-]+(?:\.[\w-]+)+)\b/gi, 'site:$1');
  query = query.replace(/\b(pdf|docx?|xlsx?|pptx?|csv|txt)\s+(?:files?|documents?|format)\b/gi, (_, extension) => `filetype:${extension.toLowerCase()}`);
  query = query.replace(/\bas\s+(pdf|docx?|xlsx?|pptx?|csv|txt)\b/gi, (_, extension) => `filetype:${extension.toLowerCase()}`);

  // support both bare years and full dates for after/before
  query = query.replace(/\bafter\s+(\d{4}-\d{2}-\d{2})\b/gi, 'after:$1');
  query = query.replace(/\bbefore\s+(\d{4}-\d{2}-\d{2})\b/gi, 'before:$1');
  query = query.replace(/\bafter\s+(\d{4})\b/gi, 'after:$1-01-01');
  query = query.replace(/\bbefore\s+(\d{4})\b/gi, 'before:$1-01-01');

  query = query.replace(/\b(?:without|excluding|except)\s+([\w-]+)\b/gi, '-$1');
  query = query.replace(/\bdefine\s+([\w\s]+)$/gi, 'define:$1');
  query = query.replace(/\s+or\s+/gi, ' OR ');

  return query.replace(/\s+/g, ' ').trim();
}

function hasSearchOperator(query, operator) {
  if (!operator.endsWith(':')) return false;
  const escapedOperator = operator.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
  return new RegExp(`(?:^|\\s)${escapedOperator}`, 'i').test(query);
}


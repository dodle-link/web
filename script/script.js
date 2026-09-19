window.noeWebPixel = true;
document.documentElement.classList.toggle('dark', localStorage.getItem('dodle-theme') !== 'light');

function init() {
  const form = document.querySelector('.search-form');
  const input = document.querySelector('#search-input');
  const clearButton = document.querySelector('.clear-button');
  const themeToggle = document.querySelector('.theme-toggle');
  const luckyButton = document.querySelector('.lucky-button');
  const languageToggle = document.querySelector('.language-toggle');
  const languageMenu = document.querySelector('.language-menu');
  const languageOptions = [...document.querySelectorAll('[data-language]')];

  const translations = {
    en: { label: 'Language', searchLabel: 'Search', searchPlaceholder: 'Search', curiousButton: "I'm Feeling Curious", clear: 'Clear search' },
    ja: { label: '言語', searchLabel: 'ウェブを検索', searchPlaceholder: 'ウェブを検索', curiousButton: '気になる検索', clear: '検索をクリア' },
    zh: { label: '语言', searchLabel: '搜索网页', searchPlaceholder: '搜索网页', curiousButton: '我很好奇', clear: '清除搜索' },
    th: { label: 'ภาษา', searchLabel: 'ค้นหาเว็บ', searchPlaceholder: 'ค้นหาเว็บ', curiousButton: 'ฉันอยากรู้', clear: 'ล้างการค้นหา' }
  };

  function setTheme(isDark) {
    document.documentElement.classList.toggle('dark', isDark);
    document.body.classList.toggle('dark', isDark);
    themeToggle.setAttribute('aria-pressed', String(isDark));
    themeToggle.setAttribute('aria-label', isDark ? 'Switch to light mode' : 'Switch to dark mode');
    localStorage.setItem('dodle-theme', isDark ? 'dark' : 'light');
  }

  setTheme(localStorage.getItem('dodle-theme') !== 'light');
  themeToggle.addEventListener('click', () => setTheme(!document.body.classList.contains('dark')));

  function setLanguage(language) {
    const selectedLanguage = translations[language] ? language : 'en';
    const translation = translations[selectedLanguage];
    document.documentElement.lang = selectedLanguage;
    document.querySelector('.language-label').textContent = translation.label;
    document.querySelector('[data-i18n="searchLabel"]').textContent = translation.searchLabel;
    document.querySelector('[data-i18n="curiousButton"]').textContent = translation.curiousButton;
    input.placeholder = translation.searchPlaceholder;
    clearButton.setAttribute('aria-label', translation.clear);
    languageToggle.textContent = languageOptions.find(option => option.dataset.language === selectedLanguage).textContent;
    languageToggle.setAttribute('aria-label', `${translation.label} ${languageToggle.textContent}`);
    languageOptions.forEach(option => option.setAttribute('aria-selected', String(option.dataset.language === selectedLanguage)));
    localStorage.setItem('dodle-language', selectedLanguage);
  }

  function closeLanguageMenu() {
    languageMenu.hidden = true;
    languageToggle.setAttribute('aria-expanded', 'false');
  }

  languageToggle.addEventListener('click', () => {
    languageMenu.hidden = !languageMenu.hidden;
    languageToggle.setAttribute('aria-expanded', String(!languageMenu.hidden));
  });
  languageOptions.forEach(option => option.addEventListener('click', () => {
    setLanguage(option.dataset.language);
    closeLanguageMenu();
  }));
  document.addEventListener('click', event => {
    if (!event.target.closest('.language-switcher')) closeLanguageMenu();
  });
  setLanguage(localStorage.getItem('dodle-language') || 'en');

  function updateClearButton() {
    clearButton.classList.toggle('visible', input.value.length > 0);
  }

  input.addEventListener('input', updateClearButton);
  clearButton.addEventListener('click', () => {
    input.value = '';
    updateClearButton();
    input.focus();
  });

  luckyButton.addEventListener('click', () => {
    input.value = curiousWords[Math.floor(Math.random() * curiousWords.length)];
    form.requestSubmit();
  });

  form.addEventListener('submit', () => {
    input.value = interpretQuery(input.value);
    form.target = '_blank';
  });
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', init);
} else {
  init();
}

function interpretQuery(value) {
  let query = value.trim();
  if (!query) return query;

  // drop conversational wrappers so the rest of the operators can match cleanly
  query = query.replace(/^(?:please\s+)?(?:can you\s+)?(?:search for|look up|find me|find|show me|tell me about)\s+/gi, '');

  query = query.replace(/\b(?:on|from|at)\s+([\w-]+(?:\.[\w-]+)+)\b/gi, 'site:$1');
  query = query.replace(/\b(pdf|docx?|xlsx?|pptx?|csv|txt)\b/gi, (_, extension) => `filetype:${extension.toLowerCase()}`);

  // support both bare years and full dates for after/before
  query = query.replace(/\bafter\s+(\d{4}-\d{2}-\d{2})\b/gi, 'after:$1');
  query = query.replace(/\bbefore\s+(\d{4}-\d{2}-\d{2})\b/gi, 'before:$1');
  query = query.replace(/\bafter\s+(\d{4})\b/gi, 'after:$1-01-01');
  query = query.replace(/\bbefore\s+(\d{4})\b/gi, 'before:$1-01-01');

  query = query.replace(/\b(?:without|excluding|except)\s+([\w-]+)\b/gi, '-$1');
  query = query.replace(/\bdefine\s+([\w\s]+)$/gi, 'define:$1');
  query = query.replace(/\s+or\s+/gi, ' OR ');
  query = query.replace(/\babout\s+/gi, '');

  return query.replace(/\s+/g, ' ').trim();
}


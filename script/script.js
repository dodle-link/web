window.noeWebPixel = true;
document.documentElement.classList.toggle('dark', localStorage.getItem('dodle-theme') !== 'light');

function init() {
  const form = document.querySelector('.search-form');
  const input = document.querySelector('#search-input');
  const clearButton = document.querySelector('.clear-button');
  const searchButton = document.querySelector('.search-button');
  const themeToggle = document.querySelector('.theme-toggle');
  const luckyButton = document.querySelector('.lucky-button');
  const searchStatus = document.querySelector('.search-status');
  const languageToggle = document.querySelector('.language-toggle');
  const languageMenu = document.querySelector('.language-menu');
  const languageOptions = [...document.querySelectorAll('[data-language]')];
  const minimumSearchIntervalMs = 2000;
  let nextAllowedSearchAt = 0;
  let cooldownTimeout;
  let currentLanguage = 'en';

  const translations = {
    en: { pageTitle: 'dodle - Search', navLabel: 'Primary navigation', themeDark: 'Switch to dark mode', themeLight: 'Switch to light mode', searchLabel: 'Search the web', searchPlaceholder: 'Search the web', searchButton: 'Search', curiousButton: "I'm Feeling Curious", clear: 'Clear search', cooldown: 'Please wait before searching again.', description: 'A simple search for a less distracted web.', privacy: 'Privacy', about: 'About' },
    ja: { pageTitle: 'dodle - 検索', navLabel: 'メインナビゲーション', themeDark: 'ダークモードに切り替え', themeLight: 'ライトモードに切り替え', searchLabel: 'ウェブを検索', searchPlaceholder: 'ウェブを検索', searchButton: '検索', curiousButton: '気になる検索', clear: '検索をクリア', cooldown: '次の検索までお待ちください。', description: '気を散らさずに検索できるシンプルな検索ページです。', privacy: 'プライバシー', about: '概要' },
    zh: { pageTitle: 'dodle - 搜索', navLabel: '主导航', themeDark: '切换到深色模式', themeLight: '切换到浅色模式', searchLabel: '搜索网页', searchPlaceholder: '搜索网页', searchButton: '搜索', curiousButton: '我很好奇', clear: '清除搜索', cooldown: '请稍候再搜索。', description: '简单搜索，远离纷扰的网络。', privacy: '隐私', about: '关于' },
    th: { pageTitle: 'dodle - ค้นหา', navLabel: 'การนำทางหลัก', themeDark: 'เปลี่ยนเป็นโหมดมืด', themeLight: 'เปลี่ยนเป็นโหมดสว่าง', searchLabel: 'ค้นหาเว็บ', searchPlaceholder: 'ค้นหาเว็บ', searchButton: 'ค้นหา', curiousButton: 'ฉันอยากรู้', clear: 'ล้างการค้นหา', cooldown: 'โปรดรอสักครู่ก่อนค้นหาอีกครั้ง', description: 'การค้นหาที่เรียบง่ายสำหรับเว็บที่วุ่นวายน้อยลง', privacy: 'ความเป็นส่วนตัว', about: 'เกี่ยวกับ' },
    ko: { pageTitle: 'dodle - 검색', navLabel: '주요 탐색', themeDark: '다크 모드로 전환', themeLight: '라이트 모드로 전환', searchLabel: '웹 검색', searchPlaceholder: '웹 검색', searchButton: '검색', curiousButton: '궁금한 것이 있어요', clear: '검색어 지우기', cooldown: '잠시 후 다시 검색해 주세요.', description: '방해 요소를 줄인 간단한 웹 검색입니다.', privacy: '개인정보 보호', about: '소개' },
    fr: { pageTitle: 'dodle - Recherche', navLabel: 'Navigation principale', themeDark: 'Passer au mode sombre', themeLight: 'Passer au mode clair', searchLabel: 'Rechercher sur le Web', searchPlaceholder: 'Rechercher sur le Web', searchButton: 'Rechercher', curiousButton: 'Je suis curieux', clear: 'Effacer la recherche', cooldown: 'Veuillez attendre avant de relancer une recherche.', description: 'Une recherche simple pour un Web moins distrayant.', privacy: 'Confidentialité', about: 'À propos' },
    de: { pageTitle: 'dodle - Suche', navLabel: 'Hauptnavigation', themeDark: 'Dunklen Modus aktivieren', themeLight: 'Hellen Modus aktivieren', searchLabel: 'Im Web suchen', searchPlaceholder: 'Im Web suchen', searchButton: 'Suchen', curiousButton: 'Ich bin neugierig', clear: 'Suche löschen', cooldown: 'Bitte warten Sie kurz, bevor Sie erneut suchen.', description: 'Eine einfache Suche für ein weniger ablenkendes Web.', privacy: 'Datenschutz', about: 'Über uns' }
  };

  function setTheme(isDark) {
    document.documentElement.classList.toggle('dark', isDark);
    document.body.classList.toggle('dark', isDark);
    themeToggle.setAttribute('aria-pressed', String(isDark));
    const language = translations[document.documentElement.lang] || translations.en;
    themeToggle.setAttribute('aria-label', isDark ? language.themeLight : language.themeDark);
    localStorage.setItem('dodle-theme', isDark ? 'dark' : 'light');
  }

  setTheme(localStorage.getItem('dodle-theme') !== 'light');
  themeToggle.addEventListener('click', () => setTheme(!document.body.classList.contains('dark')));

  function setLanguage(language) {
    const selectedLanguage = translations[language] ? language : 'en';
    const translation = translations[selectedLanguage];
    currentLanguage = selectedLanguage;
    document.documentElement.lang = selectedLanguage;
    document.title = translation.pageTitle;
    document.querySelector('meta[name="description"]').content = translation.description;
    document.querySelectorAll('[data-i18n]').forEach(element => {
      const key = element.dataset.i18n;
      if (translation[key]) element.textContent = translation[key];
    });
    document.querySelectorAll('[data-i18n-aria]').forEach(element => {
      const key = element.dataset.i18nAria;
      if (translation[key]) element.setAttribute('aria-label', translation[key]);
    });
    input.placeholder = translation.searchPlaceholder;
    clearButton.setAttribute('aria-label', translation.clear);
    languageToggle.textContent = languageOptions.find(option => option.dataset.language === selectedLanguage).textContent;
    languageToggle.setAttribute('aria-label', `Language ${languageToggle.textContent}`);
    themeToggle.setAttribute('aria-label', document.body.classList.contains('dark') ? translation.themeLight : translation.themeDark);
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
    const languageWords = lazyCuriousWordsByLanguage[currentLanguage];
    input.value = languageWords
      ? languageWords.getRandom()
      : curiousWords[Math.floor(Math.random() * curiousWords.length)];
    form.requestSubmit();
  });

  function startSearchCooldown() {
    searchButton.disabled = true;
    luckyButton.disabled = true;
    window.clearTimeout(cooldownTimeout);
    cooldownTimeout = window.setTimeout(() => {
      searchButton.disabled = false;
      luckyButton.disabled = false;
      nextAllowedSearchAt = 0;
    }, minimumSearchIntervalMs);
  }

  form.addEventListener('submit', event => {
    const now = Date.now();
    if (now < nextAllowedSearchAt) {
      event.preventDefault();
      searchStatus.textContent = (translations[currentLanguage] || translations.en).cooldown;
      return;
    }

    nextAllowedSearchAt = now + minimumSearchIntervalMs;
    searchStatus.textContent = '';
    input.value = interpretQuery(input.value);
    form.target = '_blank';
    startSearchCooldown();
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


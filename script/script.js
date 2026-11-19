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

document.documentElement.classList.toggle('dark', readPreference('dodle-theme', 'dark') !== 'light');

function init() {
  const form = document.querySelector('.search-form');
  const input = document.querySelector('#search-input');
  const searchQuery = document.querySelector('#search-query');
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
  let hasGeneratedPrompt = false;

  const translations = {
    en: { pageTitle: 'dodle - Search', navLabel: 'Primary navigation', themeDark: 'Switch to dark mode', themeLight: 'Switch to light mode', searchLabel: 'Search the web', searchPlaceholder: 'Search the web', searchButton: 'Search', curiousButton: "I'm Feeling Curious", curiousAgain: 'Try another', promptReady: 'A curious prompt is ready. Edit it or search when you’re ready.', clear: 'Clear search', cooldown: 'Please wait before searching again.', operatorHelp: 'Search operators', operatorSite: 'Site', operatorFiletype: 'File type', operatorAfter: 'After date', operatorBefore: 'Before date', operatorIntitle: 'In title', operatorInurl: 'In URL', operatorIntext: 'In text', operatorDefine: 'Definition', operatorExclude: 'Exclude', operatorExact: 'Exact phrase', operatorExamples: 'Examples:', privacy: 'Privacy', about: 'About', blog: 'Blog' },
    ja: { pageTitle: 'dodle - 検索', navLabel: 'メインナビゲーション', themeDark: 'ダークモードに切り替え', themeLight: 'ライトモードに切り替え', searchLabel: 'ウェブを検索', searchPlaceholder: 'ウェブを検索', searchButton: '検索', curiousButton: '気になる検索', curiousAgain: '別の候補', promptReady: '検索候補を用意しました。編集するか、そのまま検索できます。', clear: '検索をクリア', cooldown: '次の検索までお待ちください。', operatorHelp: '検索演算子', operatorSite: 'サイト', operatorFiletype: 'ファイル形式', operatorAfter: '指定日以降', operatorBefore: '指定日以前', operatorIntitle: 'タイトル内', operatorInurl: 'URL 内', operatorIntext: '本文内', operatorDefine: '定義', operatorExclude: '除外', operatorExact: '完全一致の語句', operatorExamples: '例:', description: '気を散らさずに検索できるシンプルな検索ページです。', privacy: 'プライバシー', about: '概要', blog: 'ブログ' },
    zh: { pageTitle: 'dodle - 搜索', navLabel: '主导航', themeDark: '切换到深色模式', themeLight: '切换到浅色模式', searchLabel: '搜索网页', searchPlaceholder: '搜索网页', searchButton: '搜索', curiousButton: '我很好奇', curiousAgain: '再来一个', promptReady: '已生成一个好奇主题。你可以修改后再搜索。', clear: '清除搜索', cooldown: '请稍候再搜索。', operatorHelp: '搜索运算符', operatorSite: '限定网站', operatorFiletype: '文件类型', operatorAfter: '指定日期之后', operatorBefore: '指定日期之前', operatorIntitle: '标题中包含', operatorInurl: '网址中包含', operatorIntext: '正文中包含', operatorDefine: '定义', operatorExclude: '排除词语', operatorExact: '精确短语', operatorExamples: '示例：', description: '简单搜索，远离纷扰的网络。', privacy: '隐私', about: '关于', blog: '博客' },
    th: { pageTitle: 'dodle - ค้นหา', navLabel: 'การนำทางหลัก', themeDark: 'เปลี่ยนเป็นโหมดมืด', themeLight: 'เปลี่ยนเป็นโหมดสว่าง', searchLabel: 'ค้นหาเว็บ', searchPlaceholder: 'ค้นหาเว็บ', searchButton: 'ค้นหา', curiousButton: 'ฉันอยากรู้', curiousAgain: 'ลองอีกครั้ง', promptReady: 'สร้างหัวข้อชวนค้นหาแล้ว แก้ไขหรือค้นหาได้เลย', clear: 'ล้างการค้นหา', cooldown: 'โปรดรอสักครู่ก่อนค้นหาอีกครั้ง', operatorHelp: 'ตัวดำเนินการค้นหา', operatorSite: 'เว็บไซต์', operatorFiletype: 'ประเภทไฟล์', operatorAfter: 'หลังวันที่', operatorBefore: 'ก่อนวันที่', operatorIntitle: 'ในชื่อเรื่อง', operatorInurl: 'ใน URL', operatorIntext: 'ในข้อความ', operatorDefine: 'คำจำกัดความ', operatorExclude: 'ยกเว้น', operatorExact: 'วลีตรงตัว', operatorExamples: 'ตัวอย่าง:', description: 'การค้นหาที่เรียบง่ายสำหรับเว็บที่วุ่นวายน้อยลง', privacy: 'ความเป็นส่วนตัว', about: 'เกี่ยวกับ', blog: 'บล็อก' },
    ko: { pageTitle: 'dodle - 검색', navLabel: '주요 탐색', themeDark: '다크 모드로 전환', themeLight: '라이트 모드로 전환', searchLabel: '웹 검색', searchPlaceholder: '웹 검색', searchButton: '검색', curiousButton: '궁금한 것이 있어요', curiousAgain: '다른 주제', promptReady: '궁금한 검색어를 준비했어요. 수정하거나 바로 검색할 수 있어요.', clear: '검색어 지우기', cooldown: '잠시 후 다시 검색해 주세요.', operatorHelp: '검색 연산자', operatorSite: '사이트', operatorFiletype: '파일 형식', operatorAfter: '날짜 이후', operatorBefore: '날짜 이전', operatorIntitle: '제목에서', operatorInurl: 'URL에서', operatorIntext: '본문에서', operatorDefine: '정의', operatorExclude: '제외', operatorExact: '정확한 문구', operatorExamples: '예:', description: '방해 요소를 줄인 간단한 웹 검색입니다.', privacy: '개인정보 보호', about: '소개', blog: '블로그' },
    fr: { pageTitle: 'dodle - Recherche', navLabel: 'Navigation principale', themeDark: 'Passer au mode sombre', themeLight: 'Passer au mode clair', searchLabel: 'Rechercher sur le Web', searchPlaceholder: 'Rechercher sur le Web', searchButton: 'Rechercher', curiousButton: 'Je suis curieux', curiousAgain: 'Une autre idée', promptReady: 'Une idée est prête. Modifiez-la ou lancez la recherche.', clear: 'Effacer la recherche', cooldown: 'Veuillez attendre avant de relancer une recherche.', operatorHelp: 'Opérateurs de recherche', operatorSite: 'Site', operatorFiletype: 'Type de fichier', operatorAfter: 'Après la date', operatorBefore: 'Avant la date', operatorIntitle: 'Dans le titre', operatorInurl: 'Dans l’URL', operatorIntext: 'Dans le texte', operatorDefine: 'Définition', operatorExclude: 'Exclure', operatorExact: 'Expression exacte', operatorExamples: 'Exemples :', description: 'Une recherche simple pour un Web moins distrayant.', privacy: 'Confidentialité', about: 'À propos', blog: 'Blog' },
    de: { pageTitle: 'dodle - Suche', navLabel: 'Hauptnavigation', themeDark: 'Dunklen Modus aktivieren', themeLight: 'Hellen Modus aktivieren', searchLabel: 'Im Web suchen', searchPlaceholder: 'Im Web suchen', searchButton: 'Suchen', curiousButton: 'Ich bin neugierig', curiousAgain: 'Noch eine Idee', promptReady: 'Eine Idee ist bereit. Bearbeite sie oder starte die Suche.', clear: 'Suche löschen', cooldown: 'Bitte warten Sie kurz, bevor Sie erneut suchen.', operatorHelp: 'Suchoperatoren', operatorSite: 'Website', operatorFiletype: 'Dateityp', operatorAfter: 'Nach Datum', operatorBefore: 'Vor Datum', operatorIntitle: 'Im Titel', operatorInurl: 'In der URL', operatorIntext: 'Im Text', operatorDefine: 'Definition', operatorExclude: 'Ausschließen', operatorExact: 'Exakte Wortgruppe', operatorExamples: 'Beispiele:', description: 'Eine einfache Suche für ein weniger ablenkendes Web.', privacy: 'Datenschutz', about: 'Über uns', blog: 'Blog' }
  };

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
    languageToggle.setAttribute('aria-label', `Language ${languageToggle.textContent}`);
    themeToggle.setAttribute('aria-label', document.body.classList.contains('dark') ? translation.themeLight : translation.themeDark);
    languageOptions.forEach(option => option.setAttribute('aria-selected', String(option.dataset.language === selectedLanguage)));
    savePreference('dodle-language', selectedLanguage);
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
    searchQuery.value = interpretQuery(input.value);
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

  if (/["']/.test(query) || /(?:^|\s)(?:site|filetype|after|before|define|intitle|inurl):/i.test(query)) {
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


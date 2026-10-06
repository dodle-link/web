'use strict';

const trendEditions = {
  en: 'English',
  ja: 'Japanese',
  zh: 'Chinese',
  th: 'Thai',
  ko: 'Korean',
  fr: 'French',
  de: 'German'
};

const ideasTranslations = {
  en: {
    pageTitle: 'World Ideas - dodle', description: 'A daily snapshot of popular topics across Wikipedia language editions.',
    navLabel: 'Primary navigation', home: 'Home', languageLabel: 'Choose language', languageAria: 'Language',
    themeLight: 'Switch to light mode', themeDark: 'Switch to dark mode', themeToggle: 'Toggle color theme', kicker: 'Daily signals · Wikipedia pageviews',
    heading: 'What the world is reading', intro: 'A daily snapshot of popular topics across Wikipedia language editions. Select an edition to explore its most-read pages.',
    popularTopics: 'Popular topics', editionLabel: 'Edition', allEditions: 'Worldwide · all editions', refresh: 'Refresh trends',
    loading: 'Loading daily topics…', listLabel: 'Daily popular topics', sourcePrefix: 'Popularity is based on pageviews from the previous UTC day, not real-time search volume. Data:',
    sourceName: 'Wikimedia pageviews', privacy: 'Privacy', blog: 'Blog', noData: 'No pageview data is available for this edition yet.',
    loadError: 'Could not load pageview data. Check your connection and try again.', pageviewsFor: 'Pageviews for',
    partialLoaded: (loaded, total) => ` · ${loaded} of ${total} editions loaded`, editionNames: { en: 'English', ja: 'Japanese', zh: 'Chinese', th: 'Thai', ko: 'Korean', fr: 'French', de: 'German' },
    editionMeta: (name, rank) => `${name} edition · ranked #${rank}`, viewsSuffix: 'views', wikipedia: 'Wikipedia'
  },
  ja: {
    pageTitle: '世界の話題 - dodle', description: 'Wikipedia 各言語版で読まれている記事を毎日紹介します。',
    navLabel: 'メインナビゲーション', home: 'ホーム', languageLabel: '言語を選択', languageAria: '言語',
    themeLight: 'ライトモードに切り替え', themeDark: 'ダークモードに切り替え', themeToggle: 'テーマを切り替え', kicker: '毎日の話題 · Wikipedia ページビュー',
    heading: '世界で読まれている記事', intro: 'Wikipedia 各言語版で読まれている記事を毎日紹介します。言語版を選んで、よく読まれているページを見てみましょう。',
    popularTopics: '人気の話題', editionLabel: '言語版', allEditions: '全世界 · すべての言語版', refresh: '話題を更新',
    loading: '今日の話題を読み込み中…', listLabel: '今日の人気記事', sourcePrefix: '人気度はリアルタイムの検索数ではなく、前日の UTC 日付のページビューに基づいています。データ：',
    sourceName: 'Wikimedia ページビュー', privacy: 'プライバシー', blog: 'ブログ', noData: 'この言語版のページビューデータはまだありません。',
    loadError: 'ページビューデータを読み込めませんでした。接続を確認して再試行してください。', pageviewsFor: 'ページビューの日付：',
    partialLoaded: (loaded, total) => ` · ${total} 言語版中 ${loaded} 件を読み込み`, editionNames: { en: '英語', ja: '日本語', zh: '中国語', th: 'タイ語', ko: '韓国語', fr: 'フランス語', de: 'ドイツ語' },
    editionMeta: (name, rank) => `${name}版 · ${rank} 位`, viewsSuffix: '回表示', wikipedia: 'Wikipedia'
  },
  zh: {
    pageTitle: '全球热门 - dodle', description: '每日查看 Wikipedia 各语言版本的热门话题。',
    navLabel: '主导航', home: '首页', languageLabel: '选择语言', languageAria: '语言',
    themeLight: '切换到浅色模式', themeDark: '切换到深色模式', themeToggle: '切换主题', kicker: '每日动态 · Wikipedia 页面浏览量',
    heading: '世界都在读什么', intro: '每日汇总 Wikipedia 各语言版本的热门话题。选择一个语言版本，查看其中最受关注的页面。',
    popularTopics: '热门话题', editionLabel: '语言版本', allEditions: '全球 · 所有语言版本', refresh: '刷新热门话题',
    loading: '正在加载今日话题…', listLabel: '每日热门话题', sourcePrefix: '热度依据前一 UTC 日的页面浏览量，而非实时搜索量。数据来源：',
    sourceName: '维基媒体页面浏览量', privacy: '隐私', blog: '博客', noData: '此语言版本暂时没有可用的页面浏览数据。',
    loadError: '无法加载页面浏览数据。请检查网络连接后重试。', pageviewsFor: '页面浏览日期：',
    partialLoaded: (loaded, total) => ` · 已加载 ${total} 个语言版本中的 ${loaded} 个`, editionNames: { en: '英语', ja: '日语', zh: '中文', th: '泰语', ko: '韩语', fr: '法语', de: '德语' },
    editionMeta: (name, rank) => `${name}版 · 排名第 ${rank}`, viewsSuffix: '次浏览', wikipedia: '维基百科'
  },
  th: {
    pageTitle: 'ไอเดียทั่วโลก - dodle', description: 'สรุปหัวข้อยอดนิยมประจำวันจากวิกิพีเดียแต่ละภาษา',
    navLabel: 'การนำทางหลัก', home: 'หน้าแรก', languageLabel: 'เลือกภาษา', languageAria: 'ภาษา',
    themeLight: 'เปลี่ยนเป็นโหมดสว่าง', themeDark: 'เปลี่ยนเป็นโหมดมืด', themeToggle: 'สลับธีมสี', kicker: 'กระแสรายวัน · ยอดเข้าชม Wikipedia',
    heading: 'ผู้คนทั่วโลกกำลังอ่านอะไร', intro: 'สรุปหัวข้อยอดนิยมประจำวันจากวิกิพีเดียแต่ละภาษา เลือกภาษาเพื่อดูหน้าที่มีผู้อ่านมากที่สุด',
    popularTopics: 'หัวข้อยอดนิยม', editionLabel: 'ภาษา', allEditions: 'ทั่วโลก · ทุกภาษา', refresh: 'รีเฟรชกระแส',
    loading: 'กำลังโหลดหัวข้อประจำวัน…', listLabel: 'หัวข้อยอดนิยมประจำวัน', sourcePrefix: 'ความนิยมอ้างอิงจากยอดเข้าชมหน้าเว็บของวันก่อนหน้าตามเวลา UTC ไม่ใช่ปริมาณการค้นหาแบบเรียลไทม์ ข้อมูล:',
    sourceName: 'ยอดเข้าชมหน้า Wikimedia', privacy: 'ความเป็นส่วนตัว', blog: 'บล็อก', noData: 'ยังไม่มีข้อมูลยอดเข้าชมสำหรับภาษานี้',
    loadError: 'โหลดข้อมูลยอดเข้าชมไม่ได้ โปรดตรวจสอบการเชื่อมต่อแล้วลองอีกครั้ง', pageviewsFor: 'ยอดเข้าชมวันที่',
    partialLoaded: (loaded, total) => ` · โหลดแล้ว ${loaded} จาก ${total} ภาษา`, editionNames: { en: 'อังกฤษ', ja: 'ญี่ปุ่น', zh: 'จีน', th: 'ไทย', ko: 'เกาหลี', fr: 'ฝรั่งเศส', de: 'เยอรมัน' },
    editionMeta: (name, rank) => `ฉบับ${name} · อันดับ ${rank}`, viewsSuffix: 'ครั้ง', wikipedia: 'วิกิพีเดีย'
  },
  ko: {
    pageTitle: '세계의 화제 - dodle', description: '위키백과 각 언어판의 인기 주제를 매일 소개합니다.',
    navLabel: '주요 탐색', home: '홈', languageLabel: '언어 선택', languageAria: '언어',
    themeLight: '라이트 모드로 전환', themeDark: '다크 모드로 전환', themeToggle: '색상 테마 전환', kicker: '오늘의 흐름 · 위키백과 페이지뷰',
    heading: '세계는 무엇을 읽고 있을까요?', intro: '위키백과 각 언어판의 인기 주제를 매일 살펴보세요. 언어판을 선택하면 가장 많이 읽힌 문서를 볼 수 있습니다.',
    popularTopics: '인기 주제', editionLabel: '언어판', allEditions: '전 세계 · 모든 언어판', refresh: '인기 주제 새로고침',
    loading: '오늘의 주제를 불러오는 중…', listLabel: '오늘의 인기 문서', sourcePrefix: '인기도는 실시간 검색량이 아니라 전날 UTC 기준 페이지뷰를 바탕으로 합니다. 데이터:',
    sourceName: '위키미디어 페이지뷰', privacy: '개인정보 보호', blog: '블로그', noData: '이 언어판에는 아직 페이지뷰 데이터가 없습니다.',
    loadError: '페이지뷰 데이터를 불러오지 못했습니다. 연결을 확인하고 다시 시도해 주세요.', pageviewsFor: '페이지뷰 날짜:',
    partialLoaded: (loaded, total) => ` · ${total}개 언어판 중 ${loaded}개 로드됨`, editionNames: { en: '영어', ja: '일본어', zh: '중국어', th: '태국어', ko: '한국어', fr: '프랑스어', de: '독일어' },
    editionMeta: (name, rank) => `${name} 위키백과 · ${rank}위`, viewsSuffix: '회 조회', wikipedia: '위키백과'
  },
  fr: {
    pageTitle: 'Idées du monde - dodle', description: 'Un aperçu quotidien des sujets populaires sur les différentes éditions linguistiques de Wikipédia.',
    navLabel: 'Navigation principale', home: 'Accueil', languageLabel: 'Choisir la langue', languageAria: 'Langue',
    themeLight: 'Passer au mode clair', themeDark: 'Passer au mode sombre', themeToggle: 'Changer de thème', kicker: 'Tendances du jour · Pages vues sur Wikipédia',
    heading: 'Ce que le monde lit', intro: 'Un aperçu quotidien des sujets populaires sur les différentes éditions linguistiques de Wikipédia. Choisissez une édition pour découvrir ses pages les plus consultées.',
    popularTopics: 'Sujets populaires', editionLabel: 'Édition', allEditions: 'Monde entier · toutes les éditions', refresh: 'Actualiser les tendances',
    loading: 'Chargement des sujets du jour…', listLabel: 'Sujets populaires du jour', sourcePrefix: 'La popularité repose sur les pages consultées la veille en UTC, et non sur les recherches en temps réel. Données :',
    sourceName: 'Pages vues Wikimedia', privacy: 'Confidentialité', blog: 'Blog', noData: 'Aucune donnée de consultation n’est encore disponible pour cette édition.',
    loadError: 'Impossible de charger les pages vues. Vérifiez votre connexion et réessayez.', pageviewsFor: 'Pages vues du',
    partialLoaded: (loaded, total) => ` · ${loaded} édition(s) sur ${total} chargée(s)`, editionNames: { en: 'anglais', ja: 'japonais', zh: 'chinois', th: 'thaï', ko: 'coréen', fr: 'français', de: 'allemand' },
    editionMeta: (name, rank) => `Wikipédia en ${name} · rang nº ${rank}`, viewsSuffix: 'vues', wikipedia: 'Wikipédia'
  },
  de: {
    pageTitle: 'Weltweite Themen - dodle', description: 'Ein täglicher Überblick über beliebte Themen in den verschiedenen Wikipedia-Sprachversionen.',
    navLabel: 'Hauptnavigation', home: 'Startseite', languageLabel: 'Sprache auswählen', languageAria: 'Sprache',
    themeLight: 'Hellen Modus aktivieren', themeDark: 'Dunklen Modus aktivieren', themeToggle: 'Farbschema umschalten', kicker: 'Tagesaktuell · Wikipedia-Seitenaufrufe',
    heading: 'Was die Welt liest', intro: 'Ein täglicher Überblick über beliebte Themen in den verschiedenen Wikipedia-Sprachversionen. Wähle eine Sprachversion, um die meistgelesenen Seiten zu entdecken.',
    popularTopics: 'Beliebte Themen', editionLabel: 'Sprachversion', allEditions: 'Weltweit · alle Sprachversionen', refresh: 'Trends aktualisieren',
    loading: 'Tagesaktuelle Themen werden geladen…', listLabel: 'Beliebte Themen des Tages', sourcePrefix: 'Die Beliebtheit basiert auf Seitenaufrufen des vorherigen UTC-Tages, nicht auf aktuellen Suchanfragen. Daten:',
    sourceName: 'Wikimedia-Seitenaufrufe', privacy: 'Datenschutz', blog: 'Blog', noData: 'Für diese Sprachversion sind noch keine Seitenaufrufe verfügbar.',
    loadError: 'Seitenaufrufe konnten nicht geladen werden. Prüfe deine Verbindung und versuche es erneut.', pageviewsFor: 'Seitenaufrufe vom',
    partialLoaded: (loaded, total) => ` · ${loaded} von ${total} Sprachversionen geladen`, editionNames: { en: 'Englisch', ja: 'Japanisch', zh: 'Chinesisch', th: 'Thailändisch', ko: 'Koreanisch', fr: 'Französisch', de: 'Deutsch' },
    editionMeta: (name, rank) => `Wikipedia auf ${name} · Rang ${rank}`, viewsSuffix: 'Aufrufe', wikipedia: 'Wikipedia'
  }
};

const trendList = document.querySelector('#trends-list');
const trendStatus = document.querySelector('#trends-status');
const editionFilter = document.querySelector('#edition-filter');
const editionMenu = document.querySelector('.edition-menu');
const editionOptions = [...document.querySelectorAll('[data-edition-value]')];
const editionCurrentLabel = document.querySelector('#edition-current-label');
const themeToggle = document.querySelector('.theme-toggle');
const languageToggle = document.querySelector('.language-toggle');
const languageMenu = document.querySelector('.language-menu');
const languageOptions = [...document.querySelectorAll('[data-language]')];
let editionResults = {};
let currentLanguage = 'en';
let hasLoadedTopics = false;
let trendStatusType = 'loading';
let statusDate;
let loadedEditionCount = 0;
const editionCacheKey = 'dodle-ideas-editions-v1';
const editionCacheDuration = 24 * 60 * 60 * 1000;

function setTheme(isDark) {
  document.documentElement.classList.toggle('dark', isDark);
  document.body.classList.toggle('dark', isDark);
  themeToggle.setAttribute('aria-pressed', String(isDark));
  const translation = ideasTranslations[currentLanguage];
  themeToggle.setAttribute('aria-label', isDark ? translation.themeLight : translation.themeDark);
  try {
    localStorage.setItem('dodle-theme', isDark ? 'dark' : 'light');
  } catch {}
}

setTheme(document.documentElement.classList.contains('dark'));
themeToggle.addEventListener('click', () => setTheme(!document.body.classList.contains('dark')));

function setLanguage(language) {
  const selectedLanguage = languageOptions.some(option => option.dataset.language === language) ? language : 'en';
  const translation = ideasTranslations[selectedLanguage];
  const selectedOption = languageOptions.find(option => option.dataset.language === selectedLanguage);
  currentLanguage = selectedLanguage;
  document.documentElement.lang = selectedLanguage;
  document.title = translation.pageTitle;
  document.querySelector('[data-i18n-meta="description"]').content = translation.description;
  document.querySelectorAll('[data-i18n]').forEach(element => {
    element.textContent = translation[element.dataset.i18n];
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(element => {
    const key = element.dataset.i18nAria;
    element.setAttribute('aria-label', translation[key]);
  });
  document.querySelectorAll('[data-i18n-title]').forEach(element => {
    element.setAttribute('title', translation[element.dataset.i18nTitle]);
  });
  document.querySelectorAll('[data-edition]').forEach(option => {
    option.textContent = translation.editionNames[option.dataset.edition];
  });
  const selectedEditionOption = editionOptions.find(option => option.dataset.editionValue === editionFilter.value);
  editionCurrentLabel.textContent = selectedEditionOption.textContent;
  editionOptions.forEach(option => option.setAttribute('aria-selected', String(option === selectedEditionOption)));
  languageToggle.textContent = selectedOption.textContent;
  languageToggle.setAttribute('aria-label', `${translation.languageAria}: ${selectedOption.textContent}`);
  languageOptions.forEach(option => option.setAttribute('aria-selected', String(option === selectedOption)));
  themeToggle.setAttribute('aria-label', document.body.classList.contains('dark') ? translation.themeLight : translation.themeDark);
  updateTrendStatus();
  try {
    localStorage.setItem('dodle-language', selectedLanguage);
  } catch {}
  if (hasLoadedTopics) renderTopics();
}

function updateTrendStatus() {
  const translation = ideasTranslations[currentLanguage];
  if (trendStatusType === 'loading') {
    trendStatus.textContent = translation.loading;
  } else if (trendStatusType === 'error') {
    trendStatus.textContent = translation.loadError;
  } else {
    const dateLabel = new Intl.DateTimeFormat(currentLanguage, {
      dateStyle: 'long'
    }).format(statusDate);
    const partialNote = loadedEditionCount < Object.keys(trendEditions).length
      ? translation.partialLoaded(loadedEditionCount, Object.keys(trendEditions).length)
      : '';
    trendStatus.textContent = `${translation.pageviewsFor} ${dateLabel}${partialNote}`;
  }
}

languageToggle.addEventListener('click', () => {
  languageMenu.hidden = !languageMenu.hidden;
  languageToggle.setAttribute('aria-expanded', String(!languageMenu.hidden));
});
languageOptions.forEach(option => option.addEventListener('click', () => {
  setLanguage(option.dataset.language);
  languageMenu.hidden = true;
  languageToggle.setAttribute('aria-expanded', 'false');
}));
document.addEventListener('click', event => {
  if (!event.target.closest('.language-switcher')) {
    languageMenu.hidden = true;
    languageToggle.setAttribute('aria-expanded', 'false');
  }
  if (!event.target.closest('.edition-switcher')) closeEditionMenu();
});

function closeEditionMenu() {
  editionMenu.hidden = true;
  editionFilter.setAttribute('aria-expanded', 'false');
}

editionFilter.addEventListener('click', () => {
  editionMenu.hidden = !editionMenu.hidden;
  editionFilter.setAttribute('aria-expanded', String(!editionMenu.hidden));
});
editionOptions.forEach(option => option.addEventListener('click', () => {
  editionFilter.value = option.dataset.editionValue;
  editionCurrentLabel.textContent = option.textContent;
  editionOptions.forEach(item => item.setAttribute('aria-selected', String(item === option)));
  closeEditionMenu();
  editionFilter.focus();
  renderTopics();
}));
editionMenu.addEventListener('keydown', event => {
  if (event.key === 'Escape') {
    closeEditionMenu();
    editionFilter.focus();
  }
});

let savedLanguage = 'en';
try {
  savedLanguage = localStorage.getItem('dodle-language') || 'en';
} catch {}
setLanguage(savedLanguage);

function getPreviousUtcDate() {
  const date = new Date();
  date.setUTCHours(0, 0, 0, 0);
  date.setUTCDate(date.getUTCDate() - 1);
  return {
    year: date.getUTCFullYear(),
    month: String(date.getUTCMonth() + 1).padStart(2, '0'),
    day: String(date.getUTCDate()).padStart(2, '0'),
    value: date
  };
}

function getCachedEditions() {
  try {
    const cached = JSON.parse(localStorage.getItem(editionCacheKey));
    const age = Date.now() - cached.savedAt;
    const cachedDate = new Date(cached.statusDate);
    if (!Number.isFinite(cached.savedAt) || age < 0 || age >= editionCacheDuration || Number.isNaN(cachedDate.getTime())) {
      return null;
    }

    const editions = Object.entries(cached.editionResults || {})
      .filter(([code, articles]) => Object.hasOwn(trendEditions, code) && Array.isArray(articles));
    if (editions.length === 0) return null;

    return {
      editionResults: Object.fromEntries(editions),
      statusDate: cachedDate,
      loadedEditionCount: editions.length
    };
  } catch {
    return null;
  }
}

function isUsefulArticle(article) {
  return article.article && article.article !== 'Main_Page' && !article.article.includes(':');
}

async function loadEdition(code, date) {
  const url = `https://wikimedia.org/api/rest_v1/metrics/pageviews/top/${code}.wikipedia/all-access/${date.year}/${date.month}/${date.day}`;
  const response = await fetch(url, { headers: { Accept: 'application/json' } });
  if (!response.ok) throw new Error(`Wikipedia ${code} returned ${response.status}`);

  const data = await response.json();
  const articles = data.items?.[0]?.articles;
  if (!Array.isArray(articles)) throw new Error(`Wikipedia ${code} returned no pageview data`);
  return articles.filter(isUsefulArticle).map(article => ({ ...article, code }));
}

function createTopicRow(article, rank) {
  const translation = ideasTranslations[currentLanguage];
  const item = document.createElement('li');
  item.className = 'ideas-item';

  const rankLabel = document.createElement('span');
  rankLabel.className = 'ideas-rank';
  rankLabel.textContent = String(rank).padStart(2, '0');

  const topic = document.createElement('div');
  topic.className = 'ideas-topic';
  const searchLink = document.createElement('a');
  const title = article.article.replaceAll('_', ' ');
  searchLink.href = `https://www.google.com/search?q=${encodeURIComponent(title)}`;
  searchLink.target = '_blank';
  searchLink.rel = 'noopener noreferrer';
  searchLink.textContent = title;
  topic.append(searchLink);

  const meta = document.createElement('span');
  meta.className = 'ideas-meta';
  meta.textContent = translation.editionMeta(translation.editionNames[article.code], article.rank);
  topic.append(meta);

  const detail = document.createElement('span');
  detail.className = 'ideas-detail';
  const views = document.createElement('span');
  views.textContent = `${new Intl.NumberFormat(currentLanguage).format(article.views)} ${translation.viewsSuffix}`;
  const sourceLink = document.createElement('a');
  sourceLink.href = `https://${article.code}.wikipedia.org/wiki/${encodeURIComponent(article.article)}`;
  sourceLink.target = '_blank';
  sourceLink.rel = 'noopener noreferrer';
  sourceLink.textContent = translation.wikipedia;
  detail.append(views, sourceLink);

  item.append(rankLabel, topic, detail);
  return item;
}

function getWorldwideTopics() {
  return Object.values(editionResults)
    .flat()
    .sort((first, second) => first.rank - second.rank || first.code.localeCompare(second.code));
}

function renderTopics() {
  const translation = ideasTranslations[currentLanguage];
  const selectedEdition = editionFilter.value;
  const topics = selectedEdition === 'all'
    ? getWorldwideTopics()
    : (editionResults[selectedEdition] || []);

  trendList.replaceChildren();
  if (topics.length === 0) {
    const empty = document.createElement('li');
    empty.className = 'ideas-empty';
    empty.textContent = translation.noData;
    trendList.append(empty);
    return;
  }

  topics.slice(0, 40).forEach((article, index) => {
    trendList.append(createTopicRow(article, index + 1));
  });
}

async function refreshTopics() {
  const cached = getCachedEditions();
  if (cached) {
    editionResults = cached.editionResults;
    statusDate = cached.statusDate;
    loadedEditionCount = cached.loadedEditionCount;
    hasLoadedTopics = true;
    trendStatusType = 'loaded';
    updateTrendStatus();
    renderTopics();
    return;
  }

  trendStatusType = 'loading';
  updateTrendStatus();
  const date = getPreviousUtcDate();
  const results = await Promise.allSettled(
    Object.keys(trendEditions).map(code => loadEdition(code, date))
  );

  editionResults = {};
  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      editionResults[Object.keys(trendEditions)[index]] = result.value;
    }
  });

  hasLoadedTopics = true;
  loadedEditionCount = Object.keys(editionResults).length;
  trendStatusType = loadedEditionCount === 0 ? 'error' : 'loaded';
  statusDate = date.value;
  if (loadedEditionCount > 0) {
    try {
      localStorage.setItem(editionCacheKey, JSON.stringify({
        savedAt: Date.now(),
        statusDate: statusDate.toISOString(),
        editionResults
      }));
    } catch {}
  }
  updateTrendStatus();

  renderTopics();
}

refreshTopics();
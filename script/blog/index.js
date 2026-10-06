'use strict';

const blogTranslations = {
  en: {
    pageTitle: 'Blog - dodle', description: 'Stories about food traditions, ingredients, and everyday food culture.',
    navLabel: 'Primary navigation', languageLabel: 'Choose language', languageAria: 'Language', articlesLabel: 'Articles',
    home: 'Home', privacy: 'Privacy', heading: 'Blog',
    intro: 'Stories about food traditions, ingredients, and the everyday rituals around them.',
    articleTitle: 'Traditional Snacks', articleExcerpt: 'From onigiri and poha to samosas and arepas, explore the local ingredients and shared traditions behind familiar small bites.', readMore: 'Read article'
  },
  ja: {
    pageTitle: 'ブログ - dodle', description: '食の伝統や食材、日々の食文化についての読みものです。',
    navLabel: 'メインナビゲーション', languageLabel: '言語を選択', languageAria: '言語', articlesLabel: '記事',
    home: 'ホーム', privacy: 'プライバシー', heading: 'ブログ',
    intro: '食の伝統や食材、食を囲む日々の習慣についてお届けします。',
    articleTitle: '伝統的なおやつ', articleExcerpt: 'おにぎりやポハ、サモサ、アレパを通して、身近な軽食に息づく地域の食材と分かち合う習慣をたどります。', readMore: '記事を読む'
  },
  zh: {
    pageTitle: '博客 - dodle', description: '关于饮食传统、食材和日常饮食文化的文章。',
    navLabel: '主导航', languageLabel: '选择语言', languageAria: '语言', articlesLabel: '文章',
    home: '首页', privacy: '隐私', heading: '博客',
    intro: '分享关于饮食传统、食材以及日常餐桌习惯的故事。',
    articleTitle: '传统小吃', articleExcerpt: '从饭团、波哈到萨莫萨和阿雷帕，看看熟悉的小吃如何承载当地食材与分享传统。', readMore: '阅读文章'
  },
  th: {
    pageTitle: 'บล็อก - dodle', description: 'เรื่องราวเกี่ยวกับธรรมเนียมอาหาร วัตถุดิบ และวัฒนธรรมอาหารในชีวิตประจำวัน',
    navLabel: 'การนำทางหลัก', languageLabel: 'เลือกภาษา', languageAria: 'ภาษา', articlesLabel: 'บทความ',
    home: 'หน้าแรก', privacy: 'ความเป็นส่วนตัว', heading: 'บล็อก',
    intro: 'เรื่องราวเกี่ยวกับธรรมเนียมอาหาร วัตถุดิบ และกิจวัตรในชีวิตประจำวัน',
    articleTitle: 'ขนมกินเล่นแบบดั้งเดิม', articleExcerpt: 'จากโอนิกิริและโพฮาไปจนถึงซาโมซาและอาเรปา มาสำรวจวัตถุดิบท้องถิ่นและวัฒนธรรมการแบ่งปันที่อยู่ในของว่างคุ้นเคย', readMore: 'อ่านบทความ'
  },
  ko: {
    pageTitle: '블로그 - dodle', description: '음식 전통과 식재료, 일상의 음식 문화에 관한 이야기입니다.',
    navLabel: '주요 탐색', languageLabel: '언어 선택', languageAria: '언어', articlesLabel: '글',
    home: '홈', privacy: '개인정보 보호', heading: '블로그',
    intro: '음식 전통과 식재료, 그와 함께하는 일상의 이야기를 전합니다.',
    articleTitle: '전통 간식', articleExcerpt: '오니기리와 포하부터 사모사와 아레파까지, 익숙한 간식에 담긴 지역 식재료와 나눔의 문화를 살펴봅니다.', readMore: '글 읽기'
  },
  fr: {
    pageTitle: 'Blog - dodle', description: 'Des récits autour des traditions culinaires, des ingrédients et de la culture du quotidien.',
    navLabel: 'Navigation principale', languageLabel: 'Choisir la langue', languageAria: 'Langue', articlesLabel: 'Articles',
    home: 'Accueil', privacy: 'Confidentialité', heading: 'Blog',
    intro: 'Des récits autour des traditions culinaires, des ingrédients et des gestes du quotidien.',
    articleTitle: 'En-cas traditionnels', articleExcerpt: 'Des onigiri et du poha aux samoussas et aux arepas, découvrez les ingrédients locaux et les traditions du partage qui se cachent derrière ces petites bouchées.', readMore: 'Lire l’article'
  },
  de: {
    pageTitle: 'Blog - dodle', description: 'Geschichten über kulinarische Traditionen, Zutaten und Esskultur im Alltag.',
    navLabel: 'Hauptnavigation', languageLabel: 'Sprache auswählen', languageAria: 'Sprache', articlesLabel: 'Artikel',
    home: 'Startseite', privacy: 'Datenschutz', heading: 'Blog',
    intro: 'Geschichten über kulinarische Traditionen, Zutaten und alltägliche Essgewohnheiten.',
    articleTitle: 'Traditionelle Snacks', articleExcerpt: 'Von Onigiri und Poha bis zu Samosas und Arepas: Entdecken Sie regionale Zutaten und gemeinsame Traditionen hinter vertrauten Häppchen.', readMore: 'Artikel lesen'
  }
};

const languageToggle = document.querySelector('.language-toggle');
const languageMenu = document.querySelector('.language-menu');
const languageOptions = [...document.querySelectorAll('[data-language]')];

function applyBlogLanguage(language, savePreference = false) {
  const selectedLanguage = blogTranslations[language] ? language : 'en';
  const translation = blogTranslations[selectedLanguage];

  document.documentElement.lang = selectedLanguage;
  document.title = translation.pageTitle;
  languageToggle.textContent = languageOptions.find(option => option.dataset.language === selectedLanguage).textContent;
  languageToggle.setAttribute('aria-label', `${translation.languageAria}: ${languageToggle.textContent}`);
  languageOptions.forEach(option => option.setAttribute('aria-selected', String(option.dataset.language === selectedLanguage)));

  document.querySelectorAll('[data-i18n]').forEach(element => {
    element.textContent = translation[element.dataset.i18n];
  });
  document.querySelectorAll('[data-i18n-aria]').forEach(element => {
    element.setAttribute('aria-label', translation[element.dataset.i18nAria]);
  });
  document.querySelector('[data-i18n-meta="description"]').content = translation.description;

  if (savePreference) {
    try {
      localStorage.setItem('dodle-language', selectedLanguage);
    } catch {}
  }
}

languageToggle.addEventListener('click', () => {
  languageMenu.hidden = !languageMenu.hidden;
  languageToggle.setAttribute('aria-expanded', String(!languageMenu.hidden));
});
languageOptions.forEach(option => option.addEventListener('click', () => {
  applyBlogLanguage(option.dataset.language, true);
  languageMenu.hidden = true;
  languageToggle.setAttribute('aria-expanded', 'false');
}));
document.addEventListener('click', event => {
  if (!event.target.closest('.language-switcher')) {
    languageMenu.hidden = true;
    languageToggle.setAttribute('aria-expanded', 'false');
  }
});

let savedLanguage = 'en';
try {
  savedLanguage = localStorage.getItem('dodle-language') || 'en';
} catch {}

applyBlogLanguage(savedLanguage);
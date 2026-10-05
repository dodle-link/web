'use strict';

const aboutTranslations = {
  en: {
    pageTitle: 'About - dodle', description: 'About Dodle Search', navLabel: 'Primary navigation', home: 'Home', languageLabel: 'Choose language', heading: 'About Dodle',
    intro: 'Dodle is a simple search homepage designed to make the web feel a little less distracting. No account is needed to use it.',
    searchHeading: 'Search, kept simple', search: 'Enter a query to search the web with Google, or use “I\'m Feeling Curious” for a prompt that might lead somewhere unexpected. Search queries are sent directly to Google Search.',
    noeHeading: 'A little company', noe: 'Dodle also features Noe, a small pixel companion that responds to activity on the page. Its motion and interaction are handled in your browser.',
    projectHeading: 'The project', projectBefore: 'Dodle is an independent, open-source project. You can explore its source or get in touch through the ', repository: 'Dodle Web project repository', privacy: 'Privacy'
  },
  ja: {
    pageTitle: 'Dodle について - dodle', description: 'Dodle Search について', navLabel: 'メインナビゲーション', home: 'ホーム', languageLabel: '言語を選択', heading: 'Dodle について',
    intro: 'Dodle は、ウェブを少しだけ気軽に使えるようにデザインされたシンプルな検索ホームページです。アカウントは必要ありません。',
    searchHeading: 'シンプルな検索', search: '検索語を入力して Google でウェブを検索できます。「気になる検索」を使うと、思いがけない発見につながるお題が表示されます。検索語は Google 検索に直接送信されます。',
    noeHeading: '小さな相棒', noe: 'Dodle には、ページ上の操作に反応する小さなピクセルの相棒 Noe もいます。動きや操作はブラウザー内で処理されます。',
    projectHeading: 'プロジェクト', projectBefore: 'Dodle は独立したオープンソースプロジェクトです。ソースコードの確認やお問い合わせは、', repository: 'Dodle Web プロジェクトリポジトリ', privacy: 'プライバシー'
  },
  zh: {
    pageTitle: '关于 Dodle - dodle', description: '关于 Dodle 搜索', navLabel: '主导航', home: '首页', languageLabel: '选择语言', heading: '关于 Dodle',
    intro: 'Dodle 是一个简洁的搜索主页，旨在让网络少一些干扰。使用时无需创建账户。',
    searchHeading: '简洁搜索', search: '输入查询即可使用 Google 搜索网页，也可以点击“我很好奇”获取一个可能带来意外发现的提示。查询会直接发送到 Google 搜索。',
    noeHeading: '小小伙伴', noe: 'Dodle 还加入了像素小伙伴 Noe，它会对页面上的活动作出反应。它的动作和交互都在浏览器中处理。',
    projectHeading: '项目', projectBefore: 'Dodle 是一个独立的开源项目。您可以通过', repository: 'Dodle Web 项目仓库', privacy: '隐私'
  },
  th: {
    pageTitle: 'เกี่ยวกับ Dodle - dodle', description: 'เกี่ยวกับ Dodle Search', navLabel: 'การนำทางหลัก', home: 'หน้าแรก', languageLabel: 'เลือกภาษา', heading: 'เกี่ยวกับ Dodle',
    intro: 'Dodle เป็นหน้าเว็บค้นหาที่เรียบง่าย ออกแบบมาเพื่อให้เว็บมีสิ่งรบกวนน้อยลง ไม่จำเป็นต้องมีบัญชีเพื่อใช้งาน',
    searchHeading: 'ค้นหาอย่างเรียบง่าย', search: 'ป้อนคำค้นเพื่อค้นหาเว็บด้วย Google หรือเลือก “ฉันอยากรู้” เพื่อรับหัวข้อที่อาจนำไปสู่การค้นพบที่ไม่คาดคิด คำค้นจะถูกส่งตรงไปยัง Google Search',
    noeHeading: 'เพื่อนตัวน้อย', noe: 'Dodle ยังมี Noe เพื่อนพิกเซลตัวเล็กที่ตอบสนองต่อกิจกรรมบนหน้าเว็บ การเคลื่อนไหวและการโต้ตอบทำงานในเบราว์เซอร์ของคุณ',
    projectHeading: 'โครงการ', projectBefore: 'Dodle เป็นโครงการโอเพนซอร์สอิสระ คุณสามารถดูซอร์สโค้ดหรือติดต่อผ่าน', repository: 'คลังโครงการ Dodle Web', privacy: 'ความเป็นส่วนตัว'
  },
  ko: {
    pageTitle: 'Dodle 소개 - dodle', description: 'Dodle 검색 소개', navLabel: '주요 탐색', home: '홈', languageLabel: '언어 선택', heading: 'Dodle 소개',
    intro: 'Dodle은 웹의 방해 요소를 조금 줄이도록 설계된 간단한 검색 홈페이지입니다. 계정 없이 사용할 수 있습니다.',
    searchHeading: '간편한 검색', search: '검색어를 입력해 Google로 웹을 검색하거나 “궁금한 것이 있어요”를 눌러 예상치 못한 발견으로 이어질 수 있는 주제를 받아 보세요. 검색어는 Google 검색으로 직접 전송됩니다.',
    noeHeading: '작은 동반자', noe: 'Dodle에는 페이지 활동에 반응하는 작은 픽셀 동반자 Noe도 있습니다. 움직임과 상호작용은 브라우저에서 처리됩니다.',
    projectHeading: '프로젝트', projectBefore: 'Dodle은 독립적인 오픈 소스 프로젝트입니다. 소스 코드를 살펴보거나 다음', repository: 'Dodle Web 프로젝트 저장소', privacy: '개인정보 보호'
  },
  fr: {
    pageTitle: 'À propos - dodle', description: 'À propos de Dodle Search', navLabel: 'Navigation principale', home: 'Accueil', languageLabel: 'Choisir la langue', heading: 'À propos de Dodle',
    intro: 'Dodle est une page de recherche simple, conçue pour rendre le Web un peu moins distrayant. Aucun compte n’est nécessaire.',
    searchHeading: 'La recherche, en toute simplicité', search: 'Saisissez une requête pour lancer une recherche sur le Web avec Google, ou choisissez « Je suis curieux » pour découvrir une suggestion inattendue. Les requêtes sont envoyées directement à Google Search.',
    noeHeading: 'Un petit compagnon', noe: 'Dodle propose aussi Noe, un petit compagnon pixelisé qui réagit à l’activité sur la page. Ses mouvements et interactions sont traités dans votre navigateur.',
    projectHeading: 'Le projet', projectBefore: 'Dodle est un projet indépendant et open source. Vous pouvez consulter son code ou nous contacter via le ', repository: 'dépôt du projet Dodle Web', privacy: 'Confidentialité'
  },
  de: {
    pageTitle: 'Über Dodle - dodle', description: 'Über Dodle Search', navLabel: 'Hauptnavigation', home: 'Startseite', languageLabel: 'Sprache auswählen', heading: 'Über Dodle',
    intro: 'Dodle ist eine einfache Suchstartseite, die das Web ein wenig weniger ablenkend machen soll. Ein Konto ist nicht erforderlich.',
    searchHeading: 'Einfach suchen', search: 'Geben Sie eine Suchanfrage ein, um mit Google im Web zu suchen, oder wählen Sie „Ich bin neugierig“ für einen Impuls, der zu einer unerwarteten Entdeckung führen kann. Suchanfragen werden direkt an Google Search gesendet.',
    noeHeading: 'Ein kleiner Begleiter', noe: 'Dodle bietet außerdem Noe, einen kleinen Pixel-Begleiter, der auf Aktivitäten auf der Seite reagiert. Bewegung und Interaktion werden in Ihrem Browser verarbeitet.',
    projectHeading: 'Das Projekt', projectBefore: 'Dodle ist ein unabhängiges Open-Source-Projekt. Den Quellcode finden Sie im ', repository: 'Dodle-Web-Projektrepository', privacy: 'Datenschutz'
  }
};

const languageToggle = document.querySelector('.language-toggle');
const languageMenu = document.querySelector('.language-menu');
const languageOptions = [...document.querySelectorAll('[data-language]')];

function applyAboutLanguage(language, savePreference = false) {
  const selectedLanguage = aboutTranslations[language] ? language : 'en';
  const translation = aboutTranslations[selectedLanguage];

  document.documentElement.lang = selectedLanguage;
  document.title = translation.pageTitle;
  languageToggle.textContent = languageOptions.find(option => option.dataset.language === selectedLanguage).textContent;
  languageToggle.setAttribute('aria-label', `Language ${languageToggle.textContent}`);
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
  applyAboutLanguage(option.dataset.language, true);
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

applyAboutLanguage(savedLanguage);
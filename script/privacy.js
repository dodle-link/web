'use strict';

const privacyTranslations = {
  en: {
    pageTitle: 'Privacy - dodle', description: 'Dodle Search privacy policy', navLabel: 'Primary navigation', home: 'Home', languageLabel: 'Choose language', heading: 'Privacy', updated: 'Last updated:',
    intro: 'Dodle is a static search homepage. You do not need an account to use it. This page explains what happens when you visit Dodle and use its search features.',
    searchHeading: 'Searches', searchBefore: 'When you submit a search, Dodle sends your query to Google Search. The query is included in the request to Google, which may also receive information such as your IP address, browser details, and cookies according to your browser settings. Google handles that information under its own ', googlePrivacy: 'privacy policy',
    storageHeading: 'Browser storage and interaction', storage1: "Dodle stores your theme preference, language preference, and Noe model in your browser's local storage. The page also processes pointer, keyboard, scroll, touch, and focus activity in your browser to run the Noe experience. These interaction signals are not sent to a Dodle server by the site code.", storage2: "This information is stored on your device, not in a Dodle account. You can remove it by clearing this site's data in your browser. Clearing it also resets saved preferences.",
    thirdHeading: 'Third-party services', thirdBefore: 'Dodle loads web fonts from Google Fonts. When your browser requests those fonts, Google may receive technical information such as your IP address and browser details. See ', thirdAfter: " for how Google handles that information.", third2: 'Dodle does not currently use its own analytics tools or set its own cookies. Google Search and the hosting provider may process data under their own practices.',
    hostingHeading: 'Hosting logs', hosting: "The provider that hosts this website receives requests needed to deliver the pages. The provider may record information such as IP addresses, request times, requested pages, and browser details in server logs. The hosting provider and its retention period depend on the site's hosting configuration; consult that provider's privacy information for details.",
    changesHeading: 'Changes and questions', changesBefore: 'This policy may be updated if the site or its services change. For questions about this policy, contact the operator through the ', repository: 'Dodle Web project repository', changesAfter: '. Please do not post sensitive personal information in public issues.', footerPrivacy: 'Privacy'
  },
  ja: {
    pageTitle: 'プライバシー - dodle', description: 'Dodle Search のプライバシーポリシー', navLabel: 'メインナビゲーション', home: 'ホーム', languageLabel: '言語を選択', heading: 'プライバシー', updated: '最終更新日:',
    intro: 'Dodle は静的な検索ホームページです。利用にアカウントは必要ありません。このページでは、Dodle の訪問時および検索機能の利用時に取り扱われる情報を説明します。',
    searchHeading: '検索', searchBefore: '検索を送信すると、Dodle は検索語を Google 検索に送信します。検索語は Google へのリクエストに含まれます。また、ブラウザーの設定に応じて、IP アドレス、ブラウザー情報、Cookie などが Google に送信される場合があります。Google はこれらの情報を独自の', googlePrivacy: 'プライバシーポリシー',
    storageHeading: 'ブラウザー内の保存と操作', storage1: 'Dodle はテーマ、言語の設定、および Noe モデルをブラウザーのローカルストレージに保存します。また、Noe の機能を動作させるため、ポインター、キーボード、スクロール、タッチ、フォーカスの操作をブラウザー内で処理します。サイトのコードは、これらの操作情報を Dodle のサーバーに送信しません。', storage2: 'これらの情報は Dodle のアカウントではなく、お使いの端末に保存されます。ブラウザーでこのサイトのデータを消去すると削除できます。保存した設定もリセットされます。',
    thirdHeading: '第三者サービス', thirdBefore: 'Dodle は Google Fonts のウェブフォントを読み込みます。ブラウザーがフォントをリクエストすると、IP アドレスやブラウザー情報などの技術情報が Google に送信される場合があります。情報の取り扱いについては、Google の', thirdAfter: 'をご確認ください。', third2: 'Dodle は現在、独自の解析ツールを使用せず、独自の Cookie も設定していません。Google 検索およびホスティング事業者は、それぞれの方針に基づいてデータを処理する場合があります。',
    hostingHeading: 'ホスティングのアクセスログ', hosting: 'ウェブサイトのホスティング事業者は、ページを配信するために必要なリクエストを受け取ります。事業者は、IP アドレス、リクエスト日時、アクセスしたページ、ブラウザー情報などをサーバーログに記録する場合があります。事業者とログの保存期間はサイトのホスティング設定によって異なります。詳細は事業者のプライバシー情報をご確認ください。',
    changesHeading: '変更とお問い合わせ', changesBefore: 'サイトまたはサービスの変更に伴い、このポリシーを更新することがあります。ポリシーに関する質問は、運営者まで', repository: 'Dodle Web プロジェクトリポジトリ', changesAfter: 'を通じてお問い合わせください。公開された課題には機微な個人情報を投稿しないでください。', footerPrivacy: 'プライバシー'
  },
  zh: {
    pageTitle: '隐私 - dodle', description: 'Dodle 搜索隐私政策', navLabel: '主导航', home: '首页', languageLabel: '选择语言', heading: '隐私', updated: '最后更新：',
    intro: 'Dodle 是一个静态搜索主页。使用时无需创建账户。本页面说明访问 Dodle 和使用搜索功能时会发生什么。',
    searchHeading: '搜索', searchBefore: '提交搜索后，Dodle 会将您的查询发送到 Google 搜索。查询会包含在发送给 Google 的请求中。根据您的浏览器设置，Google 还可能收到您的 IP 地址、浏览器信息和 Cookie 等信息。Google 会按照其', googlePrivacy: '隐私政策',
    storageHeading: '浏览器存储与交互', storage1: 'Dodle 会将主题偏好、语言偏好和 Noe 模型保存在浏览器的本地存储中。页面还会在浏览器中处理指针、键盘、滚动、触摸和焦点活动，以运行 Noe 体验。网站代码不会将这些交互信号发送到 Dodle 服务器。', storage2: '这些信息保存在您的设备上，不会关联到 Dodle 账户。您可以在浏览器中清除此网站的数据来删除它们；清除后，已保存的偏好设置也会重置。',
    thirdHeading: '第三方服务', thirdBefore: 'Dodle 使用 Google Fonts 加载网页字体。浏览器请求这些字体时，Google 可能会收到 IP 地址和浏览器信息等技术信息。关于 Google 如何处理这些信息，请参阅', thirdAfter: '。', third2: 'Dodle 目前不使用自有分析工具，也不设置自有 Cookie。Google 搜索和托管服务提供商可能按照各自的做法处理数据。',
    hostingHeading: '托管日志', hosting: '托管本网站的服务提供商会收到用于传送网页的请求。服务提供商可能会在服务器日志中记录 IP 地址、请求时间、访问的页面和浏览器信息等。服务提供商及日志保留期限取决于网站的托管配置；详情请查阅该服务提供商的隐私说明。',
    changesHeading: '政策变更与问题', changesBefore: '如果网站或服务发生变化，我们可能会更新本政策。如有关于本政策的问题，请通过', repository: 'Dodle Web 项目仓库', changesAfter: '联系运营者。请勿在公开议题中发布敏感个人信息。', footerPrivacy: '隐私'
  },
  th: {
    pageTitle: 'ความเป็นส่วนตัว - dodle', description: 'นโยบายความเป็นส่วนตัวของ Dodle Search', navLabel: 'การนำทางหลัก', home: 'หน้าแรก', languageLabel: 'เลือกภาษา', heading: 'ความเป็นส่วนตัว', updated: 'อัปเดตล่าสุด:',
    intro: 'Dodle เป็นหน้าเว็บค้นหาแบบสแตติก คุณไม่จำเป็นต้องมีบัญชีเพื่อใช้งาน หน้านี้อธิบายสิ่งที่เกิดขึ้นเมื่อคุณเข้าชม Dodle และใช้ฟังก์ชันค้นหา',
    searchHeading: 'การค้นหา', searchBefore: 'เมื่อคุณส่งคำค้น Dodle จะส่งคำค้นนั้นไปยัง Google Search คำค้นจะอยู่ในคำขอที่ส่งไปยัง Google และ Google อาจได้รับข้อมูล เช่น ที่อยู่ IP รายละเอียดเบราว์เซอร์ และคุกกี้ ตามการตั้งค่าเบราว์เซอร์ของคุณ Google จัดการข้อมูลดังกล่าวตาม', googlePrivacy: 'นโยบายความเป็นส่วนตัว',
    storageHeading: 'พื้นที่จัดเก็บในเบราว์เซอร์และการโต้ตอบ', storage1: 'Dodle จัดเก็บการตั้งค่าธีม ภาษา และโมเดล Noe ไว้ในพื้นที่จัดเก็บในเบราว์เซอร์ของคุณ หน้านี้ยังประมวลผลกิจกรรมตัวชี้ เมาส์ แป้นพิมพ์ การเลื่อน การสัมผัส และโฟกัสภายในเบราว์เซอร์เพื่อให้ Noe ทำงานได้ โค้ดของเว็บไซต์จะไม่ส่งสัญญาณการโต้ตอบเหล่านี้ไปยังเซิร์ฟเวอร์ของ Dodle', storage2: 'ข้อมูลนี้จัดเก็บไว้บนอุปกรณ์ของคุณ ไม่ได้อยู่ในบัญชี Dodle คุณลบข้อมูลได้โดยล้างข้อมูลเว็บไซต์นี้ในเบราว์เซอร์ การล้างข้อมูลจะรีเซ็ตการตั้งค่าที่บันทึกไว้ด้วย',
    thirdHeading: 'บริการจากบุคคลที่สาม', thirdBefore: 'Dodle โหลดแบบอักษรเว็บจาก Google Fonts เมื่อเบราว์เซอร์ของคุณขอแบบอักษรเหล่านั้น Google อาจได้รับข้อมูลทางเทคนิค เช่น ที่อยู่ IP และรายละเอียดเบราว์เซอร์ ดู', thirdAfter: 'เพื่ออ่านวิธีที่ Google จัดการข้อมูลดังกล่าว', third2: 'ขณะนี้ Dodle ไม่ได้ใช้เครื่องมือวิเคราะห์ข้อมูลของตนเองหรือกำหนดคุกกี้ของตนเอง Google Search และผู้ให้บริการโฮสติ้งอาจประมวลผลข้อมูลตามแนวทางของแต่ละราย',
    hostingHeading: 'บันทึกของผู้ให้บริการโฮสติ้ง', hosting: 'ผู้ให้บริการโฮสติ้งเว็บไซต์นี้ได้รับคำขอที่จำเป็นต่อการส่งหน้าเว็บ ผู้ให้บริการอาจบันทึกข้อมูล เช่น ที่อยู่ IP เวลาที่ส่งคำขอ หน้าที่เข้าชม และรายละเอียดเบราว์เซอร์ไว้ในบันทึกเซิร์ฟเวอร์ ผู้ให้บริการและระยะเวลาการเก็บบันทึกขึ้นอยู่กับการตั้งค่าโฮสติ้งของเว็บไซต์ โปรดดูข้อมูลความเป็นส่วนตัวของผู้ให้บริการเพื่อทราบรายละเอียด',
    changesHeading: 'การเปลี่ยนแปลงและคำถาม', changesBefore: 'เราอาจปรับปรุงนโยบายนี้เมื่อเว็บไซต์หรือบริการมีการเปลี่ยนแปลง หากมีคำถามเกี่ยวกับนโยบายนี้ โปรดติดต่อผู้ดูแลผ่าน', repository: 'คลังโครงการ Dodle Web', changesAfter: 'โปรดอย่าโพสต์ข้อมูลส่วนบุคคลที่ละเอียดอ่อนในประเด็นสาธารณะ', footerPrivacy: 'ความเป็นส่วนตัว'
  },
  ko: {
    pageTitle: '개인정보 보호 - dodle', description: 'Dodle 검색 개인정보 처리방침', navLabel: '주요 탐색', home: '홈', languageLabel: '언어 선택', heading: '개인정보 보호', updated: '최종 업데이트:',
    intro: 'Dodle은 정적 검색 홈페이지입니다. 이용을 위해 계정이 필요하지 않습니다. 이 페이지에서는 Dodle 방문 및 검색 기능 이용 시 정보가 어떻게 처리되는지 설명합니다.',
    searchHeading: '검색', searchBefore: '검색을 제출하면 Dodle은 검색어를 Google 검색으로 보냅니다. 검색어는 Google에 보내는 요청에 포함됩니다. 브라우저 설정에 따라 IP 주소, 브라우저 정보, 쿠키 등의 정보도 Google에 전달될 수 있습니다. Google은 해당 정보를 자체', googlePrivacy: '개인정보처리방침',
    storageHeading: '브라우저 저장소 및 상호작용', storage1: 'Dodle은 테마와 언어 설정, Noe 모델을 브라우저의 로컬 저장소에 저장합니다. 또한 Noe 기능을 실행하기 위해 포인터, 키보드, 스크롤, 터치, 포커스 활동을 브라우저 내에서 처리합니다. 사이트 코드는 이러한 상호작용 신호를 Dodle 서버로 보내지 않습니다.', storage2: '이 정보는 Dodle 계정이 아니라 사용자의 기기에 저장됩니다. 브라우저에서 이 사이트의 데이터를 삭제하면 정보를 지울 수 있으며, 저장된 설정도 초기화됩니다.',
    thirdHeading: '제3자 서비스', thirdBefore: 'Dodle은 Google Fonts에서 웹 글꼴을 불러옵니다. 브라우저가 글꼴을 요청하면 Google은 IP 주소와 브라우저 정보 등의 기술 정보를 받을 수 있습니다. Google의 정보 처리 방식은', thirdAfter: '에서 확인할 수 있습니다.', third2: 'Dodle은 현재 자체 분석 도구를 사용하거나 자체 쿠키를 설정하지 않습니다. Google 검색과 호스팅 제공업체는 각자의 정책에 따라 데이터를 처리할 수 있습니다.',
    hostingHeading: '호스팅 로그', hosting: '이 웹사이트의 호스팅 제공업체는 페이지 제공에 필요한 요청을 받습니다. 제공업체는 IP 주소, 요청 시간, 요청한 페이지, 브라우저 정보 등을 서버 로그에 기록할 수 있습니다. 제공업체와 로그 보관 기간은 사이트의 호스팅 구성에 따라 다르므로 자세한 내용은 해당 제공업체의 개인정보 안내를 확인하세요.',
    changesHeading: '변경 사항 및 문의', changesBefore: '사이트나 서비스가 변경되면 이 방침을 업데이트할 수 있습니다. 이 방침에 관한 질문은 다음', repository: 'Dodle Web 프로젝트 저장소', changesAfter: '를 통해 운영자에게 문의하세요. 공개 이슈에 민감한 개인정보를 게시하지 마세요.', footerPrivacy: '개인정보 보호'
  },
  fr: {
    pageTitle: 'Confidentialité - dodle', description: 'Politique de confidentialité de Dodle Search', navLabel: 'Navigation principale', home: 'Accueil', languageLabel: 'Choisir la langue', heading: 'Confidentialité', updated: 'Dernière mise à jour :',
    intro: 'Dodle est une page d’accueil de recherche statique. Aucun compte n’est nécessaire pour l’utiliser. Cette page explique ce qui se passe lorsque vous consultez Dodle et utilisez ses fonctions de recherche.',
    searchHeading: 'Recherches', searchBefore: 'Lorsque vous lancez une recherche, Dodle transmet votre requête à Google Search. La requête figure dans la demande envoyée à Google, qui peut également recevoir des informations telles que votre adresse IP, des détails sur votre navigateur et des cookies, selon les paramètres de celui-ci. Google traite ces informations conformément à sa ', googlePrivacy: 'politique de confidentialité',
    storageHeading: 'Stockage dans le navigateur et interactions', storage1: 'Dodle enregistre vos préférences de thème et de langue ainsi que le modèle Noe dans le stockage local de votre navigateur. La page traite également dans votre navigateur les mouvements du pointeur, les activités du clavier, le défilement, les interactions tactiles et la mise au point afin de faire fonctionner l’expérience Noe. Le code du site n’envoie pas ces signaux d’interaction à un serveur Dodle.', storage2: 'Ces informations sont enregistrées sur votre appareil et non dans un compte Dodle. Vous pouvez les supprimer en effaçant les données de ce site dans votre navigateur. Cette opération réinitialise également les préférences enregistrées.',
    thirdHeading: 'Services tiers', thirdBefore: 'Dodle charge des polices Web depuis Google Fonts. Lorsque votre navigateur demande ces polices, Google peut recevoir des informations techniques telles que votre adresse IP et des détails sur votre navigateur. Consultez la ', thirdAfter: ' de Google pour savoir comment ces informations sont traitées.', third2: 'Dodle n’utilise actuellement aucun outil d’analyse qui lui soit propre et ne dépose pas ses propres cookies. Google Search et l’hébergeur peuvent traiter des données selon leurs propres pratiques.',
    hostingHeading: 'Journaux d’hébergement', hosting: 'L’hébergeur de ce site reçoit les requêtes nécessaires à l’affichage des pages. Il peut consigner dans ses journaux des informations telles que les adresses IP, les heures des requêtes, les pages demandées et les détails du navigateur. L’hébergeur et la durée de conservation dépendent de la configuration d’hébergement du site ; consultez les informations de confidentialité de cet hébergeur pour en savoir plus.',
    changesHeading: 'Modifications et questions', changesBefore: 'Cette politique peut être mise à jour si le site ou ses services évoluent. Pour toute question à son sujet, contactez l’exploitant via le ', repository: 'dépôt du projet Dodle Web', changesAfter: '. Ne publiez pas d’informations personnelles sensibles dans des discussions publiques.', footerPrivacy: 'Confidentialité'
  },
  de: {
    pageTitle: 'Datenschutz - dodle', description: 'Datenschutzerklärung für Dodle Search', navLabel: 'Hauptnavigation', home: 'Startseite', languageLabel: 'Sprache auswählen', heading: 'Datenschutz', updated: 'Zuletzt aktualisiert:',
    intro: 'Dodle ist eine statische Suchstartseite. Für die Nutzung ist kein Konto erforderlich. Auf dieser Seite erfahren Sie, was beim Besuch von Dodle und bei der Nutzung der Suchfunktionen geschieht.',
    searchHeading: 'Suchanfragen', searchBefore: 'Wenn Sie eine Suche absenden, übermittelt Dodle Ihre Suchanfrage an Google Search. Die Anfrage ist in der an Google gesendeten Anfrage enthalten. Je nach Browsereinstellungen kann Google außerdem Ihre IP-Adresse, Browserinformationen und Cookies erhalten. Google verarbeitet diese Informationen gemäß der eigenen ', googlePrivacy: 'Datenschutzerklärung',
    storageHeading: 'Browserspeicher und Interaktionen', storage1: 'Dodle speichert Ihre Design- und Spracheinstellungen sowie das Noe-Modell im lokalen Speicher Ihres Browsers. Außerdem verarbeitet die Seite Zeiger-, Tastatur-, Scroll-, Touch- und Fokusaktivitäten in Ihrem Browser, damit die Noe-Funktion ausgeführt werden kann. Der Website-Code sendet diese Interaktionssignale nicht an einen Dodle-Server.', storage2: 'Diese Informationen werden auf Ihrem Gerät und nicht in einem Dodle-Konto gespeichert. Sie können sie entfernen, indem Sie die Daten dieser Website in Ihrem Browser löschen. Dabei werden auch gespeicherte Einstellungen zurückgesetzt.',
    thirdHeading: 'Dienste von Drittanbietern', thirdBefore: 'Dodle lädt Webfonts von Google Fonts. Wenn Ihr Browser diese Schriftarten anfordert, kann Google technische Informationen wie Ihre IP-Adresse und Browserinformationen erhalten. Wie Google diese Informationen verarbeitet, erfahren Sie in der ', thirdAfter: ' von Google.', third2: 'Dodle verwendet derzeit keine eigenen Analysetools und setzt keine eigenen Cookies. Google Search und der Hosting-Anbieter können Daten gemäß ihren eigenen Verfahren verarbeiten.',
    hostingHeading: 'Hosting-Protokolle', hosting: 'Der Anbieter, bei dem diese Website gehostet wird, erhält die für die Bereitstellung der Seiten erforderlichen Anfragen. Der Anbieter kann Informationen wie IP-Adressen, Zeitpunkte der Anfragen, aufgerufene Seiten und Browserinformationen in Serverprotokollen speichern. Anbieter und Speicherdauer hängen von der Hosting-Konfiguration der Website ab. Einzelheiten finden Sie in den Datenschutzhinweisen des Anbieters.',
    changesHeading: 'Änderungen und Fragen', changesBefore: 'Diese Erklärung kann aktualisiert werden, wenn sich die Website oder ihre Dienste ändern. Bei Fragen zu dieser Erklärung können Sie den Betreiber über das ', repository: 'Dodle-Web-Projektrepository', changesAfter: ' kontaktieren. Bitte veröffentlichen Sie keine sensiblen personenbezogenen Daten in öffentlichen Issues.', footerPrivacy: 'Datenschutz'
  }
};

const languageToggle = document.querySelector('.language-toggle');
const languageMenu = document.querySelector('.language-menu');
const languageOptions = [...document.querySelectorAll('[data-language]')];

function applyPrivacyLanguage(language, savePreference = false) {
  const selectedLanguage = privacyTranslations[language] ? language : 'en';
  const translation = privacyTranslations[selectedLanguage];

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
  applyPrivacyLanguage(option.dataset.language, true);
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

applyPrivacyLanguage(savedLanguage);
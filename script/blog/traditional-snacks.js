'use strict';

const snacksTranslations = {
  en: {
    pageTitle: 'Traditional Snacks - dodle', description: 'A look at traditional snacks and the everyday food traditions they carry.',
    navLabel: 'Primary navigation', languageLabel: 'Choose language', languageAria: 'Language', home: 'Home', privacy: 'Privacy', heading: 'Traditional Snacks',
    intro: 'A snack can be more than something to eat between meals. In many places, familiar small bites carry local ingredients, practical know-how, and memories of home. Recipes change from kitchen to kitchen, but the pleasure is often the same: something simple, made to be shared.',
    riceHeading: 'Rice, grains, and the daily table', rice: 'Across Asia, rice is shaped into portable foods suited to busy days. Japanese onigiri wraps seasoned rice around a filling and often in nori. In parts of South Asia, poha turns flattened rice into a savory snack with spices, vegetables, and herbs. Both show how a staple can become an easy, satisfying bite.',
    doughHeading: 'Dough with a little filling', dough: 'Many beloved snacks begin with dough and whatever a household has on hand. Samosas are crisp pastries commonly filled with spiced vegetables or meat. In Mexico and Central America, tamales wrap masa and fillings in corn husks or banana leaves before cooking. Their shapes and ingredients vary widely by region and family.',
    sharingHeading: 'Food made for sharing', sharing: 'Some snacks are built around a shared table. Arepas, made from corn dough, are enjoyed in different forms across Colombia and Venezuela, served plain or split and filled. In the Mediterranean, small savory pastries and breads make practical food for a journey, a market day, or a visit with friends.',
    traditionHeading: 'Tradition keeps moving', tradition: 'Traditional does not mean unchanging. People adapt recipes to new ingredients, schedules, and tastes, while keeping the details that make a snack feel familiar. That balance is part of what makes these everyday foods worth noticing: each one offers a small, delicious glimpse into how people cook and gather.'
  },
  ja: {
    pageTitle: '伝統的なおやつ - dodle', description: '各地の伝統的なおやつと、日々の食文化を紹介します。',
    navLabel: 'メインナビゲーション', languageLabel: '言語を選択', languageAria: '言語', home: 'ホーム', privacy: 'プライバシー', heading: '伝統的なおやつ',
    intro: 'おやつは、食事の合間に食べるもの以上の存在です。多くの地域で、親しまれてきた軽食には、その土地の食材、受け継がれた知恵、家庭の思い出が詰まっています。レシピは家庭ごとに少しずつ異なりますが、シンプルなものを分け合って楽しむ喜びは共通しています。',
    riceHeading: '米や穀物が日々の食卓に', rice: 'アジア各地では、忙しい日にも食べやすいよう、米を携帯しやすい形にします。日本のおにぎりは、味付けしたご飯で具を包み、海苔を巻くこともあります。南アジアの一部では、ポハ（平たく加工した米）に香辛料や野菜、ハーブを合わせます。どちらも、主食が手軽で満足感のある軽食になる例です。',
    doughHeading: '具を包んだ生地のおいしさ', dough: '親しまれている軽食の多くは、生地と身近な材料から生まれます。サモサは、スパイスで味付けした野菜や肉を詰めた、さくっとしたペストリーです。メキシコや中央アメリカのタマレスは、トウモロコシの生地と具をトウモロコシの皮やバナナの葉で包んで蒸します。形や材料は地域や家庭によってさまざまです。',
    sharingHeading: '分け合うための食べもの', sharing: '食卓を囲んで楽しむ軽食もあります。コロンビアやベネズエラでは、トウモロコシの生地で作るアレパを、シンプルなまま、または切り開いて具を挟んで食べます。地中海地域では、小さな塩味のペストリーやパンが、旅や市場への外出、友人を訪ねるときの実用的な食べものになっています。',
    traditionHeading: '受け継がれながら変わる味', tradition: '伝統は、変わらないことを意味しません。人々は親しみを感じる大切な部分を残しながら、新しい食材や暮らしのリズム、好みに合わせてレシピを工夫します。そんなバランスが、日々のおやつを興味深いものにしています。一口ごとに、人々の料理や集いの様子が少し見えてきます。'
  },
  zh: {
    pageTitle: '传统小吃 - dodle', description: '了解传统小吃，以及它们承载的日常饮食文化。',
    navLabel: '主导航', languageLabel: '选择语言', languageAria: '语言', home: '首页', privacy: '隐私', heading: '传统小吃',
    intro: '小吃不只是两餐之间填饱肚子的食物。在许多地方，熟悉的一口滋味融入了当地食材、生活智慧和家的记忆。每家每户的做法各有不同，但那份简单而共享的快乐往往相通。',
    riceHeading: '米与谷物，融入日常', rice: '在亚洲各地，人们会把米做成方便携带的食物，适合忙碌的日子。日本饭团用调味米饭包裹馅料，有时还会裹上海苔。在南亚一些地区，人们用香料、蔬菜和香草烹制扁米片波哈。这些做法让日常主食变成方便又有饱足感的小吃。',
    doughHeading: '面团包裹的美味', dough: '许多受欢迎的小吃都从面团和家中现有的食材开始。萨莫萨是一种酥脆的馅饼，常填入调味蔬菜或肉类。在墨西哥和中美洲，人们用玉米皮或香蕉叶包裹玉米面团和馅料，制作塔马莱。它们的形状和食材会因地区和家庭而异。',
    sharingHeading: '适合分享的食物', sharing: '有些小吃天生适合围桌分享。哥伦比亚和委内瑞拉的阿雷帕以玉米面团制成，可以直接吃，也可以切开夹入馅料。在地中海地区，小块咸味酥点和面包则常作为旅途、赶集或拜访朋友时的方便食物。',
    traditionHeading: '传统也在不断变化', tradition: '传统并不意味着一成不变。人们会根据新的食材、生活节奏和口味调整做法，同时保留让小吃依然熟悉的细节。正是这种平衡，让日常食物值得细细品味：每一种都让我们稍稍尝到人们如何烹饪、相聚。'
  },
  th: {
    pageTitle: 'ขนมกินเล่นแบบดั้งเดิม - dodle', description: 'สำรวจขนมกินเล่นแบบดั้งเดิมและวัฒนธรรมอาหารในชีวิตประจำวัน',
    navLabel: 'การนำทางหลัก', languageLabel: 'เลือกภาษา', languageAria: 'ภาษา', home: 'หน้าแรก', privacy: 'ความเป็นส่วนตัว', heading: 'ขนมกินเล่นแบบดั้งเดิม',
    intro: 'ของว่างไม่ใช่แค่อาหารรองท้องระหว่างมื้อ ในหลายพื้นที่ ของกินชิ้นเล็กที่คุ้นเคยสะท้อนวัตถุดิบท้องถิ่น ภูมิปัญญาในการทำอาหาร และความทรงจำเกี่ยวกับบ้าน สูตรอาหารอาจต่างกันไปในแต่ละครัว แต่ความสุขจากอาหารเรียบง่ายที่แบ่งปันกันนั้นคล้ายคลึงกัน',
    riceHeading: 'ข้าวและธัญพืชบนโต๊ะอาหารทุกวัน', rice: 'ทั่วเอเชีย ผู้คนนำข้าวมาปั้นหรือปรุงเป็นอาหารที่พกพาสะดวก เหมาะกับวันที่เร่งรีบ โอนิกิริของญี่ปุ่นห่อไส้ด้วยข้าวปรุงรสและมักห่อสาหร่ายโนริด้วย ส่วนในเอเชียใต้บางพื้นที่ โพฮาทำจากข้าวแบนผัดกับเครื่องเทศ ผัก และสมุนไพร ทั้งสองอย่างแสดงให้เห็นว่าอาหารหลักสามารถกลายเป็นของว่างที่กินง่ายและอิ่มท้องได้',
    doughHeading: 'แป้งห่อไส้แสนอร่อย', dough: 'ของว่างยอดนิยมหลายชนิดเริ่มจากแป้งและวัตถุดิบที่มีอยู่ในครัว ซาโมซาเป็นแป้งกรอบที่มักสอดไส้ผักหรือเนื้อปรุงรส ในเม็กซิโกและอเมริกากลาง ทามาเลห่อแป้งมาซากับไส้ด้วยเปลือกข้าวโพดหรือใบตองก่อนนำไปปรุง รูปร่างและวัตถุดิบแตกต่างกันไปตามภูมิภาคและแต่ละครอบครัว',
    sharingHeading: 'อาหารที่ทำมาเพื่อแบ่งปัน', sharing: 'ของว่างบางอย่างเหมาะกับการกินร่วมกัน อาเรปาทำจากแป้งข้าวโพดและพบได้หลายรูปแบบในโคลอมเบียกับเวเนซุเอลา จะกินเปล่า ๆ หรือผ่าครึ่งใส่ไส้ก็ได้ ส่วนในแถบเมดิเตอร์เรเนียน ขนมอบรสเค็มและขนมปังชิ้นเล็ก ๆ เป็นอาหารสะดวกพกพาระหว่างเดินทาง ไปตลาด หรือไปหาเพื่อน',
    traditionHeading: 'ประเพณีที่ยังคงเปลี่ยนแปลง', tradition: 'อาหารดั้งเดิมไม่ได้หมายความว่าจะต้องเหมือนเดิมเสมอไป ผู้คนปรับสูตรให้เข้ากับวัตถุดิบ ตารางชีวิต และรสนิยมใหม่ ๆ พร้อมเก็บรายละเอียดที่ทำให้ของว่างยังคงให้ความรู้สึกคุ้นเคย ความสมดุลนี้ทำให้อาหารในชีวิตประจำวันน่าสนใจ เพราะแต่ละคำเผยให้เห็นเล็กน้อยว่าผู้คนทำอาหารและพบปะกันอย่างไร'
  },
  ko: {
    pageTitle: '전통 간식 - dodle', description: '전통 간식과 그 안에 담긴 일상의 음식 문화를 살펴봅니다.',
    navLabel: '주요 탐색', languageLabel: '언어 선택', languageAria: '언어', home: '홈', privacy: '개인정보 보호', heading: '전통 간식',
    intro: '간식은 끼니 사이에 먹는 음식 이상의 의미를 지닙니다. 여러 지역에서 익숙한 한입거리에는 현지 식재료와 생활의 지혜, 고향의 기억이 담겨 있습니다. 집집마다 조리법은 조금씩 다르지만, 소박한 음식을 함께 나누는 즐거움은 어디서나 비슷합니다.',
    riceHeading: '쌀과 곡물로 차리는 일상의 식탁', rice: '아시아 곳곳에서는 바쁜 날에도 간편하게 먹을 수 있도록 쌀을 휴대하기 좋은 음식으로 만듭니다. 일본의 오니기리는 양념한 밥으로 속재료를 감싸고 김을 두르기도 합니다. 남아시아 일부 지역의 포하는 납작하게 가공한 쌀을 향신료와 채소, 허브와 함께 요리합니다. 주식이 간편하고 든든한 간식으로 변하는 좋은 예입니다.',
    doughHeading: '속을 채운 반죽의 매력', dough: '사랑받는 간식 중에는 반죽과 집에 있는 재료로 만드는 음식이 많습니다. 사모사는 향신료를 넣은 채소나 고기를 채운 바삭한 페이스트리입니다. 멕시코와 중앙아메리카의 타말레는 옥수수 반죽과 속재료를 옥수수 껍질이나 바나나 잎에 싸서 익힙니다. 모양과 재료는 지역과 가정에 따라 다양합니다.',
    sharingHeading: '함께 나누어 먹는 음식', sharing: '함께 둘러앉아 먹는 간식도 있습니다. 옥수수 반죽으로 만드는 아레파는 콜롬비아와 베네수엘라에서 여러 형태로 즐기며, 그대로 먹거나 갈라서 속을 채우기도 합니다. 지중해 지역에서는 작은 짭짤한 페이스트리와 빵이 여행이나 장날, 친구를 방문할 때 간편한 음식이 됩니다.',
    traditionHeading: '이어지면서 변화하는 전통', tradition: '전통 음식이라고 해서 늘 그대로인 것은 아닙니다. 사람들은 익숙한 맛을 만드는 요소를 간직하면서 새로운 재료와 생활 리듬, 취향에 맞게 조리법을 바꿉니다. 이런 균형 덕분에 일상의 음식은 더 흥미로워집니다. 한입마다 사람들이 어떻게 요리하고 어울리는지 엿볼 수 있습니다.'
  },
  fr: {
    pageTitle: 'En-cas traditionnels - dodle', description: 'À la découverte des en-cas traditionnels et des habitudes culinaires du quotidien.',
    navLabel: 'Navigation principale', languageLabel: 'Choisir la langue', languageAria: 'Langue', home: 'Accueil', privacy: 'Confidentialité', heading: 'En-cas traditionnels',
    intro: 'Un en-cas peut être bien plus qu’un aliment pris entre deux repas. Dans bien des endroits, ces petites bouchées familières réunissent des ingrédients locaux, un savoir-faire pratique et des souvenirs de chez soi. Les recettes changent d’une cuisine à l’autre, mais le plaisir reste souvent le même : quelque chose de simple à partager.',
    riceHeading: 'Le riz et les céréales au quotidien', rice: 'Dans toute l’Asie, le riz est façonné en aliments faciles à emporter, adaptés aux journées chargées. Les onigiri japonais enveloppent une garniture de riz assaisonné et sont souvent entourés de nori. Dans certaines régions d’Asie du Sud, le poha transforme le riz aplati en un en-cas salé avec des épices, des légumes et des herbes. Ces exemples montrent comment un aliment de base devient une bouchée pratique et nourrissante.',
    doughHeading: 'De la pâte et une garniture', dough: 'Beaucoup d’en-cas appréciés commencent avec de la pâte et les ingrédients disponibles à la maison. Les samoussas sont des chaussons croustillants, souvent garnis de légumes épicés ou de viande. Au Mexique et en Amérique centrale, les tamales enveloppent de la pâte de maïs et une garniture dans des feuilles de maïs ou de bananier avant la cuisson. Leur forme et leurs ingrédients varient selon les régions et les familles.',
    sharingHeading: 'Des mets à partager', sharing: 'Certains en-cas sont faits pour être dégustés ensemble. Préparées à partir de pâte de maïs, les arepas se déclinent en plusieurs versions en Colombie et au Venezuela : nature ou ouvertes pour y ajouter une garniture. En Méditerranée, de petites pâtisseries salées et des pains accompagnent volontiers un voyage, une journée au marché ou une visite chez des amis.',
    traditionHeading: 'Une tradition qui évolue', tradition: 'Traditionnel ne veut pas dire immuable. Les recettes s’adaptent aux nouveaux ingrédients, aux rythmes de vie et aux goûts, tout en préservant ce qui rend un en-cas familier. Cet équilibre rend ces aliments du quotidien intéressants : chacun offre un petit aperçu de la façon dont les gens cuisinent et se retrouvent.'
  },
  de: {
    pageTitle: 'Traditionelle Snacks - dodle', description: 'Ein Blick auf traditionelle Snacks und die Esskultur des Alltags.',
    navLabel: 'Hauptnavigation', languageLabel: 'Sprache auswählen', languageAria: 'Sprache', home: 'Startseite', privacy: 'Datenschutz', heading: 'Traditionelle Snacks',
    intro: 'Ein Snack ist mehr als eine Kleinigkeit zwischen zwei Mahlzeiten. An vielen Orten vereinen vertraute Häppchen regionale Zutaten, praktisches Wissen und Erinnerungen an zu Hause. Die Rezepte unterscheiden sich von Küche zu Küche, doch die Freude ist oft dieselbe: etwas Einfaches, das man miteinander teilt.',
    riceHeading: 'Reis und Getreide im Alltag', rice: 'In ganz Asien wird Reis zu handlichen Speisen geformt, die sich für arbeitsreiche Tage eignen. Japanische Onigiri umschließen eine Füllung mit gewürztem Reis und werden oft in Nori gewickelt. In Teilen Südasiens wird aus Poha, flach verarbeitetem Reis, mit Gewürzen, Gemüse und Kräutern ein herzhaftes Gericht. Beide Beispiele zeigen, wie ein Grundnahrungsmittel zu einem unkomplizierten, sättigenden Snack wird.',
    doughHeading: 'Teig mit einer Füllung', dough: 'Viele beliebte Snacks beginnen mit Teig und dem, was gerade im Haushalt vorhanden ist. Samosas sind knusprige Teigtaschen, oft gefüllt mit gewürztem Gemüse oder Fleisch. In Mexiko und Mittelamerika werden Tamales aus Maisteig und einer Füllung in Maishülsen oder Bananenblätter gewickelt und gegart. Form und Zutaten unterscheiden sich je nach Region und Familie.',
    sharingHeading: 'Essen zum Teilen', sharing: 'Manche Snacks sind für den gemeinsamen Tisch gedacht. Arepas aus Maisteig gibt es in Kolumbien und Venezuela in verschiedenen Varianten: pur oder aufgeschnitten und gefüllt. Im Mittelmeerraum sind kleine herzhafte Gebäcke und Brote praktische Begleiter auf Reisen, beim Marktbesuch oder bei einem Treffen mit Freunden.',
    traditionHeading: 'Tradition bleibt in Bewegung', tradition: 'Traditionell bedeutet nicht unverändert. Menschen passen Rezepte an neue Zutaten, Tagesabläufe und Geschmäcker an und bewahren zugleich die Details, die einen Snack vertraut machen. Dieses Gleichgewicht macht die Alltagsküche bemerkenswert: Jedes Gericht gibt einen kleinen, köstlichen Einblick darin, wie Menschen kochen und zusammenkommen.'
  }
};

const languageToggle = document.querySelector('.language-toggle');
const languageMenu = document.querySelector('.language-menu');
const languageOptions = [...document.querySelectorAll('[data-language]')];

function applySnacksLanguage(language, savePreference = false) {
  const selectedLanguage = snacksTranslations[language] ? language : 'en';
  const translation = snacksTranslations[selectedLanguage];

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
  applySnacksLanguage(option.dataset.language, true);
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

applySnacksLanguage(savedLanguage);
const curiosityTopics = [
  'the northern lights',
  'ancient libraries',
  'how bees communicate',
  'deep sea creatures',
  'the history of maps',
  'volcanic islands',
  'the science of sleep',
  'forgotten inventions',
  'the origin of language',
  'desert ecosystems',
  'the mathematics of music',
  'the oldest trees',
  'how bridges work',
  'the history of chocolate',
  'cloud formations',
  'the psychology of curiosity',
  'underwater archaeology',
  'the evolution of birds',
  'how memory works',
  'rare weather events',
  'the history of bicycles',
  'coral reef ecosystems',
  'the science of bread',
  'ancient navigation',
  'how earthquakes happen',
  'the lives of octopuses',
  'the history of clocks',
  'why leaves change color',
  'the art of origami',
  'the invention of photography',
  'how ants build colonies',
  'the history of tea',
  'the physics of rainbows',
  'forgotten cities',
  'the science of fermentation',
  'how birds migrate',
  'the history of punctuation',
  'the architecture of caves',
  'how magnets work',
  'the origins of board games',
  'the science of fingerprints',
  'the history of umbrellas',
  'how glaciers move',
  'the language of dolphins',
  'the history of printing',
  'why cats purr',
  'the science of camouflage',
  'ancient cooking methods',
  'how rivers form',
  'the history of calendars',
  'the biology of mushrooms',
  'how elevators work',
  'the story of paper',
  'the science of laughter',
  'lost works of art',
  'how seeds travel',
  'the history of keys',
  'the physics of sound',
  'the lives of urban foxes',
  'how satellites stay in orbit',
  'the history of mirrors',
  'the science of taste',
  'ancient medical practices',
  'how spiders make webs',
  'the history of lighthouses',
  'the chemistry of color',
  'why birds sing',
  'the origins of surnames',
  'how wind turbines work',
  'the science of pollen',
  'the lives of desert animals',
  'how compasses work',
  'the history of theater',
  'the physics of bubbles',
  'ancient trade routes',
  'how trees communicate',
  'the history of buttons',
  'the science of balance',
  'why oceans have tides',
  'the origins of written numbers',
  'how solar panels work',
  'the history of playgrounds',
  'the biology of butterflies',
  'how sound travels',
  'the history of recipes',
  'the science of honey',
  'forgotten languages',
  'how tunnels are built',
  'the history of postcards',
  'the physics of flight',
  'why whales sing',
  'the origins of musical instruments',
  'how weather forecasts work',
  'the science of soil',
  'ancient building techniques',
  'how fireflies glow',
  'the history of nicknames',
  'the biology of forests',
  'how cameras focus',
  'the history of public parks'
];

const curiosityPatterns = [
  '{topic}',
  'Interesting facts about {topic}',
  'How {topic} affects everyday life',
  'The future of {topic}',
  'What can we learn from {topic}?',
  'Key ideas behind {topic}',
  'Common questions about {topic}'
];

const additionalCuriositySubjects = [
  'astronomy', 'medicine', 'architecture', 'agriculture', 'music',
  'language', 'mathematics', 'transportation', 'engineering', 'computing',
  'education', 'psychology', 'ecology', 'geology', 'oceanography',
  'photography', 'film', 'mythology', 'painting', 'sculpture',
  'fashion', 'food', 'finance', 'trade', 'democracy',
  'law', 'sports', 'games', 'crafts', 'inventions',
  'materials', 'energy', 'climate', 'weather', 'evolution',
  'animals', 'plants', 'cities', 'exploration', 'communication'
];

const additionalCuriosityAngles = [
  'the history of {subject}',
  'the science of {subject}',
  'the future of {subject}',
  'the origins of {subject}',
  'the psychology of {subject}',
  'the technology behind {subject}',
  'the cultural meaning of {subject}',
  'the environmental impact of {subject}',
  'the most important discoveries in {subject}',
  'how {subject} shapes everyday life'
];

const expandedCuriosityTopics = additionalCuriositySubjects.flatMap(subject =>
  additionalCuriosityAngles.map(angle => angle.replace('{subject}', subject))
);

const allCuriosityTopics = [...curiosityTopics, ...expandedCuriosityTopics];

const normalizePrompt = (prompt = '') => String(prompt).replace(/\s+/g, ' ').trim();

const fillTemplate = (template, values) => Object.entries(values).reduce(
  (result, [key, value]) => result.replaceAll(`{${key}}`, value),
  template
);

const buildPromptList = (topics, patterns) => [...new Set(
  topics.flatMap(topic => patterns.map(pattern =>
    normalizePrompt(fillTemplate(pattern, { topic }))
  ))
)].filter(prompt => prompt && !prompt.includes('{'));

const expandTopics = (topics, subjects, patterns) => [
  ...topics,
  ...subjects.flatMap(subject => patterns.map(pattern => fillTemplate(pattern, { subject })))
];

const curiousWords = buildPromptList(allCuriosityTopics, curiosityPatterns);

const curiosityTopicsByLanguage = {
  en: allCuriosityTopics,
  ja: expandTopics([
    'オーロラ', '古代の図書館', 'ミツバチの会話', '深海生物', '地図の歴史',
    '火山島', '睡眠の科学', '忘れられた発明', '言語の起源', '砂漠の生態系',
    '音楽の数学', '最も古い木', '橋の仕組み', 'チョコレートの歴史', '雲の形',
    '好奇心の心理学', '水中考古学', '鳥の進化', '記憶の仕組み', '珍しい気象現象'
  ], [
    '天文学', '医学', '建築', '農業', '音楽', '考古学', '数学', '交通',
    '工学', 'コンピューター', '教育', '心理学', '生態学', '地質学', '海洋学',
    '写真', '映画', '神話', '絵画', '彫刻', 'ファッション', '食文化', '金融',
    '貿易', '民主主義', '法律', 'スポーツ', 'ゲーム', '工芸', '発明', '素材',
    'エネルギー', '気候', '天気', '進化', '動物', '植物', '都市', '探検',
    'コミュニケーション', '農薬', 'ロボット', '宇宙開発', '海洋保全', '博物館',
    '教育技術', '伝統文化', '未来社会'
  ], [
    '歴史と{subject}', '{subject}の科学', '{subject}の未来', '{subject}の起源',
    '{subject}の心理学', '{subject}を支える技術', '{subject}の文化的意味',
    '{subject}の環境への影響', '{subject}における重要な発見', '{subject}と日常生活'
  ]),
  zh: expandTopics([
    '极光', '古代图书馆', '蜜蜂如何交流', '深海生物', '地图的历史',
    '火山岛', '睡眠科学', '被遗忘的发明', '语言的起源', '沙漠生态系统',
    '音乐的数学', '最古老的树', '桥梁的工作原理', '巧克力的历史', '云的形态',
    '好奇心心理学', '水下考古', '鸟类的进化', '记忆的工作原理', '罕见天气现象'
  ], [
    '天文学', '医学', '建筑', '农业', '音乐', '考古学', '数学', '交通',
    '工程', '计算机', '教育', '心理学', '生态学', '地质学', '海洋学',
    '摄影', '电影', '神话', '绘画', '雕塑', '时尚', '饮食文化', '金融',
    '贸易', '民主', '法律', '体育', '游戏', '手工艺', '发明', '材料',
    '能源', '气候', '天气', '进化', '动物', '植物', '城市', '探索',
    '通信', '机器人', '航天', '海洋保护', '博物馆', '教育科技', '传统文化', '社会学', '未来社会'
  ], [
    '{subject}的历史', '{subject}背后的科学', '{subject}的未来', '{subject}的起源',
    '{subject}的心理学', '{subject}背后的技术', '{subject}的文化意义',
    '{subject}对环境的影响', '{subject}领域的重要发现', '{subject}如何影响日常生活'
  ]),
  th: expandTopics([
    'แสงเหนือ', 'ห้องสมุดโบราณ', 'การสื่อสารของผึ้ง', 'สิ่งมีชีวิตใต้ทะเลลึก', 'ประวัติศาสตร์ของแผนที่',
    'เกาะภูเขาไฟ', 'วิทยาศาสตร์ของการนอนหลับ', 'สิ่งประดิษฐ์ที่ถูกลืม', 'ต้นกำเนิดของภาษา', 'ระบบนิเวศทะเลทราย',
    'คณิตศาสตร์ของดนตรี', 'ต้นไม้ที่เก่าแก่ที่สุด', 'การทำงานของสะพาน', 'ประวัติศาสตร์ช็อกโกแลต', 'รูปทรงของเมฆ',
    'จิตวิทยาของความอยากรู้อยากเห็น', 'โบราณคดีใต้น้ำ', 'วิวัฒนาการของนก', 'การทำงานของความทรงจำ', 'ปรากฏการณ์อากาศที่หายาก'
  ], [
    'ดาราศาสตร์', 'การแพทย์', 'สถาปัตยกรรม', 'การเกษตร', 'ดนตรี', 'โบราณคดี', 'คณิตศาสตร์', 'การขนส่ง',
    'วิศวกรรม', 'คอมพิวเตอร์', 'การศึกษา', 'จิตวิทยา', 'นิเวศวิทยา', 'ธรณีวิทยา', 'สมุทรศาสตร์',
    'การถ่ายภาพ', 'ภาพยนตร์', 'ตำนาน', 'จิตรกรรม', 'ประติมากรรม', 'แฟชั่น', 'วัฒนธรรมอาหาร', 'การเงิน',
    'การค้า', 'ประชาธิปไตย', 'กฎหมาย', 'กีฬา', 'เกม', 'งานฝีมือ', 'สิ่งประดิษฐ์', 'วัสดุ',
    'พลังงาน', 'สภาพภูมิอากาศ', 'สภาพอากาศ', 'วิวัฒนาการ', 'สัตว์', 'พืช', 'เมือง', 'การสำรวจ',
    'การสื่อสาร', 'หุ่นยนต์', 'การสำรวจอวกาศ', 'การอนุรักษ์ทะเล', 'พิพิธภัณฑ์', 'เทคโนโลยีการศึกษา',
    'วัฒนธรรมดั้งเดิม', 'สังคมวิทยา', 'สังคมแห่งอนาคต'
  ], [
    'ประวัติของ{subject}', 'วิทยาศาสตร์ของ{subject}', 'อนาคตของ{subject}', 'ต้นกำเนิดของ{subject}',
    'จิตวิทยาของ{subject}', 'เทคโนโลยีเบื้องหลัง{subject}', 'ความหมายทางวัฒนธรรมของ{subject}',
    'ผลกระทบของ{subject}ต่อสิ่งแวดล้อม', 'การค้นพบที่สำคัญเกี่ยวกับ{subject}', '{subject}กับชีวิตประจำวัน'
  ]),
  ko: expandTopics([
    '오로라', '고대 도서관', '벌의 의사소통', '심해 생물', '지도의 역사', '화산섬',
    '수면의 과학', '잊힌 발명품', '언어의 기원', '사막 생태계', '음악의 수학',
    '가장 오래된 나무', '다리의 원리', '초콜릿의 역사', '구름의 형태', '호기심의 심리학',
    '수중 고고학', '새의 진화', '기억의 작동 원리', '희귀한 기상 현상'
  ], [
    '천문학', '의학', '건축', '농업', '음악', '고고학', '수학', '교통', '공학', '컴퓨터 과학',
    '교육', '심리학', '생태학', '지질학', '해양학', '사진', '영화', '신화', '회화', '조각',
    '패션', '음식 문화', '금융', '무역', '민주주의', '법률', '스포츠', '게임', '공예', '발명',
    '소재', '에너지', '기후', '날씨', '진화', '동물', '식물', '도시', '탐험', '소통'
  ], [
    '{subject}의 역사', '{subject}의 과학', '{subject}의 미래', '{subject}의 기원',
    '{subject}의 심리학', '{subject}를 뒷받침하는 기술', '{subject}의 문화적 의미',
    '{subject}가 환경에 미치는 영향', '{subject}의 중요한 발견', '{subject}와 일상생활'
  ]),
  fr: expandTopics([
    'les aurores boréales', 'les bibliothèques anciennes', 'la communication des abeilles', 'les créatures des grands fonds',
    "l'histoire des cartes", 'les îles volcaniques', 'la science du sommeil', 'les inventions oubliées',
    "l'origine du langage", 'les écosystèmes désertiques', 'les mathématiques de la musique', 'les arbres les plus anciens',
    'le fonctionnement des ponts', "l'histoire du chocolat", 'les formations nuageuses', 'la psychologie de la curiosité',
    "l'archéologie sous-marine", "l'évolution des oiseaux", 'le fonctionnement de la mémoire', 'les phénomènes météorologiques rares'
  ], [
    'astronomie', 'médecine', 'architecture', 'agriculture', 'musique', 'archéologie', 'mathématiques', 'transports',
    'ingénierie', 'informatique', 'éducation', 'psychologie', 'écologie', 'géologie', 'océanographie', 'photographie',
    'cinéma', 'mythologie', 'peinture', 'sculpture', 'mode', 'gastronomie', 'finance', 'commerce', 'démocratie',
    'droit', 'sport', 'jeux', 'artisanat', 'inventions', 'matériaux', 'énergie', 'climat', 'météo', 'évolution',
    'animaux', 'plantes', 'villes', 'exploration', 'communication'
  ], [
    "l'histoire de {subject}", 'la science de {subject}', "l'avenir de {subject}", "les origines de {subject}",
    'la psychologie de {subject}', 'la technologie derrière {subject}', 'la signification culturelle de {subject}',
    "l'impact environnemental de {subject}", 'les découvertes importantes sur {subject}', 'comment {subject} façonne la vie quotidienne'
  ]),
  de: expandTopics([
    'das Nordlicht', 'alte Bibliotheken', 'wie Bienen kommunizieren', 'Tiefseebewohner', 'die Geschichte der Karten',
    'Vulkaninseln', 'die Wissenschaft des Schlafs', 'vergessene Erfindungen', 'der Ursprung der Sprache', 'Wüstenökosysteme',
    'die Mathematik der Musik', 'die ältesten Bäume', 'wie Brücken funktionieren', 'die Geschichte der Schokolade',
    'Wolkenformationen', 'die Psychologie der Neugier', 'Unterwasserarchäologie', 'die Evolution der Vögel',
    'wie das Gedächtnis funktioniert', 'seltene Wetterereignisse'
  ], [
    'Astronomie', 'Medizin', 'Architektur', 'Landwirtschaft', 'Musik', 'Archäologie', 'Mathematik', 'Verkehr',
    'Ingenieurwesen', 'Informatik', 'Bildung', 'Psychologie', 'Ökologie', 'Geologie', 'Ozeanografie', 'Fotografie',
    'Film', 'Mythologie', 'Malerei', 'Bildhauerei', 'Mode', 'Ernährung', 'Finanzen', 'Handel', 'Demokratie',
    'Recht', 'Sport', 'Spiele', 'Handwerk', 'Erfindungen', 'Materialien', 'Energie', 'Klima', 'Wetter', 'Evolution',
    'Tiere', 'Pflanzen', 'Städte', 'Entdeckungen', 'Kommunikation'
  ], [
    'die Geschichte von {subject}', 'die Wissenschaft hinter {subject}', 'die Zukunft von {subject}', 'die Ursprünge von {subject}',
    'die Psychologie von {subject}', 'die Technologie hinter {subject}', 'die kulturelle Bedeutung von {subject}',
    'die Umweltauswirkungen von {subject}', 'wichtige Entdeckungen zu {subject}', 'wie {subject} den Alltag prägt'
  ])
};

const curiosityPatternsByLanguage = {
  en: [
    ...curiosityPatterns,
    'What is {topic}?', 'How does {topic} work?', 'Why is {topic} important?', 'A beginner guide to {topic}',
    'The history of {topic}', 'The science behind {topic}', 'Surprising facts about {topic}', 'Latest research on {topic}',
    'Unusual examples of {topic}', 'How {topic} has changed over time', 'The key ideas behind {topic}', 'People who shaped {topic}',
    'A visual explanation of {topic}'
  ],
  ja: [
    '{topic}とは？', '{topic}はどのように機能する？', 'なぜ{topic}は興味深い？', '{topic}入門', '{topic}の歴史',
    '{topic}の科学', '{topic}の意外な事実', '{topic}の最新研究', '{topic}の珍しい例', '{topic}はどう変化してきた？',
    '{topic}の重要な考え方', '{topic}についてよくある質問', '{topic}の利点と課題', '{topic}を形作った人々',
    '{topic}を図解で説明', '{topic}の未来', '{topic}と日常生活', '{topic}に関する重要な発見',
    '{topic}の年表', '{topic}についてまだ分かっていないこと'
  ],
  zh: [
    '什么是{topic}？', '{topic}是如何运作的？', '为什么{topic}很有趣？', '{topic}入门指南', '{topic}的历史',
    '{topic}背后的科学', '关于{topic}的惊人事实', '{topic}的最新研究', '{topic}最不寻常的例子', '{topic}如何随时间变化？',
    '{topic}背后的关键理念', '关于{topic}的常见问题', '{topic}的优点与挑战', '塑造{topic}的人们',
    '{topic}图解', '{topic}的未来', '{topic}如何影响日常生活', '关于{topic}的重要发现',
    '{topic}发展时间线', '关于{topic}仍然未知的事情'
  ],
  th: [
    '{topic}คืออะไร', '{topic}ทำงานอย่างไร', 'ทำไม{topic}จึงน่าสนใจ', 'คู่มือเบื้องต้นเกี่ยวกับ{topic}', 'ประวัติของ{topic}',
    'วิทยาศาสตร์เบื้องหลัง{topic}', 'ข้อเท็จจริงที่น่าประหลาดใจเกี่ยวกับ{topic}', 'งานวิจัยล่าสุดเกี่ยวกับ{topic}', 'ตัวอย่างที่แปลกที่สุดของ{topic}', '{topic}เปลี่ยนแปลงไปตามกาลเวลาอย่างไร',
    'แนวคิดสำคัญเกี่ยวกับ{topic}', 'คำถามที่พบบ่อยเกี่ยวกับ{topic}', 'ประโยชน์และความท้าทายของ{topic}', 'ผู้คนที่สร้างสรรค์{topic}',
    'คำอธิบายแบบภาพของ{topic}', 'อนาคตของ{topic}', '{topic}ส่งผลต่อชีวิตประจำวันอย่างไร', 'การค้นพบสำคัญเกี่ยวกับ{topic}',
    'เส้นเวลาของ{topic}', 'สิ่งที่เรายังไม่รู้เกี่ยวกับ{topic}'
  ],
  ko: [
    '{topic}이란 무엇인가?', '{topic}은 어떻게 작동하는가?', '왜 {topic}이 중요한가?', '{topic} 입문', '{topic}의 역사',
    '{topic}의 과학', '{topic}에 관한 놀라운 사실', '{topic}의 최신 연구', '{topic}의 특이한 사례', '{topic}는 어떻게 변해 왔는가?',
    '{topic}의 핵심 개념', '{topic}에 관한 자주 묻는 질문', '{topic}의 장점과 과제', '{topic}를 만든 사람들',
    '{topic}의 시각적 설명', '{topic}의 미래', '{topic}가 일상에 미치는 영향', '{topic}의 중요한 발견',
    '{topic}의 연대표', '{topic}에 대해 아직 모르는 것'
  ],
  fr: [
    "Qu'est-ce que {topic} ?", 'Comment fonctionne {topic} ?', 'Pourquoi {topic} est-il important ?', 'Guide de {topic} pour débutants',
    "L'histoire de {topic}", 'La science de {topic}', 'Faits surprenants sur {topic}', 'Les dernières recherches sur {topic}',
    'Les exemples les plus insolites de {topic}', "Comment {topic} a changé au fil du temps", 'Les idées clés de {topic}',
    'Questions fréquentes sur {topic}', 'Les avantages et les défis de {topic}', 'Les personnes qui ont façonné {topic}',
    'Une explication visuelle de {topic}', "L'avenir de {topic}", 'Comment {topic} influence la vie quotidienne',
    'Les découvertes importantes sur {topic}', 'Une chronologie de {topic}', 'Ce que nous ignorons encore sur {topic}'
  ],
  de: [
    'Was ist {topic}?', 'Wie funktioniert {topic}?', 'Warum ist {topic} wichtig?', 'Eine Einführung in {topic}', 'Die Geschichte von {topic}',
    'Die Wissenschaft hinter {topic}', 'Überraschende Fakten über {topic}', 'Die neuesten Forschungen zu {topic}', 'Die ungewöhnlichsten Beispiele für {topic}',
    'Wie sich {topic} im Laufe der Zeit verändert hat', 'Die wichtigsten Ideen hinter {topic}', 'Häufige Fragen zu {topic}',
    'Die Vorteile und Herausforderungen von {topic}', 'Die Menschen, die {topic} geprägt haben', 'Eine visuelle Erklärung von {topic}',
    'Die Zukunft von {topic}', 'Wie {topic} den Alltag beeinflusst', 'Wichtige Entdeckungen zu {topic}', 'Eine Zeitleiste von {topic}',
    'Was wir über {topic} noch nicht wissen'
  ]
};

const curiosityQueryContextsByLanguage = {
  en: [
    'for beginners', 'in everyday life', 'through history', 'from a scientific perspective', 'with real examples',
    'in simple terms', 'around the world', 'and its cultural meaning', 'and its environmental impact',
    'and the latest discoveries', 'compared with related ideas', 'and what may happen next'
  ],
  ja: [
    '初心者向け', '日常生活との関係', '歴史的な背景', '科学的な視点', '実例を通して', '簡単な言葉で',
    '世界各地の例', '文化的な意味', '環境への影響', '最新の発見', '関連するテーマとの比較', 'これからの展望'
  ],
  zh: [
    '适合初学者', '与日常生活的关系', '历史背景', '科学视角', '通过真实案例', '用简单语言解释',
    '世界各地的例子', '文化意义', '环境影响', '最新发现', '与相关主题比较', '未来展望'
  ],
  th: [
    'สำหรับผู้เริ่มต้น', 'ในชีวิตประจำวัน', 'เบื้องหลังทางประวัติศาสตร์', 'ในมุมมองทางวิทยาศาสตร์', 'จากตัวอย่างจริง', 'อธิบายด้วยภาษาง่ายๆ',
    'ตัวอย่างจากทั่วโลก', 'ความหมายทางวัฒนธรรม', 'ผลกระทบต่อสิ่งแวดล้อม', 'การค้นพบล่าสุด', 'เปรียบเทียบกับหัวข้อที่เกี่ยวข้อง', 'แนวโน้มในอนาคต'
  ],
  ko: [
    '초보자를 위한 안내', '일상생활에서', '역사적 배경', '과학적 관점', '실제 사례와 함께', '쉬운 말로 설명',
    '세계 각지의 사례', '문화적 의미', '환경에 미치는 영향', '최신 발견', '관련 주제와 비교', '앞으로의 전망'
  ],
  fr: [
    'pour débutants', 'dans la vie quotidienne', 'dans son contexte historique', 'd un point de vue scientifique', 'avec des exemples concrets', 'en termes simples',
    'dans le monde', 'et sa signification culturelle', 'et son impact environnemental', 'et les dernières découvertes', 'comparé aux sujets proches', 'et ses perspectives futures'
  ],
  de: [
    'für Anfänger', 'im Alltag', 'vor dem historischen Hintergrund', 'aus wissenschaftlicher Sicht', 'mit echten Beispielen', 'einfach erklärt',
    'aus aller Welt', 'und seine kulturelle Bedeutung', 'und seine Auswirkungen auf die Umwelt', 'und die neuesten Entdeckungen', 'im Vergleich zu verwandten Themen', 'und seine Zukunft'
  ]
};

const createCuriosityPromptSource = (topics, patterns, contexts) => {
  const topicPatternCount = topics.length * patterns.length;
  const combinations = topicPatternCount * contexts.length;

  if (!Number.isSafeInteger(combinations) || combinations < 1) {
    throw new Error('Invalid curiosity prompt source dimensions');
  }

  return {
    length: combinations,
    get(index) {
      if (!Number.isInteger(index) || index < 0 || index >= this.length) return undefined;

      const contextIndex = Math.floor(index / topicPatternCount);
      const remainder = index % topicPatternCount;
      const patternIndex = Math.floor(remainder / topics.length);
      const topicIndex = remainder % topics.length;
      const prompt = fillTemplate(patterns[patternIndex], { topic: topics[topicIndex] });
      return normalizePrompt(`${prompt} ${contexts[contextIndex]}`);
    },
    getRandom() {
      return this.get(Math.floor(Math.random() * this.length));
    }
  };
};

const validatePromptSource = (language, source) => {
  const samples = [source.get(0), source.get(1), source.get(source.length - 1)];
  if (!Number.isSafeInteger(source.length) || source.length < 1 || samples.some(prompt => !prompt || prompt.includes('{'))) {
    throw new Error(`Invalid curiosity prompt source for ${language}`);
  }
};

const buildLanguagePromptSource = (language, topics) => {
  const source = createCuriosityPromptSource(
    topics,
    curiosityPatternsByLanguage[language] || curiosityPatterns,
    curiosityQueryContextsByLanguage[language] || curiosityQueryContextsByLanguage.en
  );

  validatePromptSource(language, source);
  return source;
};

const lazyCuriousWordsByLanguage = {};

for (const [language, topics] of Object.entries(curiosityTopicsByLanguage)) {
  lazyCuriousWordsByLanguage[language] = buildLanguagePromptSource(language, topics);
}

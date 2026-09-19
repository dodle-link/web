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
  'What is {topic}?',
  'How does {topic} work?',
  'Why is {topic} important?',
  'A beginner guide to {topic}',
  'The history of {topic}',
  'The science behind {topic}',
  'Surprising facts about {topic}',
  'The latest research on {topic}',
  'The most unusual examples of {topic}',
  'How {topic} has changed over time',
  'The key ideas behind {topic}',
  'Common questions about {topic}',
  'The benefits and challenges of {topic}',
  'The people who shaped {topic}',
  'A visual explanation of {topic}',
  'The future of {topic}',
  'How {topic} affects everyday life',
  'The most important discoveries about {topic}',
  'A timeline of {topic}',
  'What we still do not know about {topic}'
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

const curiousWords = allCuriosityTopics.flatMap(topic =>
  curiosityPatterns.map(pattern => pattern.replace('{topic}', topic))
);

const expandLocalizedTopics = (topics, subjects, angles) => [
  ...topics,
  ...subjects.flatMap(subject => angles.map(angle => angle.replace('{subject}', subject)))
];

const curiosityTopicsByLanguage = {
  en: allCuriosityTopics,
  ja: expandLocalizedTopics([
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
  zh: expandLocalizedTopics([
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
  th: expandLocalizedTopics([
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
  ])
};

const curiosityPatternsByLanguage = {
  en: curiosityPatterns,
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
  ]
};

const curiousWordsByLanguage = Object.fromEntries(
  Object.keys(curiosityTopicsByLanguage).map(language => [
    language,
    curiosityTopicsByLanguage[language].flatMap(topic =>
      curiosityPatternsByLanguage[language].map(pattern => pattern.replace('{topic}', topic))
    )
  ])
);

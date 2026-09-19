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
  'Why is {topic} interesting?',
  'A beginner guide to {topic}',
  'The history of {topic}',
  'The science behind {topic}',
  'Surprising facts about {topic}',
  'The latest research on {topic}',
  'The most unusual examples of {topic}',
  'How {topic} has changed over time'
];

const curiousWords = curiosityTopics.flatMap(topic =>
  curiosityPatterns.map(pattern => pattern.replace('{topic}', topic))
);

const curiosityTopicsByLanguage = {
  en: curiosityTopics,
  ja: [
    'オーロラ', '古代の図書館', 'ミツバチの会話', '深海生物', '地図の歴史',
    '火山島', '睡眠の科学', '忘れられた発明', '言語の起源', '砂漠の生態系',
    '音楽の数学', '最も古い木', '橋の仕組み', 'チョコレートの歴史', '雲の形',
    '好奇心の心理学', '水中考古学', '鳥の進化', '記憶の仕組み', '珍しい気象現象'
  ],
  zh: [
    '极光', '古代图书馆', '蜜蜂如何交流', '深海生物', '地图的历史',
    '火山岛', '睡眠科学', '被遗忘的发明', '语言的起源', '沙漠生态系统',
    '音乐的数学', '最古老的树', '桥梁的工作原理', '巧克力的历史', '云的形态',
    '好奇心心理学', '水下考古', '鸟类的进化', '记忆的工作原理', '罕见天气现象'
  ],
  th: [
    'แสงเหนือ', 'ห้องสมุดโบราณ', 'การสื่อสารของผึ้ง', 'สิ่งมีชีวิตใต้ทะเลลึก', 'ประวัติศาสตร์ของแผนที่',
    'เกาะภูเขาไฟ', 'วิทยาศาสตร์ของการนอนหลับ', 'สิ่งประดิษฐ์ที่ถูกลืม', 'ต้นกำเนิดของภาษา', 'ระบบนิเวศทะเลทราย',
    'คณิตศาสตร์ของดนตรี', 'ต้นไม้ที่เก่าแก่ที่สุด', 'การทำงานของสะพาน', 'ประวัติศาสตร์ช็อกโกแลต', 'รูปทรงของเมฆ',
    'จิตวิทยาของความอยากรู้อยากเห็น', 'โบราณคดีใต้น้ำ', 'วิวัฒนาการของนก', 'การทำงานของความทรงจำ', 'ปรากฏการณ์อากาศที่หายาก'
  ]
};

const curiosityPatternsByLanguage = {
  en: curiosityPatterns,
  ja: [
    '{topic}とは？', '{topic}はどのように機能する？', 'なぜ{topic}は興味深い？', '{topic}入門', '{topic}の歴史',
    '{topic}の科学', '{topic}の意外な事実', '{topic}の最新研究', '{topic}の珍しい例', '{topic}はどう変化してきた？'
  ],
  zh: [
    '什么是{topic}？', '{topic}是如何运作的？', '为什么{topic}很有趣？', '{topic}入门指南', '{topic}的历史',
    '{topic}背后的科学', '关于{topic}的惊人事实', '{topic}的最新研究', '{topic}最不寻常的例子', '{topic}如何随时间变化？'
  ],
  th: [
    '{topic}คืออะไร', '{topic}ทำงานอย่างไร', 'ทำไม{topic}จึงน่าสนใจ', 'คู่มือเบื้องต้นเกี่ยวกับ{topic}', 'ประวัติของ{topic}',
    'วิทยาศาสตร์เบื้องหลัง{topic}', 'ข้อเท็จจริงที่น่าประหลาดใจเกี่ยวกับ{topic}', 'งานวิจัยล่าสุดเกี่ยวกับ{topic}', 'ตัวอย่างที่แปลกที่สุดของ{topic}', '{topic}เปลี่ยนแปลงไปตามกาลเวลาอย่างไร'
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

const curiosityLanguageConfig = {
  en: {
    topics: [
      'Astronomy', 'Medicine', 'Architecture', 'Agriculture', 'Music', 'Archaeology', 'Mathematics', 'Transportation',
      'Engineering', 'Computer Science', 'Education', 'Psychology', 'Ecology', 'Geology', 'Oceanography', 'Photography',
      'Film', 'Mythology', 'Painting', 'Sculpture', 'Fashion', 'Nutrition', 'Finance', 'Trade', 'Democracy',
      'Law', 'Sports', 'Games', 'Crafts', 'Inventions', 'Materials', 'Energy', 'Climate', 'Weather', 'Evolution',
      'Animals', 'Plants', 'Cities', 'Discoveries', 'Communication'
    ],
    patterns: [
      'What is {topic}?', 'How does {topic} work?', 'Why is {topic} important?', 'A beginner guide to {topic}',
      'The history of {topic}', 'The science behind {topic}', 'Surprising facts about {topic}', 'Latest research on {topic}',
      'Unusual examples of {topic}', 'How {topic} has changed over time', 'The key ideas behind {topic}', 'People who shaped {topic}',
      'A visual explanation of {topic}'
    ],
    contexts: [
      'for beginners', 'in everyday life', 'through history', 'from a scientific perspective', 'with real examples',
      'in simple terms', 'around the world', 'and its cultural meaning', 'and its environmental impact',
      'and the latest discoveries', 'compared with related ideas', 'and what may happen next'
    ]
  },
  ja: {
    topics: [
      '天文学', '医学', '建築学', '農業', '音楽', '考古学', '数学', '交通',
      '工学', 'コンピュータサイエンス', '教育', '心理学', '生態学', '地質学', '海洋学', '写真',
      '映画', '神話', '絵画', '彫刻', 'ファッション', '栄養学', '金融', '貿易', '民主主義',
      '法律', 'スポーツ', 'ゲーム', '工芸', '発明', '材料', 'エネルギー', '気候', '天気', '進化',
      '動物', '植物', '都市', '発見', 'コミュニケーション'
    ],
    patterns: [
      '{topic}とは？', '{topic}はどのように機能する？', 'なぜ{topic}は興味深い？', '{topic}入門', '{topic}の歴史',
      '{topic}の科学', '{topic}の意外な事実', '{topic}の最新研究', '{topic}の珍しい例', '{topic}はどう変化してきた？',
      '{topic}の重要な考え方', '{topic}についてよくある質問', '{topic}の利点と課題', '{topic}を形作った人々',
      '{topic}を図解で説明', '{topic}の未来', '{topic}と日常生活', '{topic}に関する重要な発見',
      '{topic}の年表', '{topic}についてまだ分かっていないこと'
    ],
    contexts: [
      '初心者向け', '日常生活との関係', '歴史的な背景', '科学的な視点', '実例を通して', '簡単な言葉で',
      '世界各地の例', '文化的な意味', '環境への影響', '最新の発見', '関連するテーマとの比較', 'これからの展望'
    ]
  },
  zh: {
    topics: [
      '天文学', '医学', '建筑学', '农业', '音乐', '考古学', '数学', '交通',
      '工程学', '计算机科学', '教育', '心理学', '生态学', '地质学', '海洋学', '摄影',
      '电影', '神话', '绘画', '雕塑', '时尚', '营养学', '金融', '贸易', '民主',
      '法律', '体育', '游戏', '工艺', '发明', '材料', '能源', '气候', '天气', '进化',
      '动物', '植物', '城市', '发现', '交流'
    ],
    patterns: [
      '什么是{topic}？', '{topic}是如何运作的？', '为什么{topic}很有趣？', '{topic}入门指南', '{topic}的历史',
      '{topic}背后的科学', '关于{topic}的惊人事实', '{topic}的最新研究', '{topic}最不寻常的例子', '{topic}如何随时间变化？',
      '{topic}背后的关键理念', '关于{topic}的常见问题', '{topic}的优点与挑战', '塑造{topic}的人们',
      '{topic}图解', '{topic}的未来', '{topic}如何影响日常生活', '关于{topic}的重要发现',
      '{topic}发展时间线', '关于{topic}仍然未知的事情'
    ],
    contexts: [
      '适合初学者', '与日常生活的关系', '历史背景', '科学视角', '通过真实案例', '用简单语言解释',
      '世界各地的例子', '文化意义', '环境影响', '最新发现', '与相关主题比较', '未来展望'
    ]
  },
  th: {
    topics: [
      'ดาราศาสตร์', 'การแพทย์', 'สถาปัตยกรรม', 'เกษตรกรรม', 'ดนตรี', 'โบราณคดี', 'คณิตศาสตร์', 'การขนส่ง',
      'วิศวกรรม', 'วิทยาการคอมพิวเตอร์', 'การศึกษา', 'จิตวิทยา', 'นิเวศวิทยา', 'ธรณีวิทยา', 'วิทยาศาสตร์ทางทะเล', 'การถ่ายภาพ',
      'ภาพยนตร์', 'ตำนาน', 'จิตรกรรม', 'ประติมากรรม', 'แฟชั่น', 'โภชนาการ', 'การเงิน', 'การค้า', 'ประชาธิปไตย',
      'กฎหมาย', 'กีฬา', 'เกม', 'งานฝีมือ', 'การประดิษฐ์', 'วัสดุ', 'พลังงาน', 'สภาพภูมิอากาศ', 'สภาพอากาศ', 'วิวัฒนาการ',
      'สัตว์', 'พืช', 'เมือง', 'การค้นพบ', 'การสื่อสาร'
    ],
    patterns: [
      '{topic}คืออะไร', '{topic}ทำงานอย่างไร', 'ทำไม{topic}จึงน่าสนใจ', 'คู่มือเบื้องต้นเกี่ยวกับ{topic}', 'ประวัติของ{topic}',
      'วิทยาศาสตร์เบื้องหลัง{topic}', 'ข้อเท็จจริงที่น่าประหลาดใจเกี่ยวกับ{topic}', 'งานวิจัยล่าสุดเกี่ยวกับ{topic}', 'ตัวอย่างที่แปลกที่สุดของ{topic}', '{topic}เปลี่ยนแปลงไปตามกาลเวลาอย่างไร',
      'แนวคิดสำคัญเกี่ยวกับ{topic}', 'คำถามที่พบบ่อยเกี่ยวกับ{topic}', 'ประโยชน์และความท้าทายของ{topic}', 'ผู้คนที่สร้างสรรค์{topic}',
      'คำอธิบายแบบภาพของ{topic}', 'อนาคตของ{topic}', '{topic}ส่งผลต่อชีวิตประจำวันอย่างไร', 'การค้นพบสำคัญเกี่ยวกับ{topic}',
      'เส้นเวลาของ{topic}', 'สิ่งที่เรายังไม่รู้เกี่ยวกับ{topic}'
    ],
    contexts: [
      'สำหรับผู้เริ่มต้น', 'ในชีวิตประจำวัน', 'เบื้องหลังทางประวัติศาสตร์', 'ในมุมมองทางวิทยาศาสตร์', 'จากตัวอย่างจริง', 'อธิบายด้วยภาษาง่ายๆ',
      'ตัวอย่างจากทั่วโลก', 'ความหมายทางวัฒนธรรม', 'ผลกระทบต่อสิ่งแวดล้อม', 'การค้นพบล่าสุด', 'เปรียบเทียบกับหัวข้อที่เกี่ยวข้อง', 'แนวโน้มในอนาคต'
    ]
  },
  ko: {
    topics: [
      '천문학', '의학', '건축학', '농업', '음악', '고고학', '수학', '교통',
      '공학', '컴퓨터 과학', '교육', '심리학', '생태학', '지질학', '해양학', '사진',
      '영화', '신화', '회화', '조각', '패션', '영양학', '금융', '무역', '민주주의',
      '법', '스포츠', '게임', '공예', '발명', '재료', '에너지', '기후', '날씨', '진화',
      '동물', '식물', '도시', '발견', '커뮤니케이션'
    ],
    patterns: [
      '{topic}이란 무엇인가?', '{topic}은 어떻게 작동하는가?', '왜 {topic}이 중요한가?', '{topic} 입문', '{topic}의 역사',
      '{topic}의 과학', '{topic}에 관한 놀라운 사실', '{topic}의 최신 연구', '{topic}의 특이한 사례', '{topic}는 어떻게 변해 왔는가?',
      '{topic}의 핵심 개념', '{topic}에 관한 자주 묻는 질문', '{topic}의 장점과 과제', '{topic}를 만든 사람들',
      '{topic}의 시각적 설명', '{topic}의 미래', '{topic}가 일상에 미치는 영향', '{topic}의 중요한 발견',
      '{topic}의 연대표', '{topic}에 대해 아직 모르는 것'
    ],
    contexts: [
      '초보자를 위한 안내', '일상생활에서', '역사적 배경', '과학적 관점', '실제 사례와 함께', '쉬운 말로 설명',
      '세계 각지의 사례', '문화적 의미', '환경에 미치는 영향', '최신 발견', '관련 주제와 비교', '앞으로의 전망'
    ]
  },
  fr: {
    topics: [
      'Astronomie', 'Medizin', 'Architektur', 'Landwirtschaft', 'Musik', 'Archäologie', 'Mathematik', 'Transport',
      'Ingenieurwesen', 'Informatik', 'Bildung', 'Psychologie', 'Ökologie', 'Geologie', 'Ozeanographie', 'Fotografie',
      'Film', 'Mythologie', 'Malerei', 'Bildhauerei', 'Mode', 'Ernährung', 'Finanzen', 'Handel', 'Demokratie',
      'Recht', 'Sport', 'Spiele', 'Handwerk', 'Erfindungen', 'Materialien', 'Energie', 'Klima', 'Wetter', 'Evolution',
      'Tiere', 'Pflanzen', 'Städte', 'Entdeckungen', 'Kommunikation'
    ],
    patterns: [
      "Qu'est-ce que {topic} ?", 'Comment fonctionne {topic} ?', 'Pourquoi {topic} est-il important ?', 'Guide de {topic} pour débutants',
      "L'histoire de {topic}", 'La science de {topic}', 'Faits surprenants sur {topic}', 'Les dernières recherches sur {topic}',
      'Les exemples les plus insolites de {topic}', "Comment {topic} a changé au fil du temps", 'Les idées clés de {topic}',
      'Questions fréquentes sur {topic}', 'Les avantages et les défis de {topic}', 'Les personnes qui ont façonné {topic}',
      'Une explication visuelle de {topic}', "L'avenir de {topic}", 'Comment {topic} influence la vie quotidienne',
      'Les découvertes importantes sur {topic}', 'Une chronologie de {topic}', 'Ce que nous ignorons encore sur {topic}'
    ],
    contexts: [
      'pour débutants', 'dans la vie quotidienne', 'dans son contexte historique', 'd un point de vue scientifique', 'avec des exemples concrets', 'en termes simples',
      'dans le monde', 'et sa signification culturelle', 'et son impact environnemental', 'et les dernières découvertes', 'comparé aux sujets proches', 'et ses perspectives futures'
    ]
  },
  de: {
    topics: [
      'Astronomie', 'Medizin', 'Architektur', 'Landwirtschaft', 'Musik', 'Archäologie', 'Mathematik', 'Transport',
      'Ingenieurwesen', 'Informatik', 'Bildung', 'Psychologie', 'Ökologie', 'Geologie', 'Ozeanographie', 'Fotografie',
      'Film', 'Mythologie', 'Malerei', 'Bildhauerei', 'Mode', 'Ernährung', 'Finanzen', 'Handel', 'Demokratie',
      'Recht', 'Sport', 'Spiele', 'Handwerk', 'Erfindungen', 'Materialien', 'Energie', 'Klima', 'Wetter', 'Evolution',
      'Tiere', 'Pflanzen', 'Städte', 'Entdeckungen', 'Kommunikation'
    ],
    patterns: [
      'Was ist {topic}?', 'Wie funktioniert {topic}?', 'Warum ist {topic} wichtig?', 'Eine Einführung in {topic}', 'Die Geschichte von {topic}',
      'Die Wissenschaft hinter {topic}', 'Überraschende Fakten über {topic}', 'Die neuesten Forschungen zu {topic}', 'Die ungewöhnlichsten Beispiele für {topic}',
      'Wie sich {topic} im Laufe der Zeit verändert hat', 'Die wichtigsten Ideen hinter {topic}', 'Häufige Fragen zu {topic}',
      'Die Vorteile und Herausforderungen von {topic}', 'Die Menschen, die {topic} geprägt haben', 'Eine visuelle Erklärung von {topic}',
      'Die Zukunft von {topic}', 'Wie {topic} den Alltag beeinflusst', 'Wichtige Entdeckungen zu {topic}', 'Eine Zeitleiste von {topic}',
      'Was wir über {topic} noch nicht wissen'
    ],
    contexts: [
      'für Anfänger', 'im Alltag', 'vor dem historischen Hintergrund', 'aus wissenschaftlicher Sicht', 'mit echten Beispielen', 'einfach erklärt',
      'aus aller Welt', 'und seine kulturelle Bedeutung', 'und seine Auswirkungen auf die Umwelt', 'und die neuesten Entdeckungen', 'im Vergleich zu verwandten Themen', 'und seine Zukunft'
    ]
  }
};

const normalizePrompt = (prompt = '') => String(prompt).replace(/\s+/g, ' ').trim();

const fillTemplate = (template, values) => Object.entries(values).reduce(
  (result, [key, value]) => result.replaceAll(`{${key}}`, value),
  template
);

const buildLanguagePromptSource = (topics, patterns, contexts) => {
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
      if (this.length < 1) return undefined;
      const randomIndex = Math.min(this.length - 1, Math.floor(Math.random() * this.length));
      return this.get(randomIndex);
    }
  };
};

const validatePromptSource = (language, source) => {
  const samples = [source.get(0), source.get(1), source.get(source.length - 1)];

  if (
    !Number.isSafeInteger(source.length)
    || source.length < 1
    || samples.some(prompt => !prompt || prompt.includes('{'))
  ) {
    throw new Error(`Invalid curiosity prompt source for ${language}`);
  }
};

window.lazyCuriousWordsByLanguage = {};

for (const [language, config] of Object.entries(curiosityLanguageConfig)) {
  const source = buildLanguagePromptSource(config.topics, config.patterns, config.contexts);

  validatePromptSource(language, source);
  window.lazyCuriousWordsByLanguage[language] = source;
}

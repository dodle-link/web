const curiosityLanguageConfig = {
  en: {
    topics: [
      'Astronomy', 'Medicine', 'Architecture', 'Agriculture', 'Music', 'Archaeology', 'Mathematics', 'Transportation',
      'Engineering', 'Computer Science', 'Education', 'Psychology', 'Ecology', 'Geology', 'Oceanography', 'Photography',
      'Film', 'Mythology', 'Painting', 'Sculpture', 'Fashion', 'Nutrition', 'Finance', 'Trade', 'Democracy',
      'Law', 'Sports', 'Games', 'Crafts', 'Inventions', 'Materials', 'Energy', 'Climate', 'Weather', 'Evolution',
      'Animals', 'Plants', 'Cities', 'Discoveries', 'Communication',
      'Botany', 'Zoology', 'Genetics', 'Microbiology', 'Biochemistry', 'Physics', 'Chemistry', 'Statistics', 'Logic', 'Linguistics',
      'Sociology', 'Anthropology', 'Economics', 'Politics', 'History', 'Geography', 'Philosophy', 'Ethics', 'Literature', 'Poetry',
      'Theater', 'Dance', 'Design', 'Graphic Design', 'Typography', 'Ceramics', 'Jewelry', 'Textiles', 'Cooking', 'Baking',
      'Gardening', 'Forestry', 'Fisheries', 'Veterinary Science', 'Public Health', 'Biotechnology', 'Pharmacology', 'Neuroscience', 'Astronautics', 'Robotics',
      'Artificial Intelligence', 'Data Science', 'Cybersecurity', 'Software', 'Internet', 'Telecommunications', 'Semiconductors', 'Nanotechnology', 'Renewable Energy', 'Nuclear Energy',
      'Hydrology', 'Meteorology', 'Volcanology', 'Seismology', 'Paleontology', 'Environmental Science', 'Conservation', 'Sustainability', 'Urban Planning', 'Civil Engineering',
      'Mechanical Engineering', 'Electrical Engineering', 'Chemical Engineering', 'Aerospace Engineering', 'Biomedical Engineering', 'Manufacturing', 'Construction', 'Architecture History', 'Archaeological Methods', 'Museums',
      'Libraries', 'Journalism', 'Publishing', 'Advertising', 'Marketing', 'Entrepreneurship', 'Accounting', 'Banking', 'Investing', 'Insurance',
      'Public Policy', 'International Relations', 'Human Rights', 'Criminology', 'Forensics', 'Emergency Services', 'Military History', 'Languages', 'Translation', 'Writing',
      'Reading', 'Education Technology', 'Child Development', 'Mental Health', 'Exercise Science', 'Nutrition Science', 'Medicine History', 'Alternative Medicine', 'First Aid', 'Aging'
    ],
    patterns: [
      'What is {topic}?', 'How does {topic} work?', 'Why is {topic} important?', 'A beginner guide to {topic}',
      'The history of {topic}', 'The science behind {topic}', 'Surprising facts about {topic}', 'Latest research on {topic}',
      'Unusual examples of {topic}', 'How {topic} has changed over time', 'The key ideas behind {topic}', 'People who shaped {topic}',
      'A visual explanation of {topic}', 'Common myths about {topic}', 'How to get started with {topic}',
      'The biggest challenges facing {topic}', 'How {topic} connects to other fields', 'A case study of {topic}',
      'The tools and methods used in {topic}', 'What experts get wrong about {topic}'
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
      '動物', '植物', '都市', '発見', 'コミュニケーション',
      '植物学', '動物学', '遺伝学', '微生物学', '生化学', '物理学', '化学', '統計学', '論理学', '言語学',
      '社会学', '人類学', '経済学', '政治学', '歴史学', '地理学', '哲学', '倫理学', '文学', '詩',
      '演劇', '舞踊', 'デザイン', 'グラフィックデザイン', 'タイポグラフィ', '陶芸', '宝飾', '織物', '料理', '製菓',
      '園芸', '林学', '水産学', '獣医学', '公衆衛生', 'バイオテクノロジー', '薬理学', '神経科学', '宇宙工学', 'ロボット工学',
      '人工知能', 'データサイエンス', 'サイバーセキュリティ', 'ソフトウェア', 'インターネット', '電気通信', '半導体', 'ナノテクノロジー', '再生可能エネルギー', '原子力エネルギー',
      '水文学', '気象学', '火山学', '地震学', '古生物学', '環境科学', '自然保護', '持続可能性', '都市計画', '土木工学',
      '機械工学', '電気工学', '化学工学', '航空宇宙工学', '生体医工学', '製造業', '建設', '建築史', '考古学的手法', '博物館',
      '図書館', 'ジャーナリズム', '出版', '広告', 'マーケティング', '起業', '会計学', '銀行業', '投資', '保険',
      '公共政策', '国際関係', '人権', '犯罪学', '法科学', '救急サービス', '軍事史', '言語', '翻訳', '文章作法',
      '読書', '教育工学', '子どもの発達', 'メンタルヘルス', '運動科学', '栄養科学', '医学史', '代替医療', '応急手当', '高齢化'
    ],
    patterns: [
      '{topic}とは？', '{topic}はどのように機能する？', 'なぜ{topic}は興味深い？', '{topic}入門', '{topic}の歴史',
      '{topic}の科学', '{topic}の意外な事実', '{topic}の最新研究', '{topic}の珍しい例', '{topic}はどう変化してきた？',
      '{topic}の重要な考え方', '{topic}についてよくある質問', '{topic}の利点と課題', '{topic}を形作った人々',
      '{topic}を図解で説明', '{topic}の未来', '{topic}と日常生活', '{topic}に関する重要な発見',
      '{topic}の年表', '{topic}についてまだ分かっていないこと', '{topic}にまつわるよくある誤解',
      '{topic}を始める方法', '{topic}が抱える最大の課題', '{topic}と他の分野のつながり',
      '{topic}の事例研究', '{topic}で使われる道具と方法', '{topic}の専門家が誤解していること'
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
      '动物', '植物', '城市', '发现', '交流',
      '植物学', '动物学', '遗传学', '微生物学', '生物化学', '物理学', '化学', '统计学', '逻辑学', '语言学',
      '社会学', '人类学', '经济学', '政治学', '历史学', '地理学', '哲学', '伦理学', '文学', '诗歌',
      '戏剧', '舞蹈', '设计', '平面设计', '字体设计', '陶艺', '珠宝', '纺织品', '烹饪', '烘焙',
      '园艺', '林业', '渔业', '兽医学', '公共卫生', '生物技术', '药理学', '神经科学', '航天工程', '机器人学',
      '人工智能', '数据科学', '网络安全', '软件', '互联网', '电信', '半导体', '纳米技术', '可再生能源', '核能',
      '水文学', '气象学', '火山学', '地震学', '古生物学', '环境科学', '自然保护', '可持续发展', '城市规划', '土木工程',
      '机械工程', '电气工程', '化学工程', '航空航天工程', '生物医学工程', '制造业', '建筑施工', '建筑史', '考古方法', '博物馆',
      '图书馆', '新闻学', '出版', '广告', '市场营销', '创业', '会计学', '银行业', '投资', '保险',
      '公共政策', '国际关系', '人权', '犯罪学', '法医学', '应急服务', '军事史', '语言', '翻译', '写作',
      '阅读', '教育技术', '儿童发展', '心理健康', '运动科学', '营养科学', '医学史', '替代医学', '急救', '老龄化'
    ],
    patterns: [
      '什么是{topic}？', '{topic}是如何运作的？', '为什么{topic}很有趣？', '{topic}入门指南', '{topic}的历史',
      '{topic}背后的科学', '关于{topic}的惊人事实', '{topic}的最新研究', '{topic}最不寻常的例子', '{topic}如何随时间变化？',
      '{topic}背后的关键理念', '关于{topic}的常见问题', '{topic}的优点与挑战', '塑造{topic}的人们',
      '{topic}图解', '{topic}的未来', '{topic}如何影响日常生活', '关于{topic}的重要发现',
      '{topic}发展时间线', '关于{topic}仍然未知的事情', '关于{topic}的常见误解', '如何开始了解{topic}',
      '{topic}面临的最大挑战', '{topic}与其他领域的联系', '{topic}案例研究', '研究{topic}所用的工具和方法',
      '专家对{topic}的误解'
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
      'สัตว์', 'พืช', 'เมือง', 'การค้นพบ', 'การสื่อสาร',
      'พฤกษศาสตร์', 'สัตววิทยา', 'พันธุศาสตร์', 'จุลชีววิทยา', 'ชีวเคมี', 'ฟิสิกส์', 'เคมี', 'สถิติ', 'ตรรกศาสตร์', 'ภาษาศาสตร์',
      'สังคมวิทยา', 'มานุษยวิทยา', 'เศรษฐศาสตร์', 'รัฐศาสตร์', 'ประวัติศาสตร์', 'ภูมิศาสตร์', 'ปรัชญา', 'จริยศาสตร์', 'วรรณกรรม', 'บทกวี',
      'ละครเวที', 'นาฏศิลป์', 'การออกแบบ', 'การออกแบบกราฟิก', 'การจัดตัวอักษร', 'เครื่องปั้นดินเผา', 'เครื่องประดับ', 'สิ่งทอ', 'การทำอาหาร', 'การอบขนม',
      'พืชสวน', 'วนศาสตร์', 'ประมง', 'สัตวแพทยศาสตร์', 'สาธารณสุข', 'เทคโนโลยีชีวภาพ', 'เภสัชวิทยา', 'ประสาทวิทยา', 'วิศวกรรมอวกาศ', 'วิทยาการหุ่นยนต์',
      'ปัญญาประดิษฐ์', 'วิทยาศาสตร์ข้อมูล', 'ความปลอดภัยไซเบอร์', 'ซอฟต์แวร์', 'อินเทอร์เน็ต', 'โทรคมนาคม', 'เซมิคอนดักเตอร์', 'นาโนเทคโนโลยี', 'พลังงานหมุนเวียน', 'พลังงานนิวเคลียร์',
      'อุทกวิทยา', 'อุตุนิยมวิทยา', 'ภูเขาไฟวิทยา', 'แผ่นดินไหววิทยา', 'บรรพชีวินวิทยา', 'วิทยาศาสตร์สิ่งแวดล้อม', 'การอนุรักษ์', 'ความยั่งยืน', 'การวางผังเมือง', 'วิศวกรรมโยธา',
      'วิศวกรรมเครื่องกล', 'วิศวกรรมไฟฟ้า', 'วิศวกรรมเคมี', 'วิศวกรรมการบินและอวกาศ', 'วิศวกรรมชีวการแพทย์', 'การผลิต', 'การก่อสร้าง', 'ประวัติศาสตร์สถาปัตยกรรม', 'วิธีการทางโบราณคดี', 'พิพิธภัณฑ์',
      'ห้องสมุด', 'วารสารศาสตร์', 'การพิมพ์', 'โฆษณา', 'การตลาด', 'การประกอบการ', 'การบัญชี', 'การธนาคาร', 'การลงทุน', 'การประกันภัย',
      'นโยบายสาธารณะ', 'ความสัมพันธ์ระหว่างประเทศ', 'สิทธิมนุษยชน', 'อาชญาวิทยา', 'นิติวิทยาศาสตร์', 'บริการฉุกเฉิน', 'ประวัติศาสตร์การทหาร', 'ภาษา', 'การแปล', 'การเขียน',
      'การอ่าน', 'เทคโนโลยีการศึกษา', 'พัฒนาการเด็ก', 'สุขภาพจิต', 'วิทยาศาสตร์การออกกำลังกาย', 'วิทยาศาสตร์โภชนาการ', 'ประวัติศาสตร์การแพทย์', 'การแพทย์ทางเลือก', 'การปฐมพยาบาล', 'สังคมสูงวัย'
    ],
    patterns: [
      '{topic}คืออะไร', '{topic}ทำงานอย่างไร', 'ทำไม{topic}จึงน่าสนใจ', 'คู่มือเบื้องต้นเกี่ยวกับ{topic}', 'ประวัติของ{topic}',
      'วิทยาศาสตร์เบื้องหลัง{topic}', 'ข้อเท็จจริงที่น่าประหลาดใจเกี่ยวกับ{topic}', 'งานวิจัยล่าสุดเกี่ยวกับ{topic}', 'ตัวอย่างที่แปลกที่สุดของ{topic}', '{topic}เปลี่ยนแปลงไปตามกาลเวลาอย่างไร',
      'แนวคิดสำคัญเกี่ยวกับ{topic}', 'คำถามที่พบบ่อยเกี่ยวกับ{topic}', 'ประโยชน์และความท้าทายของ{topic}', 'ผู้คนที่สร้างสรรค์{topic}',
      'คำอธิบายแบบภาพของ{topic}', 'อนาคตของ{topic}', '{topic}ส่งผลต่อชีวิตประจำวันอย่างไร', 'การค้นพบสำคัญเกี่ยวกับ{topic}',
      'เส้นเวลาของ{topic}', 'สิ่งที่เรายังไม่รู้เกี่ยวกับ{topic}', 'ความเข้าใจผิดที่พบบ่อยเกี่ยวกับ{topic}',
      'วิธีเริ่มต้นเรียนรู้เกี่ยวกับ{topic}', 'ความท้าทายที่ใหญ่ที่สุดของ{topic}', '{topic}เชื่อมโยงกับศาสตร์อื่นอย่างไร',
      'กรณีศึกษาของ{topic}', 'เครื่องมือและวิธีการที่ใช้ใน{topic}', 'สิ่งที่ผู้เชี่ยวชาญเข้าใจผิดเกี่ยวกับ{topic}'
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
      '동물', '식물', '도시', '발견', '커뮤니케이션',
      '식물학', '동물학', '유전학', '미생물학', '생화학', '물리학', '화학', '통계학', '논리학', '언어학',
      '사회학', '인류학', '경제학', '정치학', '역사학', '지리학', '철학', '윤리학', '문학', '시',
      '연극', '무용', '디자인', '그래픽 디자인', '타이포그래피', '도예', '보석', '섬유', '요리', '제빵',
      '원예', '임학', '수산학', '수의학', '공중보건', '생명공학', '약리학', '신경과학', '우주공학', '로봇공학',
      '인공지능', '데이터 과학', '사이버 보안', '소프트웨어', '인터넷', '통신', '반도체', '나노기술', '재생 에너지', '원자력 에너지',
      '수문학', '기상학', '화산학', '지진학', '고생물학', '환경과학', '보전', '지속 가능성', '도시 계획', '토목공학',
      '기계공학', '전기공학', '화학공학', '항공우주공학', '의생명공학', '제조업', '건설', '건축사', '고고학적 방법', '박물관',
      '도서관', '저널리즘', '출판', '광고', '마케팅', '기업가정신', '회계학', '은행업', '투자', '보험',
      '공공 정책', '국제 관계', '인권', '범죄학', '법과학', '응급 서비스', '군사 역사', '언어', '번역', '글쓰기',
      '독서', '교육 기술', '아동 발달', '정신 건강', '운동 과학', '영양 과학', '의학사', '대체 의학', '응급 처치', '고령화'
    ],
    patterns: [
      '{topic}이란 무엇인가?', '{topic}은 어떻게 작동하는가?', '왜 {topic}이 중요한가?', '{topic} 입문', '{topic}의 역사',
      '{topic}의 과학', '{topic}에 관한 놀라운 사실', '{topic}의 최신 연구', '{topic}의 특이한 사례', '{topic}는 어떻게 변해 왔는가?',
      '{topic}의 핵심 개념', '{topic}에 관한 자주 묻는 질문', '{topic}의 장점과 과제', '{topic}를 만든 사람들',
      '{topic}의 시각적 설명', '{topic}의 미래', '{topic}가 일상에 미치는 영향', '{topic}의 중요한 발견',
      '{topic}의 연대표', '{topic}에 대해 아직 모르는 것', '{topic}에 대한 흔한 오해', '{topic}을 시작하는 방법',
      '{topic}이 직면한 가장 큰 과제', '{topic}과 다른 분야의 연결', '{topic}의 사례 연구',
      '{topic}에서 사용하는 도구와 방법', '{topic}에 대해 전문가들이 잘못 알고 있는 것'
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
      'Tiere', 'Pflanzen', 'Städte', 'Entdeckungen', 'Kommunikation',
      'Botanique', 'Zoologie', 'Génétique', 'Microbiologie', 'Biochimie', 'Physique', 'Chimie', 'Statistiques', 'Logique', 'Linguistique',
      'Sociologie', 'Anthropologie', 'Économie', 'Sciences politiques', 'Histoire', 'Géographie', 'Philosophie', 'Éthique', 'Littérature', 'Poésie',
      'Théâtre', 'Danse', 'Design', 'Design graphique', 'Typographie', 'Céramique', 'Bijouterie', 'Textiles', 'Cuisine', 'Pâtisserie',
      'Horticulture', 'Foresterie', 'Pêche', 'Médecine vétérinaire', 'Santé publique', 'Biotechnologie', 'Pharmacologie', 'Neurosciences', 'Astronautique', 'Robotique',
      'Intelligence artificielle', 'Science des données', 'Cybersécurité', 'Logiciels', 'Internet', 'Télécommunications', 'Semi-conducteurs', 'Nanotechnologie', 'Énergies renouvelables', 'Énergie nucléaire',
      'Hydrologie', 'Météorologie', 'Volcanologie', 'Sismologie', 'Paléontologie', 'Sciences de l’environnement', 'Conservation', 'Durabilité', 'Urbanisme', 'Génie civil',
      'Génie mécanique', 'Génie électrique', 'Génie chimique', 'Génie aérospatial', 'Génie biomédical', 'Fabrication', 'Construction', 'Histoire de l’architecture', 'Méthodes archéologiques', 'Musées',
      'Bibliothèques', 'Journalisme', 'Édition', 'Publicité', 'Marketing', 'Entrepreneuriat', 'Comptabilité', 'Banque', 'Investissement', 'Assurance',
      'Politiques publiques', 'Relations internationales', 'Droits humains', 'Criminologie', 'Médecine légale', 'Services d’urgence', 'Histoire militaire', 'Langues', 'Traduction', 'Écriture',
      'Lecture', 'Technologies éducatives', 'Développement de l’enfant', 'Santé mentale', 'Sciences de l’exercice', 'Science de la nutrition', 'Histoire de la médecine', 'Médecine douce', 'Premiers secours', 'Vieillissement'
    ],
    patterns: [
      "Qu'est-ce que {topic} ?", 'Comment fonctionne {topic} ?', 'Pourquoi {topic} est-il important ?', 'Guide de {topic} pour débutants',
      "L'histoire de {topic}", 'La science de {topic}', 'Faits surprenants sur {topic}', 'Les dernières recherches sur {topic}',
      'Les exemples les plus insolites de {topic}', "Comment {topic} a changé au fil du temps", 'Les idées clés de {topic}',
      'Questions fréquentes sur {topic}', 'Les avantages et les défis de {topic}', 'Les personnes qui ont façonné {topic}',
      'Une explication visuelle de {topic}', "L'avenir de {topic}", 'Comment {topic} influence la vie quotidienne',
      'Les découvertes importantes sur {topic}', 'Une chronologie de {topic}', 'Ce que nous ignorons encore sur {topic}',
      'Les idées reçues sur {topic}', 'Comment débuter avec {topic}', 'Les principaux défis de {topic}',
      'Les liens entre {topic} et d’autres domaines', 'Une étude de cas sur {topic}', 'Les outils et méthodes de {topic}',
      'Ce que les experts se trompent sur {topic}'
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
      'Tiere', 'Pflanzen', 'Städte', 'Entdeckungen', 'Kommunikation',
      'Botanik', 'Zoologie', 'Genetik', 'Mikrobiologie', 'Biochemie', 'Physik', 'Chemie', 'Statistik', 'Logik', 'Linguistik',
      'Soziologie', 'Anthropologie', 'Volkswirtschaft', 'Politikwissenschaft', 'Geschichte', 'Geografie', 'Philosophie', 'Ethik', 'Literatur', 'Lyrik',
      'Theater', 'Tanz', 'Design', 'Grafikdesign', 'Typografie', 'Keramik', 'Schmuck', 'Textilien', 'Kochen', 'Backen',
      'Gartenbau', 'Forstwirtschaft', 'Fischerei', 'Tiermedizin', 'Gesundheitswesen', 'Biotechnologie', 'Pharmakologie', 'Neurowissenschaften', 'Raumfahrttechnik', 'Robotik',
      'Künstliche Intelligenz', 'Datenwissenschaft', 'Cybersicherheit', 'Software', 'Internet', 'Telekommunikation', 'Halbleiter', 'Nanotechnologie', 'Erneuerbare Energien', 'Kernenergie',
      'Hydrologie', 'Meteorologie', 'Vulkanologie', 'Seismologie', 'Paläontologie', 'Umweltwissenschaft', 'Naturschutz', 'Nachhaltigkeit', 'Stadtplanung', 'Bauingenieurwesen',
      'Maschinenbau', 'Elektrotechnik', 'Chemieingenieurwesen', 'Luft- und Raumfahrttechnik', 'Biomedizinische Technik', 'Produktion', 'Bauwesen', 'Architekturgeschichte', 'Archäologische Methoden', 'Museen',
      'Bibliotheken', 'Journalismus', 'Verlagswesen', 'Werbung', 'Marketing', 'Unternehmertum', 'Buchhaltung', 'Bankwesen', 'Investitionen', 'Versicherungen',
      'Öffentliche Politik', 'Internationale Beziehungen', 'Menschenrechte', 'Kriminologie', 'Forensik', 'Rettungsdienste', 'Militärgeschichte', 'Sprachen', 'Übersetzung', 'Schreiben',
      'Lesen', 'Bildungstechnologie', 'Kinderentwicklung', 'Psychische Gesundheit', 'Sportwissenschaft', 'Ernährungswissenschaft', 'Medizingeschichte', 'Alternativmedizin', 'Erste Hilfe', 'Alterung'
    ],
    patterns: [
      'Was ist {topic}?', 'Wie funktioniert {topic}?', 'Warum ist {topic} wichtig?', 'Eine Einführung in {topic}', 'Die Geschichte von {topic}',
      'Die Wissenschaft hinter {topic}', 'Überraschende Fakten über {topic}', 'Die neuesten Forschungen zu {topic}', 'Die ungewöhnlichsten Beispiele für {topic}',
      'Wie sich {topic} im Laufe der Zeit verändert hat', 'Die wichtigsten Ideen hinter {topic}', 'Häufige Fragen zu {topic}',
      'Die Vorteile und Herausforderungen von {topic}', 'Die Menschen, die {topic} geprägt haben', 'Eine visuelle Erklärung von {topic}',
      'Die Zukunft von {topic}', 'Wie {topic} den Alltag beeinflusst', 'Wichtige Entdeckungen zu {topic}', 'Eine Zeitleiste von {topic}',
      'Was wir über {topic} noch nicht wissen', 'Häufige Irrtümer über {topic}', 'Wie man mit {topic} anfängt',
      'Die größten Herausforderungen von {topic}', 'Wie {topic} mit anderen Bereichen verbunden ist', 'Eine Fallstudie zu {topic}',
      'Werkzeuge und Methoden in {topic}', 'Was Experten über {topic} falsch verstehen'
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

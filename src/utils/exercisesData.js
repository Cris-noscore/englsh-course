// exercisesData.js — 35 questões por módulo (9 módulos = 315 total)
// Tipos: multiple_choice, fill_blank, drag_drop, word_order, voice_practice

export const exercisesByModule = {

  // ==================== MÓDULO 1 — Fundamentals & Personal Presentation ====================
  1: {
    title: "Fundamentals & Personal Presentation",
    exercises: [
      // MULTIPLE CHOICE (10)
      { id:1,  type:'multiple_choice', question:'Hello, my name ____ John.', options:['is','am','are'], correct:'is', explanation:'Use "is" with he/she/it and names.', hint:'My name = third person singular' },
      { id:2,  type:'multiple_choice', question:'Nice to ____ you.', options:['meet','met','meeting'], correct:'meet', explanation:'Nice to meet you — fixed expression.', hint:'After "to" use base verb' },
      { id:3,  type:'multiple_choice', question:'What color is the sky?', options:['blue','red','yellow'], correct:'blue', explanation:'The sky is blue.', hint:'Look up!' },
      { id:4,  type:'multiple_choice', question:'I am ____ teacher.', options:['a','an','the'], correct:'a', explanation:'"teacher" starts with a consonant sound.', hint:'Consonant sound → a' },
      { id:5,  type:'multiple_choice', question:'They ____ my friends.', options:['is','am','are'], correct:'are', explanation:'They + are.', hint:'Plural subject' },
      { id:6,  type:'multiple_choice', question:'____ is your name?', options:['What','Where','Who'], correct:'What', explanation:'What is your name? — asking for information.', hint:'Asking for a thing/info' },
      { id:7,  type:'multiple_choice', question:'She is ____ engineer.', options:['a','an','the'], correct:'an', explanation:'"engineer" starts with a vowel sound.', hint:'Vowel sound → an' },
      { id:8,  type:'multiple_choice', question:'What number comes after "seven"?', options:['six','eight','nine'], correct:'eight', explanation:'7 → 8 → nine.', hint:'7 + 1' },
      { id:9,  type:'multiple_choice', question:'How do you say "Bom dia" in English?', options:['Good morning','Good afternoon','Good night'], correct:'Good morning', explanation:'Good morning = Bom dia.', hint:'Morning greeting' },
      { id:10, type:'multiple_choice', question:'Which pronoun do you use for a male person?', options:['She','He','It'], correct:'He', explanation:'He = male person.', hint:'Male = He' },

      // FILL BLANK (5)
      { id:11, type:'fill_blank', question:'I ____ 25 years old.', correct:'am', explanation:'I + am.', hint:'I + ?' },
      { id:12, type:'fill_blank', question:'She ____ from Brazil.', correct:'is', explanation:'She + is.', hint:'She + ?' },
      { id:13, type:'fill_blank', question:'The number 100 is ____.', correct:'one hundred', explanation:'100 = one hundred.', hint:'A very round number' },
      { id:14, type:'fill_blank', question:'____ old are you?', correct:'How', explanation:'How old are you? — asking age.', hint:'How + adjective' },
      { id:15, type:'fill_blank', question:'Good ____ (boa noite — ao sair).', correct:'night', explanation:'Good night = farewell at night.', hint:'Saying goodbye at night' },

      // DRAG & DROP (8)
      { id:16, type:'drag_drop', sentence:'My name ___ John and I ___ from Brazil.', blanks:['is','am'], options:['is','am','are','were'], correct:'is am', explanation:'My name IS, I AM.', hint:'Two different forms of "to be"' },
      { id:17, type:'drag_drop', sentence:'She ___ a student and she ___ English.', blanks:['is','speaks'], options:['is','are','speaks','speak'], correct:'is speaks', explanation:'She IS, she SPEAKS.', hint:'Third person singular' },
      { id:18, type:'drag_drop', sentence:'We ___ happy to ___ you.', blanks:['are','meet'], options:['are','is','meet','met'], correct:'are meet', explanation:'We ARE, nice to MEET you.', hint:'Plural + base verb' },
      { id:19, type:'drag_drop', sentence:'He ___ a doctor and ___ at a hospital.', blanks:['is','works'], options:['is','are','works','work'], correct:'is works', explanation:'He IS, he WORKS.', hint:'Third person singular' },
      { id:20, type:'drag_drop', sentence:'___ are you from? I ___ from Japan.', blanks:['Where','am'], options:['Where','What','am','is'], correct:'Where am', explanation:'WHERE are you from? I AM from Japan.', hint:'Location question + I am' },
      { id:21, type:'drag_drop', sentence:'The sky ___ blue and the grass ___ green.', blanks:['is','is'], options:['is','are','am'], correct:'is is', explanation:'The sky IS, the grass IS.', hint:'Singular subjects' },
      { id:22, type:'drag_drop', sentence:'I ___ not from the USA. I ___ from Brazil.', blanks:['am','am'], options:['am','is','are'], correct:'am am', explanation:'I AM NOT, I AM.', hint:'First person' },
      { id:23, type:'drag_drop', sentence:'___ you a student? Yes, I ___.', blanks:['Are','am'], options:['Are','Is','am','is'], correct:'Are am', explanation:'ARE you? Yes, I AM.', hint:'Question form + short answer' },

      // WORD ORDER (7)
      { id:24, type:'word_order', question:'Translate: "Meu nome é Ana e eu sou do Brasil."', words:['My','name','is','Ana','and','I','am','from','Brazil'], correct:'My name is Ana and I am from Brazil', explanation:'Subject + to be + complement.', hint:'Start with My name...' },
      { id:25, type:'word_order', question:'Translate: "Ela é professora."', words:['She','is','a','teacher'], correct:'She is a teacher', explanation:'She + is + article + noun.', hint:'She is...' },
      { id:26, type:'word_order', question:'Translate: "Qual é o seu nome?"', words:['What','is','your','name'], correct:'What is your name', explanation:'WH-question + is + your + noun.', hint:'Start with What...' },
      { id:27, type:'word_order', question:'Translate: "Eu tenho 20 anos."', words:['I','am','20','years','old'], correct:'I am 20 years old', explanation:'I + am + age + years old.', hint:'I am + number...' },
      { id:28, type:'word_order', question:'Translate: "Prazer em conhecer você!"', words:['Nice','to','meet','you'], correct:'Nice to meet you', explanation:'Fixed expression.', hint:'Nice to...' },
      { id:29, type:'word_order', question:'Translate: "Eles são meus amigos."', words:['They','are','my','friends'], correct:'They are my friends', explanation:'They + are + possessive + noun.', hint:'They are...' },
      { id:30, type:'word_order', question:'Translate: "De onde você é?"', words:['Where','are','you','from'], correct:'Where are you from', explanation:'WH-question + are + you + from.', hint:'Start with Where...' },

      // VOICE PRACTICE (5)
      { id:31, type:'voice_practice', sentence:'Hello, my name is Ana and I am from Brazil.', explanation:'Practice introducing yourself.', hint:'Speak clearly and slowly' },
      { id:32, type:'voice_practice', sentence:'Nice to meet you. Where are you from?', explanation:'Common greeting when meeting someone.', hint:'Pay attention to the question intonation' },
      { id:33, type:'voice_practice', sentence:'I am a student and I love English.', explanation:'Simple self-description.', hint:'Stress "love" to show enthusiasm' },
      { id:34, type:'voice_practice', sentence:'She is my teacher. He is my friend.', explanation:'Third person pronouns with to be.', hint:'Short clear sentences' },
      { id:35, type:'voice_practice', sentence:'Good morning! How are you today?', explanation:'Standard morning greeting.', hint:'Rise your voice slightly on "today"' },
    ]
  },

  // ==================== MÓDULO 2 — Daily Routine & Simple Present ====================
  2: {
    title: "Daily Routine & Simple Present",
    exercises: [
      { id:36, type:'multiple_choice', question:'I ___ up at 7 AM every day.', options:['wake','wakes','waking'], correct:'wake', explanation:'I + base verb.', hint:'First person → no -s' },
      { id:37, type:'multiple_choice', question:'She ___ to work by bus.', options:['go','goes','going'], correct:'goes', explanation:'She + goes (irregular: go → goes).', hint:'go → goes for he/she/it' },
      { id:38, type:'multiple_choice', question:'They ___ watch TV in the morning.', options:["don't","doesn't","not"], correct:"don't", explanation:'They + do not.', hint:'They → do not → don\'t' },
      { id:39, type:'multiple_choice', question:'What does "usually" mean?', options:['100%','90%','50%'], correct:'90%', explanation:'Usually = about 90% of the time.', hint:'More than sometimes, less than always' },
      { id:40, type:'multiple_choice', question:'What time is it? 7:15 = ____', options:['quarter past seven','half past seven','quarter to eight'], correct:'quarter past seven', explanation:'15 minutes = quarter past.', hint:'15 = quarter' },
      { id:41, type:'multiple_choice', question:'He ___ English very well.', options:['speak','speaks','speaking'], correct:'speaks', explanation:'He + speaks.', hint:'Third person + -s' },
      { id:42, type:'multiple_choice', question:'We ___ lunch at 1 PM.', options:['have','has','having'], correct:'have', explanation:'We + have.', hint:'We → have (not has)' },
      { id:43, type:'multiple_choice', question:'___ your sister speak English?', options:['Do','Does','Is'], correct:'Does', explanation:'Does + he/she/it.', hint:'Third person question → Does' },
      { id:44, type:'multiple_choice', question:'What time is it? 8:30 = ____', options:['half past eight','quarter past eight','quarter to nine'], correct:'half past eight', explanation:'30 minutes = half past.', hint:'30 = half' },
      { id:45, type:'multiple_choice', question:'She ___ breakfast at 8 AM.', options:['have','has','having'], correct:'has', explanation:'She + has.', hint:'Third person → has' },

      { id:46, type:'fill_blank', question:'I ____ coffee in the morning. (not/drink)', correct:"don't drink", explanation:'I + do not + base verb.', hint:'I don\'t...' },
      { id:47, type:'fill_blank', question:'The movie ____ at 8 PM. (start)', correct:'starts', explanation:'The movie = third person.', hint:'starts or start?' },
      { id:48, type:'fill_blank', question:'They ____ (not/like) spicy food.', correct:"don't like", explanation:'They + do not.', hint:'They don\'t...' },
      { id:49, type:'fill_blank', question:'I ____ to the gym three times a week.', correct:'go', explanation:'I + base verb.', hint:'I go...' },
      { id:50, type:'fill_blank', question:'____ you like coffee?', correct:'Do', explanation:'Do + you = question.', hint:'Question with I/you/we/they' },

      { id:51, type:'drag_drop', sentence:'She ___ up at 6 AM and ___ a shower.', blanks:['wakes','takes'], options:['wakes','wake','takes','take'], correct:'wakes takes', explanation:'She WAKES up, she TAKES a shower — third person.', hint:'Third person singular adds -s' },
      { id:52, type:'drag_drop', sentence:'I ___ have breakfast but I ___ drink coffee.', blanks:["don't","do"], options:["don't","doesn't","do","does"], correct:"don't do", explanation:'I DON\'T have breakfast but I DO drink coffee.', hint:'Negation + affirmation' },
      { id:53, type:'drag_drop', sentence:'He ___ to work at 8 AM and ___ home at 6 PM.', blanks:['goes','comes'], options:['goes','go','comes','come'], correct:'goes comes', explanation:'He GOES, he COMES — third person.', hint:'He/she/it adds -s or -es' },
      { id:54, type:'drag_drop', sentence:'___ often do you exercise? I exercise ___ a week.', blanks:['How','twice'], options:['How','What','twice','two'], correct:'How twice', explanation:'HOW often? TWICE a week.', hint:'Frequency question' },
      { id:55, type:'drag_drop', sentence:'My sister ___ her teeth and ___ a shower every morning.', blanks:['brushes','takes'], options:['brushes','brush','takes','take'], correct:'brushes takes', explanation:'My sister = third person.', hint:'brush → brushes' },
      { id:56, type:'drag_drop', sentence:'___ she work on weekends? No, she ___.', blanks:["Does","doesn't"], options:["Does","Do","doesn't","don't"], correct:"Does doesn't", explanation:'DOES she? No, she DOESN\'T.', hint:'Third person yes/no question' },
      { id:57, type:'drag_drop', sentence:'I ___ always have breakfast but I ___ never skip lunch.', blanks:['always','do'], options:['always','usually','do','don\'t'], correct:"always do", explanation:'I ALWAYS have breakfast, I DO NEVER skip = I never skip.', hint:'Adverb of frequency placement' },
      { id:58, type:'drag_drop', sentence:'The train ___ at 9 AM and ___ at 11 AM.', blanks:['leaves','arrives'], options:['leaves','leave','arrives','arrive'], correct:'leaves arrives', explanation:'The train = third person singular.', hint:'Schedule uses Present Simple' },

      { id:59, type:'word_order', question:'Translate: "Ela geralmente acorda às 7 da manhã."', words:['She','usually','wakes','up','at','7','AM'], correct:'She usually wakes up at 7 AM', explanation:'Subject + adverb + verb + time.', hint:'Adverb goes before the main verb' },
      { id:60, type:'word_order', question:'Translate: "Você toma café da manhã todos os dias?"', words:['Do','you','have','breakfast','every','day'], correct:'Do you have breakfast every day', explanation:'Do + subject + base verb + time.', hint:'Start with Do...' },
      { id:61, type:'word_order', question:'Translate: "Ele nunca come carne."', words:['He','never','eats','meat'], correct:'He never eats meat', explanation:'Subject + adverb + verb(-s) + object.', hint:'never goes before the main verb' },
      { id:62, type:'word_order', question:'Translate: "Eu trabalho das 9 ao meio-dia."', words:['I','work','from','9','to','noon'], correct:'I work from 9 to noon', explanation:'Subject + verb + time range.', hint:'I work...' },
      { id:63, type:'word_order', question:'Translate: "A que horas começa o filme?"', words:['What','time','does','the','movie','start'], correct:'What time does the movie start', explanation:'What time + does + subject + base verb.', hint:'Start with What time...' },

      { id:64, type:'voice_practice', sentence:'I wake up at seven AM and have breakfast at eight.', explanation:'Daily routine description.', hint:'Say the numbers clearly' },
      { id:65, type:'voice_practice', sentence:'She usually goes to work by bus on weekdays.', explanation:'Third person routine with frequency adverb.', hint:'Note the -es on "goes"' },
      { id:66, type:'voice_practice', sentence:'Do you always drink coffee in the morning?', explanation:'Yes/no question with frequency adverb.', hint:'Rise your intonation at the end' },
      { id:67, type:'voice_practice', sentence:'I never skip breakfast because it\'s the most important meal.', explanation:'Using never + because.', hint:'Stress "never" and "most important"' },
      { id:68, type:'voice_practice', sentence:'What time does the train leave? It leaves at half past nine.', explanation:'Time question and answer.', hint:'Pay attention to "half past"' },
      { id:69, type:'voice_practice', sentence:'He works from nine to six and goes to the gym after work.', explanation:'Full daily routine sentence.', hint:'Link the two actions with "and"' },
      { id:70, type:'voice_practice', sentence:'How often do you exercise? I exercise three times a week.', explanation:'Frequency question and answer.', hint:'Clear intonation on the question' },
    ]
  },

  // ==================== MÓDULO 3 — Daily Situations ====================
  3: {
    title: "Daily Situations",
    exercises: [
      { id:71, type:'multiple_choice', question:'I\'m hungry. I want to ____ a pizza.', options:['eat','cook','make'], correct:'eat', explanation:'Eat = consume food.', hint:'You eat food' },
      { id:72, type:'multiple_choice', question:'Can I have the ____, please?', options:['menu','food','drink'], correct:'menu', explanation:'Menu = cardápio.', hint:'The list of dishes' },
      { id:73, type:'multiple_choice', question:'She ____ dinner right now.', options:['cooks','is cooking','cook'], correct:'is cooking', explanation:'Present Continuous = action happening now.', hint:'Action happening NOW' },
      { id:74, type:'multiple_choice', question:'What is the superlative of "big"?', options:['bigger','biggest','most big'], correct:'biggest', explanation:'Big → bigger → the biggest.', hint:'Short adjective + -est' },
      { id:75, type:'multiple_choice', question:'There ____ two chairs in the kitchen.', options:['is','are','am'], correct:'are', explanation:'There are + plural.', hint:'Plural = are' },
      { id:76, type:'multiple_choice', question:'Excuse me, how can I ____ to the station?', options:['get','go','come'], correct:'get', explanation:'How can I get to = common expression.', hint:'How can I GET to...' },
      { id:77, type:'multiple_choice', question:'What is "cozinha" in English?', options:['kitchen','bathroom','bedroom'], correct:'kitchen', explanation:'Kitchen = cozinha.', hint:'Where you cook' },
      { id:78, type:'multiple_choice', question:'This restaurant is ____ than that one.', options:['more expensive','most expensive','expensiver'], correct:'more expensive', explanation:'Long adjective → more + adjective.', hint:'Long adjective → more...' },
      { id:79, type:'multiple_choice', question:'The restaurant is ____ the left.', options:['in','on','at'], correct:'on', explanation:'On the left/right = direction.', hint:'Left/right uses ON' },
      { id:80, type:'multiple_choice', question:'What is "banheiro" in English?', options:['bathroom','kitchen','bedroom'], correct:'bathroom', explanation:'Bathroom = banheiro.', hint:'Where you shower' },

      { id:81, type:'fill_blank', question:'My house is ____ (big) than yours.', correct:'bigger', explanation:'Big → bigger (short adjective + -er).', hint:'big + -ger' },
      { id:82, type:'fill_blank', question:'There ____ a big sofa in the living room.', correct:'is', explanation:'There is + singular noun.', hint:'Singular = is' },
      { id:83, type:'fill_blank', question:'Turn ____ at the traffic light.', correct:'right', explanation:'Turn right = vire à direita.', hint:'Opposite of left' },
      { id:84, type:'fill_blank', question:'I\'d like ____ pizza, please.', correct:'a', explanation:'A pizza — consonant sound.', hint:'Pizza starts with consonant' },
      { id:85, type:'fill_blank', question:'Can I have ____ coffee?', correct:'some', explanation:'Some + uncountable noun.', hint:'Uncountable noun → some' },

      { id:86, type:'drag_drop', sentence:'Go ___ for two blocks and then ___ left.', blanks:['straight','turn'], options:['straight','left','turn','go'], correct:'straight turn', explanation:'Go STRAIGHT, then TURN left.', hint:'Direction instructions' },
      { id:87, type:'drag_drop', sentence:'The bank is ___ to the supermarket and ___ from the park.', blanks:['next','opposite'], options:['next','near','opposite','behind'], correct:'next opposite', explanation:'NEXT to = ao lado, OPPOSITE = em frente a.', hint:'Prepositions of place' },
      { id:88, type:'drag_drop', sentence:'I ___ like the steak and she ___ like the fish.', blanks:["would","would"], options:["would","will","should"], correct:"would would", explanation:'I would like, she would like = I\'d like, she\'d like.', hint:'Polite request' },
      { id:89, type:'drag_drop', sentence:'There ___ a table in the kitchen and there ___ four chairs.', blanks:['is','are'], options:['is','are','am'], correct:'is are', explanation:'THERE IS (singular), THERE ARE (plural).', hint:'Singular vs plural' },
      { id:90, type:'drag_drop', sentence:'This is the ___ restaurant in the city and the food is ___.', blanks:['best','delicious'], options:['best','good','delicious','tasty'], correct:'best delicious', explanation:'THE BEST = superlative of good; DELICIOUS = very tasty.', hint:'Superlative + positive adjective' },
      { id:91, type:'drag_drop', sentence:'She ___ cooking dinner while I ___ watching TV.', blanks:['is','am'], options:['is','are','am'], correct:'is am', explanation:'She IS, I AM — Present Continuous.', hint:'Present Continuous: to be + ing' },
      { id:92, type:'drag_drop', sentence:'The hospital is ___ the school and ___ to the park.', blanks:['opposite','next'], options:['opposite','behind','next','near'], correct:'opposite next', explanation:'OPPOSITE = em frente; NEXT to = ao lado.', hint:'Position words' },
      { id:93, type:'drag_drop', sentence:'___ there a garden? No, but there ___ a balcony.', blanks:['Is','is'], options:['Is','Are','is','are'], correct:'Is is', explanation:'IS there (singular)? Yes, there IS.', hint:'Question with there is' },

      { id:94, type:'word_order', question:'Translate: "O restaurante fica entre o banco e o correio."', words:['The','restaurant','is','between','the','bank','and','the','post','office'], correct:'The restaurant is between the bank and the post office', explanation:'is between X and Y.', hint:'...is between...' },
      { id:95, type:'word_order', question:'Translate: "Eu estou lendo um livro agora."', words:['I','am','reading','a','book','now'], correct:'I am reading a book now', explanation:'I am + verb-ing + now.', hint:'Present continuous: I am...' },
      { id:96, type:'word_order', question:'Translate: "Este é o carro mais caro."', words:['This','is','the','most','expensive','car'], correct:'This is the most expensive car', explanation:'This is the most + adjective + noun.', hint:'Superlative of long adjective' },
      { id:97, type:'word_order', question:'Translate: "Há duas cadeiras na cozinha."', words:['There','are','two','chairs','in','the','kitchen'], correct:'There are two chairs in the kitchen', explanation:'There are + plural + in + place.', hint:'There are...' },
      { id:98, type:'word_order', question:'Translate: "Eu gostaria de um copo d\'água."', words:['I','would','like','a','glass','of','water'], correct:'I would like a glass of water', explanation:'I would like + article + noun + of + noun.', hint:'I would like...' },

      { id:99,  type:'voice_practice', sentence:'Go straight for two blocks and turn left at the traffic light.', explanation:'Giving directions.', hint:'Speak each instruction clearly' },
      { id:100, type:'voice_practice', sentence:'I would like the grilled fish, please. And a glass of water.', explanation:'Ordering at a restaurant.', hint:'Be polite and clear' },
      { id:101, type:'voice_practice', sentence:'My apartment has a big living room and two bedrooms.', explanation:'Describing a home.', hint:'Stress "big" and "two"' },
      { id:102, type:'voice_practice', sentence:'This is the most expensive restaurant in the city, but the food is delicious.', explanation:'Superlative + opinion.', hint:'Use contrast with "but"' },
      { id:103, type:'voice_practice', sentence:'Excuse me, is there a supermarket near here?', explanation:'Asking for directions politely.', hint:'Rise intonation for the question' },
      { id:104, type:'voice_practice', sentence:'She is cooking dinner while her husband is watching TV.', explanation:'Two simultaneous actions with Present Continuous.', hint:'Note the "while" linking the actions' },
      { id:105, type:'voice_practice', sentence:'The bank is next to the pharmacy, opposite the park.', explanation:'Describing location with two prepositions.', hint:'Short pause after pharmacy' },
    ]
  },

  // ==================== MÓDULO 4 — Simple Past & Past Continuous ====================
  4: {
    title: "Simple Past & Past Continuous",
    exercises: [
      { id:106, type:'multiple_choice', question:'Yesterday, I ____ to the park.', options:['go','went','gone'], correct:'went', explanation:'Went = past of go (irregular).', hint:'go → went' },
      { id:107, type:'multiple_choice', question:'I was ____ TV when he called.', options:['watch','watching','watched'], correct:'watching', explanation:'Past Continuous: was/were + -ing.', hint:'Was + verb-ing' },
      { id:108, type:'multiple_choice', question:'____ you finish your homework?', options:['Do','Did','Does'], correct:'Did', explanation:'Did = past question auxiliary.', hint:'Past question → Did' },
      { id:109, type:'multiple_choice', question:'What is the past of "eat"?', options:['eated','ate','eaten'], correct:'ate', explanation:'Eat → ate (irregular).', hint:'eat → ate' },
      { id:110, type:'multiple_choice', question:'You ____ study for the exam.', options:['can','should','may'], correct:'should', explanation:'Should = advice/recommendation.', hint:'Advice → should' },
      { id:111, type:'multiple_choice', question:'What is the past of "go"?', options:['goed','went','gone'], correct:'went', explanation:'Go → went (irregular).', hint:'go → went' },
      { id:112, type:'multiple_choice', question:'I ____ you yesterday.', options:['call','called','calling'], correct:'called', explanation:'Called = past of call (regular: + -ed).', hint:'Regular verb + -ed' },
      { id:113, type:'multiple_choice', question:'What is the past of "write"?', options:['writed','wrote','written'], correct:'wrote', explanation:'Write → wrote (irregular).', hint:'write → wrote' },
      { id:114, type:'multiple_choice', question:'She ____ speak three languages when she was young.', options:['can','could','may'], correct:'could', explanation:'Could = past ability.', hint:'Past of can = could' },
      { id:115, type:'multiple_choice', question:'They ____ playing soccer when it started to rain.', options:['was','were','are'], correct:'were', explanation:'They + were (Past Continuous).', hint:'They + were' },

      { id:116, type:'fill_blank', question:'She ____ (not/watch) TV last night.', correct:"didn't watch", explanation:'Did not + base verb.', hint:'didn\'t + base verb' },
      { id:117, type:'fill_blank', question:'I ____ swim when I was five.', correct:'could', explanation:'Could = past ability.', hint:'Past of can' },
      { id:118, type:'fill_blank', question:'She ____ (buy) a new dress.', correct:'bought', explanation:'Buy → bought (irregular).', hint:'buy → bought' },
      { id:119, type:'fill_blank', question:'I ____ reading when the phone rang.', correct:'was', explanation:'I was reading = Past Continuous.', hint:'Past continuous: was + -ing' },
      { id:120, type:'fill_blank', question:'We ____ a great time at the party.', correct:'had', explanation:'Have → had (irregular past).', hint:'have → had' },

      { id:121, type:'drag_drop', sentence:'I ___ watching TV ___ the phone rang.', blanks:['was','when'], options:['was','were','when','while'], correct:'was when', explanation:'I WAS watching (Past Cont.) WHEN the phone rang (Simple Past).', hint:'Past Continuous interrupted by Simple Past' },
      { id:122, type:'drag_drop', sentence:'She ___ to the beach and ___ a great time.', blanks:['went','had'], options:['went','go','had','have'], correct:'went had', explanation:'WENT (go→went), HAD (have→had) — both Simple Past.', hint:'Irregular past forms' },
      { id:123, type:'drag_drop', sentence:'___ you study for the test? No, I ___.', blanks:['Did',"didn't"], options:['Did','Do',"didn't","don't"], correct:"Did didn't", explanation:'DID you? No, I DIDN\'T.', hint:'Past yes/no question' },
      { id:124, type:'drag_drop', sentence:'While she ___ cooking, he ___ reading a book.', blanks:['was','was'], options:['was','were','is'], correct:'was was', explanation:'While she WAS cooking, he WAS reading — two simultaneous past actions.', hint:'Two past continuous actions' },
      { id:125, type:'drag_drop', sentence:'They ___ playing soccer ___ it started to rain.', blanks:['were','when'], options:['were','was','when','while'], correct:'were when', explanation:'They WERE playing WHEN it started.', hint:'Plural past continuous' },
      { id:126, type:'drag_drop', sentence:'I ___ call you, I promise. I ___ remember.', blanks:['will',"didn't"], options:['will','would',"didn't","don't"], correct:"will didn't", explanation:'WILL call (future promise), DIDN\'T remember (past).', hint:'Mix of tenses' },
      { id:127, type:'drag_drop', sentence:'He ___ sleep when the alarm ___ off.', blanks:['was','went'], options:['was','were','went','go'], correct:'was went', explanation:'He WAS sleeping (Past Cont.) when the alarm WENT off (Simple Past).', hint:'Past continuous + simple past' },
      { id:128, type:'drag_drop', sentence:'We ___ dinner and then ___ to the cinema.', blanks:['had','went'], options:['had','have','went','go'], correct:'had went', explanation:'HAD dinner (past of have), WENT to cinema (past of go).', hint:'Sequence of past events' },

      { id:129, type:'word_order', question:'Translate: "Eu fui ao cinema ontem à noite."', words:['I','went','to','the','cinema','last','night'], correct:'I went to the cinema last night', explanation:'I + went + to + place + time.', hint:'I went...' },
      { id:130, type:'word_order', question:'Translate: "Ela estava cozinhando quando eu cheguei."', words:['She','was','cooking','when','I','arrived'], correct:'She was cooking when I arrived', explanation:'Past Continuous + when + Simple Past.', hint:'She was cooking...' },
      { id:131, type:'word_order', question:'Translate: "Você deveria descansar mais."', words:['You','should','rest','more'], correct:'You should rest more', explanation:'You + should + base verb + adverb.', hint:'You should...' },
      { id:132, type:'word_order', question:'Translate: "Eles não assistiram ao jogo."', words:["They","didn't","watch","the","game"], correct:"They didn't watch the game", explanation:'They + didn\'t + base verb + object.', hint:'They didn\'t...' },
      { id:133, type:'word_order', question:'Translate: "O que você fez no fim de semana?"', words:['What','did','you','do','last','weekend'], correct:'What did you do last weekend', explanation:'What + did + subject + base verb + time.', hint:'What did you...' },

      { id:134, type:'voice_practice', sentence:'I went to the beach last weekend and had a great time.', explanation:'Talking about a past experience.', hint:'Stress "great time" to show enthusiasm' },
      { id:135, type:'voice_practice', sentence:'She was cooking dinner when I called her.', explanation:'Past Continuous interrupted by Simple Past.', hint:'Slight pause before "when"' },
      { id:136, type:'voice_practice', sentence:'Did you finish your homework? Yes, I did it last night.', explanation:'Past yes/no question and answer.', hint:'Rise intonation on the question' },
      { id:137, type:'voice_practice', sentence:'They were playing soccer while it was raining.', explanation:'Two simultaneous Past Continuous actions.', hint:'Note the "while" connecting them' },
      { id:138, type:'voice_practice', sentence:'I could swim very well when I was a child.', explanation:'Past ability with could.', hint:'Stress "very well"' },
      { id:139, type:'voice_practice', sentence:'What did you do last Saturday? I went shopping with my friends.', explanation:'Past question and answer conversation.', hint:'Natural question and answer flow' },
      { id:140, type:'voice_practice', sentence:'She bought a new car and everyone loved it.', explanation:'Two connected past actions.', hint:'Pause naturally between the two clauses' },
    ]
  },

  // ==================== MÓDULO 5 — Modal Verbs ====================
  5: {
    title: "Modal Verbs",
    exercises: [
      { id:141, type:'multiple_choice', question:'You ____ smoke here. It\'s forbidden.', options:["mustn't","don't have to","shouldn't"], correct:"mustn't", explanation:'Mustn\'t = strong prohibition.', hint:'Forbidden = mustn\'t' },
      { id:142, type:'multiple_choice', question:'____ I use your phone?', options:['Can','May','Should'], correct:'May', explanation:'May I = polite request/permission.', hint:'Formal permission' },
      { id:143, type:'multiple_choice', question:'You ____ see a doctor. You look sick.', options:['can','should','must'], correct:'should', explanation:'Should = advice.', hint:'Advice → should' },
      { id:144, type:'multiple_choice', question:'You ____ be tired after the trip.', options:['must','should','can'], correct:'must', explanation:'Must = logical conclusion.', hint:'Logical certainty' },
      { id:145, type:'multiple_choice', question:'She ____ be at home. I\'m not sure.', options:['must','might','could'], correct:'might', explanation:'Might = possibility (30%).', hint:'Not sure = might' },
      { id:146, type:'multiple_choice', question:'You ____ eat too much sugar.', options:["shouldn't","mustn't","can't"], correct:"shouldn't", explanation:'Shouldn\'t = not recommended.', hint:'Not recommended = shouldn\'t' },
      { id:147, type:'multiple_choice', question:'We ____ leave now or we\'ll be late.', options:['must','should','can'], correct:'must', explanation:'Must = strong necessity.', hint:'Strong need = must' },
      { id:148, type:'multiple_choice', question:'____ you speak any other languages?', options:['Can','May','Should'], correct:'Can', explanation:'Can = ability.', hint:'Ability → can' },
      { id:149, type:'multiple_choice', question:'You ____ park here. It\'s a reserved spot.', options:["can't","mustn't","shouldn't"], correct:"can't", explanation:'Can\'t = not allowed here.', hint:'Not allowed = can\'t' },
      { id:150, type:'multiple_choice', question:'I ____ come to the party. I have to work.', options:["can't","mustn't","shouldn't"], correct:"can't", explanation:'Can\'t = inability/impossibility.', hint:'Impossible for me = can\'t' },

      { id:151, type:'fill_blank', question:'I ____ go to the meeting. It\'s optional.', correct:"don't have to", explanation:'Don\'t have to = not necessary.', hint:'No obligation = don\'t have to' },
      { id:152, type:'fill_blank', question:'I ____ speak French when I was young.', correct:'could', explanation:'Could = past ability.', hint:'Past of can' },
      { id:153, type:'fill_blank', question:'____ you help me with this?', correct:'Can', explanation:'Can you = informal request.', hint:'Informal request' },
      { id:154, type:'fill_blank', question:'He ____ be late. Traffic is bad.', correct:'might', explanation:'Might = possibility.', hint:'Possible but not certain' },
      { id:155, type:'fill_blank', question:'You ____ worry. Everything will be fine.', correct:"shouldn't", explanation:'Shouldn\'t = not necessary to worry.', hint:'No need to = shouldn\'t' },

      { id:156, type:'drag_drop', sentence:'You ___ wear a seatbelt. It\'s the law. You ___ drive without one.', blanks:['must',"can't"], options:['must','should',"can't","mustn't"], correct:"must can't", explanation:'MUST = obligation; CAN\'T = not allowed.', hint:'Obligation vs prohibition' },
      { id:157, type:'drag_drop', sentence:'She ___ be a doctor because she studied medicine for years. She ___ be very smart.', blanks:['must','must'], options:['must','might','should'], correct:'must must', explanation:'MUST = logical conclusion from evidence.', hint:'Logical deduction = must' },
      { id:158, type:'drag_drop', sentence:'You ___ try the new restaurant. You ___ like it!', blanks:['should','might'], options:['should','must','might','can'], correct:'should might', explanation:'SHOULD = recommendation; MIGHT = possibility.', hint:'Recommend then suggest possibility' },
      { id:159, type:'drag_drop', sentence:'___ I open the window? Of course, you ___.', blanks:['May','can'], options:['May','Can','can','may'], correct:'May can', explanation:'MAY I = formal permission; you CAN = informal yes.', hint:'Formal question, informal answer' },
      { id:160, type:'drag_drop', sentence:'I ___ believe it! She ___ have done that!', blanks:["can't","couldn't"], options:["can't","mustn't","couldn't","shouldn't"], correct:"can't couldn't", explanation:'CAN\'T believe = present disbelief; COULDN\'T have = past disbelief.', hint:'Disbelief in present and past' },
      { id:161, type:'drag_drop', sentence:'You ___ have to come if you don\'t want to. But you ___ call to cancel.', blanks:["don't","should"], options:["don't","can't","should","must"], correct:"don't should", explanation:'DON\'T HAVE TO = not obligatory; SHOULD = recommended.', hint:'Optional vs recommended' },
      { id:162, type:'drag_drop', sentence:'He ___ swim when he was five but now he ___ swim very well.', blanks:["couldn't","can"], options:["couldn't","can't","can","could"], correct:"couldn't can", explanation:'COULDN\'T = past inability; CAN = present ability.', hint:'Past inability → present ability' },
      { id:163, type:'drag_drop', sentence:'It ___ rain tomorrow. You ___ bring an umbrella just in case.', blanks:['might','should'], options:['might','must','should','can'], correct:'might should', explanation:'MIGHT = possibility; SHOULD = good idea.', hint:'Uncertain + advice' },

      { id:164, type:'word_order', question:'Translate: "Você deve ver um médico."', words:['You','should','see','a','doctor'], correct:'You should see a doctor', explanation:'You + should + base verb + object.', hint:'You should...' },
      { id:165, type:'word_order', question:'Translate: "Você não pode fumar aqui."', words:["You","can't","smoke","here"], correct:"You can't smoke here", explanation:'You + can\'t + base verb + adverb.', hint:'You can\'t...' },
      { id:166, type:'word_order', question:'Translate: "Ela pode estar em casa."', words:['She','might','be','at','home'], correct:'She might be at home', explanation:'She + might + be + location.', hint:'She might...' },
      { id:167, type:'word_order', question:'Translate: "Eu não preciso ir trabalhar amanhã."', words:["I","don't","have","to","work","tomorrow"], correct:"I don't have to work tomorrow", explanation:'I + don\'t have to + base verb + time.', hint:'I don\'t have to...' },
      { id:168, type:'word_order', question:'Translate: "Você poderia me ajudar?"', words:['Could','you','help','me'], correct:'Could you help me', explanation:'Could + subject + base verb + object.', hint:'Could you...' },

      { id:169, type:'voice_practice', sentence:'You should exercise more and eat less sugar.', explanation:'Giving health advice with should.', hint:'Stress "should" for emphasis' },
      { id:170, type:'voice_practice', sentence:'I must finish this report before the deadline.', explanation:'Strong personal obligation.', hint:'Stress "must" and "before the deadline"' },
      { id:171, type:'voice_practice', sentence:'May I come in? Of course, please come in!', explanation:'Polite permission request and response.', hint:'Rise intonation for the question, fall for the answer' },
      { id:172, type:'voice_practice', sentence:'She might be late because of the traffic.', explanation:'Expressing possibility.', hint:'Say "might" softly to show uncertainty' },
      { id:173, type:'voice_practice', sentence:'You don\'t have to come, but it would be great if you could.', explanation:'No obligation + polite suggestion.', hint:'Note the difference in stress' },
      { id:174, type:'voice_practice', sentence:'I can speak three languages — English, Spanish, and Portuguese.', explanation:'Expressing ability with can.', hint:'List the languages with a slight pause between each' },
      { id:175, type:'voice_practice', sentence:'You must wear a seatbelt. It\'s the law and it saves lives.', explanation:'Stating a rule with must.', hint:'Firm, clear tone for rules' },
    ]
  },

  // ==================== MÓDULO 6 — Future Tenses ====================
  6: {
    title: "Future Tenses",
    exercises: [
      { id:176, type:'multiple_choice', question:'Look at those clouds! It ____ rain.', options:['will','is going to','both'], correct:'is going to', explanation:'Going to = evidence-based prediction.', hint:'Evidence → going to' },
      { id:177, type:'multiple_choice', question:'The train ____ at 10 AM.', options:['leaves','will leave','is leaving'], correct:'leaves', explanation:'Present Simple for scheduled events.', hint:'Timetable → Present Simple' },
      { id:178, type:'multiple_choice', question:'We ____ dinner at 8 PM tonight. (arranged)', options:['are having','will have','have'], correct:'are having', explanation:'Present Continuous for arrangements.', hint:'Fixed plan → Present Continuous' },
      { id:179, type:'multiple_choice', question:'This time tomorrow, I ____ flying to London.', options:['will be','am','will'], correct:'will be', explanation:'Future Continuous: will be + -ing.', hint:'Action in progress at future time' },
      { id:180, type:'multiple_choice', question:'____ you open the window?', options:['Will','Are','Do'], correct:'Will', explanation:'Will = polite request.', hint:'Request → Will you...' },
      { id:181, type:'multiple_choice', question:'She ____ to become a doctor. (intention)', options:['is going','will','does'], correct:'is going', explanation:'Going to = intention/plan.', hint:'Plan/intention → going to' },
      { id:182, type:'multiple_choice', question:'The meeting ____ at 3 PM. (scheduled)', options:['starts','will start','is starting'], correct:'starts', explanation:'Scheduled event → Present Simple.', hint:'Schedule → Present Simple' },
      { id:183, type:'multiple_choice', question:'I think it ____ rain later.', options:['will','is going to','both'], correct:'both', explanation:'Both possible for general prediction.', hint:'General prediction = both OK' },
      { id:184, type:'multiple_choice', question:'By 2030, AI ____ most jobs. (completed before that point)', options:['will replace','will have replaced','is replacing'], correct:'will have replaced', explanation:'Future Perfect = completed before a future point.', hint:'Completed BEFORE future point → Future Perfect' },
      { id:185, type:'multiple_choice', question:'What time ____ the movie start?', options:['does','will','is'], correct:'does', explanation:'Scheduled event → Present Simple question.', hint:'Schedule question → does' },

      { id:186, type:'fill_blank', question:'I ____ you later, I promise.', correct:'will call', explanation:'Will = promise.', hint:'Promise → will' },
      { id:187, type:'fill_blank', question:'She ____ to London next month. (planned)', correct:'is moving', explanation:'Present Continuous for plans.', hint:'Planned action = Present Continuous' },
      { id:188, type:'fill_blank', question:'I ____ a new car soon. (intention)', correct:'am going to buy', explanation:'Going to = intention.', hint:'Intention → going to' },
      { id:189, type:'fill_blank', question:'By next year, we ____ together for 10 years.', correct:'will have been', explanation:'Future Perfect Continuous = duration up to a future point.', hint:'Duration until future = will have been' },
      { id:190, type:'fill_blank', question:'I ____ you as soon as I know.', correct:'will tell', explanation:'Will = future promise/action.', hint:'Spontaneous decision or promise' },

      { id:191, type:'drag_drop', sentence:'Look at the clouds — it ___ rain. I ___ bring an umbrella.', blanks:['is going to','will'], options:['is going to','will','might','shall'], correct:'is going to will', explanation:'IS GOING TO = evidence; WILL = spontaneous decision.', hint:'Evidence vs spontaneous decision' },
      { id:192, type:'drag_drop', sentence:'The flight ___ at 6 PM. We ___ check in by 4 PM.', blanks:['departs','should'], options:['departs','will depart','should','must'], correct:'departs should', explanation:'DEPARTS = scheduled; SHOULD = recommended.', hint:'Schedule + advice' },
      { id:193, type:'drag_drop', sentence:'This time next week, I ___ lying on the beach and ___ mojitos.', blanks:['will be','drinking'], options:['will be','am','drinking','drink'], correct:'will be drinking', explanation:'Future Continuous: will be + -ing (action in progress next week).', hint:'Future continuous action' },
      { id:194, type:'drag_drop', sentence:'By the time you arrive, I ___ finished cooking. Dinner ___ ready.', blanks:['will have','will be'], options:['will have','will be','am'], correct:'will have will be', explanation:'WILL HAVE finished = Future Perfect; WILL BE ready = simple future.', hint:'Completed before arrival vs state' },
      { id:195, type:'drag_drop', sentence:'She ___ to study medicine — she ___ to university next September.', blanks:['is going','is going'], options:['is going','will','goes'], correct:'is going is going', explanation:'IS GOING TO study (intention) + IS GOING TO university (plan).', hint:'Both are plans/intentions' },
      { id:196, type:'drag_drop', sentence:'___ you be at home later? Yes, I ___ be there all evening.', blanks:['Will','will'], options:['Will','Are','will','am'], correct:'Will will', explanation:'WILL you? Yes, I WILL be.', hint:'Future yes/no question and answer' },
      { id:197, type:'drag_drop', sentence:'I think AI ___ change the world. It ___ create new jobs too.', blanks:['will','will'], options:['will','is going to','might'], correct:'will will', explanation:'WILL = personal opinion/prediction.', hint:'Personal opinion about the future' },
      { id:198, type:'drag_drop', sentence:'The concert ___ at 8 PM. ___ you come with me?', blanks:['starts','Will'], options:['starts','will start','Will','Are'], correct:'starts Will', explanation:'STARTS = schedule; WILL = invitation/request.', hint:'Schedule + request' },

      { id:199, type:'word_order', question:'Translate: "Eu vou viajar para o Japão no próximo ano."', words:['I','am','going','to','travel','to','Japan','next','year'], correct:'I am going to travel to Japan next year', explanation:'I am going to + base verb + destination + time.', hint:'I am going to...' },
      { id:200, type:'word_order', question:'Translate: "O trem sai às 10h."', words:['The','train','leaves','at','10','AM'], correct:'The train leaves at 10 AM', explanation:'Present Simple for schedules.', hint:'The train leaves...' },
      { id:201, type:'word_order', question:'Translate: "Até 2030, ela terá terminado o doutorado."', words:['By','2030','she','will','have','finished','her','PhD'], correct:'By 2030 she will have finished her PhD', explanation:'By + time + subject + will have + past participle.', hint:'By 2030...' },
      { id:202, type:'word_order', question:'Translate: "Você vai ao cinema amanhã à noite?"', words:['Are','you','going','to','the','cinema','tomorrow','night'], correct:'Are you going to the cinema tomorrow night', explanation:'Are + subject + going to + place + time.', hint:'Are you going...' },
      { id:203, type:'word_order', question:'Translate: "Essa hora amanhã, eu estarei voando para Paris."', words:['This','time','tomorrow','I','will','be','flying','to','Paris'], correct:'This time tomorrow I will be flying to Paris', explanation:'Time reference + will be + -ing.', hint:'This time tomorrow...' },

      { id:204, type:'voice_practice', sentence:'I am going to visit my family next weekend.', explanation:'Talking about a plan.', hint:'Stress "going to" to show it\'s planned' },
      { id:205, type:'voice_practice', sentence:'Look at those dark clouds! It is going to rain soon.', explanation:'Evidence-based prediction.', hint:'Stress "going to" to show the evidence is clear' },
      { id:206, type:'voice_practice', sentence:'The concert starts at eight PM. Will you come with me?', explanation:'Schedule + invitation.', hint:'Rise intonation for the question' },
      { id:207, type:'voice_practice', sentence:'By the time I finish this course, I will have studied English for two years.', explanation:'Future Perfect — duration.', hint:'Emphasize "will have studied"' },
      { id:208, type:'voice_practice', sentence:'This time next week, I will be relaxing on a beach in Brazil.', explanation:'Future Continuous — action in progress at a future time.', hint:'Say it with excitement!' },
      { id:209, type:'voice_practice', sentence:'I will call you as soon as I arrive at the hotel.', explanation:'Promise with will.', hint:'Firm, reassuring tone' },
      { id:210, type:'voice_practice', sentence:'What are your plans for next year? I am going to start a new job.', explanation:'Question and answer about future plans.', hint:'Natural conversational flow' },
    ]
  },

  // ==================== MÓDULO 7 — Conditionals ====================
  7: {
    title: "Conditionals",
    exercises: [
      { id:211, type:'multiple_choice', question:'If you heat ice, it ____.', options:['melts','will melt','would melt'], correct:'melts', explanation:'Zero Conditional = fact/scientific truth.', hint:'Always true → Present Simple' },
      { id:212, type:'multiple_choice', question:'If I ____ you, I would apologize.', options:['am','were','was'], correct:'were', explanation:'Second Conditional: If I were you...', hint:'Second Conditional: were' },
      { id:213, type:'multiple_choice', question:'What ____ you do if you won the lottery?', options:['will','would','do'], correct:'would', explanation:'Second Conditional = hypothetical.', hint:'Hypothetical → would' },
      { id:214, type:'multiple_choice', question:'If you ____ hard, you will succeed.', options:['work','worked','will work'], correct:'work', explanation:'First Conditional: If + Present Simple.', hint:'First Conditional: present simple in if-clause' },
      { id:215, type:'multiple_choice', question:'If I ____ more time, I would travel.', options:['have','had','will have'], correct:'had', explanation:'Second Conditional: past simple in if-clause.', hint:'Unreal present = past simple' },
      { id:216, type:'multiple_choice', question:'If you don\'t water plants, they ____.', options:['die','will die','would die'], correct:'die', explanation:'Zero Conditional = general truth.', hint:'Always true → present' },
      { id:217, type:'multiple_choice', question:'If I ____ studied, I would have passed.', options:['have','had','was'], correct:'had', explanation:'Third Conditional: If + past perfect.', hint:'Regret/past hypothetical = had + past participle' },
      { id:218, type:'multiple_choice', question:'If it rains, I ____ stay home.', options:['will','would','do'], correct:'will', explanation:'First Conditional = real possibility.', hint:'Real possibility → will' },
      { id:219, type:'multiple_choice', question:'If I were rich, I ____ buy a yacht.', options:['will','would','can'], correct:'would', explanation:'Second Conditional: would in main clause.', hint:'Hypothetical main clause → would' },
      { id:220, type:'multiple_choice', question:'If she ____ earlier, she wouldn\'t have missed the bus.', options:['left','had left','leaves'], correct:'had left', explanation:'Third Conditional: If + past perfect.', hint:'Regret about past = had + past participle' },

      { id:221, type:'fill_blank', question:'If it rains, I ____ stay home.', correct:'will', explanation:'First Conditional: will in main clause.', hint:'First Conditional → will' },
      { id:222, type:'fill_blank', question:'If I had known, I ____ have helped.', correct:'would', explanation:'Third Conditional: would have.', hint:'Third Conditional → would have' },
      { id:223, type:'fill_blank', question:'If you call me, I ____ answer.', correct:'will', explanation:'First Conditional → will.', hint:'Real possibility → will' },
      { id:224, type:'fill_blank', question:'If she ____ come, we\'ll start without her.', correct:"doesn't", explanation:'First Conditional: negative if-clause.', hint:'Negative in if-clause' },
      { id:225, type:'fill_blank', question:'If they had invited me, I ____ have gone.', correct:'would', explanation:'Third Conditional: would have.', hint:'Past regret → would have' },

      { id:226, type:'drag_drop', sentence:'If you ___ ice, it melts. This is a scientific ___.', blanks:['heat','fact'], options:['heat','heated','fact','truth'], correct:'heat fact', explanation:'HEAT = present simple; FACT = Zero Conditional describes facts.', hint:'Zero conditional = facts' },
      { id:227, type:'drag_drop', sentence:'If I ___ the lottery, I ___ travel the world.', blanks:['won','would'], options:['won','win','would','will'], correct:'won would', explanation:'WON (past simple in if-clause) + WOULD (main clause) = Second Conditional.', hint:'Hypothetical past → would' },
      { id:228, type:'drag_drop', sentence:'If it ___ rain tomorrow, we ___ go to the beach.', blanks:["doesn't","will"], options:["doesn't","won't","will","would"], correct:"doesn't will", explanation:'DOESN\'T rain (present simple negative) + WILL go = First Conditional.', hint:'First conditional negative' },
      { id:229, type:'drag_drop', sentence:'If I ___ studied harder, I ___ have passed the exam.', blanks:['had','would'], options:['had','have','would','will'], correct:'had would', explanation:'HAD studied (past perfect) + WOULD have = Third Conditional.', hint:'Regret about past' },
      { id:230, type:'drag_drop', sentence:'If you ___ red and blue, you ___ purple.', blanks:['mix','get'], options:['mix','mixed','get','got'], correct:'mix get', explanation:'MIX + GET = Zero Conditional (scientific fact).', hint:'Zero conditional: present + present' },
      { id:231, type:'drag_drop', sentence:'If I ___ you, I ___ apologize immediately.', blanks:['were','would'], options:['were','was','would','will'], correct:'were would', explanation:'WERE (not was!) + WOULD = Second Conditional.', hint:'"If I were you" is a fixed expression' },
      { id:232, type:'drag_drop', sentence:'If she ___ the job interview, she ___ have gotten the position.', blanks:['had passed','would'], options:['had passed','passed','would','will'], correct:'had passed would', explanation:'HAD PASSED (past perfect) + WOULD have = Third Conditional.', hint:'Third conditional regret' },
      { id:233, type:'drag_drop', sentence:'If you don\'t wear sunscreen, you ___ get sunburned. It\'s a fact.', blanks:['will'], options:['will','would','might'], correct:'will', explanation:'First Conditional with negative if-clause.', hint:'Certain consequence → will' },

      { id:234, type:'word_order', question:'Translate: "Se você estudar, vai passar no teste."', words:['If','you','study','you','will','pass','the','test'], correct:'If you study you will pass the test', explanation:'If + present simple + will + base verb.', hint:'First conditional' },
      { id:235, type:'word_order', question:'Translate: "Se eu fosse você, eu me desculparia."', words:['If','I','were','you','I','would','apologize'], correct:'If I were you I would apologize', explanation:'If + were + subject + would + base verb.', hint:'Second conditional' },
      { id:236, type:'word_order', question:'Translate: "Se eu tivesse estudado, teria passado."', words:['If','I','had','studied','I','would','have','passed'], correct:'If I had studied I would have passed', explanation:'If + past perfect + would have + past participle.', hint:'Third conditional' },
      { id:237, type:'word_order', question:'Translate: "O que você faria se ganhasse na loteria?"', words:['What','would','you','do','if','you','won','the','lottery'], correct:'What would you do if you won the lottery', explanation:'What + would + subject + do + if + past simple.', hint:'Second conditional question' },
      { id:238, type:'word_order', question:'Translate: "Se aquecer gelo, ele derrete."', words:['If','you','heat','ice','it','melts'], correct:'If you heat ice it melts', explanation:'If + present simple + present simple.', hint:'Zero conditional — fact' },

      { id:239, type:'voice_practice', sentence:'If it rains tomorrow, I will stay at home and watch a movie.', explanation:'First conditional — real possibility.', hint:'Natural linking of the two clauses' },
      { id:240, type:'voice_practice', sentence:'If I were you, I would apologize to her immediately.', explanation:'Second conditional — advice.', hint:'Stress "were" and "immediately"' },
      { id:241, type:'voice_practice', sentence:'What would you do if you won a million dollars?', explanation:'Second conditional question.', hint:'Rise intonation on the question' },
      { id:242, type:'voice_practice', sentence:'If I had studied harder, I would have passed the exam.', explanation:'Third conditional — regret.', hint:'Slight regretful tone' },
      { id:243, type:'voice_practice', sentence:'If you mix red and yellow, you get orange. It\'s a fact.', explanation:'Zero conditional — scientific fact.', hint:'Matter-of-fact, neutral tone' },
      { id:244, type:'voice_practice', sentence:'If she had arrived earlier, she wouldn\'t have missed the train.', explanation:'Third conditional — past regret.', hint:'Emphasize "had arrived" and "wouldn\'t have missed"' },
      { id:245, type:'voice_practice', sentence:'Unless you study, you won\'t pass the exam. That\'s the truth.', explanation:'First conditional with unless.', hint:'Firm, warning tone' },
    ]
  },

  // ==================== MÓDULO 8 — Natural Conversation ====================
  8: {
    title: "Natural Conversation & Fillers",
    exercises: [
      { id:246, type:'multiple_choice', question:'____ the way, have you seen John?', options:['By','On','In'], correct:'By', explanation:'By the way = aliás/a propósito.', hint:'By the way = changing topic' },
      { id:247, type:'multiple_choice', question:'What is a "small talk" topic?', options:['Weather','Politics','Religion'], correct:'Weather', explanation:'Weather is a safe, neutral topic.', hint:'Neutral, safe topic' },
      { id:248, type:'multiple_choice', question:'What does "anyway" mean?', options:['De qualquer forma','Aliás','Portanto'], correct:'De qualquer forma', explanation:'Anyway = de qualquer forma.', hint:'Resuming or changing topic' },
      { id:249, type:'multiple_choice', question:'What is a polite way to ask for repetition?', options:['Sorry?','What?','Huh?'], correct:'Sorry?', explanation:'Sorry? = polite request to repeat.', hint:'Most polite option' },
      { id:250, type:'multiple_choice', question:'What does "I see" mean in conversation?', options:['Entendo','Vejo','Sei'], correct:'Entendo', explanation:'I see = I understand.', hint:'Showing understanding' },
      { id:251, type:'multiple_choice', question:'What does "well" do as a filler?', options:['Starts/fills a pause','Ends a sentence','Changes topic'], correct:'Starts/fills a pause', explanation:'Well = used to gain thinking time.', hint:'Thinking time filler' },
      { id:252, type:'multiple_choice', question:'What does "um" indicate?', options:['Hesitation','Agreement','Disagreement'], correct:'Hesitation', explanation:'Um = hesitation filler.', hint:'Thinking pause' },
      { id:253, type:'multiple_choice', question:'What is a good response to "How are you?"', options:["I'm fine, thanks","Goodbye","Hello"], correct:"I'm fine, thanks", explanation:'Standard polite response.', hint:'Standard polite answer' },
      { id:254, type:'multiple_choice', question:'What does "I mean" do in conversation?', options:['Clarifies or corrects','Ends the topic','Shows agreement'], correct:'Clarifies or corrects', explanation:'I mean = quero dizer (clarification).', hint:'Used to clarify or correct' },
      { id:255, type:'multiple_choice', question:'What does "I guess" express?', options:['Uncertainty','Certainty','Disagreement'], correct:'Uncertainty', explanation:'I guess = acho que (uncertain).', hint:'Not 100% sure' },

      { id:256, type:'fill_blank', question:'Could you ____ more slowly?', correct:'speak', explanation:'Could you speak more slowly? = asking to slow down.', hint:'Asking to speak...' },
      { id:257, type:'fill_blank', question:'I didn\'t ____ that.', correct:'catch', explanation:'I didn\'t catch that = didn\'t understand.', hint:'Informal way to say you didn\'t understand' },
      { id:258, type:'fill_blank', question:'____, let\'s continue.', correct:'Anyway', explanation:'Anyway = returning to topic.', hint:'Getting back on track' },
      { id:259, type:'fill_blank', question:'It was nice ____ to you.', correct:'talking', explanation:'Nice talking to you = polite farewell.', hint:'Ending a conversation' },
      { id:260, type:'fill_blank', question:'____, did you see the news?', correct:'By the way', explanation:'By the way = introducing new topic.', hint:'New topic introduction' },

      { id:261, type:'drag_drop', sentence:'____, I think we should start the meeting.', blanks:['Well'], options:['Well','Um','Like','Actually'], correct:'Well', explanation:'WELL = filler to start or take the floor.', hint:'Starting to speak filler' },
      { id:262, type:'drag_drop', sentence:'It was, ____, a really good film. I mean, ____, I loved it.', blanks:['like','actually'], options:['like','well','actually','anyway'], correct:'like actually', explanation:'LIKE = informal filler; ACTUALLY = clarification.', hint:'Informal filler + clarification' },
      { id:263, type:'drag_drop', sentence:'____, let me think about this... ____, I agree with you.', blanks:['Um','Actually'], options:['Um','Well','Actually','Anyway'], correct:'Um Actually', explanation:'UM = hesitation; ACTUALLY = correction/clarification.', hint:'Hesitation then clarification' },
      { id:264, type:'drag_drop', sentence:'How\'s it ___? Not bad, ___. What about you?', blanks:['going','thanks'], options:['going','doing','thanks','please'], correct:'going thanks', explanation:'How\'s it GOING? Not bad, THANKS.', hint:'Common casual greeting exchange' },
      { id:265, type:'drag_drop', sentence:'Sorry, could you ____ that? I didn\'t quite ____ what you said.', blanks:['repeat','catch'], options:['repeat','say','catch','hear'], correct:'repeat catch', explanation:'Could you REPEAT that? I didn\'t CATCH it.', hint:'Two ways to ask for clarification' },
      { id:266, type:'drag_drop', sentence:'____ the way, have you heard the news? ____, it\'s shocking.', blanks:['By','Honestly'], options:['By','On','Honestly','Actually'], correct:'By Honestly', explanation:'BY the way = new topic; HONESTLY = strong opinion filler.', hint:'Topic change + strong opinion' },
      { id:267, type:'drag_drop', sentence:'I was going to call you but, ____, I forgot. ____to hear from you though!', blanks:['anyway','Great'], options:['anyway','actually','Great','Good'], correct:'anyway Great', explanation:'ANYWAY = resuming; GREAT = positive reaction.', hint:'Resume + positive reaction' },
      { id:268, type:'drag_drop', sentence:'What have you been ___? Just working, you ___. Nothing special.', blanks:['up to','know'], options:['up to','doing','know','think'], correct:'up to know', explanation:'What have you been UP TO? = what have you been doing? YOU KNOW = filler.', hint:'Casual check-in question + filler' },

      { id:269, type:'word_order', question:'Translate: "Aliás, você já ouviu a nova música dela?"', words:['By','the','way','have','you','heard','her','new','song'], correct:'By the way have you heard her new song', explanation:'By the way + question.', hint:'Start with "By the way"' },
      { id:270, type:'word_order', question:'Translate: "Foi um prazer falar com você."', words:['It','was','nice','talking','to','you'], correct:'It was nice talking to you', explanation:'Fixed expression.', hint:'It was nice talking...' },
      { id:271, type:'word_order', question:'Translate: "Você poderia falar mais devagar?"', words:['Could','you','speak','more','slowly'], correct:'Could you speak more slowly', explanation:'Could you + base verb + adverb.', hint:'Polite request' },
      { id:272, type:'word_order', question:'Translate: "Na verdade, eu prefiro chá a café."', words:['Actually','I','prefer','tea','to','coffee'], correct:'Actually I prefer tea to coffee', explanation:'Actually + subject + prefer + noun + to + noun.', hint:'Start with "Actually"' },
      { id:273, type:'word_order', question:'Translate: "De qualquer forma, vamos continuar."', words:['Anyway','let\'s','continue'], correct:"Anyway let's continue", explanation:'Anyway = resuming the topic.', hint:'Start with "Anyway"' },

      { id:274, type:'voice_practice', sentence:'Hi! How\'s it going? Not bad, thanks. What have you been up to?', explanation:'Casual greeting exchange.', hint:'Relaxed, friendly tone' },
      { id:275, type:'voice_practice', sentence:'Well, I think we should start. Actually, let me check the time first.', explanation:'Fillers in natural speech.', hint:'Let the fillers feel natural, not forced' },
      { id:276, type:'voice_practice', sentence:'Sorry, could you repeat that? I didn\'t quite catch what you said.', explanation:'Asking for clarification politely.', hint:'Apologetic, polite tone' },
      { id:277, type:'voice_practice', sentence:'By the way, did you hear about the new coffee shop downtown?', explanation:'Introducing a new topic with "by the way".', hint:'Rise in intonation on the question' },
      { id:278, type:'voice_practice', sentence:'It was, like, the most amazing concert I\'ve ever been to!', explanation:'Using informal filler "like".', hint:'Enthusiastic tone, stress "most amazing"' },
      { id:279, type:'voice_practice', sentence:'Anyway, it was great talking to you. Let\'s catch up again soon!', explanation:'Ending a conversation.', hint:'Warm, friendly closing' },
      { id:280, type:'voice_practice', sentence:'I mean, it\'s not perfect, but it\'s actually pretty good for the price.', explanation:'Using fillers to clarify opinion.', hint:'Honest, thoughtful tone' },
    ]
  },

  // ==================== MÓDULO 9 — Digital English & Phrasal Verbs ====================
  9: {
    title: "Digital English & Phrasal Verbs",
    exercises: [
      { id:281, type:'multiple_choice', question:'I need to ____ this document to the email.', options:['attach','download','upload'], correct:'attach', explanation:'Attach = anexar ao email.', hint:'Adding a file to an email' },
      { id:282, type:'multiple_choice', question:'Could you please ____ the music? It\'s too loud.', options:['turn down','turn up','turn off'], correct:'turn down', explanation:'Turn down = lower volume.', hint:'Lower the volume' },
      { id:283, type:'multiple_choice', question:'Don\'t ____ up! You can do it!', options:['give','look','call'], correct:'give', explanation:'Give up = desistir.', hint:'Don\'t quit!' },
      { id:284, type:'multiple_choice', question:'What is the US word for "lift"?', options:['elevator','escalator','stairs'], correct:'elevator', explanation:'Lift (UK) = elevator (US).', hint:'Goes up and down in buildings' },
      { id:285, type:'multiple_choice', question:'What does "pretend" mean?', options:['Fingir','Pretender','Querer'], correct:'Fingir', explanation:'Pretend = fingir (false cognate!).', hint:'False friend! Not "pretender"' },
      { id:286, type:'multiple_choice', question:'I don\'t ____ along with my boss.', options:['get','go','come'], correct:'get', explanation:'Get along with = se dar bem com.', hint:'Have a good relationship' },
      { id:287, type:'multiple_choice', question:'What does "streaming" mean?', options:['Assistir online','Baixar','Enviar'], correct:'Assistir online', explanation:'Streaming = assistir online.', hint:'Netflix, YouTube...' },
      { id:288, type:'multiple_choice', question:'What does "BCC" mean in email?', options:['Cópia oculta','Cópia','Resposta'], correct:'Cópia oculta', explanation:'BCC = Blind Carbon Copy.', hint:'Hidden copy' },
      { id:289, type:'multiple_choice', question:'What does "take off" mean? (airplane)', options:['Decolar','Pousar','Cancelar'], correct:'Decolar', explanation:'Take off = decolar.', hint:'What a plane does when leaving' },
      { id:290, type:'multiple_choice', question:'"Actually" means ____', options:['Na verdade','Atualmente','Ativo'], correct:'Na verdade', explanation:'Actually = na verdade (FALSE FRIEND!).', hint:'Not "atualmente"! False cognate' },

      { id:291, type:'fill_blank', question:'She is ____ for her keys.', correct:'looking', explanation:'Look for = procurar.', hint:'Look + for' },
      { id:292, type:'fill_blank', question:'The car ____ down.', correct:'broke', explanation:'Break down = quebrar/parar de funcionar.', hint:'break → broke' },
      { id:293, type:'fill_blank', question:'Please ____ in the form.', correct:'fill', explanation:'Fill in = preencher.', hint:'Fill + in' },
      { id:294, type:'fill_blank', question:'US "cookie" = UK "____".', correct:'biscuit', explanation:'Cookie (US) = biscuit (UK).', hint:'British English' },
      { id:295, type:'fill_blank', question:'I need to ____ this file. (send to cloud)', correct:'upload', explanation:'Upload = enviar para a nuvem.', hint:'Sending TO the internet' },

      { id:296, type:'drag_drop', sentence:'She ___ after her brother while her parents ___  work.', blanks:['looks','are at'], options:['looks','look','are at','go to'], correct:'looks are at', explanation:'LOOKS after = cuida; ARE AT work = estão no trabalho.', hint:'Phrasal verb + location' },
      { id:297, type:'drag_drop', sentence:'Could you ___ the TV? I\'m trying to sleep. And please ___ the lights too.', blanks:['turn off','turn off'], options:['turn off','turn down','turn up'], correct:'turn off turn off', explanation:'TURN OFF = desligar (both TV and lights).', hint:'Turn off = switch off completely' },
      { id:298, type:'drag_drop', sentence:'In the UK they say "___ " but in the US they say "___" for the same thing.', blanks:['lift','elevator'], options:['lift','elevator','escalator','stairs'], correct:'lift elevator', explanation:'LIFT (UK) = ELEVATOR (US) — same thing!', hint:'British vs American English' },
      { id:299, type:'drag_drop', sentence:'Please ___ the attachment and ___ the report before the meeting.', blanks:['open','read'], options:['open','download','read','check'], correct:'open read', explanation:'OPEN the attachment, READ the report.', hint:'Two sequential actions with a document' },
      { id:300, type:'drag_drop', sentence:'The video went ___ and got millions of ___  in one day.', blanks:['viral','views'], options:['viral','famous','views','likes'], correct:'viral views', explanation:'Went VIRAL = became very popular; VIEWS = visualizações.', hint:'Digital marketing vocabulary' },
      { id:301, type:'drag_drop', sentence:'Never ___ up on your dreams. Always ___ for what you want.', blanks:['give','look'], options:['give','look','go','keep'], correct:'give look', explanation:'Give UP = desistir; LOOK for = procurar.', hint:'Two opposite phrasal verbs' },
      { id:302, type:'drag_drop', sentence:'___ the attachment to this email and ___ it to the team.', blanks:['Attach','send'], options:['Attach','Upload','send','forward'], correct:'Attach send', explanation:'ATTACH the file, SEND the email.', hint:'Email actions in sequence' },
      { id:303, type:'drag_drop', sentence:'___ the volume! I can\'t hear the video. And ___ the subtitles.', blanks:['Turn up','turn on'], options:['Turn up','Turn down','turn on','turn off'], correct:'Turn up turn on', explanation:'TURN UP = increase volume; TURN ON = ativar.', hint:'Increase volume + activate feature' },

      { id:304, type:'word_order', question:'Translate: "Ela cuida do irmão mais novo depois da escola."', words:['She','looks','after','her','younger','brother','after','school'], correct:'She looks after her younger brother after school', explanation:'Subject + look after + object + time.', hint:'Phrasal verb: look after' },
      { id:305, type:'word_order', question:'Translate: "Nunca desista dos seus sonhos."', words:['Never','give','up','on','your','dreams'], correct:'Never give up on your dreams', explanation:'Never + give up + on + noun.', hint:'Phrasal verb: give up' },
      { id:306, type:'word_order', question:'Translate: "O carro quebrou a caminho do trabalho."', words:['The','car','broke','down','on','the','way','to','work'], correct:'The car broke down on the way to work', explanation:'Subject + break down + location.', hint:'Phrasal verb: break down' },
      { id:307, type:'word_order', question:'Translate: "Por favor, desligue a TV e vá dormir."', words:['Please','turn','off','the','TV','and','go','to','sleep'], correct:'Please turn off the TV and go to sleep', explanation:'Turn off + object + and + second action.', hint:'Phrasal verb: turn off' },
      { id:308, type:'word_order', question:'Translate: "Eu me dou bem com todos os meus colegas."', words:['I','get','along','with','all','my','colleagues'], correct:'I get along with all my colleagues', explanation:'Subject + get along with + people.', hint:'Phrasal verb: get along with' },

      { id:309, type:'voice_practice', sentence:'I need to look for my keys. I can\'t find them anywhere!', explanation:'Using "look for" in context.', hint:'Stress "can\'t find them anywhere"' },
      { id:310, type:'voice_practice', sentence:'Could you turn down the music? I\'m trying to concentrate.', explanation:'Polite request with phrasal verb.', hint:'Polite, not rude tone' },
      { id:311, type:'voice_practice', sentence:'The video went viral overnight. It got two million views in one day!', explanation:'Digital vocabulary in context.', hint:'Excited tone for the impressive numbers' },
      { id:312, type:'voice_practice', sentence:'In the UK they say "lift" but in the US they say "elevator".', explanation:'British vs American English differences.', hint:'Clear contrast between "lift" and "elevator"' },
      { id:313, type:'voice_practice', sentence:'Never give up on your dreams. Keep working hard every single day.', explanation:'Motivational use of phrasal verb.', hint:'Inspirational, confident tone' },
      { id:314, type:'voice_practice', sentence:'Actually, "library" means biblioteca, not livraria. That\'s a false friend!', explanation:'Explaining a false cognate.', hint:'Stress "actually" to correct a misconception' },
      { id:315, type:'voice_practice', sentence:'Please attach the document to the email and CC the manager before sending.', explanation:'Professional email instructions.', hint:'Clear, professional tone for workplace context' },
    ]
  }
}

// ─── Funções de acesso ────────────────────────────────────────────────────────
export const getExercisesByModule = (moduleId) =>
  exercisesByModule[moduleId] || exercisesByModule[1]

export const getExercisesByLesson = (lessonId) => {
  const lessonMapping = { 1:1, 2:2, 3:3, 4:4, 5:5, 6:6, 7:7, 8:8, 9:9 }
  const moduleId = lessonMapping[lessonId]
  if (!moduleId) return { title: 'Exercises', exercises: [] }
  const moduleExercises = exercisesByModule[moduleId]
  if (!moduleExercises) return { title: 'Exercises', exercises: [] }
  return { title: moduleExercises.title, exercises: moduleExercises.exercises }
}
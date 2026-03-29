export const exercisesByModule = {
  // ==================== MÓDULO 1 - AULA 1 ====================
  1: {
    title: "Fundamentals & Personal Presentation",
    exercises: [
      { id: 1, type: 'multiple_choice', question: 'Hello, my name ____ John.', options: ['is', 'am', 'are'], correct: 'is', explanation: 'Use "is" with third person singular', hint: 'My name + is' },
      { id: 2, type: 'fill_blank', question: 'She ____ from Brazil.', correct: 'is', explanation: 'She is from Brazil', hint: 'She + is' },
      { id: 3, type: 'multiple_choice', question: 'Nice to ____ you.', options: ['meet', 'met', 'meeting'], correct: 'meet', explanation: 'Nice to meet you', hint: 'After "to" use base verb' },
      { id: 4, type: 'fill_blank', question: 'I ____ 25 years old.', correct: 'am', explanation: 'I am 25 years old', hint: 'I + am' },
      { id: 5, type: 'multiple_choice', question: 'What is your ____?', options: ['name', 'age', 'country'], correct: 'name', explanation: 'What is your name?', hint: 'For asking name' },
      { id: 6, type: 'fill_blank', question: '____ are you from?', correct: 'Where', explanation: 'Where are you from?', hint: 'Asking about origin' },
      { id: 7, type: 'multiple_choice', question: 'I am ____ teacher.', options: ['a', 'an', 'the'], correct: 'a', explanation: 'A teacher', hint: 'Consonant sound' },
      { id: 8, type: 'fill_blank', question: 'She is ____ engineer.', correct: 'an', explanation: 'An engineer', hint: 'Vowel sound' },
      { id: 9, type: 'multiple_choice', question: 'What color is the sky?', options: ['blue', 'red', 'yellow'], correct: 'blue', explanation: 'The sky is blue', hint: 'Sky color' },
      { id: 10, type: 'fill_blank', question: 'The opposite of "big" is ____.', correct: 'small', explanation: 'Big x Small', hint: 'Antonym of big' },
      { id: 11, type: 'multiple_choice', question: 'How do you say "Bom dia" in English?', options: ['Good morning', 'Good afternoon', 'Good night'], correct: 'Good morning', explanation: 'Good morning', hint: 'Morning greeting' },
      { id: 12, type: 'fill_blank', question: 'Good ____ (boa noite - ao sair).', correct: 'night', explanation: 'Good night', hint: 'Evening farewell' },
      { id: 13, type: 'multiple_choice', question: 'What number comes after "seven"?', options: ['six', 'eight', 'nine'], correct: 'eight', explanation: 'Seven → eight', hint: '7 + 1 = 8' },
      { id: 14, type: 'fill_blank', question: 'The number 100 is ____.', correct: 'one hundred', explanation: '100 = one hundred', hint: '100 in English' },
      { id: 15, type: 'multiple_choice', question: 'They ____ my friends.', options: ['is', 'am', 'are'], correct: 'are', explanation: 'They are', hint: 'They + are' },
      { id: 16, type: 'fill_blank', question: 'He ____ a doctor.', correct: 'is', explanation: 'He is a doctor', hint: 'He + is' },
      { id: 17, type: 'multiple_choice', question: '____ is your name?', options: ['What', 'Where', 'Who'], correct: 'What', explanation: 'What is your name?', hint: 'Asking for information' },
      { id: 18, type: 'fill_blank', question: '____ old are you?', correct: 'How', explanation: 'How old are you?', hint: 'How + adjective' },
      { id: 19, type: 'multiple_choice', question: 'I am ____ student.', options: ['a', 'an'], correct: 'a', explanation: 'A student', hint: 'Student starts with consonant' },
      { id: 20, type: 'fill_blank', question: 'She is ____ hour late.', correct: 'an', explanation: 'An hour', hint: '"Hour" has vowel sound' },
      { id: 21, type: 'multiple_choice', question: 'What is the plural of "child"?', options: ['childs', 'children', 'childes'], correct: 'children', explanation: 'Child → children', hint: 'Irregular plural' },
      { id: 22, type: 'fill_blank', question: 'The plural of "box" is ____.', correct: 'boxes', explanation: 'Box → boxes', hint: 'Words ending in -x add -es' },
      { id: 23, type: 'multiple_choice', question: 'Which is a greeting?', options: ['Hello', 'Goodbye', 'See you'], correct: 'Hello', explanation: 'Hello = greeting', hint: 'Used to say hi' },
      { id: 24, type: 'fill_blank', question: '____ you later!', correct: 'See', explanation: 'See you later', hint: 'Farewell' },
      { id: 25, type: 'multiple_choice', question: 'What color is the sun?', options: ['blue', 'yellow', 'green'], correct: 'yellow', explanation: 'The sun is yellow', hint: 'Sun color' },
      { id: 26, type: 'fill_blank', question: 'Grass is ____.', correct: 'green', explanation: 'Grass is green', hint: 'Grass color' },
      { id: 27, type: 'multiple_choice', question: 'How do you say "Adeus" in English?', options: ['Hello', 'Goodbye', 'Hi'], correct: 'Goodbye', explanation: 'Goodbye = farewell', hint: 'Saying farewell' },
      { id: 28, type: 'fill_blank', question: 'The contraction of "I am" is ____.', correct: "I'm", explanation: "I'm = I am", hint: 'Apostrophe' },
      { id: 29, type: 'multiple_choice', question: 'What is the correct spelling for 15?', options: ['fiveteen', 'fifteen', 'fiveten'], correct: 'fifteen', explanation: 'Fifteen = 15', hint: 'Five → fifteen' },
      { id: 30, type: 'fill_blank', question: 'The number after 19 is ____.', correct: 'twenty', explanation: '20 = twenty', hint: 'Twenty' }
    ]
  },

  // ==================== MÓDULO 2 - AULA 2 ====================
  2: {
    title: "Daily Routine & Simple Present",
    exercises: [
      { id: 31, type: 'multiple_choice', question: 'I ___ up at 7 AM every day.', options: ['wake', 'wakes', 'waking'], correct: 'wake', explanation: 'I wake up', hint: 'I + base verb' },
      { id: 32, type: 'fill_blank', question: 'She ____ to work by bus.', correct: 'goes', explanation: 'She goes', hint: 'She + goes' },
      { id: 33, type: 'multiple_choice', question: 'They ____ watch TV in the evening.', options: ["don't", "doesn't", "not"], correct: "don't", explanation: 'They don\'t', hint: 'They + don\'t' },
      { id: 34, type: 'fill_blank', question: '____ you have breakfast every morning?', correct: 'Do', explanation: 'Do you', hint: 'Do + you' },
      { id: 35, type: 'multiple_choice', question: 'He ____ plays soccer on weekends.', options: ['often', 'always', 'never'], correct: 'often', explanation: 'Often = frequently', hint: 'Adverb of frequency' },
      { id: 36, type: 'fill_blank', question: 'I ____ go to the gym. (sometimes)', correct: 'sometimes', explanation: 'I sometimes go', hint: 'Before main verb' },
      { id: 37, type: 'multiple_choice', question: 'What time is it? 7:00 = ____', options: ['seven o\'clock', 'seven hours', 'seven'], correct: 'seven o\'clock', explanation: '7:00 = seven o\'clock', hint: 'Exact hour' },
      { id: 38, type: 'fill_blank', question: 'The sun ____ in the east. (rise)', correct: 'rises', explanation: 'The sun rises', hint: 'Universal truth' },
      { id: 39, type: 'multiple_choice', question: 'He ____ English very well.', options: ['speak', 'speaks', 'speaking'], correct: 'speaks', explanation: 'He speaks', hint: 'He + speaks' },
      { id: 40, type: 'fill_blank', question: 'My sister ____ her teeth twice a day. (brush)', correct: 'brushes', explanation: 'She brushes', hint: 'Brush → brushes' },
      { id: 41, type: 'multiple_choice', question: 'We ____ lunch at 1 PM.', options: ['have', 'has', 'having'], correct: 'have', explanation: 'We have', hint: 'We + have' },
      { id: 42, type: 'fill_blank', question: '____ she work on Saturdays?', correct: 'Does', explanation: 'Does she', hint: 'Does + he/she/it' },
      { id: 43, type: 'multiple_choice', question: 'What does "usually" mean?', options: ['100%', '90%', '50%'], correct: '90%', explanation: 'Usually = about 90%', hint: 'More than sometimes' },
      { id: 44, type: 'fill_blank', question: 'I ____ coffee in the morning. (not/drink)', correct: "don't drink", explanation: 'I don\'t drink', hint: 'I + don\'t + verb' },
      { id: 45, type: 'multiple_choice', question: 'What time do you ____ to bed?', options: ['go', 'goes', 'going'], correct: 'go', explanation: 'Do you go', hint: 'After Do use base verb' },
      { id: 46, type: 'fill_blank', question: 'The movie ____ at 8 PM. (start)', correct: 'starts', explanation: 'The movie starts', hint: 'He/she/it + starts' },
      { id: 47, type: 'multiple_choice', question: 'Which is a daily routine activity?', options: ['Wake up', 'Travel', 'Celebrate'], correct: 'Wake up', explanation: 'Wake up = daily', hint: 'Something you do every day' },
      { id: 48, type: 'fill_blank', question: 'They ____ (not/like) spicy food.', correct: "don't like", explanation: 'They don\'t like', hint: 'They + don\'t' },
      { id: 49, type: 'multiple_choice', question: 'What time is it? 7:15 = ____', options: ['quarter past seven', 'seven fifteen', 'both'], correct: 'both', explanation: 'Both are correct', hint: '15 minutes = quarter past' },
      { id: 50, type: 'fill_blank', question: 'I ____ to the gym three times a week.', correct: 'go', explanation: 'I go', hint: 'I + go' },
      { id: 51, type: 'multiple_choice', question: 'She ____ breakfast at 8 AM.', options: ['have', 'has', 'having'], correct: 'has', explanation: 'She has', hint: 'She + has' },
      { id: 52, type: 'fill_blank', question: 'We always ____ dinner together.', correct: 'have', explanation: 'We have', hint: 'We + have' },
      { id: 53, type: 'multiple_choice', question: 'What does "never" mean?', options: ['0%', '50%', '100%'], correct: '0%', explanation: 'Never = 0%', hint: 'Zero frequency' },
      { id: 54, type: 'fill_blank', question: 'He ____ to music every day. (listen)', correct: 'listens', explanation: 'He listens', hint: 'He + listens' },
      { id: 55, type: 'multiple_choice', question: '____ your sister speak English?', options: ['Do', 'Does', 'Is'], correct: 'Does', explanation: 'Does your sister', hint: 'Does + he/she/it' },
      { id: 56, type: 'fill_blank', question: 'They ____ (not/work) on Sundays.', correct: "don't work", explanation: 'They don\'t work', hint: 'They + don\'t' },
      { id: 57, type: 'multiple_choice', question: 'What time is it? 8:30 = ____', options: ['half past eight', 'eight thirty', 'both'], correct: 'both', explanation: 'Both are correct', hint: '30 minutes = half past' },
      { id: 58, type: 'fill_blank', question: 'I ____ (study) English every day.', correct: 'study', explanation: 'I study', hint: 'I + study' },
      { id: 59, type: 'multiple_choice', question: 'She ____ (watch) TV at night.', options: ['watch', 'watches', 'watching'], correct: 'watches', explanation: 'She watches', hint: 'Watch → watches' },
      { id: 60, type: 'fill_blank', question: '____ you like coffee?', correct: 'Do', explanation: 'Do you like?', hint: 'Do + you' }
    ]
  },

  // ==================== MÓDULO 3 - AULA 3 ====================
  3: {
    title: "Food, City & House",
    exercises: [
      { id: 61, type: 'multiple_choice', question: 'I\'m hungry. I want to ____ a pizza.', options: ['eat', 'cook', 'make'], correct: 'eat', explanation: 'Eat a pizza', hint: 'When hungry' },
      { id: 62, type: 'fill_blank', question: 'The bank is ____ the supermarket and the post office.', correct: 'between', explanation: 'Between = in the middle', hint: 'Between two places' },
      { id: 63, type: 'multiple_choice', question: 'She ____ dinner right now.', options: ['cooks', 'is cooking', 'cook'], correct: 'is cooking', explanation: 'Present Continuous', hint: 'Action happening now' },
      { id: 64, type: 'fill_blank', question: 'Where is the ____? I want to buy food.', correct: 'supermarket', explanation: 'Supermarket', hint: 'Place to buy food' },
      { id: 65, type: 'multiple_choice', question: 'Can I have the ____, please?', options: ['menu', 'food', 'drink'], correct: 'menu', explanation: 'Menu = cardápio', hint: 'Restaurant list' },
      { id: 66, type: 'fill_blank', question: 'I would like a ____ of water.', correct: 'glass', explanation: 'A glass of water', hint: 'Container for water' },
      { id: 67, type: 'multiple_choice', question: 'Go straight and turn ____ at the corner.', options: ['left', 'right', 'both'], correct: 'left', explanation: 'Turn left', hint: 'Direction' },
      { id: 68, type: 'fill_blank', question: 'The hospital is ____ to the school.', correct: 'next', explanation: 'Next to = beside', hint: 'Beside' },
      { id: 69, type: 'multiple_choice', question: 'Where do you sleep?', options: ['kitchen', 'bedroom', 'bathroom'], correct: 'bedroom', explanation: 'Bedroom', hint: 'Sleeping place' },
      { id: 70, type: 'fill_blank', question: 'We watch TV in the ____ room.', correct: 'living', explanation: 'Living room', hint: 'Where you relax' },
      { id: 71, type: 'multiple_choice', question: 'What is "maçã" in English?', options: ['apple', 'orange', 'banana'], correct: 'apple', explanation: 'Apple = maçã', hint: 'Red fruit' },
      { id: 72, type: 'fill_blank', question: 'Orange juice is my favorite ____.', correct: 'drink', explanation: 'Drink = beverage', hint: 'Liquid' },
      { id: 73, type: 'multiple_choice', question: 'This food is ____! I love it.', options: ['delicious', 'terrible', 'bad'], correct: 'delicious', explanation: 'Delicious = very tasty', hint: 'Very good' },
      { id: 74, type: 'fill_blank', question: 'My house is ____ than yours.', correct: 'bigger', explanation: 'Bigger = larger', hint: 'Comparative' },
      { id: 75, type: 'multiple_choice', question: 'What is the superlative of "big"?', options: ['bigger', 'biggest', 'most big'], correct: 'biggest', explanation: 'The biggest', hint: 'Superlative' },
      { id: 76, type: 'fill_blank', question: 'This is the ____ expensive car.', correct: 'most', explanation: 'The most expensive', hint: 'For long adjectives' },
      { id: 77, type: 'multiple_choice', question: 'Excuse me, how can I ____ to the station?', options: ['get', 'go', 'come'], correct: 'get', explanation: 'How can I get to?', hint: 'Common expression' },
      { id: 78, type: 'fill_blank', question: 'It\'s on your ____.', correct: 'left', explanation: 'On your left', hint: 'Left side' },
      { id: 79, type: 'multiple_choice', question: 'What is "cozinha" in English?', options: ['kitchen', 'bathroom', 'bedroom'], correct: 'kitchen', explanation: 'Kitchen = cozinha', hint: 'Cooking place' },
      { id: 80, type: 'fill_blank', question: 'There ____ a big sofa in the living room.', correct: 'is', explanation: 'There is (singular)', hint: 'There is + singular' },
      { id: 81, type: 'multiple_choice', question: 'There ____ two chairs in the kitchen.', options: ['is', 'are', 'am'], correct: 'are', explanation: 'There are (plural)', hint: 'There are + plural' },
      { id: 82, type: 'fill_blank', question: 'I\'d like ____ pizza, please.', correct: 'a', explanation: 'A pizza', hint: 'Indefinite article' },
      { id: 83, type: 'multiple_choice', question: 'What is "água" in English?', options: ['water', 'juice', 'soda'], correct: 'water', explanation: 'Water = água', hint: 'Essential liquid' },
      { id: 84, type: 'fill_blank', question: 'Can I have ____ coffee?', correct: 'some', explanation: 'Some coffee', hint: 'Uncountable' },
      { id: 85, type: 'multiple_choice', question: 'The restaurant is ____ the left.', options: ['in', 'on', 'at'], correct: 'on', explanation: 'On the left', hint: 'Preposition' },
      { id: 86, type: 'fill_blank', question: 'Turn ____ at the traffic light.', correct: 'right', explanation: 'Turn right', hint: 'Opposite of left' },
      { id: 87, type: 'multiple_choice', question: 'What is "banheiro" in English?', options: ['bathroom', 'kitchen', 'bedroom'], correct: 'bathroom', explanation: 'Bathroom = banheiro', hint: 'Shower place' },
      { id: 88, type: 'fill_blank', question: 'The food is ____! (muito bom)', correct: 'delicious', explanation: 'Delicious', hint: 'Very tasty' },
      { id: 89, type: 'multiple_choice', question: 'What time do you have ____? (almoço)', options: ['breakfast', 'lunch', 'dinner'], correct: 'lunch', explanation: 'Lunch = almoço', hint: 'Midday meal' },
      { id: 90, type: 'fill_blank', question: 'I have ____ at 8 PM. (jantar)', correct: 'dinner', explanation: 'Dinner = jantar', hint: 'Evening meal' }
    ]
  },

  // ==================== MÓDULO 4 - AULA 4 (Past Tense) ====================
  4: {
    title: "Past Tense & Modal Verbs - Part 1",
    exercises: [
      { id: 91, type: 'multiple_choice', question: 'Yesterday, I ____ to the park.', options: ['go', 'went', 'gone'], correct: 'went', explanation: 'Went = past of go', hint: 'Irregular verb' },
      { id: 92, type: 'fill_blank', question: 'She ____ (not/watch) TV last night.', correct: "didn't watch", explanation: 'Didn\'t watch', hint: 'Did not + base verb' },
      { id: 93, type: 'multiple_choice', question: '____ you finish your homework?', options: ['Do', 'Did', 'Does'], correct: 'Did', explanation: 'Did you finish?', hint: 'Past question' },
      { id: 94, type: 'fill_blank', question: 'I ____ swim when I was five.', correct: 'could', explanation: 'Could = past ability', hint: 'Past of can' },
      { id: 95, type: 'multiple_choice', question: 'In my ____, English is important.', options: ['opinion', 'mind', 'thought'], correct: 'opinion', explanation: 'In my opinion', hint: 'Opinion expression' },
      { id: 96, type: 'fill_blank', question: 'I ____ with you. You are right.', correct: 'agree', explanation: 'I agree', hint: 'To share opinion' },
      { id: 97, type: 'multiple_choice', question: 'You ____ study for the exam.', options: ['can', 'should', 'may'], correct: 'should', explanation: 'Should = advice', hint: 'Modal for advice' },
      { id: 98, type: 'fill_blank', question: 'It ____ rain later. (possibility)', correct: 'might', explanation: 'Might = possibility', hint: 'Less certain' },
      { id: 99, type: 'multiple_choice', question: 'What is the past of "eat"?', options: ['eated', 'ate', 'eaten'], correct: 'ate', explanation: 'Eat → ate', hint: 'Irregular' },
      { id: 100, type: 'fill_blank', question: 'She ____ (buy) a new dress.', correct: 'bought', explanation: 'Buy → bought', hint: 'Irregular' },
      { id: 101, type: 'multiple_choice', question: 'I was ____ TV when he called.', options: ['watch', 'watching', 'watched'], correct: 'watching', explanation: 'Past Continuous', hint: 'Was/were + ing' },
      { id: 102, type: 'fill_blank', question: 'They ____ playing soccer.', correct: 'were', explanation: 'They were playing', hint: 'They + were' },
      { id: 103, type: 'multiple_choice', question: 'You ____ wear a seatbelt.', options: ['should', 'must', 'can'], correct: 'must', explanation: 'Must = obligation', hint: 'Strong obligation' },
      { id: 104, type: 'fill_blank', question: '____ I come in?', correct: 'May', explanation: 'May I?', hint: 'Permission' },
      { id: 105, type: 'multiple_choice', question: 'What is the past of "go"?', options: ['goed', 'went', 'gone'], correct: 'went', explanation: 'Go → went', hint: 'Irregular' },
      { id: 106, type: 'fill_blank', question: 'She ____ (see) a movie.', correct: 'saw', explanation: 'See → saw', hint: 'Irregular' },
      { id: 107, type: 'multiple_choice', question: 'I ____ you yesterday.', options: ['call', 'called', 'calling'], correct: 'called', explanation: 'Called = past', hint: 'Regular verb' },
      { id: 108, type: 'fill_blank', question: 'He ____ (not/study) for the test.', correct: "didn't study", explanation: 'Didn\'t study', hint: 'Did not + base' },
      { id: 109, type: 'multiple_choice', question: 'What does "I think that" mean?', options: ['I think that', 'I know that', 'I want that'], correct: 'I think that', explanation: 'I think that = opinion', hint: 'Opinion expression' },
      { id: 110, type: 'fill_blank', question: 'From my point of ____...', correct: 'view', explanation: 'Point of view', hint: 'Perspective' },
      { id: 111, type: 'multiple_choice', question: 'She ____ speak three languages.', options: ['can', 'could', 'may'], correct: 'could', explanation: 'Could = past ability', hint: 'Past of can' },
      { id: 112, type: 'fill_blank', question: 'You ____ try the new restaurant.', correct: 'should', explanation: 'Should = recommendation', hint: 'Advice' },
      { id: 113, type: 'multiple_choice', question: 'What is the past of "have"?', options: ['haved', 'had', 'has'], correct: 'had', explanation: 'Have → had', hint: 'Irregular' },
      { id: 114, type: 'fill_blank', question: 'We ____ a great time.', correct: 'had', explanation: 'Had = past of have', hint: 'Irregular' },
      { id: 115, type: 'multiple_choice', question: 'What were you doing when I ____?', options: ['come', 'came', 'coming'], correct: 'came', explanation: 'When I came', hint: 'Past simple' },
      { id: 116, type: 'fill_blank', question: 'I ____ reading when the phone rang.', correct: 'was', explanation: 'I was reading', hint: 'Past Continuous' },
      { id: 117, type: 'multiple_choice', question: 'You ____ be quiet in the library.', options: ['should', 'must', 'can'], correct: 'must', explanation: 'Must = rule', hint: 'Library rule' },
      { id: 118, type: 'fill_blank', question: 'I don\'t ____ with you.', correct: 'agree', explanation: 'I don\'t agree', hint: 'Disagree' },
      { id: 119, type: 'multiple_choice', question: 'What is the past of "write"?', options: ['writed', 'wrote', 'written'], correct: 'wrote', explanation: 'Write → wrote', hint: 'Irregular' },
      { id: 120, type: 'fill_blank', question: 'She ____ a letter.', correct: 'wrote', explanation: 'Wrote = past of write', hint: 'Irregular' }
    ]
  },

  // ==================== MÓDULO 4 - AULA 5 (Modal Verbs) ====================
  5: {
    title: "Modal Verbs - Part 2",
    exercises: [
      { id: 121, type: 'multiple_choice', question: 'You ____ smoke here. It\'s forbidden.', options: ['mustn\'t', 'don\'t have to', 'shouldn\'t'], correct: 'mustn\'t', explanation: 'Mustn\'t = prohibited', hint: 'Strong prohibition' },
      { id: 122, type: 'fill_blank', question: 'I ____ go to the meeting. It\'s optional.', correct: "don't have to", explanation: 'Don\'t have to = no obligation', hint: 'Not necessary' },
      { id: 123, type: 'multiple_choice', question: '____ I use your phone?', options: ['Can', 'May', 'Should'], correct: 'May', explanation: 'May I = polite request', hint: 'Formal permission' },
      { id: 124, type: 'fill_blank', question: 'She ____ be at home. I\'m not sure.', correct: 'might', explanation: 'Might = possibility', hint: 'Not certain' },
      { id: 125, type: 'multiple_choice', question: 'You ____ see a doctor. You look sick.', options: ['can', 'should', 'must'], correct: 'should', explanation: 'Should = advice', hint: 'Recommendation' },
      { id: 126, type: 'fill_blank', question: 'I ____ speak French when I was young.', correct: 'could', explanation: 'Could = past ability', hint: 'Past of can' },
      { id: 127, type: 'multiple_choice', question: 'You ____ be tired after the trip.', options: ['must', 'should', 'can'], correct: 'must', explanation: 'Must = logical conclusion', hint: 'Almost certain' },
      { id: 128, type: 'fill_blank', question: '____ you help me with this?', correct: 'Can', explanation: 'Can you = request', hint: 'Asking for help' },
      { id: 129, type: 'multiple_choice', question: 'We ____ leave now or we\'ll be late.', options: ['must', 'should', 'can'], correct: 'must', explanation: 'Must = necessity', hint: 'Strong need' },
      { id: 130, type: 'fill_blank', question: 'She ____ be a doctor. She studied medicine.', correct: 'must', explanation: 'Must = logical conclusion', hint: 'Based on evidence' },
      { id: 131, type: 'multiple_choice', question: 'You ____ eat too much sugar.', options: ['shouldn\'t', 'mustn\'t', 'can\'t'], correct: 'shouldn\'t', explanation: 'Shouldn\'t = advice', hint: 'Not recommended' },
      { id: 132, type: 'fill_blank', question: 'I ____ come to the party. I have to work.', correct: "can't", explanation: 'Can\'t = inability', hint: 'Not possible' },
      { id: 133, type: 'multiple_choice', question: '____ I open the window?', options: ['Can', 'May', 'Should'], correct: 'May', explanation: 'May I = polite', hint: 'Asking permission' },
      { id: 134, type: 'fill_blank', question: 'He ____ be late. Traffic is bad.', correct: 'might', explanation: 'Might = possibility', hint: 'Possible' },
      { id: 135, type: 'multiple_choice', question: 'You ____ finish the report by Friday.', options: ['must', 'should', 'can'], correct: 'must', explanation: 'Must = deadline', hint: 'Obligation' },
      { id: 136, type: 'fill_blank', question: 'I ____ swim very well now.', correct: 'can', explanation: 'Can = ability', hint: 'Present ability' },
      { id: 137, type: 'multiple_choice', question: 'She ____ be at the office. I saw her there.', options: ['must', 'might', 'could'], correct: 'must', explanation: 'Must = certainty', hint: 'Very sure' },
      { id: 138, type: 'fill_blank', question: '____ I borrow your pen?', correct: 'Can', explanation: 'Can I = request', hint: 'Informal request' },
      { id: 139, type: 'multiple_choice', question: 'You ____ try the new restaurant.', options: ['should', 'must', 'can'], correct: 'should', explanation: 'Should = recommendation', hint: 'Good idea' },
      { id: 140, type: 'fill_blank', question: 'They ____ be home by now.', correct: 'should', explanation: 'Should = expectation', hint: 'Likely' },
      { id: 141, type: 'multiple_choice', question: 'I ____ finish this project by Monday.', options: ['must', 'should', 'can'], correct: 'must', explanation: 'Must = deadline', hint: 'Required' },
      { id: 142, type: 'fill_blank', question: 'You ____ worry. Everything will be fine.', correct: "shouldn't", explanation: 'Shouldn\'t = not necessary to worry', hint: 'Don\'t need to' },
      { id: 143, type: 'multiple_choice', question: '____ you speak any other languages?', options: ['Can', 'May', 'Should'], correct: 'Can', explanation: 'Can you = ability', hint: 'Ask about skill' },
      { id: 144, type: 'fill_blank', question: 'She ____ be angry. I didn\'t do anything.', correct: "shouldn't", explanation: 'Shouldn\'t = not likely', hint: 'Probably not' },
      { id: 145, type: 'multiple_choice', question: 'We ____ leave now. It\'s getting late.', options: ['must', 'should', 'can'], correct: 'must', explanation: 'Must = necessity', hint: 'Time to go' },
      { id: 146, type: 'fill_blank', question: 'You ____ park here. It\'s a reserved spot.', correct: "can't", explanation: 'Can\'t = not allowed', hint: 'Prohibited' },
      { id: 147, type: 'multiple_choice', question: '____ I suggest a different approach?', options: ['May', 'Can', 'Should'], correct: 'May', explanation: 'May I = polite suggestion', hint: 'Formal' },
      { id: 148, type: 'fill_blank', question: 'He ____ be a good candidate.', correct: 'might', explanation: 'Might = possibility', hint: 'Possible' },
      { id: 149, type: 'multiple_choice', question: 'You ____ take the test next week.', options: ['can', 'may', 'should'], correct: 'can', explanation: 'Can = possibility', hint: 'Allowed to' },
      { id: 150, type: 'fill_blank', question: 'I ____ believe you did that!', correct: "can't", explanation: 'Can\'t = disbelief', hint: 'Hard to believe' }
    ]
  },

  // ==================== MÓDULO 5 - AULA 6 (Future Tenses) ====================
  6: {
    title: "Future Tenses",
    exercises: [
      { id: 151, type: 'multiple_choice', question: 'I ____ visit my grandparents next weekend.', options: ['am going to', 'will', 'both'], correct: 'both', explanation: 'Both possible', hint: 'Future' },
      { id: 152, type: 'fill_blank', question: 'Look at those clouds! It ____ rain.', correct: 'is going to', explanation: 'Going to = evidence', hint: 'Based on evidence' },
      { id: 153, type: 'multiple_choice', question: 'The train ____ at 10 AM.', options: ['leaves', 'will leave', 'is leaving'], correct: 'leaves', explanation: 'Present Simple for schedules', hint: 'Timetable' },
      { id: 154, type: 'fill_blank', question: 'I ____ you later, I promise.', correct: 'will call', explanation: 'Will = promise', hint: 'Promise' },
      { id: 155, type: 'multiple_choice', question: 'We ____ dinner at 8 PM tonight.', options: ['are having', 'will have', 'have'], correct: 'are having', explanation: 'Present Continuous for arrangements', hint: 'Fixed plan' },
      { id: 156, type: 'fill_blank', question: 'By 2025, I ____ have finished my course.', correct: 'will', explanation: 'Future Perfect', hint: 'Completed by' },
      { id: 157, type: 'multiple_choice', question: 'This time tomorrow, I ____ flying to London.', options: ['will be', 'am', 'will'], correct: 'will be', explanation: 'Future Continuous', hint: 'In progress' },
      { id: 158, type: 'fill_blank', question: 'I think Brazil ____ win the World Cup.', correct: 'will', explanation: 'Will = prediction', hint: 'Opinion' },
      { id: 159, type: 'multiple_choice', question: 'What ____ you do next year?', options: ['will', 'are', 'do'], correct: 'will', explanation: 'Will for future', hint: 'Future question' },
      { id: 160, type: 'fill_blank', question: 'She ____ to London next month.', correct: 'is moving', explanation: 'Present Continuous for plans', hint: 'Planned action' },
      { id: 161, type: 'multiple_choice', question: 'The meeting ____ at 3 PM.', options: ['starts', 'will start', 'is starting'], correct: 'starts', explanation: 'Schedule', hint: 'Timetable' },
      { id: 162, type: 'fill_blank', question: 'I ____ you with your luggage.', correct: 'will help', explanation: 'Will = offer', hint: 'Offering help' },
      { id: 163, type: 'multiple_choice', question: 'They ____ married next spring.', options: ['are getting', 'will get', 'get'], correct: 'are getting', explanation: 'Arrangement', hint: 'Planned' },
      { id: 164, type: 'fill_blank', question: 'By next year, we ____ together for 10 years.', correct: 'will have been', explanation: 'Future Perfect Continuous', hint: 'Duration' },
      { id: 165, type: 'multiple_choice', question: '____ you open the window?', options: ['Will', 'Are', 'Do'], correct: 'Will', explanation: 'Will = request', hint: 'Asking' },
      { id: 166, type: 'fill_blank', question: 'I ____ to the party if I have time.', correct: 'will go', explanation: 'Will = possibility', hint: 'Conditional' },
      { id: 167, type: 'multiple_choice', question: 'She ____ probably be late.', options: ['will', 'is', 'does'], correct: 'will', explanation: 'Will = probability', hint: 'Likely' },
      { id: 168, type: 'fill_blank', question: 'The store ____ at 9 AM tomorrow.', correct: 'opens', explanation: 'Present Simple for schedules', hint: 'Business hours' },
      { id: 169, type: 'multiple_choice', question: 'I ____ call you when I arrive.', options: ['will', 'am', 'do'], correct: 'will', explanation: 'Will = promise', hint: 'Future action' },
      { id: 170, type: 'fill_blank', question: 'We ____ a party on Saturday.', correct: 'are having', explanation: 'Arrangement', hint: 'Planned' },
      { id: 171, type: 'multiple_choice', question: 'What time ____ the movie start?', options: ['does', 'will', 'is'], correct: 'does', explanation: 'Schedule', hint: 'Timetable' },
      { id: 172, type: 'fill_blank', question: 'I ____ a new car soon.', correct: 'am going to buy', explanation: 'Going to = intention', hint: 'Plan' },
      { id: 173, type: 'multiple_choice', question: '____ you be at home later?', options: ['Will', 'Are', 'Do'], correct: 'Will', explanation: 'Will = question', hint: 'Future question' },
      { id: 174, type: 'fill_blank', question: 'By 2030, AI ____ most jobs.', correct: 'will have replaced', explanation: 'Future Perfect', hint: 'Completed by' },
      { id: 175, type: 'multiple_choice', question: 'This time next week, we ____ on vacation.', options: ['will be', 'are', 'will'], correct: 'will be', explanation: 'Future Continuous', hint: 'In progress' },
      { id: 176, type: 'fill_blank', question: 'I ____ you as soon as I know.', correct: 'will tell', explanation: 'Will = promise', hint: 'Future action' },
      { id: 177, type: 'multiple_choice', question: 'She ____ to become a doctor.', options: ['is going', 'will', 'does'], correct: 'is going', explanation: 'Going to = intention', hint: 'Plan' },
      { id: 178, type: 'fill_blank', question: 'The flight ____ at 6 PM.', correct: 'departs', explanation: 'Schedule', hint: 'Timetable' },
      { id: 179, type: 'multiple_choice', question: 'I think it ____ rain later.', options: ['will', 'is going to', 'both'], correct: 'both', explanation: 'Both possible', hint: 'Prediction' },
      { id: 180, type: 'fill_blank', question: 'We ____ dinner at a restaurant tonight.', correct: 'are having', explanation: 'Present Continuous for plans', hint: 'Arrangement' }
    ]
  },

  // ==================== MÓDULO 5 - AULA 7 (Conditionals) ====================
  7: {
    title: "Conditional Sentences",
    exercises: [
      { id: 181, type: 'multiple_choice', question: 'If you heat ice, it ____.', options: ['melts', 'will melt', 'would melt'], correct: 'melts', explanation: 'Zero Conditional - fact', hint: 'Always true' },
      { id: 182, type: 'fill_blank', question: 'If it rains, I ____ stay home.', correct: 'will', explanation: 'First Conditional', hint: 'Real possibility' },
      { id: 183, type: 'multiple_choice', question: 'If I ____ you, I would apologize.', options: ['am', 'were', 'was'], correct: 'were', explanation: 'Second Conditional', hint: 'Hypothetical' },
      { id: 184, type: 'fill_blank', question: 'If I had studied, I ____ have passed.', correct: 'would', explanation: 'Third Conditional', hint: 'Past hypothetical' },
      { id: 185, type: 'multiple_choice', question: 'What ____ you do if you won the lottery?', options: ['will', 'would', 'do'], correct: 'would', explanation: 'Second Conditional', hint: 'Hypothetical' },
      { id: 186, type: 'fill_blank', question: 'If she ____ earlier, she wouldn\'t have missed the bus.', correct: 'had left', explanation: 'Third Conditional', hint: 'Past perfect' },
      { id: 187, type: 'multiple_choice', question: 'If you ____ water, it boils.', options: ['heat', 'will heat', 'heated'], correct: 'heat', explanation: 'Zero Conditional', hint: 'Scientific fact' },
      { id: 188, type: 'fill_blank', question: 'If it doesn\'t rain, we ____ to the beach.', correct: 'will go', explanation: 'First Conditional', hint: 'Possible future' },
      { id: 189, type: 'multiple_choice', question: 'If I ____ more time, I would travel.', options: ['have', 'had', 'will have'], correct: 'had', explanation: 'Second Conditional', hint: 'Unreal present' },
      { id: 190, type: 'fill_blank', question: 'If they ____ invited, they would have come.', correct: 'had been', explanation: 'Third Conditional', hint: 'Past passive' },
      { id: 191, type: 'multiple_choice', question: 'If you ____ red and blue, you get purple.', options: ['mix', 'will mix', 'mixed'], correct: 'mix', explanation: 'Zero Conditional', hint: 'Always true' },
      { id: 192, type: 'fill_blank', question: 'If you study, you ____ pass.', correct: 'will', explanation: 'First Conditional', hint: 'Possible' },
      { id: 193, type: 'multiple_choice', question: 'If I ____ a bird, I would fly.', options: ['am', 'were', 'was'], correct: 'were', explanation: 'Second Conditional', hint: 'Hypothetical' },
      { id: 194, type: 'fill_blank', question: 'If I ____ known, I would have helped.', correct: 'had', explanation: 'Third Conditional', hint: 'Past perfect' },
      { id: 195, type: 'multiple_choice', question: 'What would you do if you ____ a million dollars?', options: ['have', 'had', 'will have'], correct: 'had', explanation: 'Second Conditional', hint: 'Unreal' },
      { id: 196, type: 'fill_blank', question: 'If she ____, she would have been happy.', correct: 'had come', explanation: 'Third Conditional', hint: 'Past perfect' },
      { id: 197, type: 'multiple_choice', question: 'If you ____ ice, it floats.', options: ['freeze', 'will freeze', 'froze'], correct: 'freeze', explanation: 'Zero Conditional', hint: 'Fact' },
      { id: 198, type: 'fill_blank', question: 'If you ____ hard, you will succeed.', correct: 'work', explanation: 'First Conditional', hint: 'Possible' },
      { id: 199, type: 'multiple_choice', question: 'If I ____ you, I would say yes.', options: ['am', 'were', 'was'], correct: 'were', explanation: 'Second Conditional', hint: 'Hypothetical' },
      { id: 200, type: 'fill_blank', question: 'If I ____ earlier, I wouldn\'t have been late.', correct: 'had left', explanation: 'Third Conditional', hint: 'Past perfect' },
      { id: 201, type: 'multiple_choice', question: 'If you don\'t water plants, they ____.', options: ['die', 'will die', 'would die'], correct: 'die', explanation: 'Zero Conditional', hint: 'Fact' },
      { id: 202, type: 'fill_blank', question: 'If you call me, I ____ answer.', correct: 'will', explanation: 'First Conditional', hint: 'Possible' },
      { id: 203, type: 'multiple_choice', question: 'If I ____ taller, I would play basketball.', options: ['am', 'were', 'was'], correct: 'were', explanation: 'Second Conditional', hint: 'Hypothetical' },
      { id: 204, type: 'fill_blank', question: 'If they ____ earlier, they would have seen it.', correct: 'had arrived', explanation: 'Third Conditional', hint: 'Past perfect' },
      { id: 205, type: 'multiple_choice', question: 'If you ____ metal, it expands.', options: ['heat', 'will heat', 'heated'], correct: 'heat', explanation: 'Zero Conditional', hint: 'Fact' },
      { id: 206, type: 'fill_blank', question: 'If you ____ me, I will help you.', correct: 'ask', explanation: 'First Conditional', hint: 'Possible' },
      { id: 207, type: 'multiple_choice', question: 'If I ____ rich, I would buy a house.', options: ['am', 'were', 'was'], correct: 'were', explanation: 'Second Conditional', hint: 'Hypothetical' },
      { id: 208, type: 'fill_blank', question: 'If she ____ the job, she would have been happy.', correct: 'had gotten', explanation: 'Third Conditional', hint: 'Past perfect' },
      { id: 209, type: 'multiple_choice', question: 'What ____ happen if you press this button?', options: ['happens', 'will happen', 'would happen'], correct: 'happens', explanation: 'Zero Conditional', hint: 'Fact' },
      { id: 210, type: 'fill_blank', question: 'If you ____ me, I will tell you.', correct: 'ask', explanation: 'First Conditional', hint: 'Possible' }
    ]
  },

  // ==================== MÓDULO 5 - AULA 8 (Natural Conversation) ====================
  8: {
    title: "Natural Conversation & Fillers",
    exercises: [
      { id: 211, type: 'multiple_choice', question: 'What does "well" mean as a filler?', options: ['bem', 'então', 'bom'], correct: 'bom', explanation: 'Well = filler', hint: 'To start speaking' },
      { id: 212, type: 'fill_blank', question: '____, I think we should start.', correct: 'Well', explanation: 'Well = to begin', hint: 'Filler' },
      { id: 213, type: 'multiple_choice', question: 'What is a "small talk" topic?', options: ['Weather', 'Politics', 'Religion'], correct: 'Weather', explanation: 'Weather = safe topic', hint: 'Light conversation' },
      { id: 214, type: 'fill_blank', question: 'How ____ you doing?', correct: 'are', explanation: 'How are you doing?', hint: 'Greeting' },
      { id: 215, type: 'multiple_choice', question: '____ the way, have you seen John?', options: ['By', 'On', 'In'], correct: 'By', explanation: 'By the way = aliás', hint: 'Change topic' },
      { id: 216, type: 'fill_blank', question: 'Actually, I ____ tea.', correct: 'prefer', explanation: 'Actually = in fact', hint: 'Correction' },
      { id: 217, type: 'multiple_choice', question: 'What does "you know" mean as a filler?', options: ['sabe', 'você sabe', 'entende'], correct: 'sabe', explanation: 'You know = filler', hint: 'Seeking agreement' },
      { id: 218, type: 'fill_blank', question: 'It was, ____, a great experience.', correct: 'like', explanation: 'Like = filler', hint: 'Informal filler' },
      { id: 219, type: 'multiple_choice', question: 'What is a common response to "How are you?"', options: ['I\'m fine', 'Goodbye', 'Hello'], correct: 'I\'m fine', explanation: 'I\'m fine = standard', hint: 'Common answer' },
      { id: 220, type: 'fill_blank', question: 'Nice ____ you!', correct: 'to meet', explanation: 'Nice to meet you', hint: 'First meeting' },
      { id: 221, type: 'multiple_choice', question: 'What does "uh" mean?', options: ['Hesitation', 'Agreement', 'Disagreement'], correct: 'Hesitation', explanation: 'Uh = thinking', hint: 'Filler' },
      { id: 222, type: 'fill_blank', question: 'Could you ____ that, please?', correct: 'repeat', explanation: 'Could you repeat?', hint: 'Asking again' },
      { id: 223, type: 'multiple_choice', question: 'What is a good small talk question?', options: ['Nice weather?', 'How much money?', 'Are you married?'], correct: 'Nice weather?', explanation: 'Weather = safe', hint: 'Neutral topic' },
      { id: 224, type: 'fill_blank', question: 'I didn\'t ____ that.', correct: 'catch', explanation: 'I didn\'t catch that', hint: 'Didn\'t understand' },
      { id: 225, type: 'multiple_choice', question: 'What does "anyway" mean?', options: ['De qualquer forma', 'Aliás', 'Portanto'], correct: 'De qualquer forma', explanation: 'Anyway = changing topic', hint: 'Return to topic' },
      { id: 226, type: 'fill_blank', question: '____, let\'s continue.', correct: 'Anyway', explanation: 'Anyway = continue', hint: 'Filler' },
      { id: 227, type: 'multiple_choice', question: 'What does "I mean" mean as a filler?', options: ['Quero dizer', 'Eu quero', 'Significa'], correct: 'Quero dizer', explanation: 'I mean = clarifying', hint: 'Correction' },
      { id: 228, type: 'fill_blank', question: 'It was, ____, a disaster.', correct: 'I mean', explanation: 'I mean = correction', hint: 'Clarifying' },
      { id: 229, type: 'multiple_choice', question: 'What is a polite way to ask for repetition?', options: ['Sorry?', 'What?', 'Huh?'], correct: 'Sorry?', explanation: 'Sorry = polite', hint: 'Polite' },
      { id: 230, type: 'fill_blank', question: 'Could you ____ more slowly?', correct: 'speak', explanation: 'Speak more slowly', hint: 'Request' },
      { id: 231, type: 'multiple_choice', question: 'What does "I see" mean?', options: ['Entendo', 'Vejo', 'Sei'], correct: 'Entendo', explanation: 'I see = understanding', hint: 'Acknowledgment' },
      { id: 232, type: 'fill_blank', question: '____, I agree with you.', correct: 'Actually', explanation: 'Actually = in fact', hint: 'Polite disagreement' },
      { id: 233, type: 'multiple_choice', question: 'What is a good way to end a conversation?', options: ['Nice talking', 'Goodbye', 'See you'], correct: 'Nice talking', explanation: 'Nice talking = polite ending', hint: 'Friendly' },
      { id: 234, type: 'fill_blank', question: 'It was nice ____ to you.', correct: 'talking', explanation: 'Nice talking to you', hint: 'Ending' },
      { id: 235, type: 'multiple_choice', question: 'What does "by the way" do?', options: ['Introduces new topic', 'Ends conversation', 'Asks question'], correct: 'Introduces new topic', explanation: 'By the way = change topic', hint: 'Transition' },
      { id: 236, type: 'fill_blank', question: '____, did you see the news?', correct: 'By the way', explanation: 'By the way', hint: 'New topic' },
      { id: 237, type: 'multiple_choice', question: 'What does "I guess" mean?', options: ['Acho que', 'Eu acho', 'Adivinho'], correct: 'Acho que', explanation: 'I guess = uncertain', hint: 'Hesitation' },
      { id: 238, type: 'fill_blank', question: 'I ____ so.', correct: 'guess', explanation: 'I guess so', hint: 'Uncertain agreement' },
      { id: 239, type: 'multiple_choice', question: 'What is a filler word?', options: ['Um', 'Hello', 'Good'], correct: 'Um', explanation: 'Um = hesitation', hint: 'Pause' },
      { id: 240, type: 'fill_blank', question: '____, what were we talking about?', correct: 'Anyway', explanation: 'Anyway = return', hint: 'Back to topic' }
    ]
  },

  // ==================== MÓDULO 6 - AULA 9 (Digital & Phrasal Verbs) ====================
  9: {
    title: "Digital English & Phrasal Verbs",
    exercises: [
      { id: 241, type: 'multiple_choice', question: 'I need to ____ this document to the email.', options: ['attach', 'download', 'upload'], correct: 'attach', explanation: 'Attach = anexar', hint: 'Add file' },
      { id: 242, type: 'fill_blank', question: 'She always ____ up early.', correct: 'gets', explanation: 'Get up = wake up', hint: 'Wake up' },
      { id: 243, type: 'multiple_choice', question: 'Could you please ____ the music? It\'s too loud.', options: ['turn down', 'turn up', 'turn off'], correct: 'turn down', explanation: 'Turn down = lower volume', hint: 'Lower' },
      { id: 244, type: 'fill_blank', question: 'In the UK, they say "flat" instead of "____".', correct: 'apartment', explanation: 'Flat = apartment (UK)', hint: 'Apartment' },
      { id: 245, type: 'multiple_choice', question: 'Don\'t ____ up! You can do it!', options: ['give', 'look', 'call'], correct: 'give', explanation: 'Give up = quit', hint: 'Quit' },
      { id: 246, type: 'fill_blank', question: 'He is ____ for his keys.', correct: 'looking', explanation: 'Look for = search', hint: 'Search' },
      { id: 247, type: 'multiple_choice', question: 'We need to ____ off the meeting.', options: ['call', 'put', 'take'], correct: 'call', explanation: 'Call off = cancel', hint: 'Cancel' },
      { id: 248, type: 'fill_blank', question: 'The car ____ down.', correct: 'broke', explanation: 'Break down = stop working', hint: 'Car problem' },
      { id: 249, type: 'multiple_choice', question: 'I don\'t ____ along with my boss.', options: ['get', 'go', 'come'], correct: 'get', explanation: 'Get along = have good relationship', hint: 'Relationship' },
      { id: 250, type: 'fill_blank', question: 'Please ____ in the form.', correct: 'fill', explanation: 'Fill in = complete', hint: 'Complete' },
      { id: 251, type: 'multiple_choice', question: 'What is a "hashtag"?', options: ['#', '@', '!'], correct: '#', explanation: 'Hashtag = #', hint: 'Symbol' },
      { id: 252, type: 'fill_blank', question: 'She took a ____ at the beach.', correct: 'selfie', explanation: 'Selfie', hint: 'Self-photo' },
      { id: 253, type: 'multiple_choice', question: 'What is "streaming"?', options: ['Assistir online', 'Baixar', 'Enviar'], correct: 'Assistir online', explanation: 'Streaming = watch online', hint: 'Netflix' },
      { id: 254, type: 'fill_blank', question: 'I need to ____ this file.', correct: 'upload', explanation: 'Upload = send', hint: 'Send to cloud' },
      { id: 255, type: 'multiple_choice', question: 'What does "emoji" mean?', options: ['Emoticon', 'Imagem', 'Texto'], correct: 'Emoticon', explanation: 'Emoji = 😊', hint: 'Emoticon' },
      { id: 256, type: 'fill_blank', question: 'That video went ____.', correct: 'viral', explanation: 'Go viral', hint: 'Many views' },
      { id: 257, type: 'multiple_choice', question: 'What is "CC" in email?', options: ['Cópia', 'Confidencial', 'Cancelar'], correct: 'Cópia', explanation: 'CC = carbon copy', hint: 'Copy' },
      { id: 258, type: 'fill_blank', question: 'Please put the subject ____.', correct: 'line', explanation: 'Subject line', hint: 'Email subject' },
      { id: 259, type: 'multiple_choice', question: 'What is the US word for "lift"?', options: ['elevator', 'escalator', 'stairs'], correct: 'elevator', explanation: 'Lift (UK) = elevator (US)', hint: 'Elevator' },
      { id: 260, type: 'fill_blank', question: 'US "cookie" = UK "____".', correct: 'biscuit', explanation: 'Cookie (US) = biscuit (UK)', hint: 'Biscuit' },
      { id: 261, type: 'multiple_choice', question: 'What is a "false cognate"?', options: ['Falso amigo', 'Falso cognato', 'Falso significado'], correct: 'Falso amigo', explanation: 'False cognate = falso amigo', hint: 'Tricky word' },
      { id: 262, type: 'fill_blank', question: '"Actually" means ____.', correct: 'na verdade', explanation: 'Actually = na verdade', hint: 'Not atualmente' },
      { id: 263, type: 'multiple_choice', question: 'What does "pretend" mean?', options: ['Fingir', 'Pretender', 'Pretender'], correct: 'Fingir', explanation: 'Pretend = fingir', hint: 'False cognate' },
      { id: 264, type: 'fill_blank', question: 'I need to ____ after my brother.', correct: 'look', explanation: 'Look after = care for', hint: 'Care for' },
      { id: 265, type: 'multiple_choice', question: 'What does "take off" mean?', options: ['Decolar', 'Tirar roupa', 'Ambos'], correct: 'Ambos', explanation: 'Take off = both meanings', hint: 'Multiple meanings' },
      { id: 266, type: 'fill_blank', question: 'Please ____ on your coat.', correct: 'put', explanation: 'Put on = wear', hint: 'Wear' },
      { id: 267, type: 'multiple_choice', question: 'What is "influencer"?', options: ['Influenciador', 'Influente', 'Impacto'], correct: 'Influenciador', explanation: 'Influencer', hint: 'Social media' },
      { id: 268, type: 'fill_blank', question: 'She is a famous ____.', correct: 'influencer', explanation: 'Influencer', hint: 'Instagram' },
      { id: 269, type: 'multiple_choice', question: 'What does "BCC" mean?', options: ['Cópia oculta', 'Cópia', 'Resposta'], correct: 'Cópia oculta', explanation: 'BCC = blind carbon copy', hint: 'Hidden copy' },
      { id: 270, type: 'fill_blank', question: 'I need to ____ the video.', correct: 'download', explanation: 'Download = save', hint: 'Save to device' }
    ]
  }
}

// Função para pegar exercícios de um módulo
export const getExercisesByModule = (moduleId) => {
  return exercisesByModule[moduleId] || exercisesByModule[1]
}

// Função para pegar exercícios de uma aula específica
export const getExercisesByLesson = (lessonId) => {
  const lessonMapping = {
    1: 1,   // Módulo 1
    2: 2,   // Módulo 2
    3: 3,   // Módulo 3
    4: 4,   // Módulo 4 - Aula 1
    5: 5,   // Módulo 4 - Aula 2
    6: 6,   // Módulo 5 - Aula 1
    7: 7,   // Módulo 5 - Aula 2
    8: 8,   // Módulo 5 - Aula 3
    9: 9    // Módulo 6
  }
  
  const moduleId = lessonMapping[lessonId]
  if (!moduleId) return { title: "Exercises", exercises: [] }
  
  const moduleExercises = exercisesByModule[moduleId]
  if (!moduleExercises) return { title: "Exercises", exercises: [] }
  
  return {
    title: moduleExercises.title,
    exercises: moduleExercises.exercises
  }
}
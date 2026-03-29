import React, { useState } from 'react'
import { FaSearch, FaBook, FaLink, FaLanguage, FaVolumeUp, FaCopy, FaCheck } from 'react-icons/fa'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'

const StudentTools = () => {
  const [activeTab, setActiveTab] = useState('dictionary')
  const [searchWord, setSearchWord] = useState('')
  const [definition, setDefinition] = useState(null)
  const [loading, setLoading] = useState(false)
  const [translateText, setTranslateText] = useState('')
  const [translated, setTranslated] = useState('')
  const [targetLang, setTargetLang] = useState('pt')
  const [copied, setCopied] = useState(false)

  // Dicionário local de palavras comuns
  const localDictionary = {
    'hello': { meaning: 'Olá, saudação', partOfSpeech: 'interjection' },
    'goodbye': { meaning: 'Adeus, despedida', partOfSpeech: 'noun' },
    'make': { meaning: 'Fazer, criar (ênfase no resultado)', partOfSpeech: 'verb' },
    'do': { meaning: 'Fazer, realizar (ênfase na ação)', partOfSpeech: 'verb' },
    'big': { meaning: 'Grande', partOfSpeech: 'adjective' },
    'small': { meaning: 'Pequeno', partOfSpeech: 'adjective' },
    'happy': { meaning: 'Feliz', partOfSpeech: 'adjective' },
    'sad': { meaning: 'Triste', partOfSpeech: 'adjective' },
    'quickly': { meaning: 'Rapidamente', partOfSpeech: 'adverb' },
    'beautiful': { meaning: 'Bonito, lindo', partOfSpeech: 'adjective' }
  }

  const searchDictionary = async () => {
    if (!searchWord.trim()) {
      toast.error('Please enter a word to search')
      return
    }

    setLoading(true)
    setDefinition(null)

    const word = searchWord.toLowerCase().trim()
    
    // Primeiro, verifica no dicionário local
    if (localDictionary[word]) {
      const localDef = localDictionary[word]
      setDefinition({
        word: searchWord,
        meaning: localDef.meaning,
        example: `Example: "This is an example with the word ${searchWord}"`,
        partOfSpeech: localDef.partOfSpeech,
        phonetic: ''
      })
      toast.success(`Definition found for "${searchWord}"`)
      setLoading(false)
      return
    }

    // Se não encontrar localmente, tenta a API
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${word}`)
      
      if (!response.ok) {
        throw new Error('Word not found')
      }

      const data = await response.json()
      
      if (data && data[0]) {
        const wordData = data[0]
        const meaning = wordData.meanings[0]
        const definitionText = meaning.definitions[0].definition
        const example = meaning.definitions[0].example
        const partOfSpeech = meaning.partOfSpeech
        
        setDefinition({
          word: searchWord,
          meaning: definitionText,
          example: example || `Example: "This is an example with the word ${searchWord}"`,
          partOfSpeech: partOfSpeech,
          phonetic: wordData.phonetic || ''
        })
        toast.success(`Definition found for "${searchWord}"`)
      } else {
        throw new Error('Word not found')
      }
    } catch (error) {
      console.error('Error:', error)
      setDefinition(null)
      toast.error(`Could not find definition for "${searchWord}". Try another word.`)
    } finally {
      setLoading(false)
    }
  }

  const handleTranslate = async () => {
    if (!translateText.trim()) {
      toast.error('Please enter text to translate')
      return
    }

    setLoading(true)

    try {
      const response = await fetch(
        `https://api.mymemory.translated.net/get?q=${encodeURIComponent(translateText)}&langpair=en|${targetLang}`
      )
      
      const data = await response.json()
      
      if (data.responseData && data.responseData.translatedText) {
        setTranslated(data.responseData.translatedText)
        toast.success('Translation complete!')
      } else {
        throw new Error('Translation failed')
      }
    } catch (error) {
      console.error('Error:', error)
      toast.error('Translation failed. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
    setCopied(true)
    toast.success('Copied to clipboard!')
    setTimeout(() => setCopied(false), 2000)
  }

  const speak = (text) => {
  if (typeof window === 'undefined' || !window.speechSynthesis) return
  window.speechSynthesis.cancel()
  const utterance = new window.SpeechSynthesisUtterance(text)
  utterance.lang = 'en-US'
  utterance.rate = 0.9
  window.speechSynthesis.speak(utterance)
}

  const vocabularyByModule = {
  1: [
    { word: "Hello", meaning: "Olá", example: "Hello, how are you?" },
    { word: "Hi", meaning: "Oi", example: "Hi, nice to meet you!" },
    { word: "Good morning", meaning: "Bom dia", example: "Good morning, teacher!" },
    { word: "Good afternoon", meaning: "Boa tarde", example: "Good afternoon, everyone!" },
    { word: "Good evening", meaning: "Boa noite", example: "Good evening, welcome!" },
    { word: "Good night", meaning: "Boa noite (despedida)", example: "Good night, sleep well!" },
    { word: "Goodbye", meaning: "Adeus", example: "Goodbye, see you tomorrow!" },
    { word: "Bye", meaning: "Tchau", example: "Bye! Have a nice day!" },
    { word: "See you later", meaning: "Até mais", example: "See you later, alligator!" },
    { word: "My name is", meaning: "Meu nome é", example: "My name is John." },
    { word: "I am from", meaning: "Eu sou de", example: "I am from Brazil." },
    { word: "Teacher", meaning: "Professor", example: "She is a teacher." },
    { word: "Student", meaning: "Estudante", example: "I am a student." },
    { word: "Friend", meaning: "Amigo", example: "He is my friend." },
    { word: "Family", meaning: "Família", example: "My family is here." },
    { word: "Happy", meaning: "Feliz", example: "I am happy today." },
    { word: "Sad", meaning: "Triste", example: "She looks sad." },
    { word: "Big", meaning: "Grande", example: "This is a big house." },
    { word: "Small", meaning: "Pequeno", example: "I have a small car." },
    { word: "Red", meaning: "Vermelho", example: "The apple is red." },
    { word: "Blue", meaning: "Azul", example: "The sky is blue." },
    { word: "Yellow", meaning: "Amarelo", example: "The sun is yellow." },
    { word: "Green", meaning: "Verde", example: "The grass is green." },
    { word: "Black", meaning: "Preto", example: "The night is black." },
    { word: "White", meaning: "Branco", example: "The snow is white." },
    { word: "Orange", meaning: "Laranja", example: "The orange is orange." },
    { word: "Purple", meaning: "Roxo", example: "The flower is purple." },
    { word: "Pink", meaning: "Rosa", example: "The dress is pink." },
    { word: "Brown", meaning: "Marrom", example: "The tree is brown." },
    { word: "Gray", meaning: "Cinza", example: "The cloud is gray." },
    { word: "One", meaning: "Um", example: "I have one brother." },
    { word: "Two", meaning: "Dois", example: "Two cats." },
    { word: "Three", meaning: "Três", example: "Three books." },
    { word: "Four", meaning: "Quatro", example: "Four chairs." },
    { word: "Five", meaning: "Cinco", example: "Five fingers." },
    { word: "Six", meaning: "Seis", example: "Six eggs." },
    { word: "Seven", meaning: "Sete", example: "Seven days." },
    { word: "Eight", meaning: "Oito", example: "Eight planets." },
    { word: "Nine", meaning: "Nove", example: "Nine innings." },
    { word: "Ten", meaning: "Dez", example: "Ten fingers." },
    { word: "What", meaning: "O quê", example: "What is your name?" },
    { word: "Where", meaning: "Onde", example: "Where are you from?" },
    { word: "Who", meaning: "Quem", example: "Who is she?" },
    { word: "How", meaning: "Como", example: "How are you?" },
    { word: "When", meaning: "Quando", example: "When is the party?" },
    { word: "Why", meaning: "Por quê", example: "Why are you sad?" },
    { word: "a", meaning: "um/uma (consoante)", example: "a book" },
    { word: "an", meaning: "um/uma (vogal)", example: "an apple" },
    { word: "the", meaning: "o/a (específico)", example: "the sun" },
    { word: "I", meaning: "Eu", example: "I am a student." },
    { word: "You", meaning: "Você", example: "You are my friend." },
    { word: "He", meaning: "Ele", example: "He is a doctor." },
    { word: "She", meaning: "Ela", example: "She is from Brazil." },
    { word: "It", meaning: "Ele/Ela (coisa)", example: "It is a dog." },
    { word: "We", meaning: "Nós", example: "We are happy." },
    { word: "They", meaning: "Eles/Elas", example: "They are teachers." }
  ],
  
  2: [
    { word: "Wake up", meaning: "Acordar", example: "I wake up at 7 AM." },
    { word: "Get up", meaning: "Levantar", example: "I get up at 7:15 AM." },
    { word: "Brush teeth", meaning: "Escovar os dentes", example: "I brush my teeth twice a day." },
    { word: "Take a shower", meaning: "Tomar banho", example: "She takes a shower in the morning." },
    { word: "Have breakfast", meaning: "Tomar café da manhã", example: "I have breakfast at 8 AM." },
    { word: "Go to work", meaning: "Ir ao trabalho", example: "She goes to work by bus." },
    { word: "Go to school", meaning: "Ir à escola", example: "The children go to school." },
    { word: "Start work", meaning: "Começar o trabalho", example: "I start work at 9 AM." },
    { word: "Finish work", meaning: "Terminar o trabalho", example: "I finish work at 6 PM." },
    { word: "Have lunch", meaning: "Almoçar", example: "We have lunch at noon." },
    { word: "Go home", meaning: "Ir para casa", example: "I go home after work." },
    { word: "Make dinner", meaning: "Fazer o jantar", example: "She makes dinner at 7 PM." },
    { word: "Watch TV", meaning: "Assistir TV", example: "We watch TV in the evening." },
    { word: "Read a book", meaning: "Ler um livro", example: "He reads a book before bed." },
    { word: "Go to bed", meaning: "Ir para cama", example: "I go to bed at 11 PM." },
    { word: "Always", meaning: "Sempre", example: "I always drink coffee." },
    { word: "Usually", meaning: "Geralmente", example: "She usually arrives early." },
    { word: "Often", meaning: "Frequentemente", example: "We often go to the park." },
    { word: "Sometimes", meaning: "Às vezes", example: "He sometimes cooks dinner." },
    { word: "Rarely", meaning: "Raramente", example: "They rarely eat out." },
    { word: "Never", meaning: "Nunca", example: "I never smoke." },
    { word: "Work", meaning: "Trabalhar", example: "I work in an office." },
    { word: "Study", meaning: "Estudar", example: "She studies English." },
    { word: "Eat", meaning: "Comer", example: "We eat dinner at 7 PM." },
    { word: "Drink", meaning: "Beber", example: "I drink water." },
    { word: "Sleep", meaning: "Dormir", example: "He sleeps 8 hours." },
    { word: "Run", meaning: "Correr", example: "She runs every morning." },
    { word: "Walk", meaning: "Andar", example: "I walk to school." },
    { word: "Drive", meaning: "Dirigir", example: "He drives to work." },
    { word: "Cook", meaning: "Cozinhar", example: "She cooks dinner." },
    { word: "Clean", meaning: "Limpar", example: "I clean the house." },
    { word: "at", meaning: "em (hora)", example: "at 7 o'clock" },
    { word: "in", meaning: "em (mês/ano)", example: "in January" },
    { word: "on", meaning: "em (dia)", example: "on Monday" },
    { word: "o'clock", meaning: "em ponto", example: "seven o'clock" },
    { word: "quarter past", meaning: "e quinze", example: "quarter past seven" },
    { word: "half past", meaning: "e meia", example: "half past seven" },
    { word: "quarter to", meaning: "quinze para", example: "quarter to eight" },
    { word: "Morning", meaning: "Manhã", example: "in the morning" },
    { word: "Afternoon", meaning: "Tarde", example: "in the afternoon" },
    { word: "Evening", meaning: "Noite (início)", example: "in the evening" },
    { word: "Night", meaning: "Noite (final)", example: "at night" },
    { word: "Every day", meaning: "Todos os dias", example: "I study every day." },
    { word: "Once a week", meaning: "Uma vez por semana", example: "I exercise once a week." },
    { word: "Twice a month", meaning: "Duas vezes por mês", example: "I go to the cinema twice a month." },
    { word: "Three times a year", meaning: "Três vezes por ano", example: "I travel three times a year." }
  ],
  
  3: [
    { word: "Restaurant", meaning: "Restaurante", example: "Let's go to a restaurant." },
    { word: "Menu", meaning: "Cardápio", example: "Can I see the menu, please?" },
    { word: "Delicious", meaning: "Delicioso", example: "The food is delicious!" },
    { word: "Breakfast", meaning: "Café da manhã", example: "I have breakfast at 8 AM." },
    { word: "Lunch", meaning: "Almoço", example: "We had lunch together." },
    { word: "Dinner", meaning: "Jantar", example: "Dinner is ready!" },
    { word: "Water", meaning: "Água", example: "Can I have a glass of water?" },
    { word: "Coffee", meaning: "Café", example: "I drink coffee every morning." },
    { word: "Tea", meaning: "Chá", example: "Would you like some tea?" },
    { word: "Juice", meaning: "Suco", example: "Orange juice is my favorite." },
    { word: "Apple", meaning: "Maçã", example: "An apple a day keeps the doctor away." },
    { word: "Banana", meaning: "Banana", example: "I eat a banana for breakfast." },
    { word: "Orange", meaning: "Laranja", example: "Orange is rich in vitamin C." },
    { word: "Pizza", meaning: "Pizza", example: "I love pizza!" },
    { word: "Pasta", meaning: "Massa", example: "Pasta is delicious." },
    { word: "Salad", meaning: "Salada", example: "I eat a salad for lunch." },
    { word: "Chicken", meaning: "Frango", example: "Grilled chicken is healthy." },
    { word: "Fish", meaning: "Peixe", example: "I eat fish on Fridays." },
    { word: "Bank", meaning: "Banco", example: "I need to go to the bank." },
    { word: "Supermarket", meaning: "Supermercado", example: "I shop at the supermarket." },
    { word: "Hospital", meaning: "Hospital", example: "He is in the hospital." },
    { word: "School", meaning: "Escola", example: "The school is near my house." },
    { word: "Park", meaning: "Parque", example: "Let's go to the park." },
    { word: "Go straight", meaning: "Siga em frente", example: "Go straight for two blocks." },
    { word: "Turn left", meaning: "Vire à esquerda", example: "Turn left at the traffic light." },
    { word: "Turn right", meaning: "Vire à direita", example: "Turn right after the bridge." },
    { word: "Next to", meaning: "Ao lado de", example: "The school is next to the park." },
    { word: "Opposite", meaning: "Em frente a", example: "The library is opposite the station." },
    { word: "Between", meaning: "Entre", example: "The bank is between the shops." },
    { word: "Kitchen", meaning: "Cozinha", example: "She is cooking in the kitchen." },
    { word: "Living room", meaning: "Sala de estar", example: "We watch TV in the living room." },
    { word: "Bedroom", meaning: "Quarto", example: "My bedroom is upstairs." },
    { word: "Bathroom", meaning: "Banheiro", example: "Where is the bathroom?" },
    { word: "Table", meaning: "Mesa", example: "The book is on the table." },
    { word: "Chair", meaning: "Cadeira", example: "Please take a seat on the chair." },
    { word: "Sofa", meaning: "Sofá", example: "I relax on the sofa." },
    { word: "Bed", meaning: "Cama", example: "I sleep in my bed." },
    { word: "There is", meaning: "Há (singular)", example: "There is a book." },
    { word: "There are", meaning: "Há (plural)", example: "There are two chairs." },
    { word: "Now", meaning: "Agora", example: "I am reading now." },
    { word: "Right now", meaning: "Neste momento", example: "She is cooking right now." },
    { word: "At the moment", meaning: "No momento", example: "He is sleeping at the moment." },
    { word: "Bigger", meaning: "Maior", example: "My house is bigger than yours." },
    { word: "Smaller", meaning: "Menor", example: "This car is smaller." },
    { word: "The biggest", meaning: "O maior", example: "This is the biggest house." },
    { word: "The smallest", meaning: "O menor", example: "That is the smallest car." },
    { word: "More expensive", meaning: "Mais caro", example: "This is more expensive." },
    { word: "The most expensive", meaning: "O mais caro", example: "This is the most expensive." }
  ],
  
  4: [
    { word: "Yesterday", meaning: "Ontem", example: "I went to school yesterday." },
    { word: "Last week", meaning: "Semana passada", example: "I visited my grandmother last week." },
    { word: "Last month", meaning: "Mês passado", example: "I traveled last month." },
    { word: "Last year", meaning: "Ano passado", example: "I started learning English last year." },
    { word: "Went", meaning: "Foi (ir)", example: "She went to the beach." },
    { word: "Saw", meaning: "Viu (ver)", example: "I saw a movie yesterday." },
    { word: "Ate", meaning: "Comeu (comer)", example: "We ate pizza for dinner." },
    { word: "Drank", meaning: "Bebeu (beber)", example: "He drank orange juice." },
    { word: "Bought", meaning: "Comprou (comprar)", example: "She bought a new dress." },
    { word: "Thought", meaning: "Pensou (pensar)", example: "I thought about you." },
    { word: "Spoke", meaning: "Falou (falar)", example: "He spoke English." },
    { word: "Wrote", meaning: "Escreveu (escrever)", example: "She wrote a letter." },
    { word: "Read", meaning: "Leu (ler)", example: "I read a book." },
    { word: "Drove", meaning: "Dirigiu (dirigir)", example: "He drove to work." },
    { word: "Felt", meaning: "Sentiu (sentir)", example: "I felt happy." },
    { word: "Knew", meaning: "Sabia (saber)", example: "She knew the answer." },
    { word: "Met", meaning: "Conheceu (conhecer)", example: "I met my friend." },
    { word: "Took", meaning: "Pegou (pegar)", example: "He took the bus." },
    { word: "Gave", meaning: "Deu (dar)", example: "She gave me a gift." },
    { word: "Made", meaning: "Fez (fazer)", example: "I made dinner." },
    { word: "Was", meaning: "Era/estava (I/he/she/it)", example: "I was happy." },
    { word: "Were", meaning: "Eram/estavam (you/we/they)", example: "They were friends." },
    { word: "Could", meaning: "Podia (poder)", example: "I could swim when I was young." },
    { word: "Should", meaning: "Deveria (dever)", example: "You should study more." },
    { word: "Must", meaning: "Deve (obrigação)", example: "You must wear a seatbelt." },
    { word: "May", meaning: "Pode (permissão)", example: "May I come in?" },
    { word: "Might", meaning: "Pode (possibilidade)", example: "It might rain later." },
    { word: "Can", meaning: "Pode (habilidade)", example: "I can speak English." },
    { word: "In my opinion", meaning: "Na minha opinião", example: "In my opinion, English is important." },
    { word: "I think that", meaning: "Eu acho que", example: "I think that you are right." },
    { word: "I agree", meaning: "Eu concordo", example: "I agree with you." },
    { word: "I disagree", meaning: "Eu discordo", example: "I disagree with that idea." },
    { word: "Because", meaning: "Porque", example: "I study because I want to learn." },
    { word: "Although", meaning: "Embora", example: "Although it was cold, I went out." },
    { word: "Therefore", meaning: "Portanto", example: "I studied hard; therefore, I passed." },
    { word: "However", meaning: "No entanto", example: "It was raining; however, I went out." },
    { word: "First", meaning: "Primeiro", example: "First, I woke up." },
    { word: "Then", meaning: "Depois", example: "Then, I had breakfast." },
    { word: "Finally", meaning: "Finalmente", example: "Finally, I went to bed." }
  ],
  
  5: [
    { word: "Will", meaning: "Vai (futuro)", example: "I will call you later." },
    { word: "Going to", meaning: "Vou (plano)", example: "I am going to travel next year." },
    { word: "If", meaning: "Se (condicional)", example: "If it rains, I will stay home." },
    { word: "Unless", meaning: "A menos que", example: "I won't go unless you come." },
    { word: "Would", meaning: "Gostaria", example: "I would like a coffee." },
    { word: "Could", meaning: "Poderia", example: "Could you help me?" },
    { word: "Might", meaning: "Talvez", example: "I might go to the party." },
    { word: "Well", meaning: "Bem", example: "Well, let's start." },
    { word: "Actually", meaning: "Na verdade", example: "Actually, I prefer tea." },
    { word: "Anyway", meaning: "De qualquer forma", example: "Anyway, let's continue." },
    { word: "By the way", meaning: "Aliás", example: "By the way, have you seen John?" },
    { word: "You know", meaning: "Sabe", example: "It's, you know, difficult." },
    { word: "Like", meaning: "Tipo assim", example: "It was, like, amazing!" },
    { word: "Small talk", meaning: "Conversa leve", example: "We made small talk at the party." },
    { word: "Pronunciation", meaning: "Pronúncia", example: "Your pronunciation is good." },
    { word: "Fluency", meaning: "Fluência", example: "Practice helps with fluency." },
    { word: "Accent", meaning: "Sotaque", example: "She has a British accent." },
    { word: "Native speaker", meaning: "Falante nativo", example: "I want to sound like a native speaker." },
    { word: "Conversation", meaning: "Conversa", example: "Let's have a conversation in English." },
    { word: "Discussion", meaning: "Discussão", example: "We had a great discussion." },
    { word: "Debate", meaning: "Debate", example: "They had a debate about politics." },
    { word: "Presentation", meaning: "Apresentação", example: "I gave a presentation at work." },
    { word: "Zero Conditional", meaning: "Fatos", example: "If you heat ice, it melts." },
    { word: "First Conditional", meaning: "Possibilidade real", example: "If it rains, I will stay." },
    { word: "Second Conditional", meaning: "Hipótese", example: "If I were rich, I would travel." },
    { word: "Third Conditional", meaning: "Arrependimento", example: "If I had studied, I would have passed." },
    { word: "Promise", meaning: "Promessa", example: "I promise I will help." },
    { word: "Offer", meaning: "Oferecimento", example: "I'll help you." },
    { word: "Prediction", meaning: "Previsão", example: "It will rain tomorrow." },
    { word: "Plan", meaning: "Plano", example: "I am going to study." },
    { word: "Arrangement", meaning: "Compromisso", example: "I am meeting John tomorrow." },
    { word: "Schedule", meaning: "Horário", example: "The train leaves at 10 AM." }
  ],
  
  6: [
    { word: "Hashtag", meaning: "Hashtag", example: "Use #EnglishLearning on social media." },
    { word: "Selfie", meaning: "Selfie", example: "She took a selfie at the beach." },
    { word: "Streaming", meaning: "Streaming", example: "I watch Netflix streaming." },
    { word: "Download", meaning: "Baixar", example: "Download the app for free." },
    { word: "Upload", meaning: "Enviar", example: "Upload your photos to the cloud." },
    { word: "Emoji", meaning: "Emoji", example: "He sent a smiley emoji." },
    { word: "Meme", meaning: "Meme", example: "That meme went viral." },
    { word: "Viral", meaning: "Viral", example: "The video went viral." },
    { word: "Influencer", meaning: "Influenciador", example: "She is a famous influencer." },
    { word: "Attachment", meaning: "Anexo", example: "Please see the attachment." },
    { word: "Subject line", meaning: "Assunto", example: "Write a clear subject line." },
    { word: "CC", meaning: "Cópia", example: "CC your manager." },
    { word: "BCC", meaning: "Cópia oculta", example: "Use BCC for mass emails." },
    { word: "Look for", meaning: "Procurar", example: "I am looking for my keys." },
    { word: "Look after", meaning: "Cuidar", example: "She looks after her younger brother." },
    { word: "Give up", meaning: "Desistir", example: "Never give up on your dreams." },
    { word: "Turn on", meaning: "Ligar", example: "Turn on the TV, please." },
    { word: "Turn off", meaning: "Desligar", example: "Turn off the lights." },
    { word: "Turn up", meaning: "Aumentar volume", example: "Turn up the music!" },
    { word: "Turn down", meaning: "Diminuir volume", example: "Turn down the TV." },
    { word: "Get along with", meaning: "Se dar bem com", example: "I get along with my coworkers." },
    { word: "Break down", meaning: "Quebrar", example: "The car broke down yesterday." },
    { word: "Call off", meaning: "Cancelar", example: "They called off the meeting." },
    { word: "Run out of", meaning: "Acabar", example: "We ran out of milk." },
    { word: "Take off", meaning: "Decolar / Tirar", example: "The plane took off. Take off your shoes." },
    { word: "Put on", meaning: "Vestir / Ligar", example: "Put on your coat. Put on some music." },
    { word: "Apartment (US)", meaning: "Apartamento", example: "I live in an apartment." },
    { word: "Flat (UK)", meaning: "Apartamento", example: "She has a flat in London." },
    { word: "Elevator (US)", meaning: "Elevador", example: "Take the elevator to the 5th floor." },
    { word: "Lift (UK)", meaning: "Elevador", example: "The lift is broken." },
    { word: "Cookie (US)", meaning: "Biscoito", example: "I love chocolate chip cookies." },
    { word: "Biscuit (UK)", meaning: "Biscoito", example: "Would you like a biscuit?" },
    { word: "Gas (US)", meaning: "Gasolina", example: "I need to get gas." },
    { word: "Petrol (UK)", meaning: "Gasolina", example: "The car needs petrol." },
    { word: "Vacation (US)", meaning: "Férias", example: "I'm on vacation." },
    { word: "Holiday (UK)", meaning: "Férias", example: "I'm going on holiday." },
    { word: "Actually", meaning: "Na verdade", example: "Actually, I'm not ready." },
    { word: "Pretend", meaning: "Fingir", example: "Don't pretend you don't know." },
    { word: "Library", meaning: "Biblioteca", example: "Go to the library to study." },
    { word: "Exit", meaning: "Saída", example: "The exit is over there." },
    { word: "Sensible", meaning: "Sensato", example: "That's a sensible decision." },
    { word: "Sympathetic", meaning: "Compreensivo", example: "She is very sympathetic." }
  ]
}

  const usefulLinks = [
    { name: 'Cambridge Dictionary', url: 'https://dictionary.cambridge.org/', icon: '📖', description: 'Dicionário inglês-português' },
    { name: 'DeepL Translator', url: 'https://www.deepl.com/translator', icon: '🌐', description: 'Tradução mais precisa' },
    { name: 'Google Translate', url: 'https://translate.google.com/', icon: '🔤', description: 'Tradutor rápido' },
    { name: 'YouGlish', url: 'https://youglish.com/', icon: '🎤', description: 'Pronúncia em vídeos reais' },
    { name: 'BBC Learning English', url: 'https://www.bbc.co.uk/learningenglish/', icon: '📺', description: 'Aulas e vídeos' },
    { name: 'Grammarly', url: 'https://www.grammarly.com/', icon: '✍️', description: 'Corretor de inglês' }
  ]

  return (
    <div className="glass-card p-6">
      <h2 className="text-2xl font-cyber font-bold text-neon-cyan mb-4 flex items-center gap-2">
        📚 Student Tools
      </h2>
      
      {/* Tabs */}
      <div className="flex gap-2 border-b border-neon-cyan/30 mb-6 overflow-x-auto">
        {[
          { id: 'dictionary', label: '📖 Dictionary', icon: FaSearch },
          { id: 'vocabulary', label: '📚 Vocabulary', icon: FaBook },
          { id: 'translate', label: '🌐 Translator', icon: FaLanguage },
          { id: 'links', label: '🔗 Useful Links', icon: FaLink }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 rounded-t-lg transition-all whitespace-nowrap ${
              activeTab === tab.id
                ? 'bg-neon-cyan/20 border-b-2 border-neon-cyan text-neon-cyan'
                : 'text-gray-400 hover:text-white'
            }`}
          >
            <span className="flex items-center gap-2">
              <tab.icon size={16} />
              {tab.label}
            </span>
          </button>
        ))}
      </div>

      {/* Dictionary Tab */}
      {activeTab === 'dictionary' && (
        <div className="space-y-4">
          <div className="flex gap-2">
            <input
              type="text"
              value={searchWord}
              onChange={(e) => setSearchWord(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && searchDictionary()}
              placeholder="Search for a word in English..."
              className="flex-1 bg-dark-300 border border-neon-cyan/30 rounded-lg px-4 py-2 text-white focus:outline-none focus:border-neon-cyan"
            />
            <button
              onClick={searchDictionary}
              disabled={loading}
              className="cyber-button px-6 disabled:opacity-50"
            >
              {loading ? 'Searching...' : 'Search'}
            </button>
          </div>
          
          {definition && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-200 rounded-lg p-4 border border-neon-cyan/30"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-2">
                    <h3 className="text-xl font-bold text-white">{definition.word}</h3>
                    <span className="text-xs text-gray-400">{definition.partOfSpeech}</span>
                    {definition.phonetic && (
                      <span className="text-xs text-neon-cyan">/{definition.phonetic}/</span>
                    )}
                  </div>
                  <p className="text-gray-300 mt-2">{definition.meaning}</p>
                  {definition.example && (
                    <p className="text-gray-500 text-sm italic mt-2">Example: "{definition.example}"</p>
                  )}
                </div>
                <button
                  onClick={() => speak(definition.word)}
                  className="p-2 bg-neon-cyan/20 rounded-lg hover:bg-neon-cyan/30 transition-all"
                >
                  <FaVolumeUp className="text-neon-cyan" />
                </button>
              </div>
            </motion.div>
          )}
          
          {!definition && searchWord && !loading && (
            <p className="text-gray-400 text-center py-4">Word not found. Try another word.</p>
          )}
        </div>
      )}

      {/* Vocabulary Tab */}
      {activeTab === 'vocabulary' && (
        <div className="space-y-6 max-h-96 overflow-y-auto">
          {Object.keys(vocabularyByModule).map(moduleId => (
            <div key={moduleId} className="bg-dark-200/50 rounded-lg p-4">
              <h3 className="text-lg font-bold text-neon-cyan mb-3">Module {moduleId} Vocabulary</h3>
              <div className="grid gap-2">
                {vocabularyByModule[moduleId]?.map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2 p-2 hover:bg-dark-300 rounded-lg transition-colors">
                    <span className="text-neon-cyan mt-1">▹</span>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-white">{item.word}</span>
                        <button
                          onClick={() => speak(item.word)}
                          className="text-neon-cyan hover:text-neon-pink transition-colors"
                        >
                          <FaVolumeUp size={12} />
                        </button>
                      </div>
                      <p className="text-gray-400 text-sm">{item.meaning}</p>
                      <p className="text-gray-500 text-xs italic">"{item.example}"</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Translator Tab */}
      {activeTab === 'translate' && (
        <div className="space-y-4">
          <div className="flex gap-4 mb-2">
            <div className="flex-1">
              <label className="text-gray-400 text-sm">From: English</label>
            </div>
            <div className="flex-1">
              <label className="text-gray-400 text-sm">To: 
                <select
                  value={targetLang}
                  onChange={(e) => setTargetLang(e.target.value)}
                  className="ml-2 bg-dark-300 border border-neon-cyan/30 rounded px-2 py-1 text-white"
                >
                  <option value="pt">Portuguese</option>
                  <option value="es">Spanish</option>
                  <option value="fr">French</option>
                  <option value="de">German</option>
                  <option value="it">Italian</option>
                </select>
              </label>
            </div>
          </div>
          
          <textarea
            value={translateText}
            onChange={(e) => setTranslateText(e.target.value)}
            placeholder="Type English text to translate..."
            className="w-full h-32 bg-dark-300 border border-neon-cyan/30 rounded-lg p-3 text-white focus:outline-none focus:border-neon-cyan"
          />
          
          <button
            onClick={handleTranslate}
            disabled={loading}
            className="cyber-button w-full disabled:opacity-50"
          >
            {loading ? 'Translating...' : 'Translate'}
          </button>
          
          {translated && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-dark-200 rounded-lg p-4 border border-neon-cyan/30"
            >
              <div className="flex justify-between items-start">
                <div className="flex-1">
                  <p className="text-gray-400 text-sm mb-1">Translation:</p>
                  <p className="text-white">{translated}</p>
                </div>
                <button
                  onClick={() => copyToClipboard(translated)}
                  className="p-2 bg-neon-cyan/20 rounded-lg hover:bg-neon-cyan/30 transition-all"
                >
                  {copied ? <FaCheck className="text-green-500" /> : <FaCopy className="text-neon-cyan" />}
                </button>
              </div>
            </motion.div>
          )}
        </div>
      )}

      {/* Useful Links Tab */}
      {activeTab === 'links' && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3 max-h-96 overflow-y-auto">
          {usefulLinks.map((link, idx) => (
            <a
              key={idx}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-3 p-3 bg-dark-200 rounded-lg hover:bg-dark-100 transition-all group"
            >
              <span className="text-2xl">{link.icon}</span>
              <div className="flex-1">
                <h4 className="font-bold text-white group-hover:text-neon-cyan transition-colors">
                  {link.name}
                </h4>
                <p className="text-xs text-gray-400">{link.description}</p>
              </div>
              <FaLink className="text-gray-500 group-hover:text-neon-cyan transition-colors" />
            </a>
          ))}
        </div>
      )}
    </div>
  )
}

export default StudentTools
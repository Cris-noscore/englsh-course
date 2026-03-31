import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { FaCheck, FaTimes, FaTrophy, FaInfoCircle, FaLightbulb, FaArrowLeft, FaArrowRight, FaRedoAlt, FaMedal, FaMicrophone, FaVolumeUp } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { supabase } from '../services/supabase'
import { useAuth } from '../contexts/AuthContext'
import { getExercisesByLesson } from '../utils/exercisesData'

// ─── TEMAS ───────────────────────────────────────────────────────────────────
const MODULE_THEME = {
  1: { color: '#00b4d8', glow: 'rgba(0,180,216,0.25)',   border: 'rgba(0,180,216,0.30)',   bg: 'rgba(0,180,216,0.07)',   muted: '#0077b6' },
  2: { color: '#f5c400', glow: 'rgba(245,196,0,0.22)',   border: 'rgba(245,196,0,0.28)',   bg: 'rgba(245,196,0,0.07)',   muted: '#b38e00' },
  3: { color: '#22c55e', glow: 'rgba(34,197,94,0.22)',   border: 'rgba(34,197,94,0.28)',   bg: 'rgba(34,197,94,0.07)',   muted: '#15803d' },
  4: { color: '#f97316', glow: 'rgba(249,115,22,0.22)',  border: 'rgba(249,115,22,0.28)',  bg: 'rgba(249,115,22,0.07)',  muted: '#c2410c' },
  5: { color: '#a855f7', glow: 'rgba(168,85,247,0.22)',  border: 'rgba(168,85,247,0.28)',  bg: 'rgba(168,85,247,0.07)',  muted: '#7e22ce' },
  6: { color: '#94a3b8', glow: 'rgba(148,163,184,0.18)', border: 'rgba(148,163,184,0.25)', bg: 'rgba(148,163,184,0.07)', muted: '#64748b' },
}
const LESSON_MODULE_MAP = { 1:1, 2:2, 3:3, 4:4, 5:4, 6:5, 7:5, 8:5, 9:6 }
const NEXT_LESSON_MAP   = { 1:2, 2:3, 3:4, 4:5, 5:6, 6:7, 7:8, 8:9, 9:null }
const LESSON_IMAGES = {
  1:'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1200&q=80',
  2:'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&q=80',
  3:'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
  4:'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1200&q=80',
  5:'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1200&q=80',
  6:'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
  7:'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
  8:'https://images.unsplash.com/photo-1462556791646-c201b8241a94?w=1200&q=80',
  9:'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
}

// ─── COMPONENTE DRAG & DROP ──────────────────────────────────────────────────
const DragDropActivity = ({ activity, theme, onAnswer }) => {
  const [slots, setSlots]   = useState(Array(activity.blanks?.length || 1).fill(null))
  const [available, setAvailable] = useState([...activity.options])
  const [dragging, setDragging]   = useState(null)

  const handleDrop = (slotIdx) => {
    if (dragging === null) return
    const word = available[dragging]
    const newSlots = [...slots]
    // Se slot já tem palavra, devolve para available
    if (newSlots[slotIdx]) {
      setAvailable(prev => [...prev, newSlots[slotIdx]])
    }
    newSlots[slotIdx] = word
    setSlots(newSlots)
    setAvailable(prev => prev.filter((_, i) => i !== dragging))
    setDragging(null)
  }

  const removeFromSlot = (slotIdx) => {
    if (!slots[slotIdx]) return
    setAvailable(prev => [...prev, slots[slotIdx]])
    const newSlots = [...slots]
    newSlots[slotIdx] = null
    setSlots(newSlots)
  }

  const handleSubmit = () => {
    if (slots.some(s => !s)) { toast.error('Fill all the blanks first!'); return }
    const answer = slots.join(' ')
    onAnswer(answer)
  }

  // Renderiza a frase com slots
  const parts = activity.sentence?.split('___') || ['']

  return (
    <div className="space-y-6">
      {/* Frase com slots */}
      <div className="p-4 rounded-xl text-white text-lg leading-relaxed flex flex-wrap items-center gap-2"
        style={{ background: 'rgba(0,0,0,0.2)', border: `1px solid ${theme.border}` }}>
        {parts.map((part, i) => (
          <React.Fragment key={i}>
            <span>{part}</span>
            {i < slots.length && (
              <div
                onDragOver={e => e.preventDefault()}
                onDrop={() => handleDrop(i)}
                onClick={() => removeFromSlot(i)}
                className="inline-flex items-center justify-center min-w-[80px] h-10 px-3 rounded-lg cursor-pointer transition-all"
                style={{
                  border: `2px dashed ${slots[i] ? theme.color : 'rgba(255,255,255,0.3)'}`,
                  background: slots[i] ? `${theme.color}20` : 'rgba(255,255,255,0.05)',
                  color: theme.color,
                  fontWeight: 'bold',
                }}
              >
                {slots[i] || '?'}
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Palavras disponíveis */}
      <div>
        <p className="text-gray-400 text-xs font-mono mb-3">Drag words to the blanks (or click to remove):</p>
        <div className="flex flex-wrap gap-2">
          {available.map((word, i) => (
            <div
              key={`${word}-${i}`}
              draggable
              onDragStart={() => setDragging(i)}
              onDragEnd={() => setDragging(null)}
              className="px-4 py-2 rounded-lg cursor-grab active:cursor-grabbing select-none transition-all hover:brightness-125"
              style={{
                background: `${theme.color}20`,
                border: `1px solid ${theme.border}`,
                color: theme.color,
                fontWeight: '500',
                boxShadow: dragging === i ? `0 0 12px ${theme.glow}` : 'none',
              }}
            >
              {word}
            </div>
          ))}
          {available.length === 0 && (
            <p className="text-gray-500 text-sm italic">All words placed!</p>
          )}
        </div>
      </div>

      <button
        onClick={handleSubmit}
        disabled={slots.some(s => !s)}
        style={{ color: theme.color, border: `1px solid ${theme.border}`, background: `${theme.color}18` }}
        className="w-full py-3 rounded-lg font-mono transition-all hover:brightness-125 disabled:opacity-40 disabled:cursor-not-allowed"
      >
        ✅ Check Answer
      </button>
    </div>
  )
}

// ─── COMPONENTE WORD ORDER ───────────────────────────────────────────────────
const WordOrderActivity = ({ activity, theme, onAnswer }) => {
  const [selected, setSelected] = useState([])
  const [remaining, setRemaining] = useState(() => {
    // Embaralha as palavras
    const words = [...activity.words]
    for (let i = words.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [words[i], words[j]] = [words[j], words[i]]
    }
    return words.map((w, i) => ({ word: w, id: i }))
  })

  const addWord = (item) => {
    setSelected(prev => [...prev, item])
    setRemaining(prev => prev.filter(w => w.id !== item.id))
  }

  const removeWord = (item) => {
    setRemaining(prev => [...prev, item])
    setSelected(prev => prev.filter(w => w.id !== item.id))
  }

  const handleSubmit = () => {
    if (selected.length === 0) { toast.error('Build the sentence first!'); return }
    const answer = selected.map(w => w.word).join(' ')
    onAnswer(answer)
  }

  return (
    <div className="space-y-6">
      {/* Frase sendo construída */}
      <div>
        <p className="text-gray-400 text-xs font-mono mb-2">Your sentence:</p>
        <div
          className="min-h-16 p-3 rounded-xl flex flex-wrap gap-2 items-center"
          style={{ background: 'rgba(0,0,0,0.2)', border: `2px dashed ${selected.length > 0 ? theme.color : 'rgba(255,255,255,0.2)'}` }}
        >
          {selected.length === 0 && (
            <p className="text-gray-500 text-sm italic">Click words below to build the sentence...</p>
          )}
          {selected.map((item) => (
            <motion.div
              key={item.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={() => removeWord(item)}
              className="px-3 py-1.5 rounded-lg cursor-pointer transition-all hover:brightness-75"
              style={{ background: `${theme.color}30`, border: `1px solid ${theme.color}`, color: theme.color, fontWeight: 'bold' }}
            >
              {item.word}
            </motion.div>
          ))}
        </div>
      </div>

      {/* Palavras disponíveis */}
      <div>
        <p className="text-gray-400 text-xs font-mono mb-2">Available words (click to add):</p>
        <div className="flex flex-wrap gap-2">
          {remaining.map((item) => (
            <motion.div
              key={item.id}
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              onClick={() => addWord(item)}
              className="px-3 py-1.5 rounded-lg cursor-pointer transition-all hover:brightness-125"
              style={{ background: 'rgba(255,255,255,0.06)', border: `1px solid rgba(255,255,255,0.15)`, color: '#fff' }}
            >
              {item.word}
            </motion.div>
          ))}
        </div>
      </div>

      <div className="flex gap-3">
        <button
          onClick={() => { setSelected([]); setRemaining(activity.words.map((w, i) => ({ word: w, id: i }))) }}
          className="px-4 py-2 rounded-lg text-sm font-mono text-gray-400 border border-gray-700 hover:border-gray-500 transition-all"
        >
          ↺ Reset
        </button>
        <button
          onClick={handleSubmit}
          disabled={selected.length === 0}
          style={{ color: theme.color, border: `1px solid ${theme.border}`, background: `${theme.color}18` }}
          className="flex-1 py-2 rounded-lg font-mono transition-all hover:brightness-125 disabled:opacity-40"
        >
          ✅ Check Sentence
        </button>
      </div>
    </div>
  )
}

// ─── COMPONENTE VOICE PRACTICE ───────────────────────────────────────────────
const VoicePracticeActivity = ({ activity, theme, onAnswer, onSkip }) => {
  const [isListening, setIsListening]   = useState(false)
  const [transcript, setTranscript]     = useState('')
  const [attempts, setAttempts]         = useState(0)
  const [supported, setSupported]       = useState(true)
  const [permissionDenied, setPermissionDenied] = useState(false)

  useEffect(() => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) setSupported(false)
  }, [])

  const speakSentence = () => {
    window.speechSynthesis.cancel()
    const utt = new SpeechSynthesisUtterance(activity.sentence)
    utt.lang = 'en-US'; utt.rate = 0.85
    window.speechSynthesis.speak(utt)
  }

  const startListening = async () => {
    const SR = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SR) { onSkip(); return }

    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
    } catch {
      setPermissionDenied(true)
      return
    }

    const recognition = new SR()
    recognition.lang = 'en-US'
    recognition.interimResults = false

    recognition.onstart  = () => setIsListening(true)
    recognition.onend    = () => setIsListening(false)
    recognition.onerror  = (e) => {
      setIsListening(false)
      if (e.error === 'not-allowed') { setPermissionDenied(true); return }
      toast.error('Could not hear you. Try again!')
    }
    recognition.onresult = (e) => {
      const text = e.results[0][0].transcript
      setTranscript(text)
      setAttempts(a => a + 1)
      // Compara ignorando pontuação e capitalização
      const normalize = s => s.toLowerCase().replace(/[^a-z0-9\s]/g, '').trim()
      const similarity = normalize(text) === normalize(activity.sentence)
      onAnswer(text, similarity)
    }
    recognition.start()
  }

  // Navegador sem suporte ou permissão negada
  if (!supported || permissionDenied) {
    return (
      <div className="space-y-4 text-center">
        <div className="p-4 rounded-xl" style={{ background: 'rgba(249,115,22,0.1)', border: '1px solid rgba(249,115,22,0.3)' }}>
          <p className="text-orange-400 font-mono text-sm mb-1">
            {!supported ? '⚠️ Speech recognition not supported in this browser.' : '⚠️ Microphone access denied.'}
          </p>
          <p className="text-gray-400 text-xs">Use Chrome or Edge for voice exercises.</p>
        </div>
        <button onClick={onSkip}
          style={{ color: theme.color, border: `1px solid ${theme.border}`, background: `${theme.color}18` }}
          className="px-6 py-2 rounded-lg font-mono transition-all hover:brightness-125">
          Skip → Next Question
        </button>
      </div>
    )
  }

  return (
    <div className="space-y-5">
      {/* Frase para pronunciar */}
      <div className="p-5 rounded-xl text-center" style={{ background: 'rgba(0,0,0,0.2)', border: `1px solid ${theme.border}` }}>
        <p className="text-gray-400 text-xs font-mono mb-3 uppercase tracking-wider">Read this sentence aloud:</p>
        <p className="text-white text-2xl font-bold mb-4" style={{ lineHeight: 1.4 }}>
          "{activity.sentence}"
        </p>
        <button onClick={speakSentence}
          className="flex items-center gap-2 mx-auto text-xs font-mono px-3 py-1.5 rounded-lg transition-all hover:brightness-125"
          style={{ color: theme.color, background: `${theme.color}15`, border: `1px solid ${theme.border}` }}>
          <FaVolumeUp size={12} /> Listen to pronunciation
        </button>
      </div>

      {/* Transcrição */}
      {transcript && (
        <div className="p-3 rounded-lg" style={{ background: 'rgba(255,255,255,0.04)', border: `1px solid ${theme.border}` }}>
          <p className="text-gray-400 text-xs font-mono mb-1">You said:</p>
          <p className="text-white">"{transcript}"</p>
        </div>
      )}

      {/* Botão de microfone */}
      <button
        onClick={startListening}
        disabled={isListening}
        className="w-full py-5 rounded-xl flex items-center justify-center gap-3 font-cyber font-bold text-lg transition-all"
        style={isListening ? {
          background: 'rgba(239,68,68,0.15)',
          border: '2px solid rgba(239,68,68,0.6)',
          color: '#ef4444',
          boxShadow: '0 0 20px rgba(239,68,68,0.3)',
        } : {
          background: `${theme.color}18`,
          border: `2px solid ${theme.color}`,
          color: theme.color,
          boxShadow: `0 0 16px ${theme.glow}`,
        }}
      >
        <FaMicrophone className={isListening ? 'animate-pulse' : ''} size={20} />
        {isListening ? '🔴 Listening... Speak now!' : '🎤 Tap to Speak'}
      </button>

      {attempts > 0 && (
        <p className="text-center text-xs text-gray-500 font-mono">
          Attempt {attempts} — tap again to retry
        </p>
      )}
    </div>
  )
}

// ─── ACTIVITIES PRINCIPAL ────────────────────────────────────────────────────
const Activities = () => {
  const { lessonId } = useParams()
  const navigate     = useNavigate()
  const { user, profile, updateXP } = useAuth()

  const moduleId    = LESSON_MODULE_MAP[parseInt(lessonId)] || 1
  const theme       = MODULE_THEME[moduleId]
  const bannerImage = LESSON_IMAGES[parseInt(lessonId)] || LESSON_IMAGES[1]
  const nextLessonId = NEXT_LESSON_MAP[parseInt(lessonId)]
  const nextModuleId = nextLessonId ? LESSON_MODULE_MAP[nextLessonId] : null
  const isLastLesson = !nextLessonId

  const searchParams = new URLSearchParams(window.location.search)
  const mode = searchParams.get('mode')

  const [currentIndex, setCurrentIndex]         = useState(0)
  const [answers, setAnswers]                   = useState({})
  const [userAnswers, setUserAnswers]           = useState({})
  const [showFeedback, setShowFeedback]         = useState(false)
  const [feedbackType, setFeedbackType]         = useState(null)
  const [feedbackMsg, setFeedbackMsg]           = useState('')
  const [score, setScore]                       = useState(0)
  const [activitiesCompleted, setActivitiesCompleted] = useState(false)
  const [loading, setLoading]                   = useState(true)
  const [activities, setActivities]             = useState([])
  const [previousAnswers, setPreviousAnswers]   = useState(null)
  const [previousScore, setPreviousScore]       = useState(0)

  const activityInstructions = {
    multiple_choice: { title: '📝 Multiple Choice',   description: 'Choose the correct option.',          tip: 'Think about the grammar rules you learned.' },
    fill_blank:      { title: '✏️ Fill in the Blank',  description: 'Type the missing word.',              tip: 'Think about verb conjugation or vocabulary.' },
    drag_drop:       { title: '🖱️ Drag & Drop',        description: 'Drag the words to the correct blanks.', tip: 'Read the whole sentence first.' },
    word_order:      { title: '🔤 Word Order',         description: 'Put the words in the correct order.', tip: 'Think about English sentence structure.' },
    voice_practice:  { title: '🎤 Voice Practice',     description: 'Read the sentence aloud clearly.',    tip: 'Speak slowly and clearly. Tap "Listen" first if needed.' },
  }

  useEffect(() => {
    if (user && lessonId) { loadActivities(); checkExistingProgress() }
    else if (!user) setLoading(false)
  }, [lessonId, user, mode])

  const loadActivities = () => {
    const lessonExercises = getExercisesByLesson(parseInt(lessonId))
    setActivities(lessonExercises.exercises || [])
    setLoading(false)
  }

  const checkExistingProgress = async () => {
    if (!user) return
    try {
      const { data, error } = await supabase
        .from('user_progress').select('completed, score, answers')
        .eq('user_id', user.id).eq('lesson_id', parseInt(lessonId)).maybeSingle()
      if (error) throw error
      if (data) {
        setPreviousScore(data.score || 0)
        setPreviousAnswers(data.answers || null)
        if (mode === 'results') {
          setScore(data.score || 0); setUserAnswers(data.answers || {}); setActivitiesCompleted(true)
        }
      }
    } catch (e) { console.error(e) }
  }

  const saveProgress = async (finalScore, finalAnswers) => {
    if (!user) return false
    try {
      const { error } = await supabase.from('user_progress').upsert({
        user_id: user.id, lesson_id: parseInt(lessonId),
        completed: true, score: finalScore, answers: finalAnswers || {},
        completed_at: new Date().toISOString(), updated_at: new Date().toISOString(),
      })
      if (error) throw error
      if (!previousAnswers && finalScore > 0) {
        const newXP = (profile?.xp || 0) + finalScore
        const newLevel = Math.floor(newXP / 100) + 1
        await supabase.from('profiles').update({ xp: newXP, level: newLevel }).eq('id', user.id)
        if (updateXP) updateXP(newXP)
      }
      return true
    } catch (e) { console.error(e); toast.error('Error saving progress'); return false }
  }

  // Avança para a próxima questão
  const goNext = (newAnswers, newScore) => {
    setTimeout(() => {
      setShowFeedback(false)
      if (currentIndex < activities.length - 1) setCurrentIndex(currentIndex + 1)
      else finishActivities(newScore, newAnswers)
    }, 2000)
  }

  // Handler central para todos os tipos
  const handleAnswer = (answer, forceCorrect = null) => {
    const activity = activities[currentIndex]
    let isCorrect = false

    if (forceCorrect !== null) {
      // voice_practice — usa o resultado de similaridade
      isCorrect = forceCorrect
    } else if (activity.type === 'multiple_choice') {
      isCorrect = answer === activity.correct
    } else if (activity.type === 'fill_blank') {
      isCorrect = answer.toLowerCase().trim() === activity.correct.toLowerCase()
    } else if (activity.type === 'drag_drop') {
      // answer é a string formada pelos slots
      const normalize = s => s.toLowerCase().replace(/\s+/g, ' ').trim()
      isCorrect = normalize(answer) === normalize(activity.correct)
    } else if (activity.type === 'word_order') {
      const normalize = s => s.toLowerCase().replace(/[^a-z0-9\s]/g, '').replace(/\s+/g, ' ').trim()
      isCorrect = normalize(answer) === normalize(activity.correct)
    }

    const newScore   = isCorrect ? score + 10 : score
    const newAnswers = { ...answers, [activity.id]: { answer, isCorrect, correctAnswer: activity.correct } }
    setAnswers(newAnswers)
    setFeedbackType(isCorrect)
    setFeedbackMsg(isCorrect ? 'Correct! Well done! 🎉' : `Answer: "${activity.correct}" — ${activity.explanation || ''}`)
    setShowFeedback(true)
    if (isCorrect) setScore(newScore)
    if (isCorrect) toast.success('✅ Correct! +10 XP')
    else           toast.error('❌ Not quite right!')
    goNext(newAnswers, newScore)
  }

  // Skip para voice_practice sem suporte
  const handleSkip = () => {
    const activity  = activities[currentIndex]
    const newAnswers = { ...answers, [activity.id]: { answer: 'skipped', isCorrect: true, correctAnswer: activity.sentence } }
    setAnswers(newAnswers)
    toast('⏭️ Question skipped', { icon: '⏭️', duration: 2000 })
    setTimeout(() => {
      if (currentIndex < activities.length - 1) setCurrentIndex(currentIndex + 1)
      else finishActivities(score, newAnswers)
    }, 500)
  }

  const finishActivities = async (finalScore, finalAnswers) => {
    const saved = await saveProgress(finalScore, finalAnswers)
    if (saved) {
      setActivitiesCompleted(true)
      if (!previousAnswers) toast.success(`🎉 Completed! You earned ${finalScore} XP!`)
      else                   toast.success(`📝 Review saved! Score: ${finalScore} XP`)
    } else setActivitiesCompleted(true)
  }

  const handleRetake = () => {
    if (!window.confirm('Retake activities? XP already earned is kept.')) return
    setCurrentIndex(0); setAnswers({}); setScore(0)
    setShowFeedback(false); setActivitiesCompleted(false)
    navigate(`/activities/${lessonId}`)
  }

  // ── Banner ───────────────────────────────────────────────────────────────
  const renderBanner = (subtitle = 'Complete all exercises to earn XP') => (
    <motion.div initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl overflow-hidden mb-8 h-36"
      style={{ boxShadow: `0 0 28px ${theme.glow}` }}>
      <img src={bannerImage} alt="Activities" className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.25) saturate(0.8)' }} />
      <div className="absolute inset-0" style={{ background: `linear-gradient(135deg, ${theme.color}20 0%, transparent 70%)` }} />
      <div className="absolute inset-0 rounded-2xl" style={{ border: `1px solid ${theme.border}` }} />
      <div className="absolute inset-0 flex flex-col justify-center px-8">
        <Link to={`/lesson/${lessonId}`}
          className="flex items-center gap-2 text-xs font-mono mb-2 w-fit px-3 py-1 rounded-lg"
          style={{ color: theme.color, background: `${theme.color}18`, border: `1px solid ${theme.border}` }}>
          <FaArrowLeft size={10} /> Back to Lesson
        </Link>
        <h2 className="text-2xl font-cyber font-bold" style={{ color: theme.color, textShadow: `0 0 14px ${theme.glow}` }}>
          🎯 Activities
        </h2>
        <p className="text-gray-400 text-sm">{subtitle}</p>
      </div>
    </motion.div>
  )

  // ── Renderiza questão atual ──────────────────────────────────────────────
  const renderActivity = () => {
    const activity = activities[currentIndex]
    if (!activity) return <div className="text-center py-12"><p className="text-gray-400">No exercises available.</p></div>
    const instructions = activityInstructions[activity.type]

    const instructionBox = (
      <div className="rounded-lg p-3 mb-4" style={{ background: theme.bg, border: `1px solid ${theme.border}` }}>
        <div className="flex items-center gap-2 mb-1" style={{ color: theme.color }}>
          <FaInfoCircle size={14} />
          <span className="text-sm font-mono font-bold">{instructions?.title}</span>
        </div>
        <p className="text-gray-400 text-sm">{instructions?.description}</p>
        <div className="flex items-center gap-2 mt-2 text-yellow-500 text-xs">
          <FaLightbulb size={12} />
          <span>{activity.hint || instructions?.tip}</span>
        </div>
      </div>
    )

    if (activity.type === 'multiple_choice') {
      return (
        <div className="space-y-4">
          {instructionBox}
          <p className="text-xl text-white mb-6">{activity.question}</p>
          <div className="grid gap-3">
            {activity.options.map((opt, i) => (
              <button key={i} onClick={() => handleAnswer(opt)}
                className="p-4 bg-dark-200 border border-neon-cyan/30 rounded-lg hover:border-neon-cyan transition-all text-left text-white">
                {opt}
              </button>
            ))}
          </div>
        </div>
      )
    }

    if (activity.type === 'fill_blank') {
      const parts = activity.question.split('____')
      return (
        <div className="space-y-4">
          {instructionBox}
          <p className="text-xl text-white mb-6">
            {parts[0]}
            <input type="text" id="fillAnswer"
              className="mx-2 px-3 py-1 bg-dark-300 rounded-lg focus:outline-none text-center"
              style={{ border: `1px solid ${theme.border}`, color: theme.color }}
              placeholder="______"
              onKeyPress={e => { if (e.key === 'Enter') { const v = document.getElementById('fillAnswer')?.value; if (v?.trim()) handleAnswer(v) } }} />
            {parts[1]}
          </p>
          <div className="flex justify-center">
            <button onClick={() => { const v = document.getElementById('fillAnswer')?.value; if (!v?.trim()) { toast.error('Type your answer!'); return } handleAnswer(v) }}
              style={{ color: theme.color, border: `1px solid ${theme.border}`, background: `${theme.color}18` }}
              className="px-8 py-3 rounded-lg font-mono hover:brightness-125 transition-all">
              Check Answer
            </button>
          </div>
        </div>
      )
    }

    if (activity.type === 'drag_drop') {
      return (
        <div className="space-y-4">
          {instructionBox}
          <DragDropActivity key={activity.id} activity={activity} theme={theme} onAnswer={handleAnswer} />
        </div>
      )
    }

    if (activity.type === 'word_order') {
      return (
        <div className="space-y-4">
          {instructionBox}
          {activity.question && <p className="text-gray-400 text-sm mb-2">💬 <em>{activity.question}</em></p>}
          <WordOrderActivity key={activity.id} activity={activity} theme={theme} onAnswer={handleAnswer} />
        </div>
      )
    }

    if (activity.type === 'voice_practice') {
      return (
        <div className="space-y-4">
          {instructionBox}
          <VoicePracticeActivity key={activity.id} activity={activity} theme={theme} onAnswer={handleAnswer} onSkip={handleSkip} />
        </div>
      )
    }

    return null
  }

  // ── Gabarito (modo results) ──────────────────────────────────────────────
  const renderResults = () => {
    const answersToShow = mode === 'results' ? userAnswers : answers
    const scoreToShow   = mode === 'results' ? previousScore : score
    const total = activities.length * 10
    return (
      <div className="space-y-6">
        <div className="rounded-lg p-4" style={{ background: theme.bg, border: `1px solid ${theme.border}` }}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-cyber font-bold" style={{ color: theme.color }}>📊 Results Summary</h3>
            <div><span className="text-2xl font-bold" style={{ color: theme.color }}>{scoreToShow}</span><span className="text-gray-400"> / {total} XP</span></div>
          </div>
          <div className="h-2 bg-dark-300 rounded-full overflow-hidden mb-3">
            <div className="h-full rounded-full" style={{ width: `${(scoreToShow/total)*100}%`, background: `linear-gradient(90deg, ${theme.muted}, ${theme.color})` }} />
          </div>
          <p className="text-gray-400 text-sm">
            {scoreToShow === total ? '🎉 Perfect!' : scoreToShow >= total*0.7 ? '👍 Good job!' : '📚 Keep practicing!'}
          </p>
        </div>
        <div className="space-y-4">
          <h3 className="text-lg font-cyber font-bold text-white">📝 Detailed Answers</h3>
          {activities.map(activity => {
            const ua = answersToShow[activity.id]
            const isVoice = activity.type === 'voice_practice'
            return (
              <div key={activity.id} className="glass-card p-4"
                style={{ borderColor: ua?.isCorrect ? 'rgba(34,197,94,0.5)' : 'rgba(239,68,68,0.5)' }}>
                <div className="flex items-start gap-3">
                  <div className={`mt-1 ${ua?.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                    {ua?.isCorrect ? <FaCheck size={18} /> : <FaTimes size={18} />}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-mono px-2 py-0.5 rounded" style={{ background: theme.bg, color: theme.color }}>
                        {activityInstructions[activity.type]?.title || activity.type}
                      </span>
                    </div>
                    <p className="text-white font-medium mb-2">{activity.question || activity.sentence}</p>
                    {!isVoice && (
                      <div className="grid grid-cols-2 gap-2 text-sm">
                        <div><span className="text-gray-400">Your answer:</span><p className={ua?.isCorrect ? 'text-green-500' : 'text-red-500'}>{ua?.answer || 'Not answered'}</p></div>
                        <div><span className="text-gray-400">Correct answer:</span><p style={{ color: theme.color }}>{activity.correct}</p></div>
                      </div>
                    )}
                    {isVoice && <p className="text-gray-400 text-sm">🎤 You said: "{ua?.answer || '—'}"</p>}
                    {!ua?.isCorrect && activity.explanation && (
                      <p className="text-xs text-gray-400 mt-2 pt-2" style={{ borderTop: `1px solid ${theme.border}` }}>
                        💡 {activity.explanation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>
        <div className="flex gap-4 justify-center pt-4 flex-wrap">
          <Link to={`/module/${moduleId}`}><button className="cyber-button flex items-center gap-2"><FaArrowLeft /> Back to Module</button></Link>
          <button onClick={handleRetake} className="px-6 py-3 bg-yellow-500/20 border border-yellow-500 text-yellow-500 rounded-lg hover:bg-yellow-500/30 flex items-center gap-2">
            <FaRedoAlt /> Retake
          </button>
        </div>
      </div>
    )
  }

  // ── Guards ───────────────────────────────────────────────────────────────
  if (mode === 'results') {
    if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="text-neon-cyan text-xl">Loading...</div></div>
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {renderBanner('Review your answers')}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="rounded-xl p-8"
          style={{ background: theme.bg, border: `1px solid ${theme.border}`, boxShadow: `0 0 20px ${theme.glow}` }}>
          {renderResults()}
        </motion.div>
      </div>
    )
  }

  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="text-neon-cyan text-xl">Loading...</div></div>

  // ── Tela de conclusão ────────────────────────────────────────────────────
  if (activitiesCompleted) {
    const nextTheme = nextModuleId ? MODULE_THEME[nextModuleId] : null
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <motion.div initial={{ scale:0 }} animate={{ scale:1 }}
          className="rounded-xl p-10 text-center max-w-lg w-full"
          style={{ background: theme.bg, border: `1px solid ${theme.border}`, boxShadow: `0 0 40px ${theme.glow}` }}>
          <FaTrophy className="text-6xl text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Activities Completed! 🎉</h2>
          <p className="text-gray-400 mb-1">Score: <span style={{ color: theme.color }} className="font-bold text-xl">{score} XP</span></p>
          <p className="text-gray-500 text-sm mb-8">
            {score === activities.length*10 ? '🌟 Perfect score!' : score >= activities.length*7 ? '👍 Great job!' : '📚 Review and try again!'}
          </p>
          <div className="space-y-3">
            {isLastLesson ? (
              <>
                <div className="py-3 px-4 rounded-xl mb-2" style={{ background:'rgba(255,215,0,0.08)', border:'1px solid rgba(255,215,0,0.3)' }}>
                  <p className="text-yellow-400 font-cyber font-bold text-lg">🎓 Course Completed!</p>
                  <p className="text-gray-400 text-sm mt-1">You've mastered English from A1 to B2!</p>
                </div>
                <Link to="/certificate" className="block">
                  <button className="w-full py-4 rounded-xl font-cyber font-bold text-lg flex items-center justify-center gap-3 hover:brightness-110 transition-all"
                    style={{ background:'linear-gradient(135deg, #0077b6, #0ff, #b0f)', boxShadow:'0 0 24px rgba(0,255,255,0.5)', color:'#05070f' }}>
                    <FaMedal size={20} /> 🎓 Get My Certificate!
                  </button>
                </Link>
              </>
            ) : (
              <Link to={`/lesson/${nextLessonId}`} className="block">
                <button style={{ color: nextTheme?.color||theme.color, border:`2px solid ${nextTheme?.color||theme.color}`, background:`${nextTheme?.color||theme.color}18`, boxShadow:`0 0 16px ${nextTheme?.glow||theme.glow}` }}
                  className="w-full py-4 rounded-xl font-cyber font-bold text-lg flex items-center justify-center gap-3 hover:brightness-125 transition-all">
                  <FaArrowRight /> Next Lesson →
                </button>
              </Link>
            )}
            <div className="flex gap-3 justify-center flex-wrap pt-2">
              <Link to="/dashboard"><button className="cyber-button text-sm px-4 py-2">Dashboard</button></Link>
              <Link to={`/module/${moduleId}`}><button style={{ color:theme.color, border:`1px solid ${theme.border}`, background:`${theme.color}18` }} className="text-sm px-4 py-2 rounded-lg font-mono hover:brightness-125 transition-all">Module</button></Link>
              <button onClick={handleRetake} className="text-sm px-4 py-2 bg-yellow-500/20 border border-yellow-500 text-yellow-500 rounded-lg flex items-center gap-2 hover:bg-yellow-500/30">
                <FaRedoAlt size={12} /> Retake
              </button>
            </div>
          </div>
        </motion.div>
      </div>
    )
  }

  if (activities.length === 0) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="glass-card p-12 text-center">
        <h2 className="text-2xl text-white mb-4">No activities found</h2>
        <Link to="/dashboard"><button className="cyber-button">Back to Dashboard</button></Link>
      </div>
    </div>
  )

  // ── Tela principal ───────────────────────────────────────────────────────
  const currentActivity = activities[currentIndex]
  const instructions    = activityInstructions[currentActivity?.type]

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {renderBanner()}
        <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} className="rounded-xl p-8"
          style={{ background: theme.bg, border:`1px solid ${theme.border}`, boxShadow:`0 0 24px ${theme.glow}` }}>

          <div className="mb-6 pb-4" style={{ borderBottom:`1px solid ${theme.border}` }}>
            <h2 className="text-xl font-cyber font-bold mb-1" style={{ color: theme.color }}>{instructions?.title || 'Activity'}</h2>
            <p className="text-gray-400 text-sm">{instructions?.description}</p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Activity {currentIndex+1} of {activities.length}</span>
              <span style={{ color: theme.color }}>Score: {score} XP</span>
            </div>
            <div className="h-2 bg-dark-300 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-300"
                style={{ width:`${(currentIndex/activities.length)*100}%`, background:`linear-gradient(90deg, ${theme.muted}, ${theme.color})` }} />
            </div>
          </div>

          <div className="min-h-[350px]">{renderActivity()}</div>

          <AnimatePresence>
            {showFeedback && (
              <motion.div initial={{ opacity:0, y:20 }} animate={{ opacity:1, y:0 }} exit={{ opacity:0 }}
                className={`mt-6 p-4 rounded-lg text-center ${feedbackType ? 'bg-green-500/20 border border-green-500' : 'bg-red-500/20 border border-red-500'}`}>
                <div className={`flex items-center justify-center gap-2 ${feedbackType ? 'text-green-500' : 'text-red-500'}`}>
                  {feedbackType ? <FaCheck /> : <FaTimes />}
                  <span>{feedbackMsg}</span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </div>
  )
}

export default Activities
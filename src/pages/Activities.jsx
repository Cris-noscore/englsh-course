import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCheck, FaTimes, FaTrophy, FaInfoCircle, FaLightbulb, FaArrowLeft, FaArrowRight, FaRedoAlt, FaMedal } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { supabase } from '../services/supabase'
import { useAuth } from '../contexts/AuthContext'
import { getExercisesByLesson } from '../utils/exercisesData'

// ─── TEMAS POR MÓDULO ────────────────────────────────────────────────────────
const MODULE_THEME = {
  1: { color: '#00b4d8', glow: 'rgba(0,180,216,0.25)',   border: 'rgba(0,180,216,0.30)',   bg: 'rgba(0,180,216,0.07)',   muted: '#0077b6' },
  2: { color: '#f5c400', glow: 'rgba(245,196,0,0.22)',   border: 'rgba(245,196,0,0.28)',   bg: 'rgba(245,196,0,0.07)',   muted: '#b38e00' },
  3: { color: '#22c55e', glow: 'rgba(34,197,94,0.22)',   border: 'rgba(34,197,94,0.28)',   bg: 'rgba(34,197,94,0.07)',   muted: '#15803d' },
  4: { color: '#f97316', glow: 'rgba(249,115,22,0.22)',  border: 'rgba(249,115,22,0.28)',  bg: 'rgba(249,115,22,0.07)',  muted: '#c2410c' },
  5: { color: '#a855f7', glow: 'rgba(168,85,247,0.22)',  border: 'rgba(168,85,247,0.28)',  bg: 'rgba(168,85,247,0.07)',  muted: '#7e22ce' },
  6: { color: '#94a3b8', glow: 'rgba(148,163,184,0.18)', border: 'rgba(148,163,184,0.25)', bg: 'rgba(148,163,184,0.07)', muted: '#64748b' },
}

const LESSON_MODULE_MAP = { 1: 1, 2: 2, 3: 3, 4: 4, 5: 4, 6: 5, 7: 5, 8: 5, 9: 6 }
const NEXT_LESSON_MAP   = { 1: 2, 2: 3, 3: 4, 4: 5, 5: 6, 6: 7, 7: 8, 8: 9, 9: null }

const LESSON_IMAGES = {
  1: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1200&q=80',
  2: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&q=80',
  3: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
  4: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1200&q=80',
  5: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1200&q=80',
  6: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
  7: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
  8: 'https://images.unsplash.com/photo-1462556791646-c201b8241a94?w=1200&q=80',
  9: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
}

const Activities = () => {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const { user, profile, updateXP } = useAuth()

  const moduleId    = LESSON_MODULE_MAP[parseInt(lessonId)] || 1
  const theme       = MODULE_THEME[moduleId]
  const bannerImage = LESSON_IMAGES[parseInt(lessonId)] || LESSON_IMAGES[1]
  const nextLessonId  = NEXT_LESSON_MAP[parseInt(lessonId)]
  const nextModuleId  = nextLessonId ? LESSON_MODULE_MAP[nextLessonId] : null
  const isLastLesson  = !nextLessonId   // lesson 9

  const searchParams = new URLSearchParams(window.location.search)
  const mode = searchParams.get('mode')

  const [currentIndex, setCurrentIndex]         = useState(0)
  const [answers, setAnswers]                   = useState({})
  const [userAnswers, setUserAnswers]           = useState({})
  const [showFeedback, setShowFeedback]         = useState(false)
  const [feedbackType, setFeedbackType]         = useState(null)
  const [score, setScore]                       = useState(0)
  const [activitiesCompleted, setActivitiesCompleted] = useState(false)
  const [loading, setLoading]                   = useState(true)
  const [activities, setActivities]             = useState([])
  const [previousAnswers, setPreviousAnswers]   = useState(null)
  const [previousScore, setPreviousScore]       = useState(0)

  const activityInstructions = {
    multiple_choice: {
      title: '📝 Multiple Choice',
      description: 'Choose the correct option to complete the sentence.',
      tip: 'Read the sentence carefully and think about the grammar rules you learned.',
    },
    fill_blank: {
      title: '✏️ Fill in the Blank',
      description: 'Type the missing word in the blank space.',
      tip: 'Think about verb conjugation, prepositions, or vocabulary from the lesson.',
    },
  }

  useEffect(() => {
    if (user && lessonId) {
      loadActivities()
      checkExistingProgress()
    } else if (!user) {
      setLoading(false)
    }
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
        .from('user_progress')
        .select('completed, score, answers')
        .eq('user_id', user.id)
        .eq('lesson_id', parseInt(lessonId))
        .maybeSingle()
      if (error) throw error
      if (data) {
        setPreviousScore(data.score || 0)
        setPreviousAnswers(data.answers || null)
        if (mode === 'results') {
          setScore(data.score || 0)
          setUserAnswers(data.answers || {})
          setActivitiesCompleted(true)
        }
      }
    } catch (error) {
      console.error('Error checking progress:', error)
    }
  }

  const saveProgress = async (finalScore, finalAnswers) => {
    if (!user) return false
    try {
      const { error: progressError } = await supabase
        .from('user_progress')
        .upsert({
          user_id: user.id,
          lesson_id: parseInt(lessonId),
          completed: true,
          score: finalScore,
          answers: finalAnswers || {},
          completed_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        })
      if (progressError) throw progressError

      const isFirstTime = !previousAnswers
      if (isFirstTime && finalScore > 0) {
        const newXP    = (profile?.xp || 0) + finalScore
        const newLevel = Math.floor(newXP / 100) + 1
        const { error: profileError } = await supabase
          .from('profiles')
          .update({ xp: newXP, level: newLevel })
          .eq('id', user.id)
        if (profileError) throw profileError
        if (updateXP) updateXP(newXP)
      }
      return true
    } catch (error) {
      console.error('Error saving progress:', error)
      toast.error('Error saving progress')
      return false
    }
  }

  const handleAnswer = async (answer) => {
    if (activities.length === 0 || mode === 'results') return
    const currentActivity = activities[currentIndex]
    let isCorrect = false

    if (currentActivity.type === 'multiple_choice') {
      isCorrect = answer === currentActivity.correct
    } else if (currentActivity.type === 'fill_blank') {
      isCorrect = answer.toLowerCase().trim() === currentActivity.correct.toLowerCase()
    }

    const newAnswers = {
      ...answers,
      [currentActivity.id]: { answer, isCorrect, correctAnswer: currentActivity.correct },
    }
    setAnswers(newAnswers)
    setFeedbackType(isCorrect)
    setShowFeedback(true)

    const newScore = isCorrect ? score + 10 : score
    if (isCorrect) { setScore(newScore); toast.success('✅ Correct! +10 XP') }
    else            toast.error(`❌ Incorrect! ${currentActivity.explanation}`)

    setTimeout(() => {
      setShowFeedback(false)
      if (currentIndex < activities.length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else {
        finishActivities(newScore, newAnswers)
      }
    }, 2000)
  }

  const finishActivities = async (finalScore, finalAnswers) => {
    const saved = await saveProgress(finalScore, finalAnswers)
    if (saved) {
      setActivitiesCompleted(true)
      if (!previousAnswers) toast.success(`🎉 Activities completed! You earned ${finalScore} XP!`)
      else                   toast.success(`📝 Review saved! Score: ${finalScore} XP`)
    } else {
      setActivitiesCompleted(true)
    }
  }

  const handleRetake = () => {
    const ok = window.confirm(
      'Do you want to retake these activities?\n\n' +
      '⚠️ This will reset your current answers.\n' +
      '⚠️ You will NOT earn XP again.\n\n' +
      'This is just for practice and review.'
    )
    if (!ok) return
    setCurrentIndex(0); setAnswers({}); setScore(0)
    setShowFeedback(false); setActivitiesCompleted(false)
    toast.success('🔄 Retake mode!', { icon: '🔄', duration: 3000 })
    navigate(`/activities/${lessonId}`)
  }

  // ── Banner ───────────────────────────────────────────────────────────────
  const renderBanner = (subtitle = 'Complete all exercises to earn XP') => (
    <motion.div
      initial={{ opacity: 0, y: -16 }} animate={{ opacity: 1, y: 0 }}
      className="relative rounded-2xl overflow-hidden mb-8 h-36"
      style={{ boxShadow: `0 0 28px ${theme.glow}` }}
    >
      <img src={bannerImage} alt="Activities"
        className="absolute inset-0 w-full h-full object-cover"
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

  // ── Gabarito ─────────────────────────────────────────────────────────────
  const renderResults = () => {
    const answersToShow = mode === 'results' ? userAnswers : answers
    const scoreToShow   = mode === 'results' ? previousScore : score
    const total = activities.length * 10
    return (
      <div className="space-y-6">
        <div className="rounded-lg p-4" style={{ background: theme.bg, border: `1px solid ${theme.border}` }}>
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-cyber font-bold" style={{ color: theme.color }}>📊 Results Summary</h3>
            <div className="text-right">
              <span className="text-2xl font-bold" style={{ color: theme.color }}>{scoreToShow}</span>
              <span className="text-gray-400"> / {total} XP</span>
            </div>
          </div>
          <div className="h-2 bg-dark-300 rounded-full overflow-hidden mb-3">
            <div className="h-full rounded-full"
              style={{ width: `${(scoreToShow / total) * 100}%`, background: `linear-gradient(90deg, ${theme.muted}, ${theme.color})` }} />
          </div>
          <p className="text-gray-400 text-sm">
            {scoreToShow === total ? '🎉 Perfect score! Excellent work!'
              : scoreToShow >= total * 0.7 ? '👍 Good job! Keep practicing!'
              : '📚 Review the lesson and try again!'}
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-cyber font-bold text-white">📝 Detailed Answers</h3>
          {activities.map((activity) => {
            const ua = answersToShow[activity.id]
            return (
              <div key={activity.id} className="glass-card p-4"
                style={{ borderColor: ua?.isCorrect ? 'rgba(34,197,94,0.5)' : 'rgba(239,68,68,0.5)' }}>
                <div className="flex items-start gap-3">
                  <div className={`mt-1 ${ua?.isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                    {ua?.isCorrect ? <FaCheck size={18} /> : <FaTimes size={18} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium mb-2">{activity.question}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-400">Your answer:</span>
                        <p className={ua?.isCorrect ? 'text-green-500' : 'text-red-500'}>{ua?.answer || 'Not answered'}</p>
                      </div>
                      <div>
                        <span className="text-gray-400">Correct answer:</span>
                        <p style={{ color: theme.color }}>{activity.correct}</p>
                      </div>
                    </div>
                    {!ua?.isCorrect && (
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
          <Link to={`/module/${moduleId}`}>
            <button className="cyber-button flex items-center gap-2"><FaArrowLeft /> Back to Module</button>
          </Link>
          <button onClick={handleRetake}
            className="px-6 py-3 bg-yellow-500/20 border border-yellow-500 text-yellow-500 rounded-lg hover:bg-yellow-500/30 transition-all flex items-center gap-2">
            <FaRedoAlt /> Retake Activities
          </button>
        </div>
      </div>
    )
  }

  // ── Questão atual ────────────────────────────────────────────────────────
  const renderActivity = () => {
    if (activities.length === 0 || !activities[currentIndex]) {
      return <div className="text-center py-12"><p className="text-gray-400">No exercises available yet.</p></div>
    }
    const activity = activities[currentIndex]
    const instructions = activityInstructions[activity.type]
    const instructionBox = (
      <div className="rounded-lg p-3 mb-4" style={{ background: theme.bg, border: `1px solid ${theme.border}` }}>
        <div className="flex items-center gap-2 mb-1" style={{ color: theme.color }}>
          <FaInfoCircle size={14} />
          <span className="text-sm font-mono">{instructions.title}</span>
        </div>
        <p className="text-gray-400 text-sm">{instructions.description}</p>
        <div className="flex items-center gap-2 mt-2 text-yellow-500 text-xs">
          <FaLightbulb size={12} />
          <span>{activity.hint || instructions.tip}</span>
        </div>
      </div>
    )

    if (activity.type === 'multiple_choice') {
      return (
        <div className="space-y-4">
          {instructionBox}
          <p className="text-xl text-white mb-6">{activity.question}</p>
          <div className="grid gap-3">
            {activity.options.map((option, idx) => (
              <button key={idx} onClick={() => handleAnswer(option)}
                className="p-4 bg-dark-200 border border-neon-cyan/30 rounded-lg hover:border-neon-cyan hover:shadow-neon transition-all text-left text-white">
                {option}
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
              onKeyPress={(e) => {
                if (e.key === 'Enter') {
                  const inp = document.getElementById('fillAnswer')
                  if (inp?.value.trim()) handleAnswer(inp.value)
                }
              }} />
            {parts[1]}
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => {
                const inp = document.getElementById('fillAnswer')
                if (!inp?.value.trim()) { toast.error('Please type your answer first!'); return }
                handleAnswer(inp.value)
              }}
              style={{ color: theme.color, border: `1px solid ${theme.border}`, background: `${theme.color}18` }}
              className="px-8 py-3 rounded-lg font-mono transition-all hover:brightness-125"
            >
              Check Answer
            </button>
          </div>
        </div>
      )
    }
    return null
  }

  // ── Modo resultados ───────────────────────────────────────────────────────
  if (mode === 'results') {
    if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="text-neon-cyan text-xl">Loading results...</div></div>
    return (
      <div className="container mx-auto px-4 py-8 max-w-3xl">
        {renderBanner('Review your answers and see what you got right')}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-8"
          style={{ background: theme.bg, border: `1px solid ${theme.border}`, boxShadow: `0 0 20px ${theme.glow}` }}>
          {renderResults()}
        </motion.div>
      </div>
    )
  }

  if (loading) return <div className="flex items-center justify-center min-h-screen"><div className="text-neon-cyan text-xl">Loading activities...</div></div>

  // ── Tela de conclusão ─────────────────────────────────────────────────────
  if (activitiesCompleted) {
    const nextTheme = nextModuleId ? MODULE_THEME[nextModuleId] : null

    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ scale: 0 }} animate={{ scale: 1 }}
          className="rounded-xl p-10 text-center max-w-lg w-full"
          style={{ background: theme.bg, border: `1px solid ${theme.border}`, boxShadow: `0 0 40px ${theme.glow}` }}
        >
          <FaTrophy className="text-6xl text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Activities Completed! 🎉</h2>
          <p className="text-gray-400 mb-1">
            Score: <span style={{ color: theme.color }} className="font-bold text-xl">{score} XP</span>
          </p>
          <p className="text-gray-500 text-sm mb-8">
            {score === activities.length * 10 ? '🌟 Perfect score!'
              : score >= activities.length * 7 ? '👍 Great job!'
              : '📚 Review the lesson and try again!'}
          </p>

          <div className="space-y-3">
            {/* ── ÚLTIMA AULA: botão certificado ── */}
            {isLastLesson ? (
              <>
                {/* Mensagem de parabéns */}
                <div className="py-3 px-4 rounded-xl mb-2"
                  style={{ background: 'rgba(255,215,0,0.08)', border: '1px solid rgba(255,215,0,0.3)' }}>
                  <p className="text-yellow-400 font-cyber font-bold text-lg">🎓 Course Completed!</p>
                  <p className="text-gray-400 text-sm mt-1">You've mastered English from A1 to B2!</p>
                </div>

                {/* Botão certificado — destaque máximo */}
                <Link to="/certificate" className="block">
                  <button
                    className="w-full py-4 rounded-xl font-cyber font-bold text-lg flex items-center justify-center gap-3 transition-all hover:brightness-110"
                    style={{
                      background: 'linear-gradient(135deg, #0077b6, #0ff, #b0f)',
                      boxShadow: '0 0 24px rgba(0,255,255,0.5)',
                      color: '#05070f',
                    }}
                  >
                    <FaMedal size={20} /> 🎓 Get My Certificate!
                  </button>
                </Link>
              </>
            ) : (
              /* ── DEMAIS AULAS: botão próxima aula ── */
              <Link to={`/lesson/${nextLessonId}`} className="block">
                <button
                  style={{
                    color: nextTheme?.color || theme.color,
                    border: `2px solid ${nextTheme?.color || theme.color}`,
                    background: `${nextTheme?.color || theme.color}18`,
                    boxShadow: `0 0 16px ${nextTheme?.glow || theme.glow}`,
                  }}
                  className="w-full py-4 rounded-xl font-cyber font-bold text-lg flex items-center justify-center gap-3 transition-all hover:brightness-125"
                >
                  <FaArrowRight /> Next Lesson →
                </button>
              </Link>
            )}

            {/* Botões secundários */}
            <div className="flex gap-3 justify-center flex-wrap pt-2">
              <Link to="/dashboard">
                <button className="cyber-button text-sm px-4 py-2">Dashboard</button>
              </Link>
              <Link to={`/module/${moduleId}`}>
                <button
                  style={{ color: theme.color, border: `1px solid ${theme.border}`, background: `${theme.color}18` }}
                  className="text-sm px-4 py-2 rounded-lg transition-all hover:brightness-125 font-mono"
                >
                  Module
                </button>
              </Link>
              <button onClick={handleRetake}
                className="text-sm px-4 py-2 bg-yellow-500/20 border border-yellow-500 text-yellow-500 rounded-lg transition-all flex items-center gap-2 hover:bg-yellow-500/30">
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
        <p className="text-gray-400 mb-6">Exercises for this lesson are being prepared.</p>
        <Link to="/dashboard"><button className="cyber-button">Back to Dashboard</button></Link>
      </div>
    </div>
  )

  // ── Tela principal das atividades ─────────────────────────────────────────
  const currentActivity = activities[currentIndex]
  const instructions    = activityInstructions[currentActivity?.type]

  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto">
        {renderBanner()}
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
          className="rounded-xl p-8"
          style={{ background: theme.bg, border: `1px solid ${theme.border}`, boxShadow: `0 0 24px ${theme.glow}` }}>

          <div className="mb-6 pb-4" style={{ borderBottom: `1px solid ${theme.border}` }}>
            <h2 className="text-xl font-cyber font-bold mb-1" style={{ color: theme.color }}>
              {instructions?.title || 'Activity'}
            </h2>
            <p className="text-gray-400 text-sm">{instructions?.description || 'Complete the exercise below'}</p>
          </div>

          <div className="mb-8">
            <div className="flex justify-between text-sm text-gray-400 mb-2">
              <span>Activity {currentIndex + 1} of {activities.length}</span>
              <span style={{ color: theme.color }}>Score: {score} XP</span>
            </div>
            <div className="h-2 bg-dark-300 rounded-full overflow-hidden">
              <div className="h-full rounded-full transition-all duration-300"
                style={{ width: `${(currentIndex / activities.length) * 100}%`, background: `linear-gradient(90deg, ${theme.muted}, ${theme.color})` }} />
            </div>
          </div>

          <div className="min-h-[350px]">{renderActivity()}</div>

          {showFeedback && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}
              className={`mt-6 p-4 rounded-lg text-center ${feedbackType ? 'bg-green-500/20 border border-green-500' : 'bg-red-500/20 border border-red-500'}`}>
              {feedbackType
                ? <div className="text-green-500 flex items-center justify-center gap-2"><FaCheck /> Correct! Well done!</div>
                : <div className="text-red-500 flex items-center justify-center gap-2"><FaTimes /> Incorrect! Check the hint above.</div>}
            </motion.div>
          )}
        </motion.div>
      </div>
    </div>
  )
}

export default Activities
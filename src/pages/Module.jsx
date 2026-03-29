import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../services/supabase'
import { useAuth } from '../contexts/AuthContext'
import { getModuleById } from '../utils/courseData'
import { FaPlay, FaCheckCircle, FaLock, FaYoutube, FaBookOpen, FaChartLine, FaRedoAlt, FaArrowLeft } from 'react-icons/fa'
import toast from 'react-hot-toast'

// ─── TEMAS E IMAGENS POR MÓDULO ──────────────────────────────────────────────
const MODULE_THEME = {
  1: { color: '#00b4d8', glow: 'rgba(0,180,216,0.25)',   border: 'rgba(0,180,216,0.30)',   bg: 'rgba(0,180,216,0.07)',   muted: '#0077b6' },
  2: { color: '#f5c400', glow: 'rgba(245,196,0,0.22)',   border: 'rgba(245,196,0,0.28)',   bg: 'rgba(245,196,0,0.07)',   muted: '#b38e00' },
  3: { color: '#22c55e', glow: 'rgba(34,197,94,0.22)',   border: 'rgba(34,197,94,0.28)',   bg: 'rgba(34,197,94,0.07)',   muted: '#15803d' },
  4: { color: '#f97316', glow: 'rgba(249,115,22,0.22)',  border: 'rgba(249,115,22,0.28)',  bg: 'rgba(249,115,22,0.07)',  muted: '#c2410c' },
  5: { color: '#a855f7', glow: 'rgba(168,85,247,0.22)',  border: 'rgba(168,85,247,0.28)',  bg: 'rgba(168,85,247,0.07)',  muted: '#7e22ce' },
  6: { color: '#94a3b8', glow: 'rgba(148,163,184,0.18)', border: 'rgba(148,163,184,0.25)', bg: 'rgba(148,163,184,0.07)', muted: '#64748b' },
}

const MODULE_IMAGES = {
  1: 'https://images.unsplash.com/photo-1546410531-bb4caa6b424d?w=1200&q=80',
  2: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?w=1200&q=80',
  3: 'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1200&q=80',
  4: 'https://images.unsplash.com/photo-1532012197267-da84d127e765?w=1200&q=80',
  5: 'https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80',
  6: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=1200&q=80',
}

const Module = () => {
  const { moduleId } = useParams()
  const { user } = useAuth()
  const module = getModuleById(parseInt(moduleId))
  const [completedLessons, setCompletedLessons] = useState([])
  const [lessonScores, setLessonScores] = useState({})
  const [loading, setLoading] = useState(true)

  const theme = MODULE_THEME[parseInt(moduleId)] || MODULE_THEME[1]
  const heroImage = MODULE_IMAGES[parseInt(moduleId)] || MODULE_IMAGES[1]

  useEffect(() => {
    if (user && module) {
      loadProgress()
    } else {
      setLoading(false)
    }
  }, [user, module])

  const loadProgress = async () => {
    try {
      const lessonIds = module.lessons.map(l => l.id)
      const { data, error } = await supabase
        .from('user_progress')
        .select('lesson_id, completed, score')
        .eq('user_id', user.id)
        .in('lesson_id', lessonIds)

      if (error) throw error

      const completed = data.filter(p => p.completed).map(p => p.lesson_id)
      const scores = {}
      data.forEach(p => { if (p.score) scores[p.lesson_id] = p.score })

      setCompletedLessons(completed)
      setLessonScores(scores)
    } catch (error) {
      console.error('Error loading progress:', error)
    } finally {
      setLoading(false)
    }
  }

  const isLessonUnlocked = (index) => {
    if (index === 0) return true
    const previousLesson = module.lessons[index - 1]
    return completedLessons.includes(previousLesson.id)
  }

  const handleResetLesson = async (lessonId) => {
    if (!user) return
    const confirmed = window.confirm(
      'Do you want to retake this lesson?\n\n' +
      '⚠️ This will reset your progress and you can do the activities again.\n' +
      '⚠️ You will NOT earn XP again (already earned XP remains).\n\n' +
      'This is just for practice and review.'
    )
    if (!confirmed) return

    try {
      const { error } = await supabase
        .from('user_progress')
        .update({ completed: false, updated_at: new Date().toISOString() })
        .eq('user_id', user.id)
        .eq('lesson_id', lessonId)

      if (error) throw error
      setCompletedLessons(prev => prev.filter(id => id !== lessonId))
      toast.success('Lesson reset! You can now retake the activities.', { icon: '🔄', duration: 4000 })
    } catch (error) {
      console.error('Error resetting lesson:', error)
      toast.error('Error resetting lesson')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-neon-cyan text-xl">Loading module...</div>
      </div>
    )
  }

  if (!module) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-white">Module not found</h2>
        <Link to="/dashboard" className="text-neon-cyan mt-4 inline-block">Back to Dashboard</Link>
      </div>
    )
  }

  const totalLessons = module.lessons.length
  const completedCount = completedLessons.length
  const moduleProgress = Math.round((completedCount / totalLessons) * 100)

  return (
    <div className="container mx-auto px-4 py-8">

      {/* ── Hero Banner do Módulo ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl overflow-hidden mb-10 h-64"
        style={{ boxShadow: `0 0 40px ${theme.glow}` }}
      >
        {/* Imagem de fundo */}
        <img
          src={heroImage}
          alt={module.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.3) saturate(0.9)' }}
        />
        {/* Overlay gradiente com cor do tema */}
        <div
          className="absolute inset-0"
          style={{
            background: `linear-gradient(135deg, ${theme.color}25 0%, rgba(0,0,0,0) 60%, ${theme.muted}20 100%)`,
          }}
        />
        {/* Borda temática */}
        <div
          className="absolute inset-0 rounded-2xl"
          style={{ border: `1px solid ${theme.border}` }}
        />

        {/* Conteúdo sobre o banner */}
        <div className="absolute inset-0 flex flex-col justify-center items-center text-center px-8">
          {/* Botão voltar */}
          <Link
            to="/dashboard"
            className="absolute top-4 left-4 flex items-center gap-2 text-sm font-mono px-3 py-1.5 rounded-lg transition-all"
            style={{ color: theme.color, background: `${theme.color}18`, border: `1px solid ${theme.border}` }}
          >
            <FaArrowLeft size={12} /> Dashboard
          </Link>

          <div
            className="text-6xl mb-3"
            style={{ filter: `drop-shadow(0 0 12px ${theme.color})` }}
          >
            {module.icon}
          </div>
          <h1
            className="text-3xl md:text-4xl font-cyber font-bold mb-2"
            style={{ color: theme.color, textShadow: `0 0 20px ${theme.glow}` }}
          >
            {module.title}
          </h1>
          <p className="text-gray-300 max-w-xl text-sm mb-3">{module.description}</p>

          {/* Badge de nível */}
          <span
            className="text-xs font-mono px-3 py-1 rounded-full"
            style={{ color: theme.color, background: `${theme.color}22`, border: `1px solid ${theme.border}` }}
          >
            Level: {module.level}
          </span>
        </div>
      </motion.div>

      {/* ── Barra de Progresso do Módulo ── */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.15 }}
        className="max-w-3xl mx-auto mb-8 rounded-xl p-4"
        style={{ background: theme.bg, border: `1px solid ${theme.border}` }}
      >
        <div className="flex justify-between text-sm mb-2" style={{ color: theme.color }}>
          <span className="font-mono">Module Progress</span>
          <span className="font-mono">{completedCount} / {totalLessons} lessons · {moduleProgress}%</span>
        </div>
        <div className="h-2 bg-dark-300 rounded-full overflow-hidden">
          <div
            className="h-full rounded-full transition-all duration-700"
            style={{
              width: `${moduleProgress}%`,
              background: `linear-gradient(90deg, ${theme.muted}, ${theme.color})`,
            }}
          />
        </div>
      </motion.div>

      {/* ── Lista de Aulas ── */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-cyber font-bold mb-6 text-white">Lessons</h2>
        <div className="space-y-4">
          {module.lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id)
            const isUnlocked = isLessonUnlocked(index)
            const score = lessonScores[lesson.id]

            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                style={isCompleted ? {
                  background: theme.bg,
                  border: `1px solid ${theme.border}`,
                  boxShadow: `0 0 12px ${theme.glow}`,
                } : {}}
                className={`glass-card p-6 transition-all rounded-xl ${!isCompleted ? '' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    {/* Ícone de estado */}
                    <div className="text-2xl">
                      {isCompleted ? (
                        <FaCheckCircle style={{ color: theme.color }} />
                      ) : !isUnlocked ? (
                        <FaLock className="text-gray-500" />
                      ) : (
                        <span className="font-bold font-cyber" style={{ color: theme.color }}>
                          {index + 1}
                        </span>
                      )}
                    </div>

                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white">{lesson.title}</h3>
                      <div className="flex items-center gap-2 mt-1 flex-wrap">
                        <FaYoutube className="text-red-500 text-sm" />
                        <span className="text-xs text-gray-400">Video lesson</span>
                        {isCompleted && score !== undefined && (
                          <span className="text-xs font-mono ml-2" style={{ color: theme.color }}>
                            Score: {score} XP
                          </span>
                        )}
                        {isCompleted && (
                          <span className="text-xs text-green-500 ml-2 flex items-center gap-1">
                            <FaCheckCircle size={10} /> Completed
                          </span>
                        )}
                      </div>
                    </div>
                  </div>

                  {/* Botões */}
                  <div className="flex items-center gap-2 flex-wrap justify-end">
                    {isCompleted && (
                      <button
                        onClick={() => handleResetLesson(lesson.id)}
                        className="px-3 py-2 bg-yellow-500/20 border border-yellow-500 text-yellow-500 rounded-lg text-sm hover:bg-yellow-500/30 transition-all flex items-center gap-1"
                        title="Retake lesson (practice only, no XP)"
                      >
                        <FaRedoAlt size={12} />
                        <span className="hidden sm:inline">Retake</span>
                      </button>
                    )}

                    {!isUnlocked ? (
                      <button className="bg-dark-200 text-gray-500 px-4 py-2 rounded-lg text-sm flex items-center gap-2 cursor-not-allowed">
                        <FaLock /> Locked
                      </button>
                    ) : isCompleted ? (
                      <div className="flex items-center gap-2">
                        <Link to={`/lesson/${lesson.id}`}>
                          <button
                            style={{ color: theme.color, border: `1px solid ${theme.border}`, background: `${theme.color}18` }}
                            className="px-4 py-2 rounded-lg text-sm transition-all flex items-center gap-2 hover:brightness-125"
                          >
                            <FaBookOpen /> Review Lesson
                          </button>
                        </Link>
                        <Link to={`/activities/${lesson.id}?mode=results`}>
                          <button className="px-4 py-2 bg-neon-pink/20 border border-neon-pink text-neon-pink rounded-lg text-sm hover:bg-neon-pink/30 transition-all flex items-center gap-2">
                            <FaChartLine /> View Results
                          </button>
                        </Link>
                      </div>
                    ) : (
                      <Link to={`/lesson/${lesson.id}`}>
                        <button
                          style={{ color: theme.color, border: `1px solid ${theme.border}`, background: `${theme.color}18` }}
                          className="text-sm px-4 py-2 rounded-lg flex items-center gap-2 font-mono transition-all hover:brightness-125"
                        >
                          <FaPlay /> Start
                        </button>
                      </Link>
                    )}
                  </div>
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </div>
  )
}

export default Module
import React, { useState, useEffect, useRef, useCallback } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getLessonById } from '../utils/courseData'
import { supabase } from '../services/supabase'
import { useAuth } from '../contexts/AuthContext'
import { FaCheck, FaArrowRight, FaYoutube, FaExternalLinkAlt, FaBookOpen, FaPlay, FaArrowLeft } from 'react-icons/fa'
import toast from 'react-hot-toast'

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

// ==================== VÍDEOS POR AULA ====================
const videosByLesson = {
  1: [
    { id: 1, title: "Alfabeto em inglês", url: "https://youtu.be/X5TdMsc4YCg" },
    { id: 2, title: "Verbo To Be", url: "https://youtu.be/zTWQJi_-tzQ" },
    { id: 3, title: "Pronomes em inglês", url: "https://youtu.be/8BP294xRmqo" },
    { id: 4, title: "Números em inglês", url: "https://youtu.be/TuNUCGYFohw" },
    { id: 5, title: "Artigos (a/an)", url: "https://youtu.be/e4ZSHQFlxNI" },
    { id: 6, title: "WH-Questions", url: "https://youtu.be/D6tRJt3bqrU" }
  ],
  2: [
    { id: 1, title: "Como conjugar qualquer verbo", url: "https://youtu.be/SknYjWljXn0" },
    { id: 2, title: "Advérbios de frequência", url: "https://youtu.be/StM8BsJ7Wu4" },
    { id: 3, title: "Horas em inglês", url: "https://youtu.be/TpJVd9ZZVcg" },
    { id: 4, title: "Preposições de tempo", url: "https://youtu.be/XFS1CiBq95c" }
  ],
  3: [
    { id: 1, title: "Móveis e eletrodomésticos", url: "https://youtu.be/_40hfa_X96E" },
    { id: 2, title: "Direções em inglês", url: "https://youtu.be/uoh0lW1m5B0" },
    { id: 3, title: "Gerúndio (ing)", url: "https://youtu.be/q35PWSrzKH0" },
    { id: 4, title: "Comparativos em inglês", url: "https://youtu.be/wKBdmIH248A" },
    { id: 5, title: "Preposições de local", url: "https://youtu.be/S0-v8FUEVlM" }
  ],
  4: [
    { id: 1, title: "Simple Past (Passado Simples)", url: "https://youtu.be/VRqweGlV4IM" },
    { id: 2, title: "Was / Were", url: "https://youtu.be/tjPo1amkkxI" }
  ],
  5: [
    { id: 1, title: "Modal Verbs", url: "https://youtu.be/h5HHhm-n5LQ" },
    { id: 2, title: "Must (Obrigação)", url: "https://youtu.be/1ZZ0j_KNKSo" }
  ],
  6: [
    { id: 1, title: "Will x Going to", url: "https://youtu.be/-v31oGtr5aM" },
    { id: 2, title: "Present Perfect", url: "https://youtu.be/fl7OsfTD_Oc" }
  ],
  7: [
    { id: 1, title: "Ordem das palavras em perguntas", url: "https://youtu.be/ZJk5buM6neY" },
    { id: 2, title: "Frases negativas", url: "https://youtu.be/nZPLrqsH570" }
  ],
  8: [
    { id: 1, title: "Ordem das palavras em perguntas", url: "https://youtu.be/ZJk5buM6neY" },
    { id: 2, title: "Frases negativas", url: "https://youtu.be/nZPLrqsH570" }
  ],
  9: [
    { id: 1, title: "Phrasal Verbs", url: "https://youtu.be/ZrQz8r_d7dg" },
    { id: 2, title: "Verbo To Get", url: "https://youtu.be/_D3gc08W4Yo" },
    { id: 3, title: "Make x Do", url: "https://youtu.be/7Z5iwo-_ldM" },
    { id: 4, title: "UK x US", url: "https://youtu.be/JJOLUdsD1Ms" }
  ]
}

const Lesson = () => {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const { user, profile } = useAuth()
  const lesson = getLessonById(parseInt(lessonId))
  const videos = videosByLesson[parseInt(lessonId)] || []

  const moduleId = LESSON_MODULE_MAP[parseInt(lessonId)] || 1
  const theme = MODULE_THEME[moduleId]
  const bannerImage = LESSON_IMAGES[parseInt(lessonId)] || LESSON_IMAGES[1]

  const [videoWatched, setVideoWatched] = useState([])
  const [contentRead, setContentRead] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [progressId, setProgressId] = useState(null)
  const [contentScrolledToEnd, setContentScrolledToEnd] = useState(false)

  const contentRef = useRef(null)

  // ─── Função central de verificação do scroll ─────────────────────────────
  const checkIfScrolledToEnd = useCallback(() => {
    const el = contentRef.current
    if (!el) return false
    const { scrollTop, scrollHeight, clientHeight } = el
    // Margem generosa de 100px — garante que funciona em telas diferentes
    const reached = scrollHeight - scrollTop - clientHeight <= 100
    return reached
  }, [])

  // ─── Registra listener no scroll interno DA DIV ───────────────────────────
  useEffect(() => {
    // Pequeno delay para garantir que o DOM renderizou o conteúdo completo
    const timer = setTimeout(() => {
      const el = contentRef.current
      if (!el) return

      const onScroll = () => {
        if (checkIfScrolledToEnd()) {
          setContentScrolledToEnd(true)
          // Remove o listener após detectar — não precisa mais checar
          el.removeEventListener('scroll', onScroll)
        }
      }

      // Checa imediatamente (conteúdo pode já estar visível por inteiro)
      if (checkIfScrolledToEnd()) {
        setContentScrolledToEnd(true)
        return
      }

      el.addEventListener('scroll', onScroll, { passive: true })
      // Cleanup
      return () => el.removeEventListener('scroll', onScroll)
    }, 300)

    return () => clearTimeout(timer)
  }, [lesson, loading, checkIfScrolledToEnd])

  useEffect(() => {
    if (user && lesson) {
      checkProgress()
    } else {
      setLoading(false)
    }
  }, [user, lesson])

  const checkProgress = async () => {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('id, completed, video_watched, content_read')
        .eq('user_id', user.id)
        .eq('lesson_id', parseInt(lessonId))
        .maybeSingle()

      if (error) throw error

      if (data) {
        setProgressId(data.id)
        setCompleted(data.completed || false)
        setContentRead(data.content_read || false)

        // Se já estava marcado como lido no banco, libera direto
        if (data.content_read) setContentScrolledToEnd(true)

        let watchedArray = []
        if (data.video_watched) {
          if (Array.isArray(data.video_watched)) {
            watchedArray = data.video_watched
          } else if (typeof data.video_watched === 'object') {
            watchedArray = Object.values(data.video_watched)
          }
        }
        setVideoWatched(watchedArray.map(id => Number(id)))
      }
    } catch (error) {
      console.error('Error checking progress:', error)
    } finally {
      setLoading(false)
    }
  }

  const updateProgress = async (updates) => {
    if (!user) return false
    try {
      let result
      if (progressId) {
        const { data, error } = await supabase
          .from('user_progress')
          .update({ ...updates, updated_at: new Date().toISOString() })
          .eq('id', progressId)
          .select()
        if (error) throw error
        result = { data, error }
      } else {
        const { data, error } = await supabase
          .from('user_progress')
          .insert({
            user_id: user.id,
            lesson_id: parseInt(lessonId),
            ...updates,
            updated_at: new Date().toISOString()
          })
          .select()
        if (error) throw error
        result = { data, error }
        if (result.data?.[0]) setProgressId(result.data[0].id)
      }
      if (result.error) throw result.error
      return true
    } catch (error) {
      console.error('Error updating progress:', error)
      toast.error('Error saving progress')
      return false
    }
  }

  const toggleVideoWatched = async (videoId) => {
    const newWatched = videoWatched.includes(videoId)
      ? videoWatched.filter(id => id !== videoId)
      : [...videoWatched, videoId]
    setVideoWatched(newWatched)
    const success = await updateProgress({ video_watched: newWatched })
    if (success) {
      const allWatchedNow = videos.every(v => newWatched.includes(v.id))
      if (allWatchedNow) {
        toast.success(`🎉 Todos os ${videos.length} vídeos assistidos! Agora leia o conteúdo.`)
      } else {
        toast(`📹 ${newWatched.length}/${videos.length} vídeos assistidos`, { icon: '📹', duration: 2000 })
      }
    }
  }

  const markContentRead = async () => {
    if (!contentScrolledToEnd) {
      toast.error('📖 Role até o final do conteúdo primeiro!')
      return
    }
    const success = await updateProgress({ content_read: true })
    if (success) {
      setContentRead(true)
      toast.success('📖 Conteúdo marcado como lido!')
    }
  }

  // ─── Botão manual "já li tudo" — fallback para qualquer edge case ─────────
  const forceMarkRead = async () => {
    setContentScrolledToEnd(true)
    const success = await updateProgress({ content_read: true })
    if (success) {
      setContentRead(true)
      toast.success('📖 Conteúdo marcado como lido!')
    }
  }

  const completeLesson = async () => {
    const allVideosWatched = videos.every(v => videoWatched.includes(v.id))
    if (!allVideosWatched) {
      toast.error(`⚠️ Assista todos os ${videos.length} vídeos! Faltam ${videos.length - videoWatched.length}.`)
      return
    }
    if (!contentRead && !contentScrolledToEnd) {
      toast.error('📖 Leia todo o conteúdo primeiro!')
      return
    }
    if (!contentRead) await markContentRead()

    setTimeout(async () => {
      const success = await updateProgress({
        completed: true,
        completed_at: new Date().toISOString(),
        score: 50
      })
      if (success) {
        const newXP = (profile?.xp || 0) + 50
        const newLevel = Math.floor(newXP / 100) + 1
        await supabase.from('profiles').update({ xp: newXP, level: newLevel }).eq('id', user.id)
        setCompleted(true)
        toast.success('🎉 Aula concluída! +50 XP')
        navigate(`/activities/${lessonId}`)
      }
    }, 500)
  }

  const allVideosWatched = videos.every(v => videoWatched.includes(v.id))
  const videosProgress = videos.length > 0 ? Math.round((videoWatched.length / videos.length) * 100) : 100
  const contentProgress = contentRead || contentScrolledToEnd ? 100 : 0
  const isReadyForActivities = allVideosWatched && (contentRead || contentScrolledToEnd)

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-neon-cyan text-xl">Loading lesson...</div>
    </div>
  )

  if (!lesson) return (
    <div className="text-center py-20">
      <h2 className="text-2xl text-white">Lesson not found</h2>
      <Link to="/dashboard" className="text-neon-cyan mt-4 inline-block">Back to Dashboard</Link>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8">

      {/* ── Banner da Aula ── */}
      <motion.div
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative rounded-2xl overflow-hidden mb-8 h-44"
        style={{ boxShadow: `0 0 32px ${theme.glow}` }}
      >
        <img src={bannerImage} alt={lesson.title}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.28) saturate(0.9)' }} />
        <div className="absolute inset-0"
          style={{ background: `linear-gradient(135deg, ${theme.color}20 0%, transparent 60%)` }} />
        <div className="absolute inset-0 rounded-2xl" style={{ border: `1px solid ${theme.border}` }} />
        <div className="absolute inset-0 flex flex-col justify-center px-8">
          <Link to={`/module/${moduleId}`}
            className="flex items-center gap-2 text-xs font-mono mb-3 w-fit px-3 py-1.5 rounded-lg"
            style={{ color: theme.color, background: `${theme.color}18`, border: `1px solid ${theme.border}` }}>
            <FaArrowLeft size={10} /> Back to Module
          </Link>
          <h1 className="text-2xl md:text-3xl font-cyber font-bold mb-1"
            style={{ color: theme.color, textShadow: `0 0 16px ${theme.glow}` }}>
            📚 {lesson.title}
          </h1>
          <p className="text-gray-400 text-sm">Watch all videos and read the content to unlock activities</p>
        </div>
      </motion.div>

      {/* ── Layout principal ── */}
      <div className="grid lg:grid-cols-3 gap-8">

        {/* COLUNA ESQUERDA — LESSON CONTENT */}
        <div className="lg:col-span-2 flex flex-col">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="rounded-xl p-6 flex flex-col flex-1"
            style={{
              background: theme.bg,
              border: `1px solid ${theme.border}`,
              boxShadow: `0 0 20px ${theme.glow}`,
            }}
          >
            {/* Cabeçalho */}
            <div className="flex justify-between items-center mb-4 flex-shrink-0">
              <h2 className="text-xl font-cyber font-bold" style={{ color: theme.color }}>
                📚 Lesson Content
              </h2>
              {contentRead && (
                <div className="text-green-500 flex items-center gap-2 text-sm">
                  <FaCheck /> Read ✓
                </div>
              )}
            </div>

            {/* ── Área de scroll — altura fixa, overflow-y-auto ── */}
            <div
              ref={contentRef}
              className="custom-scrollbar"
              style={{
                overflowY: 'auto',
                height: '55vh',
                paddingRight: '12px',
              }}
            >
              <div className="text-gray-300 space-y-4 pb-6">
                {lesson.content.split('\n').map((paragraph, i) => {
                  if (!paragraph.trim()) return null
                  if (paragraph.includes('•')) {
                    return (
                      <div key={i} className="flex items-start gap-2">
                        <span className="mt-1 flex-shrink-0" style={{ color: theme.color }}>▹</span>
                        <p className="text-gray-300">{paragraph.replace('•', '').trim()}</p>
                      </div>
                    )
                  }
                  if (paragraph.includes('**')) {
                    return (
                      <h3 key={i} className="text-lg font-bold mt-4 mb-2" style={{ color: theme.color }}>
                        {paragraph.replace(/\*\*/g, '')}
                      </h3>
                    )
                  }
                  return <p key={i} className="text-gray-300 leading-relaxed">{paragraph}</p>
                })}
              </div>
            </div>

            {/* ── Botão de confirmação — FORA da área de scroll ── */}
            <div className="flex-shrink-0 mt-4 pt-4" style={{ borderTop: `1px solid ${theme.border}` }}>
              {contentRead ? (
                <div className="text-center text-green-500 py-3 flex items-center justify-center gap-2 font-mono">
                  <FaCheck /> Content marked as read!
                </div>
              ) : contentScrolledToEnd ? (
                <button
                  onClick={markContentRead}
                  style={{ border: `1px solid ${theme.border}`, color: theme.color, background: `${theme.color}18` }}
                  className="w-full py-3 rounded-lg transition-all flex items-center justify-center gap-2 font-mono hover:brightness-125"
                >
                  <FaBookOpen /> ✅ I HAVE READ THIS CONTENT
                </button>
              ) : (
                <div className="space-y-2">
                  <p className="text-center text-yellow-500 text-sm py-2 animate-pulse">
                    ↓ Scroll to the bottom of the content above to mark as read ↓
                  </p>
                  {/* Botão fallback caso o scroll automático não funcione */}
                  <button
                    onClick={forceMarkRead}
                    className="w-full py-2 rounded-lg text-xs font-mono text-gray-500 border border-gray-700 hover:border-gray-500 hover:text-gray-300 transition-all"
                  >
                    Already read everything? Click here
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        </div>

        {/* COLUNA DIREITA — VÍDEOS + PROGRESS */}
        <div className="lg:col-span-1 space-y-6">

          {/* Card vídeos */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="rounded-xl p-5"
            style={{ background: theme.bg, border: `1px solid ${theme.border}`, boxShadow: `0 0 16px ${theme.glow}` }}
          >
            <h3 className="text-lg font-cyber font-bold mb-4 flex items-center gap-2" style={{ color: theme.color }}>
              <FaYoutube className="text-red-500" /> VÍDEOS DA AULA
            </h3>
            {videos.length === 0 ? (
              <p className="text-gray-400 text-sm">Nenhum vídeo disponível.</p>
            ) : (
              <div className="space-y-3">
                {videos.map((video) => (
                  <div key={video.id} className="flex items-start gap-3 p-2 hover:bg-dark-300 rounded-lg transition-colors">
                    <input
                      type="checkbox"
                      checked={videoWatched.includes(video.id)}
                      onChange={() => toggleVideoWatched(video.id)}
                      className="mt-1 w-4 h-4"
                      style={{ accentColor: theme.color }}
                    />
                    <div className="flex-1">
                      <a href={video.url} target="_blank" rel="noopener noreferrer"
                        className="text-white hover:text-neon-cyan transition-colors text-sm font-medium flex items-center gap-1">
                        <FaPlay size={10} style={{ color: theme.color }} />
                        {video.title}
                        <FaExternalLinkAlt size={10} className="text-gray-500 ml-1" />
                      </a>
                      <p className="text-gray-500 text-xs mt-1">Abre em nova aba</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            <div className="mt-4 pt-3" style={{ borderTop: `1px solid ${theme.border}` }}>
              <div className="flex justify-between text-sm text-gray-400">
                <span>Progresso</span>
                <span>{videoWatched.length} / {videos.length} vídeos</span>
              </div>
              <div className="mt-2 h-1.5 bg-dark-300 rounded-full overflow-hidden">
                <div className="h-full rounded-full transition-all duration-300"
                  style={{ width: `${videosProgress}%`, background: `linear-gradient(90deg, ${theme.muted}, ${theme.color})` }} />
              </div>
            </div>
          </motion.div>

          {/* Card progresso */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="rounded-xl p-5"
            style={{ background: theme.bg, border: `1px solid ${theme.border}`, boxShadow: `0 0 16px ${theme.glow}` }}
          >
            <h3 className="text-lg font-cyber font-bold text-white mb-4">📊 Lesson Progress</h3>
            <div className="space-y-4">

              {/* Vídeos */}
              <div>
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span className="flex items-center gap-2"><FaYoutube className="text-red-500" /> Videos</span>
                  <span className={allVideosWatched ? 'text-green-500' : ''}>
                    {videoWatched.length}/{videos.length} {allVideosWatched ? '✓' : ''}
                  </span>
                </div>
                <div className="h-2 bg-dark-300 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${videosProgress}%`, background: `linear-gradient(90deg, ${theme.muted}, ${theme.color})` }} />
                </div>
              </div>

              {/* Conteúdo */}
              <div>
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span className="flex items-center gap-2"><FaBookOpen style={{ color: theme.color }} /> Content</span>
                  <span className={(contentRead || contentScrolledToEnd) ? 'text-green-500' : ''}>
                    {contentRead ? '100% ✓' : contentScrolledToEnd ? 'Confirm ↑' : '0%'}
                  </span>
                </div>
                <div className="h-2 bg-dark-300 rounded-full overflow-hidden">
                  <div className="h-full rounded-full transition-all duration-300"
                    style={{ width: `${contentProgress}%`, background: `linear-gradient(90deg, ${theme.muted}, ${theme.color})` }} />
                </div>
              </div>

              {/* Checklist de status */}
              <div className="rounded-lg p-3 text-xs space-y-2"
                style={{ background: 'rgba(0,0,0,0.25)', border: `1px solid ${theme.border}` }}>
                <div className={`flex items-center gap-2 ${allVideosWatched ? 'text-green-400' : 'text-gray-500'}`}>
                  {allVideosWatched ? '✅' : '⬜'} All videos watched
                </div>
                <div className={`flex items-center gap-2 ${contentScrolledToEnd ? 'text-green-400' : 'text-gray-500'}`}>
                  {contentScrolledToEnd ? '✅' : '⬜'} Content scrolled to the end
                </div>
                <div className={`flex items-center gap-2 ${contentRead ? 'text-green-400' : 'text-gray-500'}`}>
                  {contentRead ? '✅' : '⬜'} Content confirmed as read
                </div>
              </div>

              <div className="pt-1" style={{ borderTop: `1px solid ${theme.border}` }}>
                <div className="text-sm text-gray-400 mb-1">🏆 Rewards</div>
                <div className="text-sm" style={{ color: theme.color }}>+50 XP for completing lesson</div>
              </div>

              {!completed && (
                <button
                  onClick={completeLesson}
                  disabled={!isReadyForActivities}
                  style={isReadyForActivities ? {
                    color: theme.color,
                    border: `1px solid ${theme.border}`,
                    background: `${theme.color}18`,
                  } : {}}
                  className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 transition-all text-sm font-mono ${
                    isReadyForActivities
                      ? 'hover:brightness-125 cursor-pointer'
                      : 'bg-dark-200 text-gray-500 cursor-not-allowed border border-gray-700'
                  }`}
                >
                  <FaArrowRight />
                  {!allVideosWatched
                    ? `📹 Watch ${videos.length - videoWatched.length} more video(s)`
                    : !contentScrolledToEnd
                    ? '📖 Scroll to the end of the content'
                    : !contentRead
                    ? '📖 Click "I HAVE READ" above'
                    : '🎯 Complete & Start Activities'}
                </button>
              )}

              {completed && (
                <div className="text-center text-green-500 py-3 text-sm flex items-center justify-center gap-2">
                  <FaCheck /> Lesson completed!
                </div>
              )}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar { width: 6px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: #0f172a; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: ${theme.color}; border-radius: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover { background: ${theme.muted}; }
      `}</style>
    </div>
  )
}

export default Lesson
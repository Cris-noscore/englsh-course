import React, { useState, useEffect, useRef } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { getLessonById } from '../utils/courseData'
import { supabase } from '../services/supabase'
import { useAuth } from '../contexts/AuthContext'
import { FaCheck, FaArrowRight, FaYoutube, FaExternalLinkAlt, FaBookOpen, FaPlay } from 'react-icons/fa'
import toast from 'react-hot-toast'

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
  
  const [videoWatched, setVideoWatched] = useState([])
  const [contentRead, setContentRead] = useState(false)
  const [completed, setCompleted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [progressId, setProgressId] = useState(null)
  const [contentScrolledToEnd, setContentScrolledToEnd] = useState(false)
  const contentRef = useRef(null)

  useEffect(() => {
    if (user && lesson) {
      checkProgress()
    } else {
      setLoading(false)
    }
  }, [user, lesson])

  useEffect(() => {
    const contentElement = contentRef.current
    if (!contentElement) return

    const handleScroll = () => {
      const { scrollTop, scrollHeight, clientHeight } = contentElement
      const isAtBottom = scrollTop + clientHeight >= scrollHeight - 50
      setContentScrolledToEnd(isAtBottom)
    }

    contentElement.addEventListener('scroll', handleScroll)
    return () => contentElement.removeEventListener('scroll', handleScroll)
  }, [])

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
      
      let watchedArray = []
      if (data.video_watched) {
        if (Array.isArray(data.video_watched)) {
          watchedArray = data.video_watched
        } else if (typeof data.video_watched === 'object') {
          watchedArray = Object.values(data.video_watched)
        }
      }

      // ✅ CORREÇÃO CRÍTICA AQUI
      const normalized = watchedArray.map(id => Number(id))
      setVideoWatched(normalized)
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
          .update({
            ...updates,
            updated_at: new Date().toISOString()
          })
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
        
        if (result.data && result.data[0]) {
          setProgressId(result.data[0].id)
        }
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
    const total = videos.length
    const watched = newWatched.length

    const allWatchedNow = videos.every(video =>
      newWatched.includes(video.id)
    )

    if (allWatchedNow) {
      toast.success(`🎉 Todos os ${total} vídeos assistidos! Agora leia o conteúdo.`)
    } else {
      toast(`📹 Progresso: ${watched}/${total} vídeos assistidos`, {
        icon: '📹',
        duration: 2000
      })
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

  const completeLesson = async () => {
    const allVideosWatched = videos.every(video =>
  videoWatched.includes(video.id)
)
    
    console.log('Verificando conclusão:', {
      videosAssistidos: videoWatched.length,
      totalVideos: videos.length,
      todosAssistidos: allVideosWatched,
      conteudoLido: contentRead,
      conteudoRolado: contentScrolledToEnd
    })
    
    if (!allVideosWatched) {
      const faltam = videos.length - videoWatched.length
      toast.error(`⚠️ Você precisa assistir todos os ${videos.length} vídeos! Faltam ${faltam}.`)
      return
    }
    
    if (!contentRead && !contentScrolledToEnd) {
      toast.error('📖 Você precisa ler todo o conteúdo! Role até o final e clique em "I HAVE READ".')
      return
    }
    
    if (contentScrolledToEnd && !contentRead) {
      await markContentRead()
    }
    
    setTimeout(async () => {
      const success = await updateProgress({ 
        completed: true, 
        completed_at: new Date().toISOString(),
        score: 50
      })
      
      if (success) {
        const newXP = (profile?.xp || 0) + 50
        const newLevel = Math.floor(newXP / 100) + 1

        await supabase
          .from('profiles')
          .update({ xp: newXP, level: newLevel })
          .eq('id', user.id)
        
        setCompleted(true)
        toast.success('🎉 Aula concluída! +50 XP')
        navigate(`/activities/${lessonId}`)
      }
    }, 500)
  }

  const allVideosWatched = videos.every(video =>
  videoWatched.includes(video.id)
)
  const videosProgress = videos.length > 0 ? Math.round((videoWatched.length / videos.length) * 100) : 100
  const contentProgress = contentRead ? 100 : (contentScrolledToEnd ? 100 : 0)
  const isReadyForActivities = allVideosWatched && (contentRead || contentScrolledToEnd)

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-neon-cyan text-xl">Loading lesson...</div>
      </div>
    )
  }

  if (!lesson) {
    return (
      <div className="text-center py-20">
        <h2 className="text-2xl text-white">Lesson not found</h2>
        <Link to="/dashboard" className="text-neon-cyan mt-4 inline-block">Back to Dashboard</Link>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid lg:grid-cols-3 gap-8">
        
        {/* COLUNA ESQUERDA - LESSON CONTENT */}
        <div className="lg:col-span-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="glass-card p-6 h-full flex flex-col"
            style={{ minHeight: 'calc(100vh - 120px)' }}
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-cyber font-bold text-neon-cyan">
                📚 Lesson Content
              </h2>
              {contentRead && (
                <div className="text-green-500 flex items-center gap-2 text-sm">
                  <FaCheck /> Read
                </div>
              )}
            </div>
            
            <div 
              ref={contentRef}
              className="prose prose-invert max-w-none flex-1 overflow-y-auto pr-4 custom-scrollbar"
            >
              <div className="text-gray-300 space-y-4">
                {lesson.content.split('\n').map((paragraph, i) => {
                  if (!paragraph.trim()) return null
                  if (paragraph.includes('•')) {
                    return (
                      <div key={i} className="flex items-start gap-2">
                        <span className="text-neon-cyan mt-1">▹</span>
                        <p className="text-gray-300">{paragraph.replace('•', '').trim()}</p>
                      </div>
                    )
                  }
                  if (paragraph.includes('**')) {
                    return (
                      <h3 key={i} className="text-lg font-bold text-neon-cyan mt-4 mb-2">
                        {paragraph.replace(/\*\*/g, '')}
                      </h3>
                    )
                  }
                  return <p key={i} className="text-gray-300 leading-relaxed">{paragraph}</p>
                })}
              </div>
              
              <div className="mt-8 pt-4 border-t border-neon-cyan/30 sticky bottom-0 bg-dark-100/90 backdrop-blur-sm -mx-2 px-2 pb-2 rounded-b-lg">
                {!contentRead ? (
                  contentScrolledToEnd ? (
                    <button
                      onClick={markContentRead}
                      className="w-full py-3 bg-neon-cyan/20 border border-neon-cyan text-neon-cyan rounded-lg hover:bg-neon-cyan/30 hover:shadow-neon transition-all flex items-center justify-center gap-2 font-mono"
                    >
                      <FaBookOpen />
                      ✅ I HAVE READ THIS CONTENT
                    </button>
                  ) : (
                    <p className="text-center text-yellow-500 text-sm py-3">
                      ↓ Scroll to the bottom to mark as read ↓
                    </p>
                  )
                ) : (
                  <div className="text-center text-green-500 py-3 flex items-center justify-center gap-2">
                    <FaCheck />
                    Content marked as read!
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>

        {/* COLUNA DIREITA - VÍDEOS + PROGRESS */}
        <div className="lg:col-span-1 space-y-6">
          
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="glass-card p-5"
          >
            <h3 className="text-lg font-cyber font-bold text-neon-cyan mb-4 flex items-center gap-2">
              <FaYoutube className="text-red-500" /> VÍDEOS DA AULA
            </h3>
            
            {videos.length === 0 ? (
              <p className="text-gray-400 text-sm">Nenhum vídeo disponível para esta aula.</p>
            ) : (
              <div className="space-y-3">
                {videos.map((video) => (
                  <div key={video.id} className="flex items-start gap-3 p-2 hover:bg-dark-300 rounded-lg transition-colors">
                    <input
                      type="checkbox"
                      checked={videoWatched.includes(video.id)}
                      onChange={() => toggleVideoWatched(video.id)}
                      className="mt-1 w-4 h-4 accent-neon-cyan"
                    />
                    <div className="flex-1">
                      <a
                        href={video.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-neon-cyan transition-colors text-sm font-medium flex items-center gap-1"
                      >
                        <FaPlay size={10} className="text-neon-cyan" />
                        {video.title}
                        <FaExternalLinkAlt size={10} className="text-gray-500 ml-1" />
                      </a>
                      <p className="text-gray-500 text-xs mt-1">Abre em nova aba</p>
                    </div>
                  </div>
                ))}
              </div>
            )}
            
            <div className="mt-4 pt-3 border-t border-neon-cyan/30">
              <div className="flex justify-between text-sm text-gray-400">
                <span>Progresso</span>
                <span>{videoWatched.length} / {videos.length} vídeos</span>
              </div>
              <div className="mt-2 h-1.5 bg-dark-300 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-neon-cyan to-neon-pink rounded-full transition-all duration-300"
                  style={{ width: `${videosProgress}%` }}
                />
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="glass-card p-5"
          >
            <h3 className="text-lg font-cyber font-bold text-white mb-4">📊 Lesson Progress</h3>
            
            <div className="space-y-4">
              <div>
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span className="flex items-center gap-2"><FaYoutube className="text-red-500" /> Videos</span>
                  <span>{videoWatched.length}/{videos.length}</span>
                </div>
                <div className="h-2 bg-dark-300 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-neon-cyan to-neon-pink rounded-full transition-all duration-300" style={{ width: `${videosProgress}%` }} />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between text-sm text-gray-400 mb-1">
                  <span className="flex items-center gap-2"><FaBookOpen className="text-neon-cyan" /> Content</span>
                  <span>{contentProgress}%</span>
                </div>
                <div className="h-2 bg-dark-300 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-neon-cyan to-neon-pink rounded-full transition-all duration-300" style={{ width: `${contentProgress}%` }} />
                </div>
              </div>
              
              <div className="border-t border-neon-cyan/30 my-3 pt-3">
                <div className="text-sm text-gray-400 mb-2">🏆 Rewards</div>
                <div className="text-neon-cyan text-sm">+50 XP for completing lesson</div>
              </div>
              
              {!completed && (
                <button
                  onClick={completeLesson}
                  disabled={!isReadyForActivities}
                  className={`w-full py-3 rounded-lg flex items-center justify-center gap-2 transition-all text-sm ${
                    isReadyForActivities ? 'cyber-button' : 'bg-dark-200 text-gray-500 cursor-not-allowed'
                  }`}
                >
                  <FaArrowRight />
                  {!allVideosWatched && `📹 Assista ${videos.length - videoWatched.length} vídeo(s) restante(s)`}
                  {allVideosWatched && !contentRead && !contentScrolledToEnd && '📖 Leia o conteúdo primeiro'}
                  {allVideosWatched && (contentRead || contentScrolledToEnd) && '🎯 Complete & Start Activities'}
                </button>
              )}
              
              {completed && <div className="text-center text-green-500 py-3 text-sm">✓ Lesson completed!</div>}
            </div>
          </motion.div>
        </div>
      </div>

      <style>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 8px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: #0f172a;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #0ff;
          border-radius: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb:hover {
          background: #f0f;
        }
      `}</style>
    </div>
  )
}

export default Lesson
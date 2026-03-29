import React, { useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { supabase } from '../services/supabase'
import { useAuth } from '../contexts/AuthContext'
import { getModuleById } from '../utils/courseData'
import { FaPlay, FaCheckCircle, FaLock, FaYoutube, FaBookOpen, FaChartLine, FaRedoAlt } from 'react-icons/fa'
import toast from 'react-hot-toast'

const Module = () => {
  const { moduleId } = useParams()
  const { user } = useAuth()
  const module = getModuleById(parseInt(moduleId))
  const [completedLessons, setCompletedLessons] = useState([])
  const [lessonScores, setLessonScores] = useState({})
  const [loading, setLoading] = useState(true)

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
      data.forEach(p => {
        if (p.score) scores[p.lesson_id] = p.score
      })
      
      setCompletedLessons(completed)
      setLessonScores(scores)

    } catch (error) {
      console.error('Error loading progress:', error)
    } finally {
      setLoading(false)
    }
  }

  const isLessonUnlocked = (index, lessonId) => {
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
        .update({
          completed: false,
          updated_at: new Date().toISOString()
        })
        .eq('user_id', user.id)
        .eq('lesson_id', lessonId)
      
      if (error) throw error
      
      setCompletedLessons(prev => prev.filter(id => id !== lessonId))
      
      toast.success('Lesson reset! You can now retake the activities.', {
        icon: '🔄',
        duration: 4000
      })
      
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
        <Link to="/dashboard" className="text-neon-cyan mt-4 inline-block">
          Back to Dashboard
        </Link>
      </div>
    )
  }

  const totalLessons = module.lessons.length
  const completedCount = completedLessons.length
  const moduleProgress = Math.round((completedCount / totalLessons) * 100)

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Module Header */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-8 text-center"
      >
        <div className="text-6xl mb-4">{module.icon}</div>
        <h1 className="text-3xl md:text-4xl font-cyber font-bold text-neon-cyan mb-2">
          {module.title}
        </h1>
        <p className="text-gray-400 max-w-2xl mx-auto">{module.description}</p>
        <div className="inline-block mt-2 px-3 py-1 bg-dark-200 rounded-full text-sm text-neon-cyan">
          Level: {module.level}
        </div>
        
        {/* Module Progress Bar */}
        <div className="max-w-md mx-auto mt-4">
          <div className="flex justify-between text-xs text-gray-400 mb-1">
            <span>Module Progress</span>
            <span>{completedCount} / {totalLessons} lessons</span>
          </div>
          <div className="h-2 bg-dark-300 rounded-full overflow-hidden">
            <div 
              className="h-full bg-gradient-to-r from-neon-cyan to-neon-pink rounded-full transition-all duration-500"
              style={{ width: `${moduleProgress}%` }}
            />
          </div>
        </div>
      </motion.div>

      {/* Lessons List */}
      <div className="max-w-3xl mx-auto">
        <h2 className="text-2xl font-cyber font-bold mb-6 text-white">Lessons</h2>
        <div className="space-y-4">
          {module.lessons.map((lesson, index) => {
            const isCompleted = completedLessons.includes(lesson.id)
            const isUnlocked = isLessonUnlocked(index, lesson.id)
            const score = lessonScores[lesson.id]

            return (
              <motion.div
                key={lesson.id}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.1 }}
                className={`glass-card p-6 transition-all ${isCompleted ? 'border-neon-cyan' : ''}`}
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4 flex-1">
                    <div className="text-2xl">
                      {isCompleted ? (
                        <FaCheckCircle className="text-green-500" />
                      ) : !isUnlocked ? (
                        <FaLock className="text-gray-500" />
                      ) : (
                        <span className="text-neon-cyan font-bold">{index + 1}</span>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-bold text-white">{lesson.title}</h3>
                      <div className="flex items-center gap-2 mt-1">
                        <FaYoutube className="text-red-500 text-sm" />
                        <span className="text-xs text-gray-400">Video lesson</span>
                        {isCompleted && score !== undefined && (
                          <span className="text-xs text-neon-cyan ml-2">
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
                  
                  <div className="flex items-center gap-2">
                    {/* Botão Retake (só para aulas completas) */}
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
                    
                    {/* Botões principais */}
                    {!isUnlocked ? (
                      <button className="bg-dark-200 text-gray-500 px-4 py-2 rounded-lg text-sm flex items-center gap-2 cursor-not-allowed">
                        <FaLock /> Locked
                      </button>
                    ) : isCompleted ? (
                      <div className="flex items-center gap-2">
                        <Link to={`/lesson/${lesson.id}`}>
                          <button className="px-4 py-2 bg-neon-cyan/20 border border-neon-cyan text-neon-cyan rounded-lg text-sm hover:bg-neon-cyan/30 transition-all flex items-center gap-2">
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
                        <button className="cyber-button text-sm px-4 py-2 flex items-center gap-2">
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
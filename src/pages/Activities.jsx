import React, { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaCheck, FaTimes, FaTrophy, FaInfoCircle, FaLightbulb, FaArrowLeft, FaRedoAlt } from 'react-icons/fa'
import toast from 'react-hot-toast'
import { supabase } from '../services/supabase'
import { useAuth } from '../contexts/AuthContext'
import { getExercisesByLesson } from '../utils/exercisesData'

const Activities = () => {
  const { lessonId } = useParams()
  const navigate = useNavigate()
  const { user, profile, updateXP } = useAuth()
  
  // Detectar modo de visualização
  const searchParams = new URLSearchParams(window.location.search)
  const mode = searchParams.get('mode') // 'results' ou null
  
  const [currentIndex, setCurrentIndex] = useState(0)
  const [answers, setAnswers] = useState({})
  const [userAnswers, setUserAnswers] = useState({}) // Para modo results
  const [showFeedback, setShowFeedback] = useState(false)
  const [feedbackType, setFeedbackType] = useState(null)
  const [score, setScore] = useState(0)
  const [completed, setCompleted] = useState(false)
  const [loading, setLoading] = useState(true)
  const [activities, setActivities] = useState([])
  const [previousProgress, setPreviousProgress] = useState(null)

  // Instruções por tipo de atividade
  const activityInstructions = {
    multiple_choice: {
      title: "📝 Multiple Choice",
      description: "Choose the correct option to complete the sentence.",
      tip: "Read the sentence carefully and think about the grammar rules you learned."
    },
    fill_blank: {
      title: "✏️ Fill in the Blank",
      description: "Type the missing word in the blank space.",
      tip: "Think about verb conjugation, prepositions, or vocabulary from the lesson."
    }
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
    console.log('Lesson ID:', lessonId)
    console.log('Exercises loaded:', lessonExercises.exercises.length)
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
        setPreviousProgress(data)
        setCompleted(data.completed || false)
        setScore(data.score || 0)
        
        // Se for modo results, carregar as respostas salvas
        if (mode === 'results' && data.answers) {
          setUserAnswers(data.answers)
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
          updated_at: new Date().toISOString()
        })

      if (progressError) throw progressError

      // Buscar o progresso anterior para saber se já ganhou XP
      const { data: existingProgress } = await supabase
        .from('user_progress')
        .select('completed')
        .eq('user_id', user.id)
        .eq('lesson_id', parseInt(lessonId))
        .maybeSingle()

      // Só adiciona XP se for a primeira vez que completa
      if (!existingProgress?.completed) {
        const newXP = (profile?.xp || 0) + finalScore
        const newLevel = Math.floor(newXP / 100) + 1

        const { error: profileError } = await supabase
          .from('profiles')
          .update({ xp: newXP, level: newLevel })
          .eq('id', user.id)

        if (profileError) throw profileError

        if (updateXP) {
          updateXP(newXP)
        }
      }

      return true
    } catch (error) {
      console.error('Error saving progress:', error)
      toast.error('Error saving progress')
      return false
    }
  }

  const handleAnswer = async (answer) => {
    if (activities.length === 0) return
    if (mode === 'results') return // Não permite responder no modo results
    
    const currentActivity = activities[currentIndex]
    let isCorrect = false

    if (currentActivity.type === 'multiple_choice') {
      isCorrect = answer === currentActivity.correct
    } else if (currentActivity.type === 'fill_blank') {
      isCorrect = answer.toLowerCase().trim() === currentActivity.correct.toLowerCase()
    }

    const newAnswers = { ...answers, [currentActivity.id]: { answer, isCorrect, correctAnswer: currentActivity.correct } }
    setAnswers(newAnswers)
    setFeedbackType(isCorrect)
    setShowFeedback(true)

    if (isCorrect) {
      const newScore = score + 10
      setScore(newScore)
      toast.success(`✅ Correct! +10 XP`)
    } else {
      toast.error(`❌ Incorrect! ${currentActivity.explanation}`)
    }

    setTimeout(() => {
      setShowFeedback(false)
      if (currentIndex < activities.length - 1) {
        setCurrentIndex(currentIndex + 1)
      } else {
        const finalScore = isCorrect ? score + 10 : score
        finishActivities(finalScore, newAnswers)
      }
    }, 2000)
  }

  const finishActivities = async (finalScore, finalAnswers) => {
    const saved = await saveProgress(finalScore, finalAnswers)
    
    if (saved) {
      setCompleted(true)
      if (!previousProgress?.completed) {
        toast.success(`🎉 Activities completed! You earned ${finalScore} XP!`)
      } else {
        toast.success(`📝 Review saved! Your answers have been updated.`)
      }
    } else {
      setCompleted(true)
    }
  }

  const handleRetake = () => {
    const confirmRetake = window.confirm(
      'Do you want to retake these activities?\n\n' +
      '⚠️ This will reset your current answers.\n' +
      '⚠️ You will NOT earn XP again (already earned XP remains).\n\n' +
      'This is just for practice and review.'
    )
    
    if (!confirmRetake) return
    
    // Resetar estado local
    setCurrentIndex(0)
    setAnswers({})
    setScore(0)
    setShowFeedback(false)
    setCompleted(false)
    
    toast.success('🔄 Retake mode activated! Practice and improve your skills.', {
      icon: '🔄',
      duration: 4000
    })
    
    navigate(`/activities/${lessonId}`)
  }

  // Renderizar gabarito (modo results)
  const renderResults = () => {
    return (
      <div className="space-y-6">
        <div className="bg-dark-200/50 rounded-lg p-4 mb-4 border border-neon-cyan/20">
          <div className="flex items-center justify-between mb-2">
            <h3 className="text-lg font-cyber font-bold text-neon-cyan">📊 Results Summary</h3>
            <div className="text-right">
              <span className="text-2xl font-bold text-neon-cyan">{score}</span>
              <span className="text-gray-400"> / {activities.length * 10} XP</span>
            </div>
          </div>
          <div className="h-2 bg-dark-300 rounded-full overflow-hidden mb-3">
            <div 
              className="h-full bg-gradient-to-r from-neon-cyan to-neon-pink rounded-full"
              style={{ width: `${(score / (activities.length * 10)) * 100}%` }}
            />
          </div>
          <p className="text-gray-400 text-sm">
            {score === activities.length * 10 
              ? '🎉 Perfect score! Excellent work!' 
              : score >= activities.length * 7 
                ? '👍 Good job! Keep practicing!' 
                : '📚 Review the lesson and try again!'}
          </p>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-cyber font-bold text-white">📝 Detailed Answers</h3>
          {activities.map((activity, idx) => {
            const userAnswer = userAnswers[activity.id]
            const isCorrect = userAnswer?.isCorrect
            const userAnswerText = userAnswer?.answer || 'Not answered'
            
            return (
              <div key={activity.id} className={`glass-card p-4 ${isCorrect ? 'border-green-500/50' : 'border-red-500/50'}`}>
                <div className="flex items-start gap-3">
                  <div className={`mt-1 ${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                    {isCorrect ? <FaCheck size={18} /> : <FaTimes size={18} />}
                  </div>
                  <div className="flex-1">
                    <p className="text-white font-medium mb-2">{activity.question}</p>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="text-gray-400">Your answer:</span>
                        <p className={`${isCorrect ? 'text-green-500' : 'text-red-500'}`}>
                          {userAnswerText}
                        </p>
                      </div>
                      <div>
                        <span className="text-gray-400">Correct answer:</span>
                        <p className="text-neon-cyan">{activity.correct}</p>
                      </div>
                    </div>
                    {!isCorrect && (
                      <p className="text-xs text-gray-400 mt-2 border-t border-neon-cyan/20 pt-2">
                        💡 {activity.explanation}
                      </p>
                    )}
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        <div className="flex gap-4 justify-center pt-4">
          <Link to={`/module/${Math.ceil(parseInt(lessonId) / 2)}`}>
            <button className="cyber-button flex items-center gap-2">
              <FaArrowLeft /> Back to Module
            </button>
          </Link>
          <button
            onClick={handleRetake}
            className="px-6 py-3 bg-yellow-500/20 border border-yellow-500 text-yellow-500 rounded-lg hover:shadow-yellow-500/50 transition-all flex items-center gap-2"
          >
            <FaRedoAlt /> Retake Activities
          </button>
        </div>
      </div>
    )
  }

  const renderActivity = () => {
    if (activities.length === 0 || !activities[currentIndex]) {
      return (
        <div className="text-center py-12">
          <p className="text-gray-400">No exercises available for this lesson yet.</p>
        </div>
      )
    }
    
    const activity = activities[currentIndex]
    const instructions = activityInstructions[activity.type]
    
    if (activity.type === 'multiple_choice') {
      return (
        <div className="space-y-4">
          <div className="bg-dark-200/50 rounded-lg p-3 mb-4 border border-neon-cyan/20">
            <div className="flex items-center gap-2 text-neon-cyan mb-1">
              <FaInfoCircle size={14} />
              <span className="text-sm font-mono">{instructions.title}</span>
            </div>
            <p className="text-gray-400 text-sm">{instructions.description}</p>
            <div className="flex items-center gap-2 mt-2 text-yellow-500 text-xs">
              <FaLightbulb size={12} />
              <span>{activity.hint || instructions.tip}</span>
            </div>
          </div>
          
          <p className="text-xl text-white mb-6">{activity.question}</p>
          <div className="grid gap-3">
            {activity.options.map((option, idx) => (
              <button
                key={idx}
                onClick={() => handleAnswer(option)}
                disabled={mode === 'results'}
                className="p-4 bg-dark-200 border border-neon-cyan/30 rounded-lg hover:border-neon-cyan hover:shadow-neon transition-all text-left text-white disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )
    } else if (activity.type === 'fill_blank') {
      const parts = activity.question.split('____')
      const before = parts[0] || ''
      const after = parts[1] || ''
      
      return (
        <div className="space-y-4">
          <div className="bg-dark-200/50 rounded-lg p-3 mb-4 border border-neon-cyan/20">
            <div className="flex items-center gap-2 text-neon-cyan mb-1">
              <FaInfoCircle size={14} />
              <span className="text-sm font-mono">{instructions.title}</span>
            </div>
            <p className="text-gray-400 text-sm">{instructions.description}</p>
            <div className="flex items-center gap-2 mt-2 text-yellow-500 text-xs">
              <FaLightbulb size={12} />
              <span>{activity.hint || instructions.tip}</span>
            </div>
          </div>
          
          <p className="text-xl text-white mb-6">
            {before}
            <input
              type="text"
              id="fillAnswer"
              disabled={mode === 'results'}
              className="mx-2 px-3 py-1 bg-dark-300 border border-neon-cyan rounded-lg focus:outline-none text-neon-cyan text-center disabled:opacity-50"
              placeholder={activity.placeholder || "______"}
              onKeyPress={(e) => {
                if (e.key === 'Enter' && mode !== 'results') {
                  const input = document.getElementById('fillAnswer')
                  if (input.value.trim()) {
                    handleAnswer(input.value)
                  }
                }
              }}
            />
            {after}
          </p>
          <div className="flex justify-center">
            <button
              onClick={() => {
                if (mode === 'results') return
                const input = document.getElementById('fillAnswer')
                if (!input.value.trim()) {
                  toast.error('Please type your answer first!')
                  return
                }
                handleAnswer(input.value)
              }}
              disabled={mode === 'results'}
              className="cyber-button px-8 disabled:opacity-50"
            >
              Check Answer
            </button>
          </div>
        </div>
      )
    }
    
    return null
  }

  // MODO RESULTADOS - Mostra gabarito
  if (mode === 'results' && previousProgress?.completed) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="glass-card p-8 max-w-3xl w-full"
        >
          <div className="mb-6 pb-4 border-b border-neon-cyan/30">
            <h2 className="text-2xl font-cyber font-bold text-neon-cyan mb-1">
              📊 Activity Results
            </h2>
            <p className="text-gray-400">Review your answers and see what you got right</p>
          </div>
          {renderResults()}
        </motion.div>
      </div>
    )
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-neon-cyan text-xl">Loading activities...</div>
      </div>
    )
  }

  if (completed && mode !== 'results') {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          className="glass-card p-12 text-center"
        >
          <FaTrophy className="text-6xl text-yellow-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Activities Completed! 🎉</h2>
          <p className="text-gray-400 mb-4">You earned {score} XP from this lesson</p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link to="/dashboard">
              <button className="cyber-button">Back to Dashboard</button>
            </Link>
            <Link to={`/module/${Math.ceil(parseInt(lessonId) / 2)}`}>
              <button className="px-6 py-3 bg-dark-200 border border-neon-pink text-neon-pink rounded-lg hover:shadow-neon-pink transition-all">
                Continue Learning
              </button>
            </Link>
            <button
              onClick={handleRetake}
              className="px-6 py-3 bg-yellow-500/20 border border-yellow-500 text-yellow-500 rounded-lg hover:shadow-yellow-500/50 transition-all flex items-center gap-2"
            >
              <FaRedoAlt /> Retake (Practice)
            </button>
          </div>
        </motion.div>
      </div>
    )
  }

  if (activities.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="glass-card p-12 text-center">
          <h2 className="text-2xl text-white mb-4">No activities found</h2>
          <p className="text-gray-400 mb-6">Exercises for this lesson are being prepared.</p>
          <Link to="/dashboard">
            <button className="cyber-button">Back to Dashboard</button>
          </Link>
        </div>
      </div>
    )
  }

  const currentActivity = activities[currentIndex]
  const instructions = activityInstructions[currentActivity?.type]

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 max-w-2xl w-full"
      >
        <div className="mb-6 pb-4 border-b border-neon-cyan/30">
          <h2 className="text-xl font-cyber font-bold text-neon-cyan mb-1">
            {instructions?.title || "Activity"}
          </h2>
          <p className="text-gray-400 text-sm">
            {instructions?.description || "Complete the exercise below"}
          </p>
        </div>

        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Activity {currentIndex + 1} of {activities.length}</span>
            <span>Score: {score} XP</span>
          </div>
          <div className="h-2 bg-dark-300 rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-neon-cyan to-neon-pink transition-all duration-300"
              style={{ width: `${((currentIndex + 1) / activities.length) * 100}%` }}
            />
          </div>
        </div>

        <div className="min-h-[350px]">
          {renderActivity()}
        </div>

        {showFeedback && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 20 }}
            className={`mt-6 p-4 rounded-lg text-center ${
              feedbackType ? 'bg-green-500/20 border border-green-500' : 'bg-red-500/20 border border-red-500'
            }`}
          >
            {feedbackType ? (
              <div className="text-green-500 flex items-center justify-center gap-2">
                <FaCheck /> Correct! Well done!
              </div>
            ) : (
              <div className="text-red-500 flex items-center justify-center gap-2">
                <FaTimes /> Try again! Check the hint above.
              </div>
            )}
          </motion.div>
        )}
      </motion.div>
    </div>
  )
}

export default Activities
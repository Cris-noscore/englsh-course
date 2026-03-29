import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../services/supabase'
import { FaArrowLeft, FaPrint, FaDownload, FaTrophy, FaStar, FaCheckCircle } from 'react-icons/fa'

const moduleLessonsMap = { 1:[1], 2:[2], 3:[3], 4:[4,5], 5:[6,7,8], 6:[9] }
const TOTAL_LESSONS = 9

const Certificate = () => {
  const { user, profile } = useAuth()
  const navigate = useNavigate()
  const certRef = useRef(null)
  const [completedLessons, setCompletedLessons] = useState([])
  const [completionDate, setCompletionDate] = useState(null)
  const [loading, setLoading] = useState(true)
  const [courseCompleted, setCourseCompleted] = useState(false)

  useEffect(() => {
    if (user) loadProgress()
  }, [user])

  const loadProgress = async () => {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('lesson_id, completed, completed_at')
        .eq('user_id', user.id)
        .eq('completed', true)
        .order('completed_at', { ascending: false })

      if (error) throw error

      const completed = data.map(p => p.lesson_id)
      setCompletedLessons(completed)

      const isComplete = completed.length >= TOTAL_LESSONS
      setCourseCompleted(isComplete)

      // Data de conclusão = data da última aula completada
      if (isComplete && data.length > 0) {
        const lastDate = data[0]?.completed_at
        if (lastDate) setCompletionDate(new Date(lastDate))
      }
    } catch (error) {
      console.error('Error loading progress:', error)
    } finally {
      setLoading(false)
    }
  }

  const handlePrint = () => {
    window.print()
  }

  const formatDate = (date) => {
    if (!date) return ''
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-neon-cyan text-xl">Loading certificate...</div>
    </div>
  )

  // Curso não concluído
  if (!courseCompleted) {
    const remaining = TOTAL_LESSONS - completedLessons.length
    return (
      <div className="flex items-center justify-center min-h-screen px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="glass-card p-10 text-center max-w-md w-full"
        >
          <div className="text-6xl mb-4">🔒</div>
          <h2 className="text-2xl font-cyber font-bold text-white mb-3">
            Certificate Locked
          </h2>
          <p className="text-gray-400 mb-2">
            Complete all <span className="text-neon-cyan font-bold">9 lessons</span> to earn your certificate.
          </p>
          <p className="text-gray-500 text-sm mb-6">
            You've completed <span className="text-neon-cyan font-bold">{completedLessons.length}</span> of {TOTAL_LESSONS} lessons.
            {remaining > 0 && ` ${remaining} more to go!`}
          </p>

          {/* Barra de progresso */}
          <div className="mb-6">
            <div className="h-3 bg-dark-300 rounded-full overflow-hidden mb-2">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${(completedLessons.length / TOTAL_LESSONS) * 100}%`,
                  background: 'linear-gradient(90deg, #0077b6, #0ff)'
                }}
              />
            </div>
            <p className="text-xs text-gray-500 font-mono">
              {Math.round((completedLessons.length / TOTAL_LESSONS) * 100)}% complete
            </p>
          </div>

          <div className="flex gap-3 justify-center">
            <Link to="/dashboard">
              <button className="cyber-button flex items-center gap-2">
                <FaArrowLeft size={12} /> Dashboard
              </button>
            </Link>
            <Link to="/profile">
              <button className="px-4 py-2 bg-neon-cyan/10 border border-neon-cyan/30 text-neon-cyan rounded-lg text-sm font-mono hover:border-neon-cyan transition-all">
                View Progress
              </button>
            </Link>
          </div>
        </motion.div>
      </div>
    )
  }

  // ── Certificado completo ──────────────────────────────────────────────
  return (
    <div className="min-h-screen py-8 px-4">

      {/* Botões de ação — não aparecem na impressão */}
      <div className="no-print flex items-center justify-between mb-6 max-w-4xl mx-auto">
        <Link to="/dashboard"
          className="flex items-center gap-2 text-sm font-mono px-3 py-1.5 rounded-lg text-neon-cyan border border-neon-cyan/30 hover:border-neon-cyan transition-all">
          <FaArrowLeft size={12} /> Back to Dashboard
        </Link>
        <div className="flex gap-3">
          <button
            onClick={handlePrint}
            className="flex items-center gap-2 px-4 py-2 bg-neon-cyan/10 border border-neon-cyan text-neon-cyan rounded-lg text-sm font-mono hover:bg-neon-cyan/20 transition-all"
          >
            <FaPrint size={14} /> Print / Save PDF
          </button>
        </div>
      </div>

      {/* ── O Certificado ── */}
      <motion.div
        ref={certRef}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="certificate-container max-w-4xl mx-auto"
        style={{
          background: 'linear-gradient(135deg, #0a0f1f 0%, #16213e 50%, #0a0f1f 100%)',
          border: '2px solid transparent',
          borderRadius: '16px',
          padding: '3px',
          backgroundClip: 'padding-box',
          position: 'relative',
        }}
      >
        {/* Borda gradiente neon */}
        <div style={{
          position: 'absolute', inset: 0, borderRadius: '16px', padding: '2px',
          background: 'linear-gradient(135deg, #0ff, #b0f, #f0f, #0ff)',
          WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
          WebkitMaskComposite: 'xor',
          maskComposite: 'exclude',
          zIndex: 0,
        }} />

        <div style={{
          background: 'linear-gradient(135deg, #05070f 0%, #0f172a 50%, #05070f 100%)',
          borderRadius: '14px',
          padding: '60px 70px',
          position: 'relative',
          zIndex: 1,
          overflow: 'hidden',
        }}>

          {/* Decorações de fundo */}
          <div style={{
            position: 'absolute', top: 0, left: 0, right: 0, bottom: 0,
            backgroundImage: `
              radial-gradient(circle at 20% 20%, rgba(0,255,255,0.04) 0%, transparent 50%),
              radial-gradient(circle at 80% 80%, rgba(176,0,255,0.04) 0%, transparent 50%),
              radial-gradient(circle at 50% 50%, rgba(240,0,255,0.02) 0%, transparent 70%)
            `,
            pointerEvents: 'none',
          }} />

          {/* Cantos decorativos */}
          {['top-4 left-4', 'top-4 right-4', 'bottom-4 left-4', 'bottom-4 right-4'].map((pos, i) => (
            <div key={i} className={`absolute ${pos}`} style={{ opacity: 0.4 }}>
              <div style={{ width: 40, height: 40, border: '1px solid #0ff', borderRadius: 4,
                transform: i % 2 === 0 ? 'rotate(0deg)' : 'rotate(90deg)' }} />
            </div>
          ))}

          {/* Cabeçalho */}
          <div className="text-center mb-8 relative">
            <div className="flex items-center justify-center gap-3 mb-2">
              <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, #0ff)' }} />
              <FaStar className="text-neon-cyan text-xl" />
              <FaTrophy className="text-yellow-400 text-3xl" style={{ filter: 'drop-shadow(0 0 12px rgba(255,215,0,0.6))' }} />
              <FaStar className="text-neon-cyan text-xl" />
              <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, #0ff, transparent)' }} />
            </div>

            <p className="text-gray-400 font-mono text-sm tracking-widest uppercase mb-1">
              This is to certify that
            </p>
          </div>

          {/* Nome do aluno */}
          <div className="text-center mb-6">
            <h1
              className="font-cyber font-bold"
              style={{
                fontSize: 'clamp(2rem, 5vw, 3.5rem)',
                color: '#0ff',
                textShadow: '0 0 20px rgba(0,255,255,0.6), 0 0 40px rgba(0,255,255,0.3)',
                letterSpacing: '0.05em',
                lineHeight: 1.2,
              }}
            >
              {profile?.full_name || profile?.username || 'Student'}
            </h1>
            <div className="mt-2 mx-auto w-64 h-px" style={{ background: 'linear-gradient(90deg, transparent, #0ff, transparent)' }} />
          </div>

          {/* Texto principal */}
          <div className="text-center mb-8">
            <p className="text-gray-300 text-lg mb-1">
              has successfully completed the
            </p>
            <h2
              className="font-cyber font-bold text-white mb-1"
              style={{ fontSize: 'clamp(1.5rem, 3vw, 2rem)', textShadow: '0 0 10px rgba(255,255,255,0.3)' }}
            >
              EnglishMaster Course
            </h2>
            <p className="text-gray-400 font-mono text-sm">
              From A1 Beginner to B2 Upper-Intermediate
            </p>
          </div>

          {/* Módulos concluídos */}
          <div className="flex flex-wrap justify-center gap-3 mb-8">
            {[
              { icon: '👋', label: 'Fundamentals', color: '#00b4d8' },
              { icon: '🌅', label: 'Daily Routine', color: '#f5c400' },
              { icon: '🏠', label: 'Daily Situations', color: '#22c55e' },
              { icon: '📚', label: 'Past & Modals', color: '#f97316' },
              { icon: '🚀', label: 'Future & Conditionals', color: '#a855f7' },
              { icon: '💻', label: 'Digital English', color: '#94a3b8' },
            ].map((mod, idx) => (
              <div key={idx} className="flex items-center gap-1.5 px-3 py-1.5 rounded-full"
                style={{ background: `${mod.color}15`, border: `1px solid ${mod.color}40` }}>
                <span style={{ fontSize: '0.9rem' }}>{mod.icon}</span>
                <span className="text-xs font-mono" style={{ color: mod.color }}>{mod.label}</span>
                <FaCheckCircle size={10} style={{ color: mod.color }} />
              </div>
            ))}
          </div>

          {/* Linha divisória */}
          <div className="flex items-center gap-4 mb-8">
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, transparent, rgba(0,255,255,0.3))' }} />
            <div className="w-2 h-2 rounded-full bg-neon-cyan opacity-50" />
            <div className="h-px flex-1" style={{ background: 'linear-gradient(90deg, rgba(0,255,255,0.3), transparent)' }} />
          </div>

          {/* Rodapé do certificado */}
          <div className="flex justify-between items-end">
            {/* Data */}
            <div className="text-center">
              <p className="text-gray-500 text-xs font-mono mb-1 uppercase tracking-wider">Date of Completion</p>
              <p className="text-neon-cyan font-mono text-sm font-bold">
                {formatDate(completionDate) || formatDate(new Date())}
              </p>
            </div>

            {/* Logo / Assinatura central */}
            <div className="text-center">
              <div className="text-2xl font-cyber font-bold mb-1">
                <span className="text-neon-cyan">English</span>
                <span className="text-white">Master</span>
              </div>
              <div className="w-32 h-px mx-auto mb-1" style={{ background: 'rgba(0,255,255,0.5)' }} />
              <p className="text-gray-500 text-xs font-mono">Official Certificate</p>
            </div>

            {/* XP total */}
            <div className="text-center">
              <p className="text-gray-500 text-xs font-mono mb-1 uppercase tracking-wider">Total XP Earned</p>
              <p className="text-neon-cyan font-mono text-sm font-bold">
                {profile?.xp || 0} XP
              </p>
            </div>
          </div>

          {/* ID do certificado */}
          <div className="text-center mt-6">
            <p className="text-gray-600 text-xs font-mono">
              Certificate ID: EM-{user?.id?.slice(0, 8).toUpperCase()}-{new Date().getFullYear()}
            </p>
          </div>
        </div>
      </motion.div>

      {/* Botões abaixo — não aparecem na impressão */}
      <div className="no-print flex justify-center gap-4 mt-8">
        <Link to="/profile">
          <button className="px-6 py-3 bg-neon-cyan/10 border border-neon-cyan text-neon-cyan rounded-lg font-mono text-sm hover:bg-neon-cyan/20 transition-all flex items-center gap-2">
            <FaStar /> View Profile
          </button>
        </Link>
        <Link to="/dashboard">
          <button className="cyber-button flex items-center gap-2">
            <FaArrowLeft size={12} /> Dashboard
          </button>
        </Link>
      </div>

      {/* CSS de impressão */}
      <style>{`
        @media print {
          .no-print { display: none !important; }
          body { background: white !important; }
          .certificate-container {
            max-width: 100% !important;
            margin: 0 !important;
            box-shadow: none !important;
          }
          header, nav, footer { display: none !important; }
          main { padding: 0 !important; }
        }
      `}</style>
    </div>
  )
}

export default Certificate
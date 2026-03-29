import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { useAuth } from '../contexts/AuthContext'
import { supabase } from '../services/supabase'
import { modules } from '../utils/courseData'
import {
  FaUser, FaTrophy, FaStar, FaBookOpen, FaCheckCircle,
  FaFire, FaChartBar, FaArrowLeft
} from 'react-icons/fa'

// ─── TEMAS POR MÓDULO ────────────────────────────────────────────────────────
const MODULE_THEME = {
  1: { color: '#00b4d8', glow: 'rgba(0,180,216,0.25)', border: 'rgba(0,180,216,0.30)', bg: 'rgba(0,180,216,0.07)', muted: '#0077b6' },
  2: { color: '#f5c400', glow: 'rgba(245,196,0,0.22)', border: 'rgba(245,196,0,0.28)', bg: 'rgba(245,196,0,0.07)', muted: '#b38e00' },
  3: { color: '#22c55e', glow: 'rgba(34,197,94,0.22)', border: 'rgba(34,197,94,0.28)', bg: 'rgba(34,197,94,0.07)', muted: '#15803d' },
  4: { color: '#f97316', glow: 'rgba(249,115,22,0.22)', border: 'rgba(249,115,22,0.28)', bg: 'rgba(249,115,22,0.07)', muted: '#c2410c' },
  5: { color: '#a855f7', glow: 'rgba(168,85,247,0.22)', border: 'rgba(168,85,247,0.28)', bg: 'rgba(168,85,247,0.07)', muted: '#7e22ce' },
  6: { color: '#94a3b8', glow: 'rgba(148,163,184,0.18)', border: 'rgba(148,163,184,0.25)', bg: 'rgba(148,163,184,0.07)', muted: '#64748b' },
}

const moduleLessonsMap = { 1: [1], 2: [2], 3: [3], 4: [4, 5], 5: [6, 7, 8], 6: [9] }

const LEVEL_NAMES = {
  1: 'Beginner', 2: 'Elementary', 3: 'Pre-Intermediate',
  4: 'Intermediate', 5: 'Upper-Intermediate', 6: 'Advanced',
  7: 'Proficient', 8: 'Expert', 9: 'Master', 10: 'EnglishMaster'
}

const Profile = () => {
  const { user, profile } = useAuth()
  const [completedLessons, setCompletedLessons] = useState([])
  const [lessonScores, setLessonScores] = useState({})
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (user) loadProgress()
  }, [user])

  const loadProgress = async () => {
    try {
      const { data, error } = await supabase
        .from('user_progress')
        .select('lesson_id, completed, score, completed_at')
        .eq('user_id', user.id)
        .eq('completed', true)
        .order('completed_at', { ascending: false })

      if (error) throw error

      const completed = data.map(p => p.lesson_id)
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

  // ─── Cálculos gerais ─────────────────────────────────────────────────────
  const totalLessons = Object.values(moduleLessonsMap).flat().length
  const overallProgress = Math.round((completedLessons.length / totalLessons) * 100)
  const totalXP = profile?.xp || 0
  const level = profile?.level || 1
  const nextLevelXP = level * 100
  const currentLevelXP = totalXP % 100
  const levelName = LEVEL_NAMES[Math.min(level, 10)] || 'Master'
  const totalScore = Object.values(lessonScores).reduce((a, b) => a + b, 0)

  // Módulos completos
  const completedModules = Object.entries(moduleLessonsMap).filter(([, lessons]) =>
    lessons.every(id => completedLessons.includes(id))
  ).length

  if (loading) return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="text-neon-cyan text-xl">Loading profile...</div>
    </div>
  )

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">

      {/* ── Botão voltar ── */}
      <Link to="/dashboard"
        className="inline-flex items-center gap-2 text-sm font-mono mb-6 px-3 py-1.5 rounded-lg text-neon-cyan border border-neon-cyan/30 hover:border-neon-cyan transition-all">
        <FaArrowLeft size={12} /> Back to Dashboard
      </Link>

      {/* ── Card de perfil ── */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="glass-card p-8 mb-6 flex flex-col md:flex-row items-center md:items-start gap-6"
      >
        {/* Avatar */}
        <div className="relative flex-shrink-0">
          <div className="w-24 h-24 rounded-full bg-gradient-to-br from-neon-cyan to-neon-pink flex items-center justify-center"
            style={{ boxShadow: '0 0 24px rgba(0,255,255,0.4)' }}>
            <FaUser className="text-4xl text-dark-500" />
          </div>
          {/* Badge de nível */}
          <div className="absolute -bottom-2 -right-2 w-8 h-8 rounded-full bg-dark-200 border-2 border-neon-cyan flex items-center justify-center">
            <span className="text-neon-cyan font-bold text-xs">{level}</span>
          </div>
        </div>

        {/* Info */}
        <div className="flex-1 text-center md:text-left">
          <h1 className="text-3xl font-cyber font-bold text-white mb-1">
            {profile?.username || 'Learner'}
          </h1>
          <p className="text-neon-cyan font-mono text-sm mb-1">{user?.email}</p>
          <p className="text-gray-400 text-sm mb-4">
            🏅 Level {level} — <span className="text-neon-cyan">{levelName}</span>
          </p>

          {/* Barra de XP */}
          <div className="max-w-sm">
            <div className="flex justify-between text-xs font-mono text-gray-400 mb-1">
              <span>Level {level}</span>
              <span>{currentLevelXP} / 100 XP</span>
              <span>Level {level + 1}</span>
            </div>
            <div className="h-3 bg-dark-300 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full transition-all duration-700"
                style={{
                  width: `${currentLevelXP}%`,
                  background: 'linear-gradient(90deg, #0077b6, #0ff)',
                  boxShadow: '0 0 8px rgba(0,255,255,0.5)'
                }}
              />
            </div>
          </div>
        </div>
      </motion.div>

      {/* ── Stats Cards ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { icon: FaStar, label: 'Total XP', value: totalXP, color: '#f5c400' },
          { icon: FaCheckCircle, label: 'Lessons Done', value: `${completedLessons.length}/${totalLessons}`, color: '#22c55e' },
          { icon: FaBookOpen, label: 'Modules Done', value: `${completedModules}/6`, color: '#00b4d8' },
          { icon: FaTrophy, label: 'Activity Score', value: `${totalScore} XP`, color: '#a855f7' },
        ].map((stat, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.08 }}
            className="glass-card p-4 text-center"
            style={{ borderColor: `${stat.color}40` }}
          >
            <stat.icon className="text-2xl mx-auto mb-2" style={{ color: stat.color }} />
            <p className="text-xl font-bold font-cyber" style={{ color: stat.color }}>{stat.value}</p>
            <p className="text-gray-400 text-xs mt-1">{stat.label}</p>
          </motion.div>
        ))}
      </div>

      {/* ── Gráfico de progresso por módulo ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="glass-card p-6 mb-6"
      >
        <h2 className="text-xl font-cyber font-bold text-neon-cyan mb-6 flex items-center gap-2">
          <FaChartBar /> Progress by Module
        </h2>

        <div className="space-y-4">
          {modules.map((module) => {
            const theme = MODULE_THEME[module.id]
            const lessons = moduleLessonsMap[module.id] || []
            const done = lessons.filter(id => completedLessons.includes(id)).length
            const pct = lessons.length > 0 ? Math.round((done / lessons.length) * 100) : 0
            const moduleScore = lessons.reduce((acc, id) => acc + (lessonScores[id] || 0), 0)

            return (
              <div key={module.id}>
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{module.icon}</span>
                    <span className="text-sm font-mono text-gray-300">{module.title}</span>
                  </div>
                  <div className="flex items-center gap-3 text-xs font-mono">
                    <span className="text-gray-500">{done}/{lessons.length} lessons</span>
                    {moduleScore > 0 && (
                      <span style={{ color: theme.color }}>{moduleScore} XP</span>
                    )}
                    <span className="font-bold" style={{ color: theme.color }}>{pct}%</span>
                  </div>
                </div>

                {/* Barra de progresso */}
                <div className="h-3 bg-dark-300 rounded-full overflow-hidden">
                  <motion.div
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.8, delay: module.id * 0.1 }}
                    className="h-full rounded-full"
                    style={{
                      background: pct === 100
                        ? `linear-gradient(90deg, ${theme.muted}, ${theme.color})`
                        : `linear-gradient(90deg, ${theme.muted}, ${theme.color})`,
                      boxShadow: pct > 0 ? `0 0 8px ${theme.glow}` : 'none',
                      opacity: pct === 0 ? 0.3 : 1
                    }}
                  />
                </div>

                {/* Segmentos de aulas */}
                <div className="flex gap-1 mt-1">
                  {lessons.map(lessonId => (
                    <div
                      key={lessonId}
                      className="h-1 flex-1 rounded-full"
                      style={{
                        background: completedLessons.includes(lessonId) ? theme.color : 'rgba(255,255,255,0.1)',
                        boxShadow: completedLessons.includes(lessonId) ? `0 0 4px ${theme.glow}` : 'none'
                      }}
                    />
                  ))}
                </div>
              </div>
            )
          })}
        </div>

        {/* Progresso geral */}
        <div className="mt-6 pt-4 border-t border-neon-cyan/20">
          <div className="flex justify-between text-sm font-mono mb-2">
            <span className="text-gray-400">Overall Progress</span>
            <span className="text-neon-cyan font-bold">{overallProgress}%</span>
          </div>
          <div className="h-4 bg-dark-300 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: `${overallProgress}%` }}
              transition={{ duration: 1, delay: 0.5 }}
              className="h-full rounded-full"
              style={{
                background: 'linear-gradient(90deg, #0077b6, #0ff, #b0f)',
                boxShadow: '0 0 12px rgba(0,255,255,0.4)'
              }}
            />
          </div>
          <p className="text-center text-xs text-gray-500 mt-2 font-mono">
            {completedLessons.length} of {totalLessons} lessons completed
          </p>
        </div>
      </motion.div>

      {/* ── Conquistas ── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        className="glass-card p-6"
      >
        <h2 className="text-xl font-cyber font-bold text-neon-cyan mb-4 flex items-center gap-2">
          <FaTrophy /> Achievements
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
          {[
            { icon: '🎯', title: 'First Steps', desc: 'Complete your first lesson', earned: completedLessons.length >= 1 },
            { icon: '📚', title: 'Bookworm', desc: 'Complete 3 lessons', earned: completedLessons.length >= 3 },
            { icon: '🚀', title: 'On a Roll', desc: 'Complete 6 lessons', earned: completedLessons.length >= 6 },
            { icon: '⭐', title: 'Star Student', desc: 'Earn 100 XP', earned: totalXP >= 100 },
            { icon: '💎', title: 'Diamond', desc: 'Earn 300 XP', earned: totalXP >= 300 },
            { icon: '🏆', title: 'Champion', desc: 'Complete all 9 lessons', earned: completedLessons.length >= 9 },
          ].map((achievement, idx) => (
            <div
              key={idx}
              className="rounded-xl p-4 text-center transition-all"
              style={{
                background: achievement.earned ? 'rgba(255,215,0,0.08)' : 'rgba(255,255,255,0.03)',
                border: `1px solid ${achievement.earned ? 'rgba(255,215,0,0.4)' : 'rgba(255,255,255,0.08)'}`,
                boxShadow: achievement.earned ? '0 0 12px rgba(255,215,0,0.2)' : 'none',
                opacity: achievement.earned ? 1 : 0.5,
              }}
            >
              <div className="text-3xl mb-2" style={{ filter: achievement.earned ? 'none' : 'grayscale(1)' }}>
                {achievement.icon}
              </div>
              <p className="text-sm font-bold" style={{ color: achievement.earned ? '#ffd60a' : '#6b7280' }}>
                {achievement.title}
              </p>
              <p className="text-xs text-gray-500 mt-1">{achievement.desc}</p>
              {achievement.earned && (
                <div className="mt-2 text-xs text-yellow-500 font-mono">✓ Earned</div>
              )}
            </div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

export default Profile
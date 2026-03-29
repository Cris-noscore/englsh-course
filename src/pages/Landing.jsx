import React from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { FaArrowRight, FaGamepad, FaTrophy, FaRocket } from 'react-icons/fa'

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-dark-500 via-dark-400 to-dark-500">
      <div className="relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1516321318423-f06f85e504b3?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80')] bg-cover bg-center opacity-10" />
        
        <div className="container mx-auto px-4 py-32 relative">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-6xl md:text-7xl font-cyber font-bold mb-6">
              <span className="text-neon-cyan">Master</span>
              <span className="text-white"> English</span>
              <br />
              <span className="text-neon-pink">Like a Pro</span>
            </h1>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Learn English from A1 to B2 with gamified lessons, interactive activities, and real-time progress tracking.
            </p>
            <div className="flex gap-4 justify-center">
              <Link to="/register">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="cyber-button flex items-center gap-2"
                >
                  Start Learning <FaArrowRight />
                </motion.button>
              </Link>
              <Link to="/login">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-6 py-3 bg-dark-200 border border-neon-pink text-neon-pink rounded-lg hover:shadow-neon-pink transition-all duration-300"
                >
                  Sign In
                </motion.button>
              </Link>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="grid md:grid-cols-3 gap-8 mt-24"
          >
            <div className="glass-card p-6 text-center">
              <FaGamepad className="text-5xl text-neon-cyan mx-auto mb-4" />
              <h3 className="text-xl font-mono font-bold text-white mb-2">Gamified Learning</h3>
              <p className="text-gray-400">Earn XP, level up, and unlock achievements as you progress</p>
            </div>
            <div className="glass-card p-6 text-center">
              <FaTrophy className="text-5xl text-neon-pink mx-auto mb-4" />
              <h3 className="text-xl font-mono font-bold text-white mb-2">Track Progress</h3>
              <p className="text-gray-400">Monitor your journey from beginner to advanced</p>
            </div>
            <div className="glass-card p-6 text-center">
              <FaRocket className="text-5xl text-neon-cyan mx-auto mb-4" />
              <h3 className="text-xl font-mono font-bold text-white mb-2">Interactive Activities</h3>
              <p className="text-gray-400">Practice with quizzes, matching games, and more</p>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  )
}

export default Landing

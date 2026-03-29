import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { motion } from 'framer-motion'
import { FaUser, FaSignOutAlt, FaBars, FaTimes, FaChartBar } from 'react-icons/fa'

const Header = () => {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [showUserMenu, setShowUserMenu] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-300/90 backdrop-blur-md border-b border-neon-cyan/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">

          {/* Logo */}
          <Link to="/" className="text-2xl font-cyber font-bold">
            <span className="text-neon-cyan">English</span>
            <span className="text-white">Master</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-300 hover:text-neon-cyan transition-colors font-mono text-sm">
                  Dashboard
                </Link>

                {/* User menu dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setShowUserMenu(!showUserMenu)}
                    className="flex items-center gap-2 hover:opacity-80 transition-opacity"
                  >
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-cyan to-neon-pink flex items-center justify-center"
                      style={{ boxShadow: '0 0 8px rgba(0,255,255,0.4)' }}>
                      <FaUser className="text-dark-500 text-xs" />
                    </div>
                    <span className="text-gray-300 text-sm font-mono">{profile?.username || 'User'}</span>
                  </button>

                  {/* Dropdown */}
                  {showUserMenu && (
                    <motion.div
                      initial={{ opacity: 0, y: -8 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="absolute right-0 top-12 w-48 rounded-xl overflow-hidden z-50"
                      style={{
                        background: '#16213e',
                        border: '1px solid rgba(0,255,255,0.2)',
                        boxShadow: '0 0 20px rgba(0,255,255,0.15)'
                      }}
                    >
                      {/* XP info */}
                      <div className="px-4 py-3 border-b border-neon-cyan/20">
                        <p className="text-xs text-gray-400 font-mono">Level {profile?.level || 1}</p>
                        <div className="h-1.5 bg-dark-300 rounded-full mt-1 overflow-hidden">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-neon-cyan to-neon-pink"
                            style={{ width: `${((profile?.xp || 0) % 100)}%` }}
                          />
                        </div>
                        <p className="text-xs text-neon-cyan font-mono mt-1">{profile?.xp || 0} XP</p>
                      </div>

                      {/* Links */}
                      <Link
                        to="/profile"
                        onClick={() => setShowUserMenu(false)}
                        className="flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-neon-cyan hover:bg-neon-cyan/10 transition-all text-sm font-mono"
                      >
                        <FaChartBar size={14} /> My Profile
                      </Link>

                      <button
                        onClick={() => { handleSignOut(); setShowUserMenu(false) }}
                        className="w-full flex items-center gap-3 px-4 py-3 text-gray-300 hover:text-neon-pink hover:bg-neon-pink/10 transition-all text-sm font-mono border-t border-neon-cyan/10"
                      >
                        <FaSignOutAlt size={14} /> Sign Out
                      </button>
                    </motion.div>
                  )}
                </div>

                {/* Fecha dropdown ao clicar fora */}
                {showUserMenu && (
                  <div className="fixed inset-0 z-40" onClick={() => setShowUserMenu(false)} />
                )}
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-neon-cyan transition-colors font-mono text-sm">
                  Sign In
                </Link>
                <Link to="/register">
                  <button className="cyber-button text-sm px-4 py-2">
                    Get Started
                  </button>
                </Link>
              </>
            )}
          </div>

          {/* Mobile menu button */}
          <button
            className="md:hidden text-neon-cyan"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {/* Mobile menu */}
        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-neon-cyan/30"
          >
            {user ? (
              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 pb-2 border-b border-neon-cyan/20">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-cyan to-neon-pink flex items-center justify-center">
                    <FaUser className="text-dark-500 text-xs" />
                  </div>
                  <div>
                    <p className="text-white text-sm font-mono">{profile?.username || 'User'}</p>
                    <p className="text-neon-cyan text-xs font-mono">Level {profile?.level || 1} · {profile?.xp || 0} XP</p>
                  </div>
                </div>
                <Link
                  to="/dashboard"
                  className="text-gray-300 hover:text-neon-cyan font-mono text-sm"
                  onClick={() => setIsMenuOpen(false)}
                >
                  Dashboard
                </Link>
                <Link
                  to="/profile"
                  className="text-gray-300 hover:text-neon-cyan font-mono text-sm flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <FaChartBar size={12} /> My Profile
                </Link>
                <button
                  onClick={() => { handleSignOut(); setIsMenuOpen(false) }}
                  className="text-gray-300 hover:text-neon-pink text-left font-mono text-sm flex items-center gap-2"
                >
                  <FaSignOutAlt size={12} /> Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link to="/login" className="text-gray-300 hover:text-neon-cyan font-mono text-sm" onClick={() => setIsMenuOpen(false)}>
                  Sign In
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <button className="cyber-button text-sm px-4 py-2 w-full">Get Started</button>
                </Link>
              </div>
            )}
          </motion.div>
        )}
      </div>
    </header>
  )
}

export default Header
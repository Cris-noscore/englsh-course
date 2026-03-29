import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useAuth } from '../../contexts/AuthContext'
import { motion } from 'framer-motion'
import { FaUser, FaSignOutAlt, FaBars, FaTimes } from 'react-icons/fa'

const Header = () => {
  const { user, profile, signOut } = useAuth()
  const navigate = useNavigate()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const handleSignOut = async () => {
    await signOut()
    navigate('/')
  }

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-dark-300/90 backdrop-blur-md border-b border-neon-cyan/30">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-16">
          <Link to="/" className="text-2xl font-cyber font-bold">
            <span className="text-neon-cyan">English</span>
            <span className="text-white">Master</span>
          </Link>

          <div className="hidden md:flex items-center gap-6">
            {user ? (
              <>
                <Link to="/dashboard" className="text-gray-300 hover:text-neon-cyan transition-colors">
                  Dashboard
                </Link>
                <div className="flex items-center gap-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-r from-neon-cyan to-neon-pink flex items-center justify-center">
                      <FaUser className="text-dark-500" />
                    </div>
                    <span className="text-gray-300">{profile?.username || 'User'}</span>
                  </div>
                  <button
                    onClick={handleSignOut}
                    className="text-gray-300 hover:text-neon-pink transition-colors"
                  >
                    <FaSignOutAlt />
                  </button>
                </div>
              </>
            ) : (
              <>
                <Link to="/login" className="text-gray-300 hover:text-neon-cyan transition-colors">
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

          <button
            className="md:hidden text-neon-cyan"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
          </button>
        </div>

        {isMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden py-4 border-t border-neon-cyan/30"
          >
            {user ? (
              <div className="flex flex-col gap-3">
                <Link to="/dashboard" className="text-gray-300 hover:text-neon-cyan" onClick={() => setIsMenuOpen(false)}>
                  Dashboard
                </Link>
                <button
                  onClick={() => {
                    handleSignOut()
                    setIsMenuOpen(false)
                  }}
                  className="text-gray-300 hover:text-neon-pink text-left"
                >
                  Sign Out
                </button>
              </div>
            ) : (
              <div className="flex flex-col gap-3">
                <Link to="/login" className="text-gray-300 hover:text-neon-cyan" onClick={() => setIsMenuOpen(false)}>
                  Sign In
                </Link>
                <Link to="/register" onClick={() => setIsMenuOpen(false)}>
                  <button className="cyber-button text-sm px-4 py-2 w-full">
                    Get Started
                  </button>
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

import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { Toaster } from 'react-hot-toast'
import { AuthProvider, useAuth } from './contexts/AuthContext'
import AIChat from './components/AIChat'
import Landing from './pages/Landing'
import Login from './pages/Login'
import Register from './pages/Register'
import Dashboard from './pages/Dashboard'
import Module from './pages/Module'
import Lesson from './pages/Lesson'
import Activities from './pages/Activities'
import Header from './components/Layout/Header'

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth()

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-neon-cyan text-xl">Loading...</div>
      </div>
    )
  }

  if (!user) {
    return <Navigate to="/login" />
  }

  return children
}

function AppRoutes() {
  const { user } = useAuth()

  return (
    <>
      <Routes>
        <Route path="/" element={user ? <Navigate to="/dashboard" /> : <Landing />} />
        <Route path="/login" element={user ? <Navigate to="/dashboard" /> : <Login />} />
        <Route path="/register" element={user ? <Navigate to="/dashboard" /> : <Register />} />
        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />
        <Route path="/module/:moduleId" element={
          <ProtectedRoute>
            <Module />
          </ProtectedRoute>
        } />
        <Route path="/lesson/:lessonId" element={
          <ProtectedRoute>
            <Lesson />
          </ProtectedRoute>
        } />
        <Route path="/activities/:lessonId" element={
          <ProtectedRoute>
            <Activities />
          </ProtectedRoute>
        } />
      </Routes>

      {/* AIChat só aparece para usuários logados */}
      {user && <AIChat />}
    </>
  )
}

function App() {
  return (
    <Router>
      <AuthProvider>
        <div className="min-h-screen bg-dark-500">
          <Header />
          <main className="pt-20">
            <AppRoutes />
          </main>
          <Toaster
            position="top-right"
            toastOptions={{
              style: {
                background: '#1a1a2e',
                color: '#0ff',
                border: '1px solid #0ff',
              },
            }}
          />
        </div>
      </AuthProvider>
    </Router>
  )
}

export default App
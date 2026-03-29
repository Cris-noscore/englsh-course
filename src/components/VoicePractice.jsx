import React, { useState, useEffect } from 'react'
import { FaMicrophone, FaSpinner } from 'react-icons/fa'
import toast from 'react-hot-toast'

const VoicePractice = () => {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [loading, setLoading] = useState(false)
  const [permissionGranted, setPermissionGranted] = useState(false)
  const [browserSupported, setBrowserSupported] = useState(true)

  useEffect(() => {
    // Verifica suporte do navegador
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      setBrowserSupported(false)
    }
  }, [])

  const requestMicPermission = async () => {
    try {
      await navigator.mediaDevices.getUserMedia({ audio: true })
      setPermissionGranted(true)
      toast.success('Microphone access granted!')
      return true
    } catch (err) {
      toast.error('Please allow microphone access in your browser settings')
      return false
    }
  }

  const startListening = async () => {
    if (!browserSupported) {
      toast.error('Speech recognition not supported. Use Chrome or Edge.')
      return
    }

    // Pede permissão se ainda não foi concedida
    if (!permissionGranted) {
      const granted = await requestMicPermission()
      if (!granted) return
    }

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = false
    recognition.maxAlternatives = 1

    recognition.onstart = () => {
      setIsListening(true)
      setTranscript('')
      setAiResponse('')
    }

    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript
      setTranscript(text)
      sendToAI(text)
    }

    recognition.onerror = (event) => {
      console.error('Speech error:', event.error)
      if (event.error === 'not-allowed') {
        toast.error('Microphone blocked. Please allow access in browser settings.')
        setPermissionGranted(false)
      } else if (event.error === 'no-speech') {
        toast.error('No speech detected. Try again!')
      } else {
        toast.error(`Error: ${event.error}`)
      }
      setIsListening(false)
    }

    recognition.onend = () => setIsListening(false)

    try {
      recognition.start()
    } catch (err) {
      toast.error('Could not start microphone. Try again.')
      setIsListening(false)
    }
  }

  const speakText = (text) => {
    if (!text) return
    // Cancela qualquer fala anterior
    window.speechSynthesis.cancel()
    
    const utterance = new SpeechSynthesisUtterance(text)
    utterance.lang = 'en-US'
    utterance.rate = 0.9
    utterance.pitch = 1

    // Chrome bug fix: às vezes a síntese para no meio
    const resumeInfinity = setInterval(() => {
      if (!window.speechSynthesis.speaking) {
        clearInterval(resumeInfinity)
      } else {
        window.speechSynthesis.resume()
      }
    }, 5000)

    utterance.onend = () => clearInterval(resumeInfinity)
    utterance.onerror = () => clearInterval(resumeInfinity)

    window.speechSynthesis.speak(utterance)
  }

  const sendToAI = async (text) => {
    setLoading(true)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: text }],
          context: "You are an English conversation tutor. Correct the student's pronunciation and grammar gently. Provide a short correction and a better way to say it. Keep response under 3 sentences."
        })
      })
      const data = await response.json()
      if (data.reply) {
        setAiResponse(data.reply)
        speakText(data.reply)
      }
    } catch (error) {
      toast.error('Error connecting to AI tutor')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-cyber font-bold text-neon-cyan mb-2">🎤 Voice Conversation Practice</h3>

      {!browserSupported && (
        <div className="mb-4 p-3 bg-yellow-500/20 border border-yellow-500 rounded-lg text-yellow-400 text-sm">
          ⚠️ Speech recognition requires Chrome or Edge browser.
        </div>
      )}

      {browserSupported && !permissionGranted && (
        <p className="text-gray-400 text-xs mb-3">
          🎙️ Click the button below — your browser will ask for microphone permission.
        </p>
      )}

      <button
        onClick={startListening}
        disabled={isListening || loading || !browserSupported}
        className={`cyber-button w-full py-4 flex items-center justify-center gap-2 transition-all ${
          isListening ? 'animate-pulse border-red-500 text-red-400' : ''
        }`}
      >
        <FaMicrophone className={isListening ? 'text-red-400' : ''} />
        {isListening ? '🔴 Listening... Speak now' : 'Start Speaking'}
      </button>

      {transcript && (
        <div className="mt-4 p-3 bg-dark-200 rounded-lg">
          <p className="text-gray-400 text-xs mb-1">You said:</p>
          <p className="text-white">"{transcript}"</p>
        </div>
      )}

      {loading && (
        <div className="mt-4 flex justify-center items-center gap-2 text-neon-cyan text-sm">
          <FaSpinner className="animate-spin" />
          <span>AI is analyzing your speech...</span>
        </div>
      )}

      {aiResponse && (
        <div className="mt-4 p-3 bg-neon-cyan/10 border border-neon-cyan rounded-lg">
          <div className="flex justify-between items-center mb-1">
            <p className="text-neon-cyan text-xs font-bold">🤖 AI Tutor:</p>
            <button
              onClick={() => speakText(aiResponse)}
              className="text-xs text-gray-400 hover:text-neon-cyan transition-colors"
            >
              🔊 Play again
            </button>
          </div>
          <p className="text-white text-sm">{aiResponse}</p>
        </div>
      )}
    </div>
  )
}

export default VoicePractice
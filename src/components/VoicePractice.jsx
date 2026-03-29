import React, { useState } from 'react'
import { FaMicrophone, FaStop, FaPlay, FaSpinner } from 'react-icons/fa'
import toast from 'react-hot-toast'

const VoicePractice = () => {
  const [isListening, setIsListening] = useState(false)
  const [transcript, setTranscript] = useState('')
  const [aiResponse, setAiResponse] = useState('')
  const [loading, setLoading] = useState(false)

  const startListening = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition
    if (!SpeechRecognition) {
      toast.error('Speech recognition not supported in this browser')
      return
    }

    const recognition = new SpeechRecognition()
    recognition.lang = 'en-US'
    recognition.interimResults = false

    recognition.onstart = () => setIsListening(true)
    recognition.onresult = (event) => {
      const text = event.results[0][0].transcript
      setTranscript(text)
      sendToAI(text)
    }
    recognition.onerror = () => {
      toast.error('Error capturing speech')
      setIsListening(false)
    }
    recognition.onend = () => setIsListening(false)

    recognition.start()
  }

  const sendToAI = async (text) => {
    setLoading(true)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: text }],
          context: 'You are an English conversation tutor. Correct the student\'s pronunciation and grammar gently. Provide a short correction and a better way to say it.'
        })
      })
      const data = await response.json()
      setAiResponse(data.reply)
      
      // Falar resposta
      const utterance = new SpeechSynthesisUtterance(data.reply)
      utterance.lang = 'en-US'
      window.speechSynthesis.speak(utterance)
    } catch (error) {
      toast.error('Error connecting to AI')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-cyber font-bold text-neon-cyan mb-4">🎤 Voice Conversation Practice</h3>
      
      <button
        onClick={startListening}
        disabled={isListening}
        className={`cyber-button w-full py-4 flex items-center justify-center gap-2 ${isListening ? 'animate-pulse bg-red-500/20' : ''}`}
      >
        <FaMicrophone /> {isListening ? 'Listening... Speak now' : 'Start Speaking'}
      </button>

      {transcript && (
        <div className="mt-4 p-3 bg-dark-200 rounded-lg">
          <p className="text-gray-400 text-sm">You said:</p>
          <p className="text-white">"{transcript}"</p>
        </div>
      )}

      {loading && (
        <div className="mt-4 flex justify-center">
          <FaSpinner className="animate-spin text-neon-cyan text-2xl" />
        </div>
      )}

      {aiResponse && (
        <div className="mt-4 p-3 bg-neon-cyan/10 border border-neon-cyan rounded-lg">
          <p className="text-neon-cyan text-sm">AI Tutor:</p>
          <p className="text-white">{aiResponse}</p>
        </div>
      )}
    </div>
  )
}

export default VoicePractice
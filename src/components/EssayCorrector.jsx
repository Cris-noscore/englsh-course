import React, { useState } from 'react'
import { FaPen, FaSpinner, FaCheckCircle } from 'react-icons/fa'
import toast from 'react-hot-toast'

const topicsByModule = {
  1: "Introduce yourself. Tell me your name, where you are from, your age, and what you do.",
  2: "Describe your daily routine from morning to night.",
  3: "Describe your favorite meal and how to order it in a restaurant.",
  4: "Tell a story about something that happened to you last weekend.",
  5: "What are your plans for the future? What will you do next year?",
  6: "Write about how technology has changed the way we communicate."
}

const EssayCorrector = ({ moduleId }) => {
  const [essay, setEssay] = useState('')
  const [correction, setCorrection] = useState(null)
  const [loading, setLoading] = useState(false)

  const topic = topicsByModule[moduleId] || topicsByModule[1]

  const submitEssay = async () => {
    if (!essay.trim()) {
      toast.error('Please write your essay first')
      return
    }

    setLoading(true)
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: [{ role: 'user', content: essay }],
          context: `You are an English teacher. Correct this student essay. Provide:
          1. A score out of 10
          2. Grammar corrections
          3. Vocabulary suggestions
          4. A corrected version
          5. Positive feedback
          Topic: ${topic}`
        })
      })
      const data = await response.json()
      setCorrection(data.reply)
      toast.success('Essay corrected!')
    } catch (error) {
      toast.error('Error correcting essay')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="glass-card p-6">
      <h3 className="text-xl font-cyber font-bold text-neon-cyan mb-4">✍️ Essay Practice</h3>
      <p className="text-gray-400 mb-4">Topic: <span className="text-white">{topic}</span></p>
      
      <textarea
        value={essay}
        onChange={(e) => setEssay(e.target.value)}
        placeholder="Write your essay here (minimum 50 words)..."
        className="w-full h-48 bg-dark-300 border border-neon-cyan/30 rounded-lg p-3 text-white focus:outline-none focus:border-neon-cyan"
      />
      
      <button
        onClick={submitEssay}
        disabled={loading}
        className="cyber-button w-full mt-4 flex items-center justify-center gap-2"
      >
        {loading ? <FaSpinner className="animate-spin" /> : <FaPen />}
        {loading ? 'Correcting...' : 'Submit Essay'}
      </button>

      {correction && (
        <div className="mt-4 p-4 bg-dark-200 rounded-lg border border-neon-cyan/30 whitespace-pre-wrap">
          <h4 className="text-neon-cyan font-bold mb-2">📝 Correction:</h4>
          <p className="text-gray-300">{correction}</p>
        </div>
      )}
    </div>
  )
}

export default EssayCorrector
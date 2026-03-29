// english-course/api/chat.js
// Esta é uma Serverless Function do Vercel

export default async function handler(req, res) {
  // Permitir apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { messages, context } = req.body

  // Validar API Key
  const apiKey = process.env.OPENAI_API_KEY
  if (!apiKey) {
    console.error('OPENAI_API_KEY not configured')
    return res.status(500).json({ error: 'API key not configured' })
  }

  try {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`
      },
      body: JSON.stringify({
        model: 'gpt-3.5-turbo',
        messages: [
          { 
            role: 'system', 
            content: context || 'You are an English tutor. Help students learn English. Correct their mistakes, explain grammar, and practice conversation. Keep responses friendly and encouraging.' 
          },
          ...messages
        ],
        temperature: 0.7,
        max_tokens: 500
      })
    })

    const data = await response.json()
    
    if (data.error) {
      console.error('OpenAI API error:', data.error)
      return res.status(500).json({ error: data.error.message })
    }

    const reply = data.choices[0].message.content
    res.status(200).json({ reply })
    
  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Error processing request' })
  }
}
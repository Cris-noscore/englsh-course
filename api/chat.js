// english-course/api/chat.js
// Serverless Function do Vercel — usa Anthropic Claude no lugar da OpenAI

export default async function handler(req, res) {
  // Permitir apenas POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { messages, context } = req.body

  // Validar API Key
  const apiKey = process.env.ANTHROPIC_API_KEY
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY not configured')
    return res.status(500).json({ error: 'API key not configured' })
  }

  try {
    const response = await fetch('https://api.anthropic.com/v1/messages', {
      method: 'POST',
      headers: {
        'Content-Type':            'application/json',
        'x-api-key':               apiKey,
        'anthropic-version':       '2023-06-01',
      },
      body: JSON.stringify({
        model: 'claude-haiku-4-5',
        max_tokens: 500,
        system:     context || 'You are an English tutor. Help students learn English. Correct their mistakes, explain grammar, and practice conversation. Keep responses short, friendly and encouraging.',
        messages:   messages.map(m => ({
          role:    m.role === 'assistant' ? 'assistant' : 'user',
          content: m.content
        }))
      })
    })

    const data = await response.json()

    if (data.error) {
      console.error('Anthropic API error:', data.error)
      return res.status(500).json({ error: data.error.message })
    }

    // Anthropic retorna content como array de blocos
    const reply = data.content?.[0]?.text || ''
    res.status(200).json({ reply })

  } catch (error) {
    console.error('Error:', error)
    res.status(500).json({ error: 'Error processing request' })
  }
}
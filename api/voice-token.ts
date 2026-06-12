import type { VercelRequest, VercelResponse } from '@vercel/node'
import { loadLocalEnv } from './_lib/load-env'

loadLocalEnv()

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.ELEVENLABS_API_KEY
  const agentId = process.env.ELEVENLABS_AGENT_ID

  if (!apiKey || !agentId) {
    return res.status(503).json({
      error: 'ElevenLabs not configured',
      fallback: 'Set ELEVENLABS_API_KEY and ELEVENLABS_AGENT_ID in Vercel env.',
    })
  }

  try {
    const url = new URL('https://api.elevenlabs.io/v1/convai/conversation/get-signed-url')
    url.searchParams.set('agent_id', agentId)

    const response = await fetch(url.toString(), {
      headers: { 'xi-api-key': apiKey },
    })

    if (!response.ok) {
      const err = await response.text()
      return res.status(response.status).json({ error: err })
    }

    const data = await response.json()
    return res.status(200).json({ signedUrl: data.signed_url })
  } catch (e) {
    return res.status(500).json({ error: String(e) })
  }
}

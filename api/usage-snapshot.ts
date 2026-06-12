import type { VercelRequest, VercelResponse } from '@vercel/node'
import { loadLocalEnv } from './_lib/load-env'
import { sumElevenLabsCredits } from './_lib/usage'

loadLocalEnv()

async function elFetch(apiKey: string, elPath: string) {
  const resp = await fetch(`https://api.elevenlabs.io/v1${elPath}`, {
    headers: { 'xi-api-key': apiKey },
  })
  if (!resp.ok) {
    const err = await resp.text()
    throw new Error(`ElevenLabs ${resp.status}: ${err.slice(0, 300)}`)
  }
  return resp.json()
}

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'GET') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const apiKey = process.env.ELEVENLABS_API_KEY
  if (!apiKey) {
    return res.status(503).json({ error: 'ELEVENLABS_API_KEY not configured' })
  }

  const balanceOnly = req.query.balance === 'true'
  const conversationId = typeof req.query.conversation_id === 'string' ? req.query.conversation_id : ''

  try {
    if (balanceOnly || !conversationId) {
      const sub = await elFetch(apiKey, '/user/subscription')
      const used = Number(sub.character_count ?? 0)
      const limit = Number(sub.character_limit ?? 0)
      const remaining = Math.max(0, limit - used)
      const pctRemaining = limit > 0 ? (remaining / limit) * 100 : 100
      const minPct = Number(process.env.JM_MIN_CREDITS_PCT || '5')

      return res.status(200).json({
        balance: {
          character_count_used: used,
          character_limit: limit,
          character_remaining: remaining,
          pct_remaining: Number(pctRemaining.toFixed(1)),
          can_start: pctRemaining >= minPct,
          tier: sub.tier ?? null,
        },
      })
    }

    const conv = await elFetch(apiKey, `/convai/conversations/${encodeURIComponent(conversationId)}`)
    const charging = conv.metadata?.charging ?? conv.charging ?? null
    const durationSecs = Number(conv.metadata?.call_duration_secs ?? conv.call_duration_secs ?? 0)

    return res.status(200).json({
      conversation_id: conversationId,
      duration_secs: durationSecs,
      charging,
      credits_used: sumElevenLabsCredits(charging),
      status: conv.status ?? null,
    })
  } catch (e) {
    return res.status(500).json({ error: String(e) })
  }
}

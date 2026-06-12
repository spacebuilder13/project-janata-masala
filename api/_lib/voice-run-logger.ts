import { sumElevenLabsCredits } from './usage'
import { isVoiceRunsStoreConfigured, saveVoiceRun, type VoiceRunRecord } from './voice-runs-store'

async function fetchElUsage(conversationId: string) {
  const apiKey = process.env.ELEVENLABS_API_KEY
  if (!apiKey) return null

  try {
    const resp = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversations/${encodeURIComponent(conversationId)}`,
      { headers: { 'xi-api-key': apiKey } },
    )
    if (!resp.ok) return null
    const conv = await resp.json()
    const charging = conv.metadata?.charging ?? conv.charging ?? null
    return {
      credits_used: sumElevenLabsCredits(charging),
      duration_secs: Number(conv.metadata?.call_duration_secs ?? conv.call_duration_secs ?? 0),
      charging,
    }
  } catch {
    return null
  }
}

type LogParams = {
  session_id: string
  agent_key: string
  conversation_id?: string | null
  transcript: string
  structured: unknown
  validation: { ok: boolean; errors: string[] }
  usage: Record<string, unknown>
  meta: Record<string, unknown>
  duration_secs?: number
  status: VoiceRunRecord['status']
}

export async function logVoiceRunAttempt(params: LogParams): Promise<void> {
  if (!isVoiceRunsStoreConfigured()) return
  try {
    const usage = { ...params.usage }
    if (params.conversation_id) {
      const el = await fetchElUsage(params.conversation_id)
      if (el) usage.elevenlabs = el
    }

    await saveVoiceRun({
      session_id: params.session_id,
      created_at: new Date().toISOString(),
      agent_key: params.agent_key,
      conversation_id: params.conversation_id ?? null,
      transcript: params.transcript,
      structured: params.structured,
      validation: params.validation,
      usage,
      meta: params.meta,
      duration_secs: params.duration_secs,
      status: params.status,
    })
  } catch (e) {
    console.warn('logVoiceRunAttempt failed', e)
  }
}

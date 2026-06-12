type TranscriptTurn = { role?: string; message?: string }

function formatTurn(turn: TranscriptTurn) {
  const text = turn.message?.trim()
  if (!text) return ''
  const role = turn.role === 'user' ? 'Customer' : 'Agent'
  return `${role}: ${text}`
}

export async function fetchConversationTranscript(
  apiKey: string,
  conversationId: string,
  opts?: { attempts?: number; delayMs?: number },
): Promise<string> {
  const attempts = opts?.attempts ?? 8
  const delayMs = opts?.delayMs ?? 1500

  for (let i = 0; i < attempts; i++) {
    const resp = await fetch(
      `https://api.elevenlabs.io/v1/convai/conversations/${encodeURIComponent(conversationId)}`,
      { headers: { 'xi-api-key': apiKey } },
    )
    if (!resp.ok) {
      const err = await resp.text()
      throw new Error(`ElevenLabs ${resp.status}: ${err.slice(0, 300)}`)
    }

    const conv = (await resp.json()) as {
      status?: string
      transcript?: TranscriptTurn[]
    }
    const lines = (conv.transcript ?? []).map(formatTurn).filter(Boolean)
    if (lines.length > 0) return lines.join('\n')
    if (conv.status === 'done' || conv.status === 'failed') break
    if (i < attempts - 1) await new Promise((r) => setTimeout(r, delayMs))
  }

  return ''
}

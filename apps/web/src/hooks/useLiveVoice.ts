import { useCallback, useEffect, useRef, useState } from 'react'
import { Conversation } from '@elevenlabs/client'
import type {
  DevinPayload,
  SessionUsage,
  StructuredOutput,
  ValidationResult,
  VoiceCallStatus,
} from '@/types/voice'

const LIVE_VOICE = import.meta.env.VITE_ENABLE_LIVE_VOICE === 'true'

function uuid() {
  return `jm-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

function formatTimer(secs: number) {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

export function useLiveVoice() {
  const [status, setStatus] = useState<VoiceCallStatus>('checking')
  const [hint, setHint] = useState('Allow microphone when prompted. Speak your spice list naturally.')
  const [timer, setTimer] = useState('0:00')
  const [structured, setStructured] = useState<StructuredOutput | null>(null)
  const [devin, setDevin] = useState<DevinPayload | null>(null)

  const conversationRef = useRef<Awaited<ReturnType<typeof Conversation.startSession>> | null>(null)
  const sessionIdRef = useRef('')
  const conversationIdRef = useRef('')
  const transcriptRef = useRef<string[]>([])
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const startedAtRef = useRef(0)
  const balanceRef = useRef<DevinPayload['balance']>(null)

  const stopTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current)
    timerRef.current = null
    return Math.floor((Date.now() - startedAtRef.current) / 1000)
  }, [])

  const startTimer = useCallback(() => {
    startedAtRef.current = Date.now()
    setTimer('0:00')
    timerRef.current = setInterval(() => {
      const secs = Math.floor((Date.now() - startedAtRef.current) / 1000)
      setTimer(formatTimer(secs))
    }, 1000)
  }, [])

  useEffect(() => {
    if (!LIVE_VOICE) {
      setStatus('unavailable')
      setHint('Live voice is not enabled on this deploy.')
      return
    }

    fetch('/api/voice-token')
      .then((r) => {
        if (r.status === 503) {
          setStatus('unavailable')
          setHint('Voice agent not configured on this deploy.')
          return null
        }
        return fetch('/api/usage-snapshot?balance=true')
      })
      .then((r) => r?.json())
      .then((data) => {
        if (!data) return
        balanceRef.current = data.balance ?? null
        if (data.balance && !data.balance.can_start) {
          setStatus('unavailable')
          setHint('ElevenLabs credits low. Contact S&A to top up.')
          return
        }
        setStatus('ready')
      })
      .catch(() => {
        setStatus('unavailable')
        setHint('Could not reach voice API.')
      })
  }, [])

  const startCall = useCallback(async () => {
    sessionIdRef.current = uuid()
    conversationIdRef.current = ''
    transcriptRef.current = []
    setStructured(null)
    setDevin(null)
    setStatus('connecting')
    setHint('Connecting…')

    const tokenRes = await fetch('/api/voice-token')
    const tokenData = await tokenRes.json()
    if (!tokenRes.ok) throw new Error(tokenData.error || 'voice-token failed')

    conversationRef.current = await Conversation.startSession({
      signedUrl: tokenData.signedUrl,
      onConnect: ({ conversationId: cid }) => {
        conversationIdRef.current = cid
        setStatus('live')
        setHint('Live — speak your list. Hinglish is fine.')
        startTimer()
      },
      onDisconnect: () => setStatus('extracting'),
      onMessage: (msg) => {
        const m = msg as { source?: string; message?: string; role?: string; text?: string }
        const text = m.message ?? m.text ?? ''
        if (!text) return
        const role = m.source === 'user' || m.role === 'user' ? 'Customer' : 'Agent'
        transcriptRef.current.push(`${role}: ${text}`)
      },
      onError: (err) => {
        console.error('EL error', err)
        setHint(`Error: ${String(err)}`)
      },
    })
  }, [startTimer])

  const endCall = useCallback(async () => {
    setStatus('extracting')
    setHint('Processing your order…')
    const durationSecs = stopTimer()

    if (conversationRef.current) {
      try {
        await conversationRef.current.endSession()
      } catch (e) {
        console.warn('endSession', e)
      }
      conversationRef.current = null
    }

    const transcript = transcriptRef.current.join('\n')
    const sessionUsage: SessionUsage = {}

    const extractRes = await fetch('/api/post-call-extract', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ transcript, session_id: sessionIdRef.current }),
    })
    const extractData = await extractRes.json()

    Object.assign(sessionUsage, {
      claude: extractData.usage?.claude,
      estimated_cost_usd: extractData.usage?.estimated_cost_usd,
      estimated_cost_inr: extractData.usage?.estimated_cost_inr,
    })

    if (conversationIdRef.current) {
      try {
        const usageRes = await fetch(
          `/api/usage-snapshot?conversation_id=${encodeURIComponent(conversationIdRef.current)}`,
        )
        const usageData = await usageRes.json()
        if (usageRes.ok) {
          sessionUsage.elevenlabs = {
            credits_used: usageData.credits_used,
            duration_secs: usageData.duration_secs ?? durationSecs,
            charging: usageData.charging,
          }
        }
      } catch (e) {
        console.warn('usage snapshot', e)
      }
    }

    let parsed: StructuredOutput | null = null
    let validation: ValidationResult = { ok: false, errors: ['No data'] }

    if (extractData.structured && typeof extractData.structured === 'object') {
      parsed = extractData.structured as StructuredOutput
      validation = extractData.validation ?? { ok: false, errors: [] }
      setStructured(parsed)
      setStatus('done')
      setHint(parsed ? 'Order ready — see summary below.' : 'Could not parse order.')
    } else {
      setStatus('error')
      setHint("Couldn't parse order — try again.")
    }

    setDevin({
      sessionId: sessionIdRef.current,
      conversationId: conversationIdRef.current,
      transcript,
      structured: parsed,
      validation,
      usage: sessionUsage,
      meta: extractData.meta ?? {},
      balance: balanceRef.current,
    })
  }, [stopTimer])

  const reset = useCallback(() => {
    setStructured(null)
    setDevin(null)
    setStatus(LIVE_VOICE ? 'ready' : 'unavailable')
    setHint('Allow microphone when prompted. Speak your spice list naturally.')
    setTimer('0:00')
  }, [])

  return {
    liveEnabled: LIVE_VOICE,
    status,
    hint,
    timer,
    structured,
    devin,
    startCall,
    endCall,
    reset,
    isLive: status === 'live',
    canStart: status === 'ready' || status === 'done' || status === 'error',
    canEnd: status === 'live' || status === 'connecting',
  }
}

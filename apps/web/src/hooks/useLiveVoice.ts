import { useCallback, useEffect, useRef, useState } from 'react'
import { Conversation } from '@elevenlabs/client'
import { getVoiceAgent, type VoiceAgentKey } from '@/data/voice-agents'
import type {
  DevinPayload,
  SessionUsage,
  StructuredOutput,
  ValidationResult,
  VoiceCallStatus,
} from '@/types/voice'

const LIVE_VOICE = import.meta.env.VITE_ENABLE_LIVE_VOICE === 'true'
const EXTRACT_TIMEOUT_MS = 45_000

function uuid() {
  return `jm-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

function formatTimer(secs: number) {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

function fetchWithTimeout(url: string, init: RequestInit, ms: number) {
  const controller = new AbortController()
  const timer = setTimeout(() => controller.abort(), ms)
  return fetch(url, { ...init, signal: controller.signal }).finally(() => clearTimeout(timer))
}

export function useLiveVoice(agentKey: VoiceAgentKey) {
  const agentKeyRef = useRef(agentKey)
  agentKeyRef.current = agentKey
  const agentMeta = getVoiceAgent(agentKey)

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
  const postCallStartedRef = useRef(false)

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

  const runPostCall = useCallback(async () => {
    if (postCallStartedRef.current) return
    postCallStartedRef.current = true

    setStatus('extracting')
    setHint('Processing your order… (~10s)')
    const durationSecs = stopTimer()
    const transcript = transcriptRef.current.join('\n')
    const conversationId = conversationIdRef.current
    const sessionUsage: SessionUsage = {}

    try {
      const extractRes = await fetchWithTimeout(
        '/api/post-call-extract',
        {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            transcript,
            session_id: sessionIdRef.current,
            conversation_id: conversationId || undefined,
            agent_key: agentKeyRef.current,
            duration_secs: durationSecs,
          }),
        },
        EXTRACT_TIMEOUT_MS,
      )
      const extractData = await extractRes.json()

      if (!extractRes.ok) {
        throw new Error(extractData.error || 'post-call-extract failed')
      }

      Object.assign(sessionUsage, {
        claude: extractData.usage?.claude,
        estimated_cost_usd: extractData.usage?.estimated_cost_usd,
        estimated_cost_inr: extractData.usage?.estimated_cost_inr,
      })

      let parsed: StructuredOutput | null = null
      let validation: ValidationResult = { ok: false, errors: ['No data'] }
      const displayTranscript =
        transcript ||
        (extractData.meta?.transcript_source === 'elevenlabs'
          ? '(transcript fetched server-side from ElevenLabs)'
          : '')

      if (extractData.structured && typeof extractData.structured === 'object') {
        parsed = extractData.structured as StructuredOutput
        validation = extractData.validation ?? { ok: false, errors: [] }
        setStructured(parsed)
        setStatus('done')
        setHint('Order ready — see summary below.')
      } else {
        setStatus('error')
        setHint("Couldn't parse order — try again.")
      }

      setDevin({
        sessionId: sessionIdRef.current,
        conversationId,
        transcript: displayTranscript,
        structured: parsed,
        validation,
        usage: sessionUsage,
        meta: extractData.meta ?? {},
        balance: balanceRef.current,
      })

      if (conversationId) {
        fetch(`/api/usage-snapshot?conversation_id=${encodeURIComponent(conversationId)}`)
          .then(async (r) => ({ ok: r.ok, data: await r.json() }))
          .then(({ ok, data: usageData }) => {
            if (!ok) return
            setDevin((prev) =>
              prev
                ? {
                    ...prev,
                    usage: {
                      ...prev.usage,
                      elevenlabs: {
                        credits_used: usageData.credits_used,
                        duration_secs: usageData.duration_secs ?? durationSecs,
                        charging: usageData.charging,
                      },
                    },
                  }
                : prev,
            )
            fetch('/api/voice-runs', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify({
                patch_usage: true,
                session_id: sessionIdRef.current,
                usage: {
                  elevenlabs: {
                    credits_used: usageData.credits_used,
                    duration_secs: usageData.duration_secs ?? durationSecs,
                    charging: usageData.charging,
                  },
                },
              }),
            }).catch((e) => console.warn('voice-runs patch', e))
          })
          .catch((e) => console.warn('usage snapshot', e))
      }
    } catch (e) {
      console.error('runPostCall', e)
      setStatus('error')
      setHint(
        e instanceof DOMException && e.name === 'AbortError'
          ? 'Processing timed out — try again.'
          : 'Processing failed — try again.',
      )
      setDevin({
        sessionId: sessionIdRef.current,
        conversationId,
        transcript,
        structured: null,
        validation: { ok: false, errors: [String(e)] },
        usage: sessionUsage,
        meta: {},
        balance: balanceRef.current,
      })
    }
  }, [stopTimer])

  useEffect(() => {
    if (!LIVE_VOICE) {
      setStatus('unavailable')
      setHint('Live voice is not enabled on this deploy.')
      return
    }

    setStatus('checking')
    fetch(`/api/voice-token?agent=${encodeURIComponent(agentKey)}`)
      .then((r) => {
        if (r.status === 503) {
          setStatus('unavailable')
          setHint(
            agentKey === 'meera'
              ? 'Meera agent not configured on this deploy.'
              : 'Voice agent not configured on this deploy.',
          )
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
        setHint(
          agentKey === 'meera'
            ? 'Start a call — ask inventory, new items, or give your list.'
            : 'Allow microphone when prompted. Speak your spice list naturally.',
        )
      })
      .catch(() => {
        setStatus('unavailable')
        setHint('Could not reach voice API.')
      })
  }, [agentKey])

  useEffect(() => {
    postCallStartedRef.current = false
    setStructured(null)
    setDevin(null)
    setTimer('0:00')
  }, [agentKey])

  const startCall = useCallback(async () => {
    postCallStartedRef.current = false
    sessionIdRef.current = uuid()
    conversationIdRef.current = ''
    transcriptRef.current = []
    setStructured(null)
    setDevin(null)
    setStatus('connecting')
    setHint('Connecting…')

    const tokenRes = await fetch(`/api/voice-token?agent=${encodeURIComponent(agentKeyRef.current)}`)
    const tokenData = await tokenRes.json()
    if (!tokenRes.ok) throw new Error(tokenData.error || 'voice-token failed')

    const liveHint =
      agentKeyRef.current === 'meera'
        ? 'Live with Meera — list, inventory, or pairings. Hinglish is fine.'
        : 'Live — speak your list. Hinglish is fine.'

    conversationRef.current = await Conversation.startSession({
      signedUrl: tokenData.signedUrl,
      onConnect: ({ conversationId: cid }) => {
        conversationIdRef.current = cid
        setStatus('live')
        setHint(liveHint)
        startTimer()
      },
      onDisconnect: () => {
        void runPostCall()
      },
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
  }, [startTimer, runPostCall])

  const endCall = useCallback(async () => {
    const session = conversationRef.current
    conversationRef.current = null
    if (session) {
      void Promise.race([
        session.endSession().catch((e) => console.warn('endSession', e)),
        new Promise((resolve) => setTimeout(resolve, 2500)),
      ])
    }
    await runPostCall()
  }, [runPostCall])

  const reset = useCallback(() => {
    postCallStartedRef.current = false
    setStructured(null)
    setDevin(null)
    setStatus(LIVE_VOICE ? 'ready' : 'unavailable')
    setHint(
      agentKeyRef.current === 'meera'
        ? 'Start a call — ask inventory, new items, or give your list.'
        : 'Allow microphone when prompted. Speak your spice list naturally.',
    )
    setTimer('0:00')
  }, [])

  return {
    liveEnabled: LIVE_VOICE,
    agentMeta,
    status,
    hint,
    timer,
    structured,
    devin,
    startCall,
    endCall,
    reset,
    isLive: status === 'live',
    canStart: status === 'ready' || status === 'done' || status === 'error' || status === 'extracting',
    canEnd: status === 'live' || status === 'connecting',
  }
}

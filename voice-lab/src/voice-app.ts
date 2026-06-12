import { Conversation } from '@elevenlabs/client'

type StructuredOutput = {
  order: {
    items: { sku: string; name: string; qty: number; unit: string }[]
    total: number
    customer_id?: string
  }
  inventory_delta: { sku: string; qty: number }[]
  crm_note: { type: string; summary: string }
  finance_entry: { type: string; amount: number }
}

type SessionUsage = {
  elevenlabs?: { credits_used: number; duration_secs: number; charging?: unknown }
  claude?: { input_tokens: number; output_tokens: number; total_tokens: number }
  estimated_cost_usd?: number
  estimated_cost_inr?: number
}

const $ = <T extends HTMLElement>(id: string) => document.getElementById(id) as T

let conversation: Awaited<ReturnType<typeof Conversation.startSession>> | null = null
let sessionId = ''
let conversationId = ''
let transcriptLines: string[] = []
let timerInterval: ReturnType<typeof setInterval> | null = null
let startedAt = 0
let sessionUsage: SessionUsage = {}
let lastStructured: StructuredOutput | null = null
let lastValidation: { ok: boolean; errors: string[] } = { ok: false, errors: [] }

function uuid() {
  return `jm-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`
}

function setStatus(text: string, live = false) {
  $('status-text').textContent = text
  $('status-dot').classList.toggle('live', live)
}

function show(id: string) {
  $(id).classList.remove('hidden')
}

function formatTimer(secs: number) {
  const m = Math.floor(secs / 60)
  const s = secs % 60
  return `${m}:${String(s).padStart(2, '0')}`
}

function startTimer() {
  startedAt = Date.now()
  $('timer').textContent = '0:00'
  timerInterval = setInterval(() => {
    const secs = Math.floor((Date.now() - startedAt) / 1000)
    $('timer').textContent = formatTimer(secs)
    if (secs >= 480) $('hint').textContent = '8 min — consider wrapping up soon.'
  }, 1000)
}

function stopTimer() {
  if (timerInterval) clearInterval(timerInterval)
  timerInterval = null
  return Math.floor((Date.now() - startedAt) / 1000)
}

function appendTranscript(role: string, text: string) {
  const line = `${role}: ${text}`
  transcriptLines.push(line)
  $('transcript').textContent = transcriptLines.join('\n')
  show('transcript-panel')
}

async function fetchBalance() {
  try {
    const res = await fetch('/api/usage-snapshot?balance=true')
    const data = await res.json()
    if (!res.ok) throw new Error(data.error)
    const b = data.balance
    $('balance-text').textContent = `${b.character_remaining?.toLocaleString() ?? '?'} remaining (${b.pct_remaining}% · tier ${b.tier ?? '—'})`
    if (!b.can_start) {
      $('btn-start').disabled = true
      $('hint').textContent = 'ElevenLabs credits low. Top up before starting.'
    }
    return b
  } catch (e) {
    $('balance-text').textContent = 'Could not load balance'
    console.warn(e)
    return null
  }
}

function renderCredits(usage: SessionUsage) {
  const el = usage.elevenlabs?.credits_used ?? 0
  const cin = usage.claude?.input_tokens ?? 0
  const cout = usage.claude?.output_tokens ?? 0
  const inr = usage.estimated_cost_inr ?? 0

  $('credits-line').textContent = `EL ${el} credits · Claude ${cin} in / ${cout} out · ~₹${inr}`
  $('credits-detail').innerHTML = `
    <dt>ElevenLabs</dt><dd>${el} credits · ${usage.elevenlabs?.duration_secs ?? 0}s call</dd>
    <dt>Claude</dt><dd>${cin} + ${cout} tokens · $${(usage.estimated_cost_usd ?? 0).toFixed(4)}</dd>
  `
  show('credits-panel')
}

function renderBill(structured: StructuredOutput) {
  const items = structured.order?.items ?? []
  $('bill-items').innerHTML = items
    .map(
      (i) =>
        `<li><span>${i.qty} ${i.unit} ${i.name}</span><span>${i.sku}</span></li>`,
    )
    .join('')
  $('bill-total').textContent = `Total ₹${structured.order?.total?.toLocaleString('en-IN') ?? 0}`
  show('bill-panel')
}

async function handlePostCall(durationSecs: number) {
  setStatus('Extracting order…')
  const transcript = transcriptLines.join('\n')

  const extractRes = await fetch('/api/post-call-extract', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ transcript, session_id: sessionId }),
  })
  const extractData = await extractRes.json()

  sessionUsage = {
    ...sessionUsage,
    claude: extractData.usage?.claude,
    estimated_cost_usd: extractData.usage?.estimated_cost_usd,
    estimated_cost_inr: extractData.usage?.estimated_cost_inr,
  }

  if (conversationId) {
    try {
      const usageRes = await fetch(`/api/usage-snapshot?conversation_id=${encodeURIComponent(conversationId)}`)
      const usageData = await usageRes.json()
      if (usageRes.ok) {
        sessionUsage.elevenlabs = {
          credits_used: usageData.credits_used,
          duration_secs: usageData.duration_secs ?? durationSecs,
          charging: usageData.charging,
        }
      }
    } catch (e) {
      console.warn('usage snapshot failed', e)
    }
  }

  renderCredits(sessionUsage)

  if (extractData.structured && typeof extractData.structured === 'object') {
    lastStructured = extractData.structured as StructuredOutput
    lastValidation = extractData.validation ?? { ok: false, errors: [] }
    renderBill(lastStructured)
    $('json-out').textContent = JSON.stringify(extractData, null, 2)
    show('json-panel')
    show('feedback-panel')

    if (!lastValidation.ok) {
      $('validation-error').textContent = `Validation: ${lastValidation.errors.join(', ')}`
      $('validation-error').classList.remove('hidden')
    } else {
      $('validation-error').classList.add('hidden')
    }
  } else {
    $('validation-error').textContent = 'Extraction failed — see transcript'
    $('validation-error').classList.remove('hidden')
  }

  await fetch('/api/save-run', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      session_id: sessionId,
      transcript,
      structured: lastStructured,
      validation: lastValidation,
      usage: sessionUsage,
      meta: extractData.meta,
      duration_s: durationSecs,
    }),
  })

  setStatus('Done — review order below')
  await fetchBalance()
}

async function startCall() {
  sessionId = uuid()
  transcriptLines = []
  conversationId = ''
  sessionUsage = {}
  lastStructured = null
  $('validation-error').classList.add('hidden')
  ;['transcript-panel', 'bill-panel', 'credits-panel', 'feedback-panel', 'json-panel'].forEach((id) =>
    $(id).classList.add('hidden'),
  )

  setStatus('Connecting…')
  $('btn-start').disabled = true
  $('btn-end').disabled = false

  const tokenRes = await fetch('/api/voice-token')
  const tokenData = await tokenRes.json()
  if (!tokenRes.ok) throw new Error(tokenData.error || 'voice-token failed')

  conversation = await Conversation.startSession({
    signedUrl: tokenData.signedUrl,
    onConnect: ({ conversationId: cid }) => {
      conversationId = cid
      setStatus('Live — speak your list', true)
      startTimer()
    },
    onDisconnect: () => {
      setStatus('Disconnected')
    },
    onMessage: (msg) => {
      const m = msg as { source?: string; message?: string; role?: string; text?: string }
      const text = m.message ?? m.text ?? ''
      if (!text) return
      const role = m.source === 'user' || m.role === 'user' ? 'Customer' : 'Agent'
      appendTranscript(role, text)
    },
    onError: (err) => {
      console.error('EL error', err)
      $('hint').textContent = `Error: ${String(err)}`
    },
  })
}

async function endCall() {
  $('btn-end').disabled = true
  const durationSecs = stopTimer()

  if (conversation) {
    try {
      await conversation.endSession()
    } catch (e) {
      console.warn('endSession', e)
    }
    conversation = null
  }

  await handlePostCall(durationSecs)
  $('btn-start').disabled = false
}

async function submitFeedback(score: number) {
  await fetch('/api/save-run', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      session_id: sessionId,
      transcript: transcriptLines.join('\n'),
      structured: lastStructured,
      validation: lastValidation,
      usage: sessionUsage,
      meta: {},
      duration_s: Math.floor((Date.now() - startedAt) / 1000),
      outcome_score: score,
    }),
  })
  $('feedback-panel').querySelector('.btn-row')!.innerHTML = '<p class="hint">Thanks — logged.</p>'
}

$('btn-start').addEventListener('click', () => {
  startCall().catch((e) => {
    setStatus('Failed to start')
    $('hint').textContent = String(e)
    $('btn-start').disabled = false
    $('btn-end').disabled = true
  })
})

$('btn-end').addEventListener('click', () => {
  endCall().catch((e) => {
    $('hint').textContent = String(e)
    $('btn-start').disabled = false
  })
})

$('btn-up').addEventListener('click', () => submitFeedback(5))
$('btn-down').addEventListener('click', () => submitFeedback(1))

fetchBalance()

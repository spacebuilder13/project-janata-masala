import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeRise } from '../sandy/motion'
import { matchChatResponse, suggestedPrompts } from '@/data/chat-memory'

type Message = { role: 'user' | 'assistant'; content: string }

const LIVE_CHAT = import.meta.env.VITE_ENABLE_LIVE_CHAT === 'true'

export default function ChatAgent() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Ask about JM WhatsApp campaigns, the benchmark stack, phase deliverables, or Agentic CRM. Offline mode — grounded in NLM research.' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const send = async (text?: string) => {
    const userMsg = (text ?? input).trim()
    if (!userMsg || loading) return
    setInput('')
    const next: Message[] = [...messages, { role: 'user', content: userMsg }]
    setMessages(next)
    setLoading(true)

    if (LIVE_CHAT) {
      try {
        const res = await fetch('/api/chat', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ messages: next }) })
        const data = await res.json()
        setMessages([...next, { role: 'assistant', content: data.reply ?? matchChatResponse(userMsg) }])
      } catch {
        setMessages([...next, { role: 'assistant', content: matchChatResponse(userMsg) }])
      }
    } else {
      await new Promise((r) => setTimeout(r, 400))
      setMessages([...next, { role: 'assistant', content: matchChatResponse(userMsg) }])
    }
    setLoading(false)
  }

  return (
    <motion.div variants={fadeRise} className="flex flex-col h-[520px] rounded-2xl border overflow-hidden" style={{ borderColor: 'var(--color-sandy-line)', background: 'var(--color-sandy-surface)' }}>
      <div className="px-4 py-3 border-b mono text-[11px]" style={{ borderColor: 'var(--color-sandy-line)', color: 'var(--color-jm-spice)' }}>
        ChatAgent · {LIVE_CHAT ? 'Claude live' : 'Offline knowledge'}
      </div>
      <div className="flex flex-wrap gap-2 p-3 border-b" style={{ borderColor: 'var(--color-sandy-line)' }}>
        {suggestedPrompts.slice(0, 4).map((p) => (
          <button key={p} type="button" className="px-2.5 py-1 rounded-full border mono text-[10px]" style={{ borderColor: 'var(--color-sandy-line)', color: 'var(--color-sandy-ink-soft)' }} onClick={() => send(p)}>
            {p}
          </button>
        ))}
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div key={i} className={`text-sm px-4 py-2.5 rounded-2xl max-w-[90%] ${m.role === 'user' ? 'ml-auto' : ''}`} style={{ background: m.role === 'user' ? 'var(--color-sandy-ink)' : 'var(--color-sandy-elevated)', color: m.role === 'user' ? 'var(--color-sandy-bg)' : 'var(--color-sandy-ink-soft)' }}>
            {m.content}
          </div>
        ))}
        {loading && <p className="mono text-[11px]" style={{ color: 'var(--color-sandy-ink-faint)' }}>Thinking…</p>}
      </div>
      <div className="p-3 border-t flex gap-2" style={{ borderColor: 'var(--color-sandy-line)' }}>
        <input className="flex-1 px-3 py-2 rounded-xl border text-sm outline-none" style={{ borderColor: 'var(--color-sandy-line)', background: 'var(--color-sandy-elevated)' }} value={input} onChange={(e) => setInput(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && send()} placeholder="Ask about JM strategy…" />
        <button type="button" className="px-4 py-2 rounded-xl mono text-[11px]" style={{ background: 'var(--color-jm-spice)', color: 'white' }} onClick={() => send()} disabled={loading}>Send</button>
      </div>
    </motion.div>
  )
}

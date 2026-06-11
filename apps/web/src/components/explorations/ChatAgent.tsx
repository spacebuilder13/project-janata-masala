import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeRise } from '../sandy/motion'

type Message = { role: 'user' | 'assistant'; content: string }

const FALLBACK_REPLIES: Record<string, string> = {
  default: 'Configure ANTHROPIC_API_KEY in Vercel to enable live ChatAgent. For now: JM WhatsApp campaigns should focus on catalog carousels, bulk-order buttons, and post-delivery feedback flows tied to inventory and CRM.',
  whatsapp: 'For JM WhatsApp: start with a masala catalog carousel (top 3 SKUs), bulk-order reply buttons for distributors, and order confirmation messages that sync to your order management system.',
  voice: 'Voice demo scenario: customer calls to place a 50kg Garam Masala order. Post-call, Claude extracts order items, inventory delta, CRM note, and finance receivable entry.',
}

export default function ChatAgent() {
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: 'Ask me about Janata Masala WhatsApp campaigns, voice ordering, or agentic commerce architecture.' },
  ])
  const [input, setInput] = useState('')
  const [loading, setLoading] = useState(false)

  const send = async () => {
    if (!input.trim() || loading) return
    const userMsg = input.trim()
    setInput('')
    const next: Message[] = [...messages, { role: 'user', content: userMsg }]
    setMessages(next)
    setLoading(true)

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: next }),
      })
      const data = await res.json()
      const reply = data.reply ?? data.fallback ?? FALLBACK_REPLIES.default
      setMessages([...next, { role: 'assistant', content: reply }])
    } catch {
      const key = userMsg.toLowerCase().includes('whatsapp') ? 'whatsapp' : userMsg.toLowerCase().includes('voice') ? 'voice' : 'default'
      setMessages([...next, { role: 'assistant', content: FALLBACK_REPLIES[key] }])
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      variants={fadeRise}
      className="flex flex-col h-[420px] rounded-2xl border overflow-hidden"
      style={{ borderColor: 'var(--color-sandy-line)', background: 'var(--color-sandy-surface)' }}
    >
      <div className="px-4 py-3 border-b mono text-[10px]" style={{ borderColor: 'var(--color-sandy-line)', color: 'var(--color-jm-spice)' }}>
        ChatAgent · Claude
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`text-sm px-4 py-2.5 rounded-2xl max-w-[85%] ${m.role === 'user' ? 'ml-auto' : ''}`}
            style={{
              background: m.role === 'user' ? 'var(--color-sandy-ink)' : 'var(--color-sandy-elevated)',
              color: m.role === 'user' ? 'var(--color-sandy-bg)' : 'var(--color-sandy-ink-soft)',
            }}
          >
            {m.content}
          </div>
        ))}
        {loading && <p className="mono text-[10px]" style={{ color: 'var(--color-sandy-ink-faint)' }}>Thinking…</p>}
      </div>
      <div className="p-3 border-t flex gap-2" style={{ borderColor: 'var(--color-sandy-line)' }}>
        <input
          className="flex-1 px-3 py-2 rounded-xl border text-sm outline-none"
          style={{ borderColor: 'var(--color-sandy-line)', background: 'var(--color-sandy-elevated)' }}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && send()}
          placeholder="Ask about JM campaigns, voice, architecture…"
        />
        <button
          type="button"
          className="px-4 py-2 rounded-xl mono text-[10px]"
          style={{ background: 'var(--color-jm-spice)', color: 'white' }}
          onClick={send}
          disabled={loading}
        >
          Send
        </button>
      </div>
    </motion.div>
  )
}

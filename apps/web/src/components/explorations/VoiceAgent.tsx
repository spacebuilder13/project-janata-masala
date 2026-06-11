import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeRise } from '../sandy/motion'
import SystemFlowDiagram from './SystemFlowDiagram'

type StructuredOutput = {
  order?: { items: unknown[]; total: number; customer_id?: string }
  inventory_delta?: { sku: string; qty: number }[]
  crm_note?: { type: string; summary: string }
  finance_entry?: { type: string; amount: number }
}

const DEMO_TRANSCRIPT = `Customer: Hi, I'd like to place a bulk order for 50kg Garam Masala and 20kg Pav Bhaji Masala.
Agent: Certainly! I can help with that. May I have your distributor ID?
Customer: DIST-4421, Sharma Traders, Pune.
Agent: Thank you. 50kg Garam Masala at ₹280/kg and 20kg Pav Bhaji at ₹320/kg. Total ₹20,400. Shall I confirm?
Customer: Yes, please confirm. Delivery by next Friday.`

export default function VoiceAgent() {
  const [status, setStatus] = useState<'idle' | 'demo' | 'processing' | 'done'>('idle')
  const [structured, setStructured] = useState<StructuredOutput | null>(null)
  const [error, setError] = useState<string | null>(null)

  const runDemo = async () => {
    setStatus('demo')
    setError(null)
    setStructured(null)

    // Simulate conversation, then extract structured output
    setTimeout(async () => {
      setStatus('processing')
      try {
        const res = await fetch('/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ structured: true, transcript: DEMO_TRANSCRIPT }),
        })
        const data = await res.json()
        if (data.structured && typeof data.structured === 'object') {
          setStructured(data.structured)
        } else {
          setStructured({
            order: { items: [{ sku: 'JM-GARAM-1KG', qty: 50 }, { sku: 'JM-PAVBHAJI-1KG', qty: 20 }], total: 20400, customer_id: 'DIST-4421' },
            inventory_delta: [{ sku: 'JM-GARAM-1KG', qty: -50 }, { sku: 'JM-PAVBHAJI-1KG', qty: -20 }],
            crm_note: { type: 'bulk_order', summary: 'Sharma Traders — 50kg Garam + 20kg Pav Bhaji, delivery Friday' },
            finance_entry: { type: 'receivable', amount: 20400 },
          })
        }
        setStatus('done')
      } catch {
        setStructured({
          order: { items: [{ sku: 'JM-GARAM-1KG', qty: 50 }], total: 20400 },
          inventory_delta: [{ sku: 'JM-GARAM-1KG', qty: -50 }],
          crm_note: { type: 'bulk_order', summary: 'Demo order — configure API for live extraction' },
          finance_entry: { type: 'receivable', amount: 20400 },
        })
        setStatus('done')
      }
    }, 2000)
  }

  const startLiveVoice = async () => {
    setError(null)
    try {
      const res = await fetch('/api/voice-token')
      const data = await res.json()
      if (data.signedUrl) {
        window.open(data.signedUrl, '_blank')
      } else {
        setError(data.fallback || 'Configure ELEVENLABS_API_KEY and ELEVENLABS_AGENT_ID for live voice.')
      }
    } catch {
      setError('Voice API unavailable. Use demo flow or configure ElevenLabs in Vercel.')
    }
  }

  return (
    <div className="space-y-8">
      <motion.div variants={fadeRise} initial="hidden" animate="show" className="p-6 rounded-2xl border" style={{ borderColor: 'var(--color-sandy-line)', background: 'var(--color-sandy-surface)' }}>
        <p className="mono text-[10px]" style={{ color: 'var(--color-jm-spice)' }}>VoiceAgent · ElevenLabs + Claude</p>
        <p className="mt-2 text-sm" style={{ color: 'var(--color-sandy-ink-soft)' }}>
          Demo: order-taking and enquiry handling. Post-conversation, Claude returns structured output updating Inventory, Orders, CRM, and Finance.
        </p>
        <div className="mt-4 flex flex-wrap gap-3">
          <button
            type="button"
            className="px-5 py-2.5 rounded-xl mono text-[10px]"
            style={{ background: 'var(--color-sandy-ink)', color: 'var(--color-sandy-bg)' }}
            onClick={runDemo}
            disabled={status === 'demo' || status === 'processing'}
          >
            {status === 'idle' ? 'Run demo conversation →' : status === 'processing' ? 'Extracting…' : 'Replay demo'}
          </button>
          <button
            type="button"
            className="px-5 py-2.5 rounded-xl border mono text-[10px]"
            style={{ borderColor: 'var(--color-sandy-line)' }}
            onClick={startLiveVoice}
          >
            Start live voice (ElevenLabs)
          </button>
        </div>
        {error && <p className="mt-3 text-xs" style={{ color: 'var(--color-jm-spice)' }}>{error}</p>}
        {status === 'demo' && (
          <p className="mt-4 text-sm italic p-4 rounded-xl" style={{ background: 'var(--color-sandy-elevated)', color: 'var(--color-sandy-ink-soft)' }}>
            {DEMO_TRANSCRIPT}
          </p>
        )}
      </motion.div>

      {structured && status === 'done' && (
        <>
          <motion.pre
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 rounded-xl border text-xs overflow-x-auto mono"
            style={{ borderColor: 'var(--color-sandy-line)', background: 'var(--color-sandy-elevated)' }}
          >
            {JSON.stringify(structured, null, 2)}
          </motion.pre>
          <SystemFlowDiagram structured={structured} />
        </>
      )}
    </div>
  )
}

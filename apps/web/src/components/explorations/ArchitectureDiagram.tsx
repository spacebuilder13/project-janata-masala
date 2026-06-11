import { useState } from 'react'
import { motion } from 'framer-motion'
import DiagramLoop from '../sandy/DiagramLoop'
import DiagramQuadrant from '../sandy/DiagramQuadrant'
import { fadeRise } from '../sandy/motion'
import { benchmarks } from '@/data/benchmarks'

const AGENTS = [
  { name: 'Customer (Voice / WhatsApp)', tip: 'List-dump in chat or voice call — primary intake channels' },
  { name: 'Voice Intake Agent', tip: 'ElevenLabs + Claude — order-taking, enquiry handling' },
  { name: 'Orchestrator (Claude)', tip: 'Structured JSON extraction → routes to domain agents' },
  { name: 'Inventory Agent', tip: 'SKU qty deltas, stock checks, 13mm kaju tracking' },
  { name: 'Order Mgmt Agent', tip: 'Order creation, billing, delivery scheduling' },
  { name: 'CRM Agent', tip: 'Segment notes, birthdays, product affinity' },
  { name: 'Finance Agent', tip: 'Receivables, payment link reconciliation' },
]

const SYSTEMS = ['Inventory DB', 'Order DB', 'CRM', 'Finance / Tally']

const phaseAgents: Record<number, number[]> = {
  1: [0, 1],
  2: [0, 1, 2, 3, 4],
  3: [0, 1, 2, 3, 4, 5, 6],
}

export default function ArchitectureDiagram() {
  const [phase, setPhase] = useState<1 | 2 | 3>(1)
  const [activeAgent, setActiveAgent] = useState(-1)
  const [hoverTip, setHoverTip] = useState<string | null>(null)

  const animate = () => {
    const indices = phaseAgents[phase]
    setActiveAgent(-1)
    indices.forEach((idx, i) => setTimeout(() => setActiveAgent(idx), i * 600))
  }

  const agentNames = AGENTS.map((a) => a.name)

  return (
    <div className="space-y-10">
      <div className="flex flex-wrap gap-2">
        {([1, 2, 3] as const).map((p) => (
          <button
            key={p}
            type="button"
            className="px-4 py-2 rounded-xl mono text-[11px] border"
            style={{
              background: phase === p ? 'var(--color-jm-spice)' : 'transparent',
              color: phase === p ? 'white' : 'var(--color-sandy-ink-soft)',
              borderColor: 'var(--color-sandy-line)',
            }}
            onClick={() => { setPhase(p); setActiveAgent(-1) }}
          >
            Phase {p}
          </button>
        ))}
        <button type="button" className="px-4 py-2 rounded-xl mono text-[11px]" style={{ background: 'var(--color-sandy-ink)', color: 'var(--color-sandy-bg)' }} onClick={animate}>
          Animate flow →
        </button>
      </div>

      <motion.div variants={fadeRise} initial="hidden" animate="show">
        <p className="mono text-[11px] mb-4" style={{ color: 'var(--color-jm-spice)' }}>Benchmark stack</p>
        <div className="grid md:grid-cols-3 gap-4 mb-8">
          {benchmarks.map((b) => (
            <div key={b.id} className="p-4 rounded-xl border text-sm" style={{ borderColor: 'var(--color-sandy-line)', background: 'var(--color-sandy-elevated)' }}>
              <span className="mono text-[10px]" style={{ color: 'var(--color-jm-spice)' }}>{b.jmPhase}</span>
              <p className="font-medium mt-1">{b.name}</p>
              <p className="text-xs mt-1" style={{ color: 'var(--color-sandy-ink-soft)' }}>{b.lesson}</p>
            </div>
          ))}
        </div>
      </motion.div>

      <DiagramQuadrant
        xLabel="Tech sophistication"
        yLabel="Brand premium"
        points={[
          { label: 'Janta Stores', x: 'low', y: 'low' },
          { label: 'Janata Masala (now)', x: 'low', y: 'high', active: true },
          { label: 'CDS WPI', x: 'low', y: 'high' },
          { label: 'Rupsub', x: 'high', y: 'low' },
        ]}
      />

      <div onMouseLeave={() => setHoverTip(null)}>
        <DiagramLoop nodes={agentNames} activeIndex={activeAgent} centerText={hoverTip ?? 'Agentic commerce for Janata Masala — hover nodes in Phase 3 view for details.'} />
        {phase === 3 && (
          <div className="mt-4 flex flex-wrap gap-2">
            {AGENTS.map((a, i) => (
              <button
                key={a.name}
                type="button"
                className="text-xs px-2 py-1 rounded border"
                style={{ borderColor: 'var(--color-sandy-line)' }}
                onMouseEnter={() => setHoverTip(a.tip)}
              >
                {i + 1}. {a.name.split(' ')[0]}
              </button>
            ))}
          </div>
        )}
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {SYSTEMS.map((s, i) => (
          <div
            key={s}
            className="p-4 rounded-xl border text-center text-sm transition-all duration-500"
            style={{
              borderColor: activeAgent >= 3 + Math.min(i, 3) ? 'var(--color-jm-spice)' : 'var(--color-sandy-line)',
              background: activeAgent >= 3 + Math.min(i, 3) ? 'var(--color-sandy-gold-wash)' : 'var(--color-sandy-surface)',
            }}
          >
            {s}
          </div>
        ))}
      </div>
    </div>
  )
}

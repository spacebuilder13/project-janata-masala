import { useState } from 'react'
import { motion } from 'framer-motion'
import DiagramLoop from '../sandy/DiagramLoop'
import { fadeRise } from '../sandy/motion'

const AGENTS = [
  'Customer (Voice / WhatsApp)',
  'Voice Intake Agent',
  'Orchestrator (Claude)',
  'Inventory Agent',
  'Order Mgmt Agent',
  'CRM Agent',
  'Finance Agent',
]

const SYSTEMS = ['Inventory DB', 'Order DB', 'CRM', 'Finance / Tally']

export default function ArchitectureDiagram() {
  const [activeAgent, setActiveAgent] = useState(-1)

  const animate = () => {
    setActiveAgent(0)
    AGENTS.forEach((_, i) => {
      setTimeout(() => setActiveAgent(i), i * 600)
    })
  }

  return (
    <div className="space-y-10">
      <motion.div variants={fadeRise} initial="hidden" animate="show">
        <button
          type="button"
          className="mb-6 px-4 py-2 rounded-xl mono text-[10px]"
          style={{ background: 'var(--color-jm-spice)', color: 'white' }}
          onClick={animate}
        >
          Animate flow →
        </button>
        <DiagramLoop
          nodes={AGENTS}
          activeIndex={activeAgent}
          centerText="Agentic commerce for Janata Masala — multiple specialized agents orchestrated by Claude, updating back-office systems in real time."
        />
      </motion.div>

      <motion.div
        variants={fadeRise}
        initial="hidden"
        animate="show"
        className="grid grid-cols-2 md:grid-cols-4 gap-4"
      >
        {SYSTEMS.map((s, i) => (
          <div
            key={s}
            className="p-4 rounded-xl border text-center text-sm transition-all duration-500"
            style={{
              borderColor: activeAgent >= 3 + i ? 'var(--color-jm-spice)' : 'var(--color-sandy-line)',
              background: activeAgent >= 3 + i ? 'var(--color-sandy-gold-wash)' : 'var(--color-sandy-surface)',
            }}
          >
            {s}
          </div>
        ))}
      </motion.div>

      <motion.div
        variants={fadeRise}
        className="p-6 rounded-2xl border text-sm"
        style={{ borderColor: 'var(--color-sandy-line)', background: 'var(--color-sandy-elevated)', color: 'var(--color-sandy-ink-soft)' }}
      >
        <p className="mono text-[10px] mb-3" style={{ color: 'var(--color-jm-spice)' }}>Target state</p>
        <p>
          WhatsApp and voice channels feed a unified orchestrator. Each agent owns a domain — catalogue, inventory, orders, CRM, finance — with structured tool calls and webhook integrations to JM&apos;s existing systems.
        </p>
      </motion.div>
    </div>
  )
}

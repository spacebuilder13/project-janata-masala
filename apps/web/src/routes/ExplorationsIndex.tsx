import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import { fadeRise, stagger } from '@/components/sandy/motion'

const modules = [
  { to: '/home/explorations/brand' as const, title: 'Brand & Content', desc: 'Heritage authority, workshop system, sensory storytelling, performance marketing' },
  { to: '/home/explorations/whatsapp' as const, title: 'WhatsApp + ChatAgent', desc: '11 campaign patterns + offline knowledge agent' },
  { to: '/home/explorations/voice' as const, title: 'VoiceAgent + System Flow', desc: 'Scripted conversations with structured back-office output' },
  { to: '/home/explorations/architecture' as const, title: 'Agentic Commerce Architecture', desc: 'Benchmark stack, phase overlay, multi-agent diagram' },
]

export default function ExplorationsIndex() {
  return (
    <div className="px-6 py-12 md:px-12 max-w-4xl mx-auto">
      <motion.div initial="hidden" animate="show" variants={{ show: { transition: stagger(0.08) } }}>
        <motion.p variants={fadeRise} className="mono" style={{ color: 'var(--color-sandy-gold)' }}>02 — Explorations</motion.p>
        <motion.h1 variants={fadeRise} className="serif text-4xl mt-3">What can we find during the adventure</motion.h1>
        <motion.p variants={fadeRise} className="mt-4 text-sm max-w-xl" style={{ color: 'var(--color-sandy-ink-soft)' }}>
          Demos and prototypes — WhatsApp, voice, and the architecture that powers agentic commerce for Janata Masala.
        </motion.p>
        <div className="mt-10 space-y-4">
          {modules.map((m) => (
            <motion.div key={m.to} variants={fadeRise}>
              <Link
                to={m.to}
                className="block p-6 rounded-2xl border transition-all hover:scale-[1.005]"
                style={{ background: 'var(--color-sandy-surface)', borderColor: 'var(--color-sandy-line)' }}
              >
                <h2 className="serif text-xl">{m.title}</h2>
                <p className="mt-2 text-sm" style={{ color: 'var(--color-sandy-ink-soft)' }}>{m.desc}</p>
                <span className="inline-block mt-4 mono text-[10px]" style={{ color: 'var(--color-sandy-ink-faint)' }}>Open →</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

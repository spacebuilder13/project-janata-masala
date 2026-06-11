import { Link } from '@tanstack/react-router'
import { motion } from 'framer-motion'
import LivingLines from '@/components/sandy/LivingLines'
import { fadeRise, stagger } from '@/components/sandy/motion'

const sections = [
  {
    to: '/home/adventure' as const,
    eyebrow: '01 — The journey',
    title: 'Getting ready for an adventure of a lifetime',
    subtitle: 'Moderning Janata Masala',
    description: 'Meetings, discussion points, decisions, and scope — your shared modernization journey with the S&A team.',
    accent: 'var(--color-jm-spice)',
  },
  {
    to: '/home/explorations' as const,
    eyebrow: '02 — What we find',
    title: 'What can we find during the adventure',
    subtitle: 'Explorations',
    description: 'WhatsApp campaigns, voice order-taking, and agentic commerce architecture — demos in JM context.',
    accent: 'var(--color-sandy-gold)',
  },
]

export default function Home() {
  return (
    <div className="relative min-h-[calc(100dvh-65px)] px-6 py-12 md:px-12 md:py-16 max-w-5xl mx-auto">
      <div className="absolute inset-0 opacity-25 pointer-events-none">
        <LivingLines />
      </div>

      <motion.div initial="hidden" animate="show" variants={{ show: { transition: stagger(0.1) } }}>
        <motion.p variants={fadeRise} className="mono" style={{ color: 'var(--color-jm-spice)' }}>
          S&A × Janata Masala
        </motion.p>
        <motion.h1 variants={fadeRise} className="serif text-4xl md:text-5xl mt-3 max-w-2xl leading-tight">
          Welcome to the adventure.
        </motion.h1>
        <motion.p variants={fadeRise} className="mt-4 text-base max-w-xl" style={{ color: 'var(--color-sandy-ink-soft)' }}>
          A living workspace for modernizing Janata Masala — grounded in your conversations, powered by agentic commerce.
        </motion.p>

        <div className="mt-12 grid gap-6 md:grid-cols-2">
          {sections.map((s) => (
            <motion.div key={s.to} variants={fadeRise}>
              <Link
                to={s.to}
                className="block p-8 rounded-3xl border transition-all hover:scale-[1.01] hover:shadow-lg"
                style={{
                  background: 'var(--color-sandy-surface)',
                  borderColor: 'var(--color-sandy-line)',
                  boxShadow: 'var(--shadow-card)',
                }}
              >
                <span className="mono text-[10px]" style={{ color: s.accent }}>{s.eyebrow}</span>
                <h2 className="serif text-2xl mt-3">{s.title}</h2>
                <p className="serif text-lg mt-1" style={{ color: s.accent }}>{s.subtitle}</p>
                <p className="mt-4 text-sm" style={{ color: 'var(--color-sandy-ink-soft)' }}>{s.description}</p>
                <span className="inline-block mt-6 mono text-[10px]" style={{ color: 'var(--color-sandy-ink-faint)' }}>
                  Explore →
                </span>
              </Link>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

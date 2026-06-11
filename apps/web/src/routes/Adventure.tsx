import { motion } from 'framer-motion'
import { fadeRise, stagger } from '@/components/sandy/motion'
import { meetings, openQuestions, scopeItems } from '@/data/adventure'

const statusColors = {
  planned: 'var(--color-sandy-ink-faint)',
  'in-progress': 'var(--color-jm-spice)',
  done: 'var(--color-sandy-tea)',
}

export default function Adventure() {
  return (
    <div className="px-6 py-12 md:px-12 md:py-16 max-w-4xl mx-auto">
      <motion.div initial="hidden" animate="show" variants={{ show: { transition: stagger(0.08) } }}>
        <motion.p variants={fadeRise} className="mono" style={{ color: 'var(--color-jm-spice)' }}>01 — Adventure</motion.p>
        <motion.h1 variants={fadeRise} className="serif text-4xl md:text-5xl mt-3">
          Moderning Janata Masala
        </motion.h1>
        <motion.p variants={fadeRise} className="mt-4 text-base max-w-2xl" style={{ color: 'var(--color-sandy-ink-soft)' }}>
          Getting ready for an adventure of a lifetime — meetings, decisions, and scope with the Spaceships & Atoms team.
        </motion.p>

        {/* Journey banner */}
        <motion.div
          variants={fadeRise}
          className="mt-10 p-8 rounded-3xl border relative overflow-hidden"
          style={{ borderColor: 'var(--color-sandy-line)', background: 'var(--color-sandy-gold-wash)' }}
        >
          <div className="absolute inset-0 bg-graph-paper opacity-30" />
          <div className="relative">
            <p className="mono text-[10px]" style={{ color: 'var(--color-jm-spice)' }}>The journey begins</p>
            <p className="serif text-2xl mt-2">S&A team × Janata Masala</p>
            <p className="mt-2 text-sm" style={{ color: 'var(--color-sandy-ink-soft)' }}>
              From spice heritage to agentic commerce — building the future of JM together.
            </p>
          </div>
        </motion.div>

        {/* Meetings */}
        <motion.h2 variants={fadeRise} className="serif text-2xl mt-16">Meetings</motion.h2>
        <div className="mt-6 space-y-6">
          {meetings.map((m) => (
            <motion.article
              key={m.id}
              variants={fadeRise}
              className="p-6 rounded-2xl border"
              style={{ background: 'var(--color-sandy-surface)', borderColor: 'var(--color-sandy-line)' }}
            >
              <div className="flex flex-wrap items-baseline gap-3">
                <span className="mono text-[10px]" style={{ color: 'var(--color-sandy-ink-faint)' }}>{m.date}</span>
                <h3 className="serif text-xl">{m.title}</h3>
              </div>
              <p className="mt-2 text-sm" style={{ color: 'var(--color-sandy-ink-soft)' }}>{m.summary}</p>
              <p className="mt-3 mono text-[10px]" style={{ color: 'var(--color-sandy-ink-faint)' }}>
                {m.attendees.join(' · ')}
              </p>
              {m.decisions.length > 0 && (
                <div className="mt-4">
                  <p className="mono text-[10px] mb-2" style={{ color: 'var(--color-jm-spice)' }}>Decisions</p>
                  <ul className="space-y-1 text-sm" style={{ color: 'var(--color-sandy-ink-soft)' }}>
                    {m.decisions.map((d) => <li key={d}>• {d}</li>)}
                  </ul>
                </div>
              )}
              {m.actions.length > 0 && (
                <div className="mt-4 flex flex-wrap gap-2">
                  {m.actions.map((a) => (
                    <span
                      key={a.item}
                      className="px-3 py-1.5 rounded-full border text-xs"
                      style={{ borderColor: 'var(--color-sandy-line)', background: 'var(--color-sandy-elevated)' }}
                    >
                      <strong>{a.owner}:</strong> {a.item}
                    </span>
                  ))}
                </div>
              )}
            </motion.article>
          ))}
        </div>

        {/* Scope tracker */}
        <motion.h2 variants={fadeRise} className="serif text-2xl mt-16">Scope</motion.h2>
        <div className="mt-6 space-y-3">
          {scopeItems.map((s) => (
            <motion.div
              key={s.id}
              variants={fadeRise}
              className="flex items-start gap-4 p-4 rounded-xl border"
              style={{ background: 'var(--color-sandy-surface)', borderColor: 'var(--color-sandy-line)' }}
            >
              <span className="mono text-[10px] mt-1 shrink-0" style={{ color: statusColors[s.status] }}>{s.status}</span>
              <div>
                <p className="font-medium text-sm">{s.area}</p>
                <p className="text-sm mt-1" style={{ color: 'var(--color-sandy-ink-soft)' }}>{s.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Open questions */}
        <motion.h2 variants={fadeRise} className="serif text-2xl mt-16">Open questions</motion.h2>
        <motion.ul variants={fadeRise} className="mt-6 space-y-2">
          {openQuestions.map((q) => (
            <li key={q} className="text-sm px-4 py-3 rounded-xl border" style={{ borderColor: 'var(--color-sandy-line)', color: 'var(--color-sandy-ink-soft)' }}>
              ? {q}
            </li>
          ))}
        </motion.ul>
      </motion.div>
    </div>
  )
}

import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeRise, stagger } from '@/components/sandy/motion'
import { JM_WA_PATTERNS } from '@/data/whatsapp'
import ChatAgent from '@/components/explorations/ChatAgent'

const TAGS = ['all', 'catalog', 'B2B', 'conversion', 'trust', 'brand', 'CRM', 'promotion'] as const

export default function ExplorationsWhatsapp() {
  const [tag, setTag] = useState<string>('all')
  const filtered = JM_WA_PATTERNS.filter((p) => tag === 'all' || p.tags.includes(tag))

  return (
    <div className="px-6 py-12 md:px-12 max-w-6xl mx-auto">
      <motion.div initial="hidden" animate="show" variants={{ show: { transition: stagger(0.06) } }}>
        <motion.p variants={fadeRise} className="mono" style={{ color: 'var(--color-jm-spice)' }}>Explorations · WhatsApp</motion.p>
        <motion.h1 variants={fadeRise} className="serif text-4xl mt-3 max-w-2xl">
          WhatsApp campaigns in Janata Masala context
        </motion.h1>
        <motion.p variants={fadeRise} className="mt-4 text-sm max-w-2xl" style={{ color: 'var(--color-sandy-ink-soft)' }}>
          Campaign patterns mapped to WhatsApp Business API — catalog, bulk orders, confirmations, and feedback flows.
        </motion.p>

        <motion.div variants={fadeRise} className="mt-6 flex flex-wrap gap-2">
          {TAGS.map((t) => (
            <button
              key={t}
              type="button"
              onClick={() => setTag(t)}
              className="px-3 py-1.5 rounded-full border mono text-[10px] transition-colors"
              style={{
                background: tag === t ? 'var(--color-sandy-ink)' : 'transparent',
                color: tag === t ? 'var(--color-sandy-bg)' : 'var(--color-sandy-ink-soft)',
                borderColor: 'var(--color-sandy-line-strong)',
              }}
            >
              {t}
            </button>
          ))}
        </motion.div>

        <div className="mt-10 grid lg:grid-cols-2 gap-8">
          <div className="grid sm:grid-cols-2 gap-4">
            {filtered.map((p) => (
              <motion.article
                key={p.id}
                variants={fadeRise}
                className="p-5 rounded-2xl border"
                style={{ background: '#e5ddd5', borderColor: '#d1d7db' }}
              >
                <div className="p-4 rounded-xl" style={{ background: '#fff', boxShadow: '0 1px 2px rgba(0,0,0,0.1)' }}>
                  <span className="mono text-[9px]" style={{ color: 'var(--color-jm-spice)' }}>{p.number}</span>
                  <h3 className="font-medium text-sm mt-1">{p.title}</h3>
                  <p className="text-xs mt-2" style={{ color: '#667781' }}>{p.intent}</p>
                  <p className="text-xs mt-3 italic" style={{ color: 'var(--color-sandy-ink-soft)' }}>{p.jmHook}</p>
                </div>
              </motion.article>
            ))}
          </div>
          <ChatAgent />
        </div>
      </motion.div>
    </div>
  )
}

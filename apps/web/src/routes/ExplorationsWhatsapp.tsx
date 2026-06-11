import { useState } from 'react'
import { motion } from 'framer-motion'
import { fadeRise, stagger } from '@/components/sandy/motion'
import { JM_WA_PATTERNS } from '@/data/whatsapp'
import ChatAgent from '@/components/explorations/ChatAgent'
import WAChatFrame from '@/components/explorations/WAChatFrame'

const TAGS = ['all', 'retail', 'B2B', 'B2C', 'conversion', 'CRM', 'channel', 'promotion', 'brand', 'personal', 'trust', 'retention'] as const

export default function ExplorationsWhatsapp() {
  const [tag, setTag] = useState<string>('all')
  const filtered = JM_WA_PATTERNS.filter((p) => tag === 'all' || p.tags.includes(tag))

  return (
    <div className="px-6 py-12 md:px-12 max-w-6xl mx-auto">
      <motion.div initial="hidden" animate="show" variants={{ show: { transition: stagger(0.06) } }}>
        <motion.p variants={fadeRise} className="mono" style={{ color: 'var(--color-jm-spice)' }}>Explorations · WhatsApp</motion.p>
        <motion.h1 variants={fadeRise} className="serif text-4xl mt-3 max-w-2xl">WhatsApp campaigns in Janata Masala context</motion.h1>
        <motion.p variants={fadeRise} className="mt-4 text-sm max-w-2xl" style={{ color: 'var(--color-sandy-ink-soft)' }}>
          11 patterns — list-dump ordering, channels, CRM segments, payment links. Janta Stores model for Ghatkopar housewives.
        </motion.p>

        <motion.div variants={fadeRise} className="mt-6 flex flex-wrap gap-2">
          {TAGS.map((t) => (
            <button key={t} type="button" onClick={() => setTag(t)} className="px-3 py-1.5 rounded-full border mono text-[11px] transition-colors" style={{ background: tag === t ? 'var(--color-sandy-ink)' : 'transparent', color: tag === t ? 'var(--color-sandy-bg)' : 'var(--color-sandy-ink-soft)', borderColor: 'var(--color-sandy-line-strong)' }}>
              {t}
            </button>
          ))}
        </motion.div>

        <div className="mt-10 grid lg:grid-cols-2 gap-8">
          <div className="grid sm:grid-cols-2 gap-4 max-h-[600px] overflow-y-auto pr-2">
            {filtered.map((p) => (
              <motion.div key={p.id} variants={fadeRise}>
                <WAChatFrame pattern={p} />
              </motion.div>
            ))}
          </div>
          <ChatAgent />
        </div>
      </motion.div>
    </div>
  )
}

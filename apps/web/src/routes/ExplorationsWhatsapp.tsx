import { useState } from 'react'
import { motion } from 'framer-motion'
import PageShell from '@/components/sandy/PageShell'
import PageIntro from '@/components/sandy/PageIntro'
import StagePanel from '@/components/sandy/StagePanel'
import { fadeRise, stagger } from '@/components/sandy/motion'
import { JM_WA_PATTERNS, WA_TAGS } from '@/data/whatsapp'
import ChatAgent from '@/components/explorations/ChatAgent'
import WAGalleryCard from '@/components/explorations/wa/WAGalleryCard'

const DOC_REFS = [
  { href: 'https://developers.facebook.com/docs/whatsapp/cloud-api/messages/interactive-reply-buttons-messages/', label: 'Reply buttons docs' },
  { href: 'https://developers.facebook.com/docs/whatsapp/cloud-api/messages/interactive-list-messages/', label: 'List messages docs' },
  { href: 'https://developers.facebook.com/docs/whatsapp/cloud-api/messages/interactive-media-carousel-messages/', label: 'Media carousel docs' },
  { href: 'https://developers.facebook.com/docs/whatsapp/flows/', label: 'WhatsApp Flows docs' },
] as const

export default function ExplorationsWhatsapp() {
  const [tag, setTag] = useState<string>('all')
  const filtered = JM_WA_PATTERNS.filter((p) => tag === 'all' || p.tags.includes(tag))

  return (
    <PageShell variant="wide">
      <PageIntro
        eyebrow="Explorations · WhatsApp"
        title="WhatsApp campaigns in Janata Masala context"
        sub="Janata Masala lives inside WhatsApp — list-dump ordering, channels, CRM segments, payment links. Eleven patterns, each in an authentic WA frame, mapped to the Business Cloud API. Janta Stores model for Ghatkopar housewives."
        accent="spice"
        wide
      />

      <div className="wa-doc-refs">
        {DOC_REFS.map(({ href, label }) => (
          <a key={href} href={href} target="_blank" rel="noopener noreferrer" className="wa-doc-ref">
            ↗ {label}
          </a>
        ))}
      </div>

      <div className="jm-tag-row">
        {WA_TAGS.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTag(t)}
            className={`tag${tag === t ? ' tag--active' : ''}`}
          >
            {t}
          </button>
        ))}
      </div>

      <motion.div
        className="wa-gallery-grid"
        initial="hidden"
        animate="show"
        variants={{ show: { transition: stagger(0.05) } }}
      >
        {filtered.map((p) => (
          <motion.div key={p.id} variants={fadeRise}>
            <WAGalleryCard pattern={p} />
          </motion.div>
        ))}
      </motion.div>

      <section className="wa-chat-section">
        <p className="caption-label caption-label--spice">ChatAgent · offline knowledge</p>
        <StagePanel>
          <div className="jm-stage-panel jm-chat-panel" style={{ minHeight: 480 }}>
            <ChatAgent />
          </div>
        </StagePanel>
      </section>
    </PageShell>
  )
}

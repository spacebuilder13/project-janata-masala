import { Link } from '@tanstack/react-router'
import PageShell from '@/components/sandy/PageShell'
import PageIntro from '@/components/sandy/PageIntro'

const modules = [
  { to: '/home/explorations/brand' as const, title: 'Brand & Content', desc: 'Heritage authority, workshop system, sensory storytelling, performance marketing' },
  { to: '/home/explorations/whatsapp' as const, title: 'WhatsApp + ChatAgent', desc: '11 campaign patterns + offline knowledge agent' },
  { to: '/home/explorations/voice' as const, title: 'VoiceAgent + System Flow', desc: 'Scripted conversations with structured back-office output' },
  { to: '/home/explorations/architecture' as const, title: 'Agentic Commerce Architecture', desc: 'Benchmark stack, phase overlay, multi-agent diagram' },
]

export default function ExplorationsIndex() {
  return (
    <PageShell variant="scroll">
      <PageIntro
        eyebrow="02 — Explorations"
        title="What can we find during the adventure"
        sub="Demos and prototypes — WhatsApp, voice, and the architecture that powers agentic commerce for Janata Masala."
        accent="gold"
        wide
      />
      <div className="jm-seq-list">
        {modules.map((m) => (
          <Link key={m.to} to={m.to} className="cp-seq-item">
            <h2 className="cp-seq-title">{m.title}</h2>
            <p className="cp-seq-desc">{m.desc}</p>
            <span className="cp-seq-cta">Open →</span>
          </Link>
        ))}
      </div>
    </PageShell>
  )
}

import { Link } from '@tanstack/react-router'
import PageShell from '@/components/sandy/PageShell'
import PageIntro from '@/components/sandy/PageIntro'

type ModuleLink = {
  kind: 'link'
  to:
    | '/home/explorations/architecture'
    | '/home/explorations/whatsapp'
    | '/home/explorations/voice'
    | '/home/explorations/brand'
  title: string
  desc: string
  badge?: string
}

const modules: ModuleLink[] = [
  {
    kind: 'link',
    to: '/home/explorations/architecture',
    title: 'Commerce 101 Roadmap',
    desc: 'Three operational pillars — CRM, WhatsApp backbone, inward inventory — plus tech initiatives',
  },
  {
    kind: 'link',
    to: '/home/explorations/whatsapp',
    title: 'WhatsApp Commerce',
    desc: '11 campaign patterns + offline knowledge agent',
  },
  {
    kind: 'link',
    to: '/home/explorations/voice',
    title: 'Voice Order-Taking',
    desc: 'Live voice agents Priya + Meera with structured post-call output',
  },
  {
    kind: 'link',
    to: '/home/explorations/brand',
    title: 'Brand Foundations',
    desc: 'Heritage, workshop, sensory storytelling — intentionally deferred to Walk/Run phase',
    badge: 'Deferred — Walk/Run',
  },
]

export default function ExplorationsIndex() {
  return (
    <PageShell variant="scroll">
      <PageIntro
        eyebrow="02 — Explorations"
        title="What can we find during the adventure"
        sub="Commerce 101 roadmap, WhatsApp campaigns, voice demos, and the agentic commerce target state."
        accent="gold"
        wide
      />
      <div className="jm-seq-list">
        {modules.map((m) => (
          <Link key={m.to} to={m.to} className="cp-seq-item">
            <div className="cp-seq-soon-row">
              <h2 className="cp-seq-title">{m.title}</h2>
              {m.badge && <span className="cp-seq-badge cp-seq-badge--defer">{m.badge}</span>}
            </div>
            <p className="cp-seq-desc">{m.desc}</p>
            <span className="cp-seq-cta">Open →</span>
          </Link>
        ))}
      </div>
    </PageShell>
  )
}

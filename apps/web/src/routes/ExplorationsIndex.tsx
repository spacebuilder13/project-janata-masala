import { Link } from '@tanstack/react-router'
import PageShell from '@/components/sandy/PageShell'
import PageIntro from '@/components/sandy/PageIntro'

type ModuleLink = {
  kind: 'link'
  to: '/home/explorations/whatsapp' | '/home/explorations/voice' | '/home/explorations/brand'
  title: string
  desc: string
  badge?: string
}

const modules: ModuleLink[] = [
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
        title="Interactive demos"
        sub="WhatsApp patterns, voice agents, and brand explorations. Strategy and roadmap live in Mission."
        accent="gold"
        wide
      />
      <p className="caption-text mb-6">
        <Link to="/home/mission" className="adv-explorations-link" style={{ marginTop: 0 }}>
          Falcon Roadmap &amp; engagement model
        </Link>
        {' '}— Commerce 101 pillars, operating stack, and best bets.
      </p>
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

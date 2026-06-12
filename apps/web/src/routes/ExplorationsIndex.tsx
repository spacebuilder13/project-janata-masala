import { Link } from '@tanstack/react-router'
import PageShell from '@/components/sandy/PageShell'
import PageIntro from '@/components/sandy/PageIntro'

type ModuleLink = {
  kind: 'link'
  to: '/home/explorations/architecture' | '/home/explorations/whatsapp' | '/home/explorations/brand'
  title: string
  desc: string
}

type ModuleSoon = {
  kind: 'soon'
  title: string
  desc: string
}

const modules: (ModuleLink | ModuleSoon)[] = [
  { kind: 'link', to: '/home/explorations/architecture', title: 'Agentic Commerce Roadmap', desc: 'Three-phase modernization — brand, systems, and agentic commerce target state' },
  { kind: 'link', to: '/home/explorations/whatsapp', title: 'Whatsapp Commerce', desc: '11 campaign patterns + offline knowledge agent' },
  { kind: 'link', to: '/home/explorations/brand', title: 'Brand Foundations', desc: 'Heritage authority, workshop system, sensory storytelling, performance marketing' },
  { kind: 'soon', title: 'Voice Agents', desc: 'Live voice order-taking with structured back-office output' },
]

export default function ExplorationsIndex() {
  return (
    <PageShell variant="scroll">
      <PageIntro
        eyebrow="02 — Explorations"
        title="What can we find during the adventure"
        sub="Demos and prototypes — WhatsApp commerce, brand foundations, and the roadmap to agentic commerce for Janata Masala."
        accent="gold"
        wide
      />
      <div className="jm-seq-list">
        {modules.map((m) =>
          m.kind === 'link' ? (
            <Link key={m.to} to={m.to} className="cp-seq-item">
              <h2 className="cp-seq-title">{m.title}</h2>
              <p className="cp-seq-desc">{m.desc}</p>
              <span className="cp-seq-cta">Open →</span>
            </Link>
          ) : (
            <div key={m.title} className="cp-seq-item cp-seq-item--soon" aria-disabled="true">
              <div className="cp-seq-soon-row">
                <h2 className="cp-seq-title">{m.title}</h2>
                <span className="cp-seq-badge">Coming soon</span>
              </div>
              <p className="cp-seq-desc">{m.desc}</p>
            </div>
          ),
        )}
      </div>
    </PageShell>
  )
}

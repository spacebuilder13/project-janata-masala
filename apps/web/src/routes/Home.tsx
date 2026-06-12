import { Link } from '@tanstack/react-router'
import PageShell from '@/components/sandy/PageShell'
import PageIntro from '@/components/sandy/PageIntro'
import StagePanel from '@/components/sandy/StagePanel'

const sections = [
  {
    to: '/home/adventure' as const,
    eyebrow: '01 — The journey',
    title: 'The journey',
    description: 'Modernizing Janata Masala — north star, pillars, roadmap, benchmarks, and action tracker.',
    accent: 'var(--color-jm-spice)',
  },
  {
    to: '/home/explorations' as const,
    eyebrow: '02 — Explorations',
    title: 'Explorations',
    description: 'WhatsApp campaigns, voice order-taking, and agentic commerce architecture — demos in JM context.',
    accent: 'var(--color-sandy-gold)',
  },
]

export default function Home() {
  return (
    <PageShell variant="hub">
      <PageIntro
        eyebrow="S&A × Janata Masala"
        title="Welcome to the adventure."
        sub="A living workspace for modernizing Janata Masala — grounded in your conversations, powered by agentic commerce."
        accent="spice"
      />
      <StagePanel livingLines>
        <div className="jm-hub-grid">
          {sections.map((s) => (
            <Link key={s.to} to={s.to} className="obj-card">
              <span className="obj-card-label" style={{ color: s.accent }}>{s.eyebrow}</span>
              <h2 className="obj-card-title">{s.title}</h2>
              <p className="obj-card-body">{s.description}</p>
              <span className="obj-card-cta">Explore →</span>
            </Link>
          ))}
        </div>
      </StagePanel>
    </PageShell>
  )
}

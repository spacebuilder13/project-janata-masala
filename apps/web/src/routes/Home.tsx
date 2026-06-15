import { Link } from '@tanstack/react-router'
import PageShell from '@/components/sandy/PageShell'
import PageIntro from '@/components/sandy/PageIntro'
import StagePanel from '@/components/sandy/StagePanel'

const sections = [
  {
    to: '/home/adventure' as const,
    eyebrow: '01 — Adventure',
    title: 'Adventure',
    description:
      'Retail operating system strategy — north star, seven-layer stack, what to build first, and the Crawl/Walk/Run path.',
    accent: 'var(--color-jm-spice)',
  },
  {
    to: '/home/explorations' as const,
    eyebrow: '02 — Explorations',
    title: 'Explorations',
    description:
      'Commerce 101 roadmap, WhatsApp campaigns, voice order-taking, and agentic commerce demos.',
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

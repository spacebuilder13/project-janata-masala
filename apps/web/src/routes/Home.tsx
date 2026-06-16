import { Link } from '@tanstack/react-router'
import PageShell from '@/components/sandy/PageShell'
import PageIntro from '@/components/sandy/PageIntro'
import StagePanel from '@/components/sandy/StagePanel'

const sections = [
  {
    to: '/home/mission' as const,
    eyebrow: '01 — Mission',
    title: 'Mission',
    badge: 'v2',
    description:
      'Falcon 2026 — current objective. Operating stack, prioritization, and Commerce 101 roadmap in one place.',
    subline: 'Updated Jun 2026 — tabbed Mission Center, not a scroll brief.',
    accent: 'var(--color-jm-spice)',
  },
  {
    to: '/home/explorations' as const,
    eyebrow: '02 — Explorations',
    title: 'Explorations',
    description: 'WhatsApp campaigns, voice order-taking, and brand demos — interactive explorations only.',
    accent: 'var(--color-sandy-gold)',
  },
]

export default function Home() {
  return (
    <PageShell variant="hub">
      <PageIntro
        eyebrow="S&A × Janata Masala"
        title="Mission workspace"
        sub="Falcon 2026 engagement hub — strategy in Mission, demos in Explorations."
        accent="spice"
      />
      <StagePanel livingLines>
        <div className="jm-hub-grid">
          {sections.map((s) => (
            <Link key={s.to} to={s.to} className="obj-card">
              <span className="obj-card-label" style={{ color: s.accent }}>
                {s.eyebrow}
                {'badge' in s && s.badge && (
                  <span className="mc-hub-badge">{s.badge}</span>
                )}
              </span>
              <h2 className="obj-card-title">{s.title}</h2>
              <p className="obj-card-body">{s.description}</p>
              {'subline' in s && s.subline && (
                <p className="obj-card-body" style={{ color: 'var(--color-sandy-ink-faint)', marginTop: 8 }}>
                  {s.subline}
                </p>
              )}
              <span className="obj-card-cta">Open →</span>
            </Link>
          ))}
        </div>
      </StagePanel>
    </PageShell>
  )
}

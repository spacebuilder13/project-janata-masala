import SectionHead from '../sandy/SectionHead'
import { openQuestions } from '@/data/adventure'

export default function OpenQuestions() {
  return (
    <section>
      <SectionHead eyebrow="Open" title="Open questions" />
      <ul className="space-y-2">
        {openQuestions.map((q) => (
          <li key={q} className="text-sm px-4 py-3 rounded-xl border" style={{ borderColor: 'var(--color-sandy-line)', color: 'var(--color-sandy-ink-soft)' }}>
            ? {q}
          </li>
        ))}
      </ul>
    </section>
  )
}

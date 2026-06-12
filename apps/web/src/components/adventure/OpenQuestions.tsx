import SectionHead from '../sandy/SectionHead'
import { openQuestions } from '@/data/adventure'

export default function OpenQuestions({ sectionId }: { sectionId?: string }) {
  return (
    <section>
      <SectionHead id={sectionId} eyebrow="Open" title="Open questions" />
      <ul className="list-stack">
        {openQuestions.map((q) => (
          <li key={q} className="list-row">
            <div className="list-row-body">
              <p className="list-row-text">? {q}</p>
            </div>
          </li>
        ))}
      </ul>
    </section>
  )
}

import { motion } from 'framer-motion'
import { fadeRise, stagger } from '../sandy/motion'
import SectionHead from '../sandy/SectionHead'
import {
  designPrinciples,
  executionMoves,
  matrixRule,
  mentalModels,
  priorityMatrix,
} from '@/data/operating-stack-brief'

const quadrantClass = (q: (typeof priorityMatrix)[number]) => {
  if (q.highlight) return 'adv-matrix-cell adv-matrix-cell--hot'
  if (q.adoption === 'high') return 'adv-matrix-cell adv-matrix-cell--warm'
  return 'adv-matrix-cell'
}

export default function BuildFirstFramework({ sectionId }: { sectionId?: string }) {
  return (
    <section>
      <SectionHead
        id={sectionId}
        eyebrow="Prioritization"
        title="What to build first"
        blurb="Evaluate ideas by adoption confidence and measurable business impact — not excitement alone."
      />

      <motion.div
        className="adv-matrix-wrap"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ show: { transition: stagger(0.08) } }}
      >
        <motion.div variants={fadeRise} className="adv-matrix-labels">
          <span />
          <span className="adv-matrix-axis">Low business impact</span>
          <span className="adv-matrix-axis">High business impact</span>
        </motion.div>
        <motion.div variants={fadeRise} className="adv-matrix-grid">
          <span className="adv-matrix-axis adv-matrix-axis--y">High adoption</span>
          {priorityMatrix
            .filter((q) => q.adoption === 'high')
            .sort((a, b) => (a.impact === 'low' ? -1 : 1) - (b.impact === 'low' ? -1 : 1))
            .map((q) => (
              <article key={q.id} className={quadrantClass(q)}>
                <h3 className="serif text-base">{q.title}</h3>
                <p className="caption-text mt-2">{q.examples}</p>
              </article>
            ))}
          <span className="adv-matrix-axis adv-matrix-axis--y">Low adoption</span>
          {priorityMatrix
            .filter((q) => q.adoption === 'low')
            .sort((a, b) => (a.impact === 'low' ? -1 : 1) - (b.impact === 'low' ? -1 : 1))
            .map((q) => (
              <article key={q.id} className={quadrantClass(q)}>
                <h3 className="serif text-base">{q.title}</h3>
                <p className="caption-text mt-2">{q.examples}</p>
              </article>
            ))}
        </motion.div>
        <motion.p variants={fadeRise} className="caption-text mt-4 max-w-[62ch]">
          {matrixRule}
        </motion.p>
      </motion.div>

      <motion.div
        className="adv-avoid-block mt-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ show: { transition: stagger(0.06) } }}
      >
        <motion.h3 variants={fadeRise} className="serif text-xl">
          What to avoid too early
        </motion.h3>
        <motion.ul variants={fadeRise} className="adv-avoid-list">
          {designPrinciples.avoid.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </motion.ul>
      </motion.div>

      <motion.div
        className="adv-exec-strip mt-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ show: { transition: stagger(0.08) } }}
      >
        <motion.h3 variants={fadeRise} className="serif text-xl mb-4">
          Four practical moves
        </motion.h3>
        <div className="adv-exec-grid">
          {executionMoves.map((move) => (
            <motion.article key={move.id} variants={fadeRise} className="adv-exec-step surface-card">
              <span className="adv-exec-order">{move.order}</span>
              <h4 className="serif text-lg mt-2">{move.title}</h4>
              <p className="caption-text mt-2">{move.summary}</p>
            </motion.article>
          ))}
        </div>
      </motion.div>

      <motion.ul
        className="adv-models-list mt-10"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ show: { transition: stagger(0.06) } }}
      >
        {mentalModels.map((m) => (
          <motion.li key={m.label} variants={fadeRise} className="adv-bullet-item">
            <strong>{m.label}:</strong> {m.body}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}

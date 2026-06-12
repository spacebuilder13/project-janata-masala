import { motion } from 'framer-motion'
import { fadeRise, stagger } from '../sandy/motion'
import SectionHead from '../sandy/SectionHead'
import { todayStats, todayBullets } from '@/data/commerce-101-brief'

export default function TodaySnapshot({ sectionId }: { sectionId?: string }) {
  return (
    <section>
      <SectionHead id={sectionId} eyebrow="Today" title="Where we are today" />
      <motion.div
        className="adv-stat-grid"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ show: { transition: stagger(0.06) } }}
      >
        {todayStats.map((s) => (
          <motion.div key={s.label} variants={fadeRise} className="adv-stat-card surface-card">
            <p className="caption-label caption-label--spice">{s.label}</p>
            <p className="adv-stat-value serif">{s.value}</p>
            {s.note && <p className="caption-text mt-2">{s.note}</p>}
          </motion.div>
        ))}
      </motion.div>
      <motion.ul
        className="adv-bullet-list mt-6"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ show: { transition: stagger(0.08) } }}
      >
        {todayBullets.map((b) => (
          <motion.li key={b} variants={fadeRise} className="adv-bullet-item">
            {b}
          </motion.li>
        ))}
      </motion.ul>
    </section>
  )
}

import { motion } from 'framer-motion'
import { fadeRise, stagger } from '../sandy/motion'
import SectionHead from '../sandy/SectionHead'
import ExplorationsLink from './ExplorationsLink'
import { crawlWalkRun } from '@/data/commerce-101-brief'

const statusClass: Record<string, string> = {
  active: 'adv-cwr-step--active',
  planned: 'adv-cwr-step--planned',
  deferred: 'adv-cwr-step--deferred',
}

export default function CrawlWalkRunStrip({ sectionId }: { sectionId?: string }) {
  return (
    <section>
      <SectionHead id={sectionId} eyebrow="Strategy" title="Crawl, Walk, Run" />
      <motion.div
        className="adv-cwr-strip"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ show: { transition: stagger(0.1) } }}
      >
        {crawlWalkRun.map((step) => (
          <motion.article
            key={step.id}
            variants={fadeRise}
            className={`adv-cwr-step surface-card ${statusClass[step.status]}`}
          >
            <span className="caption-label caption-label--spice">{step.phase}</span>
            <h3 className="serif text-xl mt-2">{step.title}</h3>
            <p className="caption-text mt-2">{step.summary}</p>
            <ul className="adv-cwr-items">
              {step.items.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </motion.article>
        ))}
      </motion.div>
      <div className="adv-cwr-footer">
        <ExplorationsLink to="/home/explorations/architecture">See Commerce 101 roadmap</ExplorationsLink>
      </div>
    </section>
  )
}

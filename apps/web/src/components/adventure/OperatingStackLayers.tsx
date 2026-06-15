import { motion } from 'framer-motion'
import { fadeRise, stagger } from '../sandy/motion'
import SectionHead from '../sandy/SectionHead'
import { designPrinciples, operatingLayers } from '@/data/operating-stack-brief'

export default function OperatingStackLayers({ sectionId }: { sectionId?: string }) {
  return (
    <section>
      <SectionHead
        id={sectionId}
        eyebrow="Architecture"
        title="Seven layers — retail operating stack"
        blurb="Each layer transforms noisy store activity into structured action. Think vertically, not as isolated features."
      />
      <p className="caption-text mb-6 max-w-[62ch]">{designPrinciples.headline}</p>
      <motion.div
        className="adv-stack-list"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ show: { transition: stagger(0.06) } }}
      >
        {operatingLayers.map((layer) => (
          <motion.article key={layer.id} variants={fadeRise} className="adv-stack-layer surface-card">
            <div className="adv-stack-layer-head">
              <span className="adv-stack-order">{layer.order}</span>
              <div>
                <h3 className="serif text-lg">{layer.name}</h3>
                <p className="caption-text mt-1">{layer.jobToday}</p>
              </div>
            </div>
            <div className="adv-stack-cols">
              <div className="adv-stack-col">
                <span className="caption-label">Janata today</span>
                <p className="caption-text mt-2">{layer.janataToday}</p>
              </div>
              <div className="adv-stack-col adv-stack-col--bet">
                <span className="caption-label caption-label--spice">Best bet now</span>
                <p className="caption-text mt-2">{layer.bestBet}</p>
              </div>
            </div>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}

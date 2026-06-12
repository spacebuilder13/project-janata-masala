import { motion } from 'framer-motion'
import { fadeRise, stagger } from '../sandy/motion'
import SectionHead from '../sandy/SectionHead'
import { communityStories } from '@/data/commerce-101-brief'

export default function CommunityStories({ sectionId }: { sectionId?: string }) {
  return (
    <section>
      <SectionHead id={sectionId} eyebrow="Community" title="Stories that matter" />
      <motion.div
        className="grid md:grid-cols-3 gap-4"
        initial="hidden"
        whileInView="show"
        viewport={{ once: true }}
        variants={{ show: { transition: stagger(0.08) } }}
      >
        {communityStories.map((story) => (
          <motion.article key={story.id} variants={fadeRise} className="surface-card adv-story-card">
            <span className="caption-label caption-label--spice">{story.tag}</span>
            <h3 className="serif text-lg mt-2">{story.title}</h3>
            {story.quote && (
              <blockquote className="adv-story-quote serif mt-3">&ldquo;{story.quote}&rdquo;</blockquote>
            )}
            <p className="caption-text mt-3">{story.body}</p>
          </motion.article>
        ))}
      </motion.div>
    </section>
  )
}

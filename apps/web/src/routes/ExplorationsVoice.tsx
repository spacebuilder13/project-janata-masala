import { motion } from 'framer-motion'
import { fadeRise } from '@/components/sandy/motion'
import VoiceAgent from '@/components/explorations/VoiceAgent'

export default function ExplorationsVoice() {
  return (
    <div className="px-6 py-12 md:px-12 max-w-4xl mx-auto">
      <motion.div initial="hidden" animate="show" variants={fadeRise}>
        <p className="mono" style={{ color: 'var(--color-jm-spice)' }}>Explorations · Voice</p>
        <h1 className="serif text-4xl mt-3">Voice order-taking & system flow</h1>
        <p className="mt-4 text-sm max-w-xl" style={{ color: 'var(--color-sandy-ink-soft)' }}>
          Demo voice agent for orders and enquiries. Claude returns structured output — watch Inventory, Orders, CRM, and Finance update in sequence.
        </p>
        <div className="mt-10">
          <VoiceAgent />
        </div>
      </motion.div>
    </div>
  )
}

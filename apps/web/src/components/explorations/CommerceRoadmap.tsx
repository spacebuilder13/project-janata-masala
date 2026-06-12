import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { roadmapPhases } from '@/data/commerce-roadmap'
import RoadmapPhaseNav from './roadmap/RoadmapPhaseNav'
import RoadmapPhase1Matrix from './roadmap/RoadmapPhase1Matrix'
import RoadmapPhaseBlock from './roadmap/RoadmapPhaseBlock'

export default function CommerceRoadmap() {
  const [phase, setPhase] = useState<1 | 2 | 3>(1)
  const active = roadmapPhases.find((p) => p.number === phase)!

  return (
    <div className="rm-root">
      <RoadmapPhaseNav phases={roadmapPhases} active={phase} onChange={setPhase} />

      <AnimatePresence mode="wait">
        <motion.div
          key={active.number}
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.25 }}
        >
          {active.number === 1 ? (
            <RoadmapPhase1Matrix phase={active} />
          ) : (
            <RoadmapPhaseBlock phase={active} />
          )}
        </motion.div>
      </AnimatePresence>
    </div>
  )
}

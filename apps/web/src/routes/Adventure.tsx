import PageShell from '@/components/sandy/PageShell'
import PageIntro from '@/components/sandy/PageIntro'
import NorthStarBanner from '@/components/adventure/NorthStarBanner'
import TodaySnapshot from '@/components/adventure/TodaySnapshot'
import OperatingStackLayers from '@/components/adventure/OperatingStackLayers'
import BuildFirstFramework from '@/components/adventure/BuildFirstFramework'
import VisionGoals from '@/components/adventure/VisionGoals'
import CrawlWalkRunStrip from '@/components/adventure/CrawlWalkRunStrip'
import StoreContextCards from '@/components/adventure/StoreContextCards'
import CommunityStories from '@/components/adventure/CommunityStories'

const sections = [
  { id: 'north-star', label: 'North star' },
  { id: 'today', label: 'Today' },
  { id: 'operating-stack', label: 'Operating stack' },
  { id: 'build-first', label: 'Build first' },
  { id: 'crawl-walk-run', label: 'Crawl/Walk/Run' },
  { id: 'vision', label: 'Vision' },
  { id: 'stores', label: 'Stores' },
  { id: 'stories', label: 'Stories' },
]

export default function Adventure() {
  return (
    <PageShell variant="scroll" anchorSections={sections}>
      <PageIntro
        eyebrow="01 — Adventure"
        title="Modernizing Janata Masala"
        sub="An executive brief — from pen-and-paper kirana to a retail operating system, without losing neighbourhood trust."
        accent="spice"
        wide
      />

      <div className="jm-section">
        <NorthStarBanner sectionId="north-star" />
      </div>
      <div className="jm-section">
        <TodaySnapshot sectionId="today" />
      </div>
      <div className="jm-section">
        <OperatingStackLayers sectionId="operating-stack" />
      </div>
      <div className="jm-section">
        <BuildFirstFramework sectionId="build-first" />
      </div>
      <div className="jm-section">
        <CrawlWalkRunStrip sectionId="crawl-walk-run" />
      </div>
      <div className="jm-section">
        <VisionGoals sectionId="vision" />
      </div>
      <div className="jm-section">
        <StoreContextCards sectionId="stores" />
      </div>
      <div className="jm-section">
        <CommunityStories sectionId="stories" />
      </div>
    </PageShell>
  )
}

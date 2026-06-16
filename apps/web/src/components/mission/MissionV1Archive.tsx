import NorthStarBanner from '@/components/adventure/NorthStarBanner'
import TodaySnapshot from '@/components/adventure/TodaySnapshot'
import VisionGoals from '@/components/adventure/VisionGoals'
import CrawlWalkRunStrip from '@/components/adventure/CrawlWalkRunStrip'
import StoreContextCards from '@/components/adventure/StoreContextCards'
import CommunityStories from '@/components/adventure/CommunityStories'

/** v1 archive — M2.7 six-section executive brief */
export default function MissionV1Archive() {
  return (
    <div className="mc-v1-archive">
      <p className="caption-text mb-4">
        Archive — Commerce 101 executive brief (M2.7). Scroll within this panel to read the earlier version.
      </p>
      <div className="mc-v1-scroll">
        <NorthStarBanner />
        <div className="jm-section">
          <TodaySnapshot embedded />
        </div>
        <div className="jm-section">
          <VisionGoals embedded />
        </div>
        <div className="jm-section">
          <CrawlWalkRunStrip embedded />
        </div>
        <div className="jm-section">
          <StoreContextCards embedded />
        </div>
        <div className="jm-section">
          <CommunityStories embedded />
        </div>
      </div>
    </div>
  )
}

import { northStar } from '@/data/strategy'

export default function NorthStarChip() {
  return (
    <div className="mc-north-star-chip" title={northStar.thesis}>
      <span className="mc-north-star-label">North star</span>
      <span className="mc-north-star-question">{northStar.question}</span>
    </div>
  )
}

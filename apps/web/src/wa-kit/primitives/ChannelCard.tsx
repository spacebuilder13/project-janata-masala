import WAChrome from '../WAChrome'
import Bubble, { BubbleMeta } from '../Bubble'

type Props = {
  channelName: string
  message: string
  meta: string
}

export default function ChannelCard({ channelName, message, meta }: Props) {
  return (
    <WAChrome>
      <Bubble noPadding>
        <div className="wa-channel-card">
          <div className="wa-channel-card__inner">
            <div className="wa-channel-card__title">{channelName}</div>
            <div className="mt-1.5">{message}</div>
            <div className="wa-channel-card__meta">{meta}</div>
          </div>
        </div>
        <BubbleMeta />
      </Bubble>
    </WAChrome>
  )
}

import { useState } from 'react'
import WAChrome from '../WAChrome'
import Bubble, { BubbleMeta } from '../Bubble'

export type CarouselCard = {
  tag: string
  title: string
  body: string
  headClass: 'garam' | 'chana' | 'pav'
  cta?: string
}

type Props = {
  intro: string
  cards: CarouselCard[]
}

export default function MediaCarousel({ intro, cards }: Props) {
  const [i, setI] = useState(0)

  return (
    <WAChrome>
      <Bubble>{intro}</Bubble>
      <Bubble wide noPadding transparent>
        <div className="wa-carousel-wrap">
          <div className="wa-carousel-track" style={{ transform: `translateX(-${i * 100}%)` }}>
            {cards.map((c) => (
              <div key={c.title} className="wa-carousel-card">
                <div className={`wa-carousel-card__head wa-carousel-card__head--${c.headClass}`}>{c.tag}</div>
                <div className="wa-carousel-card__body">
                  <div className="wa-carousel-card__title">{c.title}</div>
                  <div className="wa-carousel-card__sub">{c.body}</div>
                  <button type="button" className="wa-carousel-card__cta">
                    {c.cta ?? 'See why'}
                  </button>
                </div>
              </div>
            ))}
          </div>
          <div className="wa-carousel-dots">
            {cards.map((_, idx) => (
              <button
                key={idx}
                type="button"
                className={`wa-carousel-dot${i === idx ? ' wa-carousel-dot--active' : ''}`}
                onClick={() => setI(idx)}
                aria-label={`Card ${idx + 1}`}
              />
            ))}
          </div>
        </div>
        <BubbleMeta />
      </Bubble>
    </WAChrome>
  )
}

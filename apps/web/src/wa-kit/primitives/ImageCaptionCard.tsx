import type { ReactNode } from 'react'
import WAChrome from '../WAChrome'
import Bubble, { BubbleMeta } from '../Bubble'

type Props = {
  intro: string
  tag: string
  title: string
  sub: string
  caption: ReactNode
  variant?: 'crm' | 'recipe'
  wallpaper?: 'default' | 'jm'
}

export default function ImageCaptionCard({
  intro,
  tag,
  title,
  sub,
  caption,
  variant = 'crm',
  wallpaper,
}: Props) {
  const cardClass = variant === 'recipe' ? 'wa-image-card wa-image-card--recipe' : 'wa-image-card wa-image-card--crm'
  const tagClass =
    variant === 'recipe' ? 'wa-image-card__tag wa-image-card__tag--recipe' : 'wa-image-card__tag wa-image-card__tag--crm'
  const titleClass =
    variant === 'recipe' ? 'wa-image-card__title' : 'wa-image-card__title wa-image-card__title--crm'
  const subClass =
    variant === 'recipe' ? 'wa-image-card__sub wa-image-card__sub--recipe' : 'wa-image-card__sub wa-image-card__sub--crm'

  return (
    <WAChrome wallpaper={wallpaper}>
      <Bubble>{intro}</Bubble>
      <Bubble wide noPadding>
        <div className={cardClass}>
          <div className={tagClass}>{tag}</div>
          <div className={titleClass}>{title}</div>
          <div className={subClass}>{sub}</div>
        </div>
        <div className="wa-image-caption">{caption}</div>
        <BubbleMeta />
      </Bubble>
    </WAChrome>
  )
}

import type { ReactNode } from 'react'

type Props = {
  href: string
  children: ReactNode
  className?: string
}

export default function ExplorationsLink({ href, children, className = '' }: Props) {
  return (
    <a href={href} className={`adv-explorations-link ${className}`.trim()}>
      {children}
      <span aria-hidden="true"> →</span>
    </a>
  )
}

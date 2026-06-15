import type { ReactNode } from 'react'
import { Link } from '@tanstack/react-router'

type ExplorationsLinkProps = {
  to: '/home/explorations/architecture' | '/home/explorations/whatsapp' | '/home/explorations/voice' | '/home/explorations'
  children: ReactNode
  className?: string
}

export default function ExplorationsLink({ to, children, className = '' }: ExplorationsLinkProps) {
  return (
    <Link to={to} className={`adv-explorations-link ${className}`.trim()}>
      {children}
      <span aria-hidden="true"> →</span>
    </Link>
  )
}

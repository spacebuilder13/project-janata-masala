import type { ReactNode } from 'react'
import LivingLines from './LivingLines'

type Props = {
  children: ReactNode
  livingLines?: boolean
}

export default function StagePanel({ children, livingLines = false }: Props) {
  return (
    <div className="jm-stage">
      {livingLines && (
        <div className="jm-stage-ll" aria-hidden="true">
          <LivingLines gap={28} />
        </div>
      )}
      {children}
    </div>
  )
}

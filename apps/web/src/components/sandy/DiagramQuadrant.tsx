type Point = { label: string; x: 'low' | 'high'; y: 'low' | 'high'; active?: boolean }

type Props = {
  xLabel: string
  yLabel: string
  points: Point[]
}

export default function DiagramQuadrant({ xLabel, yLabel, points }: Props) {
  return (
    <div className="relative p-6 rounded-2xl border" style={{ borderColor: 'var(--color-sandy-line)', background: 'var(--color-sandy-surface)' }}>
      <div className="grid grid-cols-2 grid-rows-2 gap-3 min-h-[200px] relative">
        <div className="absolute left-1/2 top-0 bottom-0 w-px" style={{ background: 'var(--color-sandy-line-strong)' }} />
        <div className="absolute top-1/2 left-0 right-0 h-px" style={{ background: 'var(--color-sandy-line-strong)' }} />
        {(['high', 'low'] as const).flatMap((y) =>
          (['low', 'high'] as const).map((x) => {
            const pt = points.find((p) => p.x === x && p.y === y)
            return (
              <div key={`${x}-${y}`} className="flex items-center justify-center p-3">
                {pt && (
                  <span
                    className="px-3 py-2 rounded-xl border text-xs text-center transition-all"
                    style={{
                      borderColor: pt.active ? 'var(--color-jm-spice)' : 'var(--color-sandy-line)',
                      background: pt.active ? 'var(--color-sandy-gold-wash)' : 'var(--color-sandy-elevated)',
                    }}
                  >
                    {pt.label}
                  </span>
                )}
              </div>
            )
          }),
        )}
      </div>
      <span className="caption-label block text-center mt-3" style={{ color: 'var(--color-sandy-ink-faint)' }}>{xLabel} ↔ · ↕ {yLabel}</span>
    </div>
  )
}

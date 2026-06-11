type Props = {
  size?: number
  major?: boolean
  vignette?: boolean
  className?: string
  style?: React.CSSProperties
}

export default function GraphPaper({
  size = 28,
  major = true,
  vignette = true,
  className = '',
  style,
}: Props) {
  const cls = [
    'graph-paper',
    vignette ? 'graph-paper--vignette' : '',
    className,
  ].filter(Boolean).join(' ')

  return (
    <div
      className={cls}
      aria-hidden="true"
      style={{ '--gp-size': `${size}px`, '--gp-major': `${size * 4}px`, ...style } as React.CSSProperties}
    >
      <div className="graph-paper-grid" />
      {major && <div className="graph-paper-grid graph-paper-grid--major" />}
    </div>
  )
}

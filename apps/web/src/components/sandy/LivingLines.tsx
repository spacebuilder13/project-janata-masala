import { useEffect, useRef } from 'react'

type Props = {
  gap?: number
  className?: string
  style?: React.CSSProperties
}

const INK = 'rgba(27,26,23,'
const SPICE = '196,90,26'

export default function LivingLines({ gap = 26, className = '', style }: Props) {
  const ref = useRef<HTMLCanvasElement | null>(null)

  useEffect(() => {
    const canvas = ref.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    let raf = 0
    let w = 0
    let h = 0
    let dpr = Math.min(window.devicePixelRatio || 1, 2)
    type Dot = { hx: number; hy: number }
    let dots: Dot[] = []

    const build = () => {
      const rect = canvas.getBoundingClientRect()
      w = Math.max(1, rect.width)
      h = Math.max(1, rect.height)
      dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      dots = []
      const cols = Math.ceil(w / gap) + 1
      const rows = Math.ceil(h / gap) + 1
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          dots.push({ hx: c * gap, hy: r * gap })
        }
      }
    }

    const start = performance.now()
    const frame = (now: number) => {
      const t = (now - start) / 1000
      ctx.clearRect(0, 0, w, h)
      for (const d of dots) {
        const wave = Math.sin((d.hx + d.hy) * 0.012 - t * 1.6)
        const a = 0.08 + (wave * 0.5 + 0.5) * 0.34
        ctx.fillStyle = `${INK}${a.toFixed(3)})`
        ctx.beginPath()
        ctx.arc(d.hx, d.hy, 1.1, 0, Math.PI * 2)
        ctx.fill()
        if (wave > 0.85) {
          ctx.fillStyle = `rgba(${SPICE},${(0.15 * (wave - 0.85) / 0.15).toFixed(3)})`
          ctx.beginPath()
          ctx.arc(d.hx, d.hy, 2, 0, Math.PI * 2)
          ctx.fill()
        }
      }
      if (!reduce) raf = requestAnimationFrame(frame)
    }

    build()
    if (!reduce) raf = requestAnimationFrame(frame)
    const onResize = () => build()
    window.addEventListener('resize', onResize)
    return () => { cancelAnimationFrame(raf); window.removeEventListener('resize', onResize) }
  }, [gap])

  return (
    <canvas
      ref={ref}
      className={className}
      aria-hidden="true"
      style={{ display: 'block', width: '100%', height: '100%', ...style }}
    />
  )
}

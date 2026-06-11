import type { WAPattern } from '@/data/whatsapp'

type Props = { pattern: WAPattern }

function DemoContent({ pattern }: { pattern: WAPattern }) {
  if (pattern.demoType === 'buttons') {
    return (
      <div className="flex flex-wrap gap-2 mt-2">
        {['50 kg', '100 kg', 'Custom'].map((b) => (
          <span key={b} className="px-3 py-1.5 rounded-full text-xs border" style={{ borderColor: '#00a884', color: '#00a884' }}>{b}</span>
        ))}
      </div>
    )
  }
  if (pattern.demoType === 'list') {
    return (
      <div className="mt-2 p-3 rounded-lg text-xs" style={{ background: '#f0f2f5', color: '#667781' }}>
        <p className="font-medium" style={{ color: '#111' }}>Select combo</p>
        <p className="mt-1">Navratri Essentials · Diwali Pack · Monthly Essentials</p>
      </div>
    )
  }
  if (pattern.demoType === 'channel') {
    return (
      <div className="mt-2 p-3 rounded-lg text-xs" style={{ background: '#e7f3ff', color: '#0088cc' }}>
        Channel update · 142 subscribers
      </div>
    )
  }
  return (
    <p className="mt-2 text-sm" style={{ color: '#111' }}>{pattern.jmHook}</p>
  )
}

export default function WAChatFrame({ pattern }: Props) {
  return (
    <div className="rounded-2xl overflow-hidden border" style={{ borderColor: '#d1d7db', background: '#e5ddd5' }}>
      <div className="px-4 py-3 flex items-center gap-3" style={{ background: '#075e54' }}>
        <div className="w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold" style={{ background: '#25d366', color: '#fff' }}>JM</div>
        <div>
          <p className="text-sm font-medium text-white">Janata Masala</p>
          <p className="text-[10px] text-white/70">Business account</p>
        </div>
      </div>
      <div className="p-4 min-h-[120px]">
        <div className="max-w-[85%] p-3 rounded-lg rounded-tl-none shadow-sm" style={{ background: '#fff' }}>
          <span className="text-[10px] font-medium" style={{ color: '#00a884' }}>{pattern.number} · {pattern.title}</span>
          <p className="text-xs mt-1" style={{ color: '#667781' }}>{pattern.intent}</p>
          <DemoContent pattern={pattern} />
        </div>
      </div>
    </div>
  )
}

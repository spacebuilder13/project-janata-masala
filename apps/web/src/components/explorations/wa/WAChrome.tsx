import type { ReactNode } from 'react'

export const DEFAULT_WALLPAPER =
  'radial-gradient(circle at 20% 10%, rgba(0,0,0,0.025) 0 1px, transparent 1.5px) 0 0/22px 22px, #ece5dd'

export const JM_WALLPAPER =
  'radial-gradient(circle at 30% 30%, rgba(196,90,26,0.06) 0 1.5px, transparent 2px) 0 0/26px 26px, linear-gradient(180deg, #F6F1E6 0%, #EFE6D2 100%)'

type ChromeProps = {
  children: ReactNode
  wallpaper?: string
  accent?: string
  composer?: ReactNode
  unread?: boolean
}

export default function WAChrome({
  children,
  wallpaper = DEFAULT_WALLPAPER,
  accent = 'var(--wa-accent, #D9FDD3)',
  composer,
  unread,
}: ChromeProps) {
  return (
    <div className="w-full h-full flex flex-col" style={{ background: '#000' }}>
      <div
        className="flex items-center justify-between px-3.5 pt-1.5 pb-0.5 text-[10px]"
        style={{ background: 'var(--wa-header)', color: 'white', fontFamily: 'system-ui' }}
      >
        <span className="font-semibold">9:41</span>
        <span className="opacity-90">•••• 5G</span>
      </div>

      <div
        className="flex items-center gap-2 px-2.5 py-2"
        style={{ background: 'var(--wa-header)', color: 'white' }}
      >
        <div className="text-[14px] leading-none opacity-90">‹</div>
        <div
          className="wa-jm-avatar w-7 h-7 rounded-full flex items-center justify-center text-[10px] font-semibold flex-shrink-0"
          style={{
            background: 'radial-gradient(circle at 30% 25%, #2c3a4e, #1f2b3a)',
            color: 'var(--color-sandy-gold-soft)',
            fontFamily: 'var(--font-sandy-display)',
            boxShadow: 'inset 0 0 0 1px rgba(231, 204, 133, 0.45)',
          }}
        >
          JM
        </div>
        <div className="flex-1 leading-tight min-w-0">
          <div className="text-[12.5px] font-medium truncate" style={{ fontFamily: 'system-ui' }}>
            Janata Masala
          </div>
          <div className="text-[9.5px] opacity-80">business account</div>
        </div>
        <div className="text-[12px] opacity-90 flex-shrink-0">📞 ⋮</div>
      </div>

      <div
        className="flex-1 overflow-hidden relative"
        style={{ background: wallpaper, fontFamily: 'system-ui' }}
      >
        {unread && (
          <div className="text-center text-[9px] py-1 my-1" style={{ color: '#5A6B73' }}>
            <span className="px-2 py-0.5 rounded" style={{ background: 'rgba(225,245,254,0.95)' }}>
              UNREAD MESSAGES
            </span>
          </div>
        )}
        <div
          className="px-2 py-2 space-y-1.5 overflow-y-auto h-full"
          style={{ ['--wa-accent' as string]: accent }}
        >
          {children}
        </div>
      </div>

      <div className="px-2 py-1.5 flex items-center gap-1.5" style={{ background: 'var(--wa-composer-bg)' }}>
        {composer ?? (
          <>
            <div
              className="flex-1 rounded-full px-3 py-1.5 text-[11px] flex items-center justify-between"
              style={{ background: 'white', color: '#9AA0A6' }}
            >
              <span>Message</span>
              <span>📎 📷</span>
            </div>
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center"
              style={{ background: 'var(--wa-header)', color: 'white', fontSize: 12 }}
            >
              🎤
            </div>
          </>
        )}
      </div>
    </div>
  )
}

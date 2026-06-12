// JM WhatsApp pattern demos — each fits inside 260×460 mini-frame

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import WAChrome from '../WAChrome'
import Bubble from '../Bubble'
import { ease } from '@/components/sandy/motion'

function ReplyButtons({ prompt, buttons, followup }: { prompt: string; buttons: string[]; followup: string }) {
  const [picked, setPicked] = useState<string | null>(null)
  const [showFollowup, setShowFollowup] = useState(false)

  useEffect(() => {
    if (!picked) return
    const t = setTimeout(() => setShowFollowup(true), 700)
    return () => clearTimeout(t)
  }, [picked])

  return (
    <WAChrome>
      <Bubble>{prompt}</Bubble>
      {!picked && (
        <Bubble noPadding>
          <div className="px-2.5 py-1.5">Choose:</div>
          <div className="border-t" style={{ borderColor: '#E9EDEF' }}>
            {buttons.map((b) => (
              <button
                key={b}
                type="button"
                onClick={() => setPicked(b)}
                className="w-full text-center py-1.5 text-[11.5px] font-medium border-b last:border-b-0"
                style={{ color: 'var(--wa-action)', borderColor: '#E9EDEF' }}
              >
                {b}
              </button>
            ))}
          </div>
          <div className="text-[8.5px] mt-0.5 px-2.5 pb-1 text-right" style={{ color: 'var(--wa-bubble-meta)' }}>
            9:41
          </div>
        </Bubble>
      )}
      {picked && <Bubble side="out">{picked}</Bubble>}
      {showFollowup && <Bubble>{followup}</Bubble>}
    </WAChrome>
  )
}

// 01 · List-dump order
export function WAListDump() {
  const [step, setStep] = useState(0)
  useEffect(() => {
    const t1 = setTimeout(() => setStep(1), 800)
    const t2 = setTimeout(() => setStep(2), 1800)
    return () => {
      clearTimeout(t1)
      clearTimeout(t2)
    }
  }, [])

  return (
    <WAChrome>
      <Bubble side="out">1kg kaju, 500g elaichi, 2 garam masala</Bubble>
      {step >= 1 && (
        <Bubble>
          Got it! Here's your bill:
          <br />
          <span style={{ color: 'var(--wa-bubble-meta)', fontSize: 10 }}>
            Kaju 1kg · ₹980
            <br />
            Elaichi 500g · ₹320
            <br />
            Garam masala ×2 · ₹260
          </span>
        </Bubble>
      )}
      {step >= 2 && (
        <Bubble noPadding>
          <div className="px-2.5 py-1.5 text-[11px]">
            <strong>Total ₹1,560</strong>
            <br />
            <span style={{ color: 'var(--wa-bubble-meta)' }}>Order #JM-2901</span>
          </div>
          <button
            type="button"
            className="w-full text-center py-1.5 text-[11.5px] font-medium border-t"
            style={{ color: 'var(--wa-action)', borderColor: '#E9EDEF' }}
          >
            ↗ Pay now
          </button>
          <div className="text-[8.5px] mt-0.5 px-2.5 pb-1 text-right" style={{ color: 'var(--wa-bubble-meta)' }}>
            9:42
          </div>
        </Bubble>
      )}
    </WAChrome>
  )
}

// 02 · Catalog carousel
export function WACatalogCarousel() {
  const cards = [
    { tag: 'BEST', title: 'Garam Masala', body: '500g · ₹130', grad: 'linear-gradient(135deg,#1F1A12,#3F3322)' },
    { tag: 'BEST', title: 'Chana Masala', body: '500g · ₹95', grad: 'linear-gradient(135deg,#102A2E,#1E4A50)' },
    { tag: 'NEW', title: 'Pav Bhaji', body: '200g · ₹65', grad: 'linear-gradient(135deg,#3B2A1F,#5A3E2E)' },
  ]
  const [i, setI] = useState(0)

  return (
    <WAChrome>
      <Bubble>Our bestsellers this season ↑ Swipe to browse.</Bubble>
      <Bubble noPadding tone="transparent">
        <div className="flex gap-1.5 px-1">
          {cards.map((c, idx) => (
            <motion.div
              key={c.title}
              animate={{ scale: i === idx ? 1 : 0.92, opacity: i === idx ? 1 : 0.6 }}
              transition={{ duration: 0.3 }}
              className="rounded-lg overflow-hidden flex-shrink-0"
              style={{ width: 110, background: 'white', boxShadow: '0 1px 2px rgba(0,0,0,0.15)' }}
            >
              <div
                style={{
                  height: 60,
                  background: c.grad,
                  color: 'white',
                  padding: 6,
                  fontSize: 8,
                  letterSpacing: 1,
                  textTransform: 'uppercase',
                }}
              >
                {c.tag}
              </div>
              <div className="p-1.5">
                <div className="text-[10px] font-medium">{c.title}</div>
                <div className="text-[9px]" style={{ color: 'var(--wa-bubble-meta)' }}>
                  {c.body}
                </div>
                <button
                  type="button"
                  className="mt-1 w-full text-center py-1 text-[9.5px] font-medium border-t"
                  style={{ color: 'var(--wa-action)', borderColor: '#E9EDEF' }}
                >
                  Add to order
                </button>
              </div>
            </motion.div>
          ))}
        </div>
        <div className="flex justify-center gap-1 mt-1.5 pb-1">
          {cards.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => setI(idx)}
              className="w-1.5 h-1.5 rounded-full"
              style={{ background: i === idx ? 'var(--wa-action)' : '#C7CDD2' }}
              aria-label={`Card ${idx + 1}`}
            />
          ))}
        </div>
      </Bubble>
    </WAChrome>
  )
}

// 03 · Bulk order buttons
export function WABulkButtons() {
  return (
    <ReplyButtons
      prompt="Need bulk pricing on Garam Masala? Pick a quantity — we'll call back with rates."
      buttons={['50 kg', '100 kg', 'Custom qty']}
      followup="Noted — our team will call within 2 hours with bulk rates. 📞"
    />
  )
}

// 04 · Channels
export function WAChannelUpdate() {
  return (
    <WAChrome>
      <Bubble noPadding>
        <div
          className="rounded-md overflow-hidden mx-1 mt-1"
          style={{ background: '#e7f3ff', border: '1px solid #cce5ff' }}
        >
          <div className="px-2.5 py-2 text-[10px]" style={{ color: '#0088cc' }}>
            <div className="font-medium" style={{ color: '#111' }}>
              Janata Masala · Channel
            </div>
            <div className="mt-1.5">Fresh 13mm kaju arrived! Limited stock — first come, first served.</div>
            <div className="mt-1 opacity-70">142 subscribers · 2h ago</div>
          </div>
        </div>
        <div className="text-[8.5px] mt-0.5 px-2.5 pb-1 text-right" style={{ color: 'var(--wa-bubble-meta)' }}>
          9:41
        </div>
      </Bubble>
    </WAChrome>
  )
}

// 05 · Payment link
export function WAPaymentLink() {
  return (
    <WAChrome>
      <Bubble>Your order is ready — here's the bill:</Bubble>
      <Bubble noPadding>
        <div className="px-2.5 py-1.5 text-[10.5px]">
          <div style={{ color: 'var(--wa-bubble-meta)', fontSize: 9, textTransform: 'uppercase', letterSpacing: 1 }}>
            Order #JM-2901
          </div>
          <div className="mt-1 font-medium">Kaju 1kg · Elaichi 500g · Garam ×2</div>
          <div className="mt-1.5 text-[13px] font-semibold">Total ₹1,560</div>
        </div>
        <button
          type="button"
          className="w-full text-center py-1.5 text-[11.5px] font-medium border-t flex items-center justify-center gap-1"
          style={{ color: 'var(--wa-action)', borderColor: '#E9EDEF' }}
        >
          ↗ Pay now via Razorpay
        </button>
        <div className="text-[8.5px] mt-0.5 px-2.5 pb-1 text-right" style={{ color: 'var(--wa-bubble-meta)' }}>
          9:41
        </div>
      </Bubble>
    </WAChrome>
  )
}

// 06 · CRM segment
export function WACrmSegment() {
  return (
    <WAChrome>
      <Bubble>Your favourite 13mm kaju is back in stock 👇</Bubble>
      <Bubble noPadding>
        <div
          className="rounded-md overflow-hidden"
          style={{
            width: 200,
            height: 100,
            background: 'linear-gradient(160deg, #F6F1E6, #EFE6D2)',
            padding: 10,
            color: '#1F1A12',
          }}
        >
          <div style={{ fontSize: 8, letterSpacing: 1.4, textTransform: 'uppercase', color: '#8A7B5E' }}>
            kaju · 13mm
          </div>
          <div style={{ fontFamily: 'var(--font-sandy-display)', fontSize: 18, marginTop: 4 }}>Back in stock</div>
          <div style={{ fontSize: 9, color: '#5C5238', marginTop: 2 }}>₹980/kg · Ghatkopar delivery</div>
        </div>
        <div className="px-1 pt-1.5 text-[10.5px]">
          We saved this for you — reply to reserve before it sells out.
        </div>
        <div className="text-[8.5px] mt-0.5 px-1 pb-1 text-right" style={{ color: 'var(--wa-bubble-meta)' }}>
          9:41
        </div>
      </Bubble>
    </WAChrome>
  )
}

// 07 · Order confirmation
export function WAOrderConfirm() {
  return (
    <WAChrome>
      <Bubble>
        <strong>Order #JM-2847 confirmed ✓</strong>
        <br />
        <span style={{ color: 'var(--wa-bubble-meta)', fontSize: 10 }}>
          Kaju 500g · Garam masala ×2
          <br />
          Total ₹890
          <br />
          Delivery tomorrow before 11am
        </span>
      </Bubble>
    </WAChrome>
  )
}

// 08 · Festival list picker
export function WAFestivalList() {
  const [open, setOpen] = useState(false)
  const [picked, setPicked] = useState<string | null>(null)
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 1200)
    return () => clearTimeout(t)
  }, [])

  const sections = [
    { title: 'Navratri', rows: ['Navratri Essentials', 'Fasting Pack'] },
    { title: 'Diwali', rows: ['Diwali Pack', 'Sweet Spice Combo'] },
    { title: 'Monthly', rows: ['Monthly Essentials'] },
  ]

  return (
    <WAChrome>
      <Bubble>Pick your festival combo — we'll pack and deliver.</Bubble>
      <Bubble noPadding>
        <button
          type="button"
          onClick={() => setOpen(true)}
          className="w-full text-center py-1.5 px-2.5 text-[11.5px] font-medium flex items-center justify-center gap-1"
          style={{ color: 'var(--wa-action)' }}
        >
          ☰ Browse combos
        </button>
        <div className="text-[8.5px] mt-0.5 px-2.5 pb-1 text-right" style={{ color: 'var(--wa-bubble-meta)' }}>
          9:41
        </div>
      </Bubble>
      {picked && <Bubble side="out">{picked}</Bubble>}

      <AnimatePresence>
        {open && !picked && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.32, ease: ease.arrive }}
            className="absolute inset-x-0 bottom-0 rounded-t-2xl overflow-hidden"
            style={{ background: 'white', maxHeight: '78%' }}
          >
            <div className="text-center py-2 text-[12px] font-medium">Festival combos</div>
            <div className="overflow-y-auto" style={{ maxHeight: 240 }}>
              {sections.map((s) => (
                <div key={s.title}>
                  <div
                    className="px-3 py-1 text-[9.5px] uppercase tracking-wider"
                    style={{ color: 'var(--wa-bubble-meta)', background: '#F7F8FA' }}
                  >
                    {s.title}
                  </div>
                  {s.rows.map((r) => (
                    <button
                      key={r}
                      type="button"
                      onClick={() => {
                        setPicked(r)
                        setOpen(false)
                      }}
                      className="w-full text-left px-3 py-2 text-[11.5px] border-b"
                      style={{ borderColor: '#F0F2F5' }}
                    >
                      {r}
                    </button>
                  ))}
                </div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </WAChrome>
  )
}

// 09 · Bundle offer
export function WABundleOffer() {
  return (
    <ReplyButtons
      prompt="Monthly Essentials pack — ₹2,400 (save ₹180). Garam, Chana, Pav Bhaji + elaichi. Want it?"
      buttons={['Yes, add pack', 'Not this month', "What's inside?"]}
      followup="Added to your cart — reply with delivery day or we'll ship tomorrow. 📦"
    />
  )
}

// 10 · Feedback flow
export function WAFeedbackFlow() {
  const [open, setOpen] = useState(false)
  const [done, setDone] = useState(false)
  useEffect(() => {
    const t = setTimeout(() => setOpen(true), 1000)
    return () => clearTimeout(t)
  }, [])

  return (
    <WAChrome>
      <Bubble>How was your delivery today? Takes 10 seconds.</Bubble>
      <Bubble noPadding>
        <button
          type="button"
          onClick={() => {
            setOpen(true)
            setDone(false)
          }}
          className="w-full text-center py-1.5 px-2.5 text-[11.5px] font-medium"
          style={{ color: 'var(--wa-action)' }}
        >
          ⚙ Rate & reorder
        </button>
        <div className="text-[8.5px] mt-0.5 px-2.5 pb-1 text-right" style={{ color: 'var(--wa-bubble-meta)' }}>
          9:41
        </div>
      </Bubble>
      {done && <Bubble>Thanks! Freshness 5★ — we'll note kaju reorder for next week. ✅</Bubble>}

      <AnimatePresence>
        {open && !done && (
          <motion.div
            initial={{ y: '100%' }}
            animate={{ y: 0 }}
            exit={{ y: '100%' }}
            transition={{ duration: 0.34, ease: ease.arrive }}
            className="absolute inset-0 flex flex-col"
            style={{ background: 'white' }}
          >
            <div className="flex items-center px-3 py-2 border-b" style={{ borderColor: '#E9EDEF' }}>
              <button type="button" onClick={() => setOpen(false)} className="text-[14px]" style={{ color: '#54656F' }}>
                ✕
              </button>
              <div className="flex-1 text-center text-[12px] font-medium">Delivery feedback</div>
            </div>
            <div className="flex-1 p-3.5">
              <div className="text-[12px] font-medium mb-2">Freshness rating?</div>
              {['⭐⭐⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐'].map((o) => (
                <button
                  key={o}
                  type="button"
                  className="w-full text-left px-3 py-2 mb-1.5 rounded-md border text-[11.5px]"
                  style={{ borderColor: '#E9EDEF' }}
                >
                  {o}
                </button>
              ))}
              <div className="text-[12px] font-medium mt-3 mb-2">Reorder kaju?</div>
              {['Yes, same qty', 'Not now'].map((o) => (
                <button
                  key={o}
                  type="button"
                  className="w-full text-left px-3 py-2 mb-1.5 rounded-md border text-[11.5px]"
                  style={{ borderColor: '#E9EDEF' }}
                >
                  {o}
                </button>
              ))}
            </div>
            <div className="p-2.5 border-t" style={{ borderColor: '#E9EDEF' }}>
              <button
                type="button"
                onClick={() => {
                  setOpen(false)
                  setDone(true)
                }}
                className="w-full py-2 rounded-md text-[12px] font-medium"
                style={{ background: 'var(--wa-action)', color: 'white' }}
              >
                Submit
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </WAChrome>
  )
}

// 11 · Recipe tie-in
export function WARecipeTiein() {
  return (
    <WAChrome wallpaper="var(--wa-wallpaper-jm)">
      <Bubble>Perfect Pav Bhaji weekend 👇</Bubble>
      <Bubble noPadding>
        <div
          className="rounded-md overflow-hidden"
          style={{
            width: 200,
            height: 110,
            background: 'linear-gradient(160deg, #3B2A1F, #5A3E2E)',
            padding: 10,
            color: 'white',
          }}
        >
          <div style={{ fontSize: 8, letterSpacing: 1.4, textTransform: 'uppercase', opacity: 0.7 }}>
            recipe · pav bhaji
          </div>
          <div style={{ fontFamily: 'var(--font-sandy-display)', fontSize: 16, marginTop: 6 }}>
            You'll need our Pav Bhaji Masala
          </div>
          <div style={{ fontSize: 9, opacity: 0.8, marginTop: 4 }}>200g · ₹65 · in stock</div>
        </div>
        <div className="px-1 pt-1.5 text-[10.5px]">
          Reply <strong>add pav bhaji</strong> and we'll include it in your next delivery.
        </div>
        <div className="text-[8.5px] mt-0.5 px-1 pb-1 text-right" style={{ color: 'var(--wa-bubble-meta)' }}>
          9:41
        </div>
      </Bubble>
    </WAChrome>
  )
}

export const JM_WA_COMPONENTS: Record<string, React.FC> = {
  'list-dump': WAListDump,
  'catalog-carousel': WACatalogCarousel,
  'bulk-order-buttons': WABulkButtons,
  'channels-arrivals': WAChannelUpdate,
  'payment-link': WAPaymentLink,
  'crm-segment': WACrmSegment,
  'order-confirm': WAOrderConfirm,
  'festival-list': WAFestivalList,
  'bundle-essentials': WABundleOffer,
  'feedback-flow': WAFeedbackFlow,
  'recipe-tiein': WARecipeTiein,
}

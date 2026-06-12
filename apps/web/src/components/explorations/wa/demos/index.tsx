import type { ComponentType } from 'react'
import {
  ReplyButtons,
  MediaCarousel,
  ListSheet,
  FlowSheet,
  ChannelCard,
  CtaUrlButton,
  ImageCaptionCard,
  SequenceThread,
  PayNowBlock,
  WAChrome,
  Bubble,
} from '@/wa-kit'

// 01 · List-dump order
export function WAListDump() {
  return (
    <SequenceThread
      delays={[800, 1800]}
      steps={[
        { side: 'out', content: '1kg kaju, 500g elaichi, 2 garam masala' },
        {
          content: (
            <>
              Got it! Here&apos;s your bill:
              <br />
              <span className="wa-bubble__sub">
                Kaju 1kg · ₹980
                <br />
                Elaichi 500g · ₹320
                <br />
                Garam masala ×2 · ₹260
              </span>
            </>
          ),
        },
        {
          noPadding: true,
          content: <PayNowBlock total="Total ₹1,560" orderId="Order #JM-2901" />,
        },
      ]}
    />
  )
}

// 02 · Catalog carousel
export function WACatalogCarousel() {
  return (
    <MediaCarousel
      intro="Our bestsellers this season ↑ Swipe to browse."
      cards={[
        { tag: 'BEST', title: 'Garam Masala', body: '500g · ₹130', headClass: 'garam', cta: 'Add to order' },
        { tag: 'BEST', title: 'Chana Masala', body: '500g · ₹95', headClass: 'chana', cta: 'Add to order' },
        { tag: 'NEW', title: 'Pav Bhaji', body: '200g · ₹65', headClass: 'pav', cta: 'Add to order' },
      ]}
    />
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
    <ChannelCard
      channelName="Janata Masala · Channel"
      message="Fresh 13mm kaju arrived! Limited stock — first come, first served."
      meta="142 subscribers · 2h ago"
    />
  )
}

// 05 · Payment link
export function WAPaymentLink() {
  return (
    <CtaUrlButton
      intro="Your order is ready — here's the bill:"
      orderLabel="Order #JM-2901"
      lines="Kaju 1kg · Elaichi 500g · Garam ×2"
      total="Total ₹1,560"
      ctaLabel="Pay now via Razorpay"
    />
  )
}

// 06 · CRM segment
export function WACrmSegment() {
  return (
    <ImageCaptionCard
      intro="Your favourite 13mm kaju is back in stock 👇"
      tag="kaju · 13mm"
      title="Back in stock"
      sub="₹980/kg · Ghatkopar delivery"
      caption="We saved this for you — reply to reserve before it sells out."
      variant="crm"
    />
  )
}

// 07 · Order confirmation
export function WAOrderConfirm() {
  return (
    <WAChrome>
      <Bubble>
        <strong>Order #JM-2847 confirmed ✓</strong>
        <br />
        <span className="wa-bubble__sub">
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
  return (
    <ListSheet
      prompt="Pick your festival combo — we'll pack and deliver."
      triggerLabel="Browse combos"
      sheetTitle="Festival combos"
      sections={[
        { title: 'Navratri', rows: ['Navratri Essentials', 'Fasting Pack'] },
        { title: 'Diwali', rows: ['Diwali Pack', 'Sweet Spice Combo'] },
        { title: 'Monthly', rows: ['Monthly Essentials'] },
      ]}
      autoOpen
    />
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
  return (
    <FlowSheet
      prompt="How was your delivery today? Takes 10 seconds."
      triggerLabel="Rate & reorder"
      sheetTitle="Delivery feedback"
      doneMessage="Thanks! Freshness 5★ — we'll note kaju reorder for next week. ✅"
      autoOpen
      questions={[
        { label: 'Freshness rating?', options: ['⭐⭐⭐⭐⭐', '⭐⭐⭐⭐', '⭐⭐⭐'] },
        { label: 'Reorder kaju?', options: ['Yes, same qty', 'Not now'] },
      ]}
    />
  )
}

// 11 · Recipe tie-in
export function WARecipeTiein() {
  return (
    <ImageCaptionCard
      intro="Perfect Pav Bhaji weekend 👇"
      tag="recipe · pav bhaji"
      title="You'll need our Pav Bhaji Masala"
      sub="200g · ₹65 · in stock"
      caption={
        <>
          Reply <strong>add pav bhaji</strong> and we&apos;ll include it in your next delivery.
        </>
      }
      variant="recipe"
      wallpaper="jm"
    />
  )
}

export const JM_WA_COMPONENTS: Record<string, ComponentType> = {
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

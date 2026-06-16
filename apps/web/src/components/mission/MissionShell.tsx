import { useCallback, useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import PageShell from '@/components/sandy/PageShell'
import PageIntro from '@/components/sandy/PageIntro'
import CommerceRoadmap from '@/components/explorations/CommerceRoadmap'
import TodaySnapshot from '@/components/adventure/TodaySnapshot'
import StoreContextCards from '@/components/adventure/StoreContextCards'
import VisionGoals from '@/components/adventure/VisionGoals'
import CommunityStories from '@/components/adventure/CommunityStories'
import VersionBadge from './VersionBadge'
import NorthStarChip from './NorthStarChip'
import MissionWhatsNew from './MissionWhatsNew'
import MissionPrimaryNav from './MissionPrimaryNav'
import MissionSubNav from './MissionSubNav'
import MissionPanelFrame from './MissionPanelFrame'
import MissionStrategyPanel from './MissionStrategyPanel'
import MissionMomentumPanel from './MissionMomentumPanel'
import RetailStackTable from './RetailStackTable'
import MissionV1Archive from './MissionV1Archive'
import {
  businessPanels,
  engagementPanels,
  falcon2026,
  getPanelMeta,
  getPrimaryTabMeta,
} from '@/data/mission-center'

type PrimaryTab = 'business' | 'engagement' | 'roadmap'
type BusinessPanel = (typeof businessPanels)[number]['id']
type EngagementPanel = (typeof engagementPanels)[number]['id']

function readParams(): { tab: PrimaryTab; panel: string; version: 'v1' | 'v2' } {
  const p = new URLSearchParams(window.location.search)
  const tab = (p.get('tab') as PrimaryTab) || 'business'
  const panel = p.get('panel') || 'today'
  const version = p.get('version') === 'v1' ? 'v1' : 'v2'
  return {
    tab: ['business', 'engagement', 'roadmap'].includes(tab) ? tab : 'business',
    panel,
    version,
  }
}

function writeParams(tab: PrimaryTab, panel: string, version: 'v1' | 'v2') {
  const url = new URL(window.location.href)
  url.searchParams.set('tab', tab)
  url.searchParams.set('panel', panel)
  if (version === 'v2') url.searchParams.delete('version')
  else url.searchParams.set('version', version)
  window.history.replaceState({}, '', url.toString())
}

export default function MissionShell() {
  const initial = readParams()
  const [version, setVersion] = useState<'v1' | 'v2'>(initial.version)
  const [tab, setTab] = useState<PrimaryTab>(initial.tab)
  const [businessPanel, setBusinessPanel] = useState<BusinessPanel>(
    businessPanels.some((p) => p.id === initial.panel) ? (initial.panel as BusinessPanel) : 'today',
  )
  const [engagementPanel, setEngagementPanel] = useState<EngagementPanel>(
    engagementPanels.some((p) => p.id === initial.panel)
      ? (initial.panel as EngagementPanel)
      : 'strategy',
  )

  const syncUrl = useCallback((t: PrimaryTab, panel: string, v: 'v1' | 'v2') => {
    writeParams(t, panel, v)
  }, [])

  const selectTab = (id: PrimaryTab) => {
    setTab(id)
    const panel = id === 'business' ? businessPanel : id === 'engagement' ? engagementPanel : 'roadmap'
    syncUrl(id, panel, version)
  }

  const selectBusiness = (id: BusinessPanel) => {
    setBusinessPanel(id)
    setTab('business')
    syncUrl('business', id, version)
  }

  const selectEngagement = (id: EngagementPanel) => {
    setEngagementPanel(id)
    setTab('engagement')
    syncUrl('engagement', id, version)
  }

  const selectVersion = (id: 'v1' | 'v2') => {
    setVersion(id)
    syncUrl(tab, tab === 'business' ? businessPanel : engagementPanel, id)
  }

  const openRoadmap = () => {
    setTab('roadmap')
    syncUrl('roadmap', 'roadmap', version)
  }

  useEffect(() => {
    const onPop = () => {
      const p = readParams()
      setVersion(p.version)
      setTab(p.tab)
      if (businessPanels.some((b) => b.id === p.panel)) setBusinessPanel(p.panel as BusinessPanel)
      if (engagementPanels.some((e) => e.id === p.panel)) setEngagementPanel(p.panel as EngagementPanel)
    }
    window.addEventListener('popstate', onPop)
    return () => window.removeEventListener('popstate', onPop)
  }, [])

  if (version === 'v1') {
    return (
      <PageShell variant="wide">
        <PageIntro
          eyebrow="01 — Mission"
          title="Commerce 101 brief"
          sub="v1 archive — the executive brief your team saw in M2.7."
          accent="spice"
          wide
        />
        <div className="mc-header">
          <VersionBadge activeVersion={version} onSelect={selectVersion} />
          <NorthStarChip />
        </div>
        <MissionV1Archive />
      </PageShell>
    )
  }

  const primaryMeta = getPrimaryTabMeta(tab)
  const subPanels = tab === 'business' ? businessPanels : tab === 'engagement' ? engagementPanels : null
  const activeSubId = tab === 'business' ? businessPanel : tab === 'engagement' ? engagementPanel : null
  const panelMeta =
    tab === 'business'
      ? getPanelMeta('business', businessPanel)
      : tab === 'engagement'
        ? getPanelMeta('engagement', engagementPanel)
        : undefined

  const onSubChange = (id: string) => {
    if (tab === 'business') selectBusiness(id as BusinessPanel)
    else if (tab === 'engagement') selectEngagement(id as EngagementPanel)
  }

  return (
    <PageShell variant="wide">
      <div className="mc-intro-wrap mc-intro-wrap--compact">
        <PageIntro
          eyebrow="01 — Mission"
          title={falcon2026.name}
          sub={falcon2026.tagline}
          accent="spice"
          wide
        />
      </div>

      <div className="mc-header">
        <VersionBadge activeVersion={version} onSelect={selectVersion} />
        <NorthStarChip />
      </div>

      <MissionWhatsNew />

      <div className="mc-nav-sticky">
        <MissionPrimaryNav active={tab} onChange={selectTab} />
      </div>

      {subPanels && activeSubId && (
        <MissionSubNav
          sectionLabel={primaryMeta.label}
          items={subPanels}
          active={activeSubId}
          onChange={onSubChange}
          ariaLabel={tab === 'business' ? 'Business objective panels' : 'Engagement model panels'}
        />
      )}

      <div className="mc-panel-stage">
        <AnimatePresence mode="wait">
          <motion.div
            key={`${tab}-${activeSubId ?? 'roadmap'}`}
            className="mc-panel-inner"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.22 }}
          >
            {tab === 'business' && panelMeta && (
              <MissionPanelFrame
                eyebrow={primaryMeta.label}
                title={panelMeta.title}
                blurb={panelMeta.blurb}
              >
                {businessPanel === 'today' && <TodaySnapshot embedded />}
                {businessPanel === 'locations' && <StoreContextCards embedded />}
                {businessPanel === 'vision' && <VisionGoals embedded />}
                {businessPanel === 'community' && <CommunityStories embedded />}
              </MissionPanelFrame>
            )}

            {tab === 'engagement' && panelMeta && engagementPanel === 'strategy' && (
              <MissionPanelFrame
                eyebrow={primaryMeta.label}
                title={panelMeta.title}
                blurb={panelMeta.blurb}
              >
                <MissionStrategyPanel />
              </MissionPanelFrame>
            )}

            {tab === 'engagement' && panelMeta && engagementPanel === 'architecture' && (
              <MissionPanelFrame
                eyebrow={primaryMeta.label}
                title={panelMeta.title}
                blurb={panelMeta.blurb}
              >
                <RetailStackTable />
              </MissionPanelFrame>
            )}

            {tab === 'engagement' && panelMeta && engagementPanel === 'momentum' && (
              <MissionPanelFrame
                eyebrow={primaryMeta.label}
                title={panelMeta.title}
                blurb={panelMeta.blurb}
              >
                <MissionMomentumPanel onOpenRoadmap={openRoadmap} />
              </MissionPanelFrame>
            )}

            {tab === 'roadmap' && (
              <MissionPanelFrame
                eyebrow={primaryMeta.label}
                title="Commerce 101 pillars"
                blurb="CRM, WhatsApp backbone, and inward inventory — Crawl before Run."
              >
                <CommerceRoadmap />
              </MissionPanelFrame>
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </PageShell>
  )
}

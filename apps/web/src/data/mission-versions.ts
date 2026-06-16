export type MissionVersion = {
  id: 'v1' | 'v2'
  label: string
  date: string
  summary: string
  isCurrent: boolean
  changelog: string[]
}

export const missionVersions: MissionVersion[] = [
  {
    id: 'v2',
    label: 'v2',
    date: 'Jun 2026',
    summary: 'Falcon 2026 — operating stack, prioritization, roadmap in Mission Center',
    isCurrent: true,
    changelog: [
      'Falcon 2026 engagement framing — Mission Center replaces scroll brief',
      'Retail operating stack as interactive diagram',
      'Best bets matrix with suggested next course of action',
      'Commerce 101 roadmap moved into Falcon Roadmap tab',
    ],
  },
  {
    id: 'v1',
    label: 'v1',
    date: 'M2.7',
    summary: 'Commerce 101 executive brief — six scroll sections',
    isCurrent: false,
    changelog: [
      'North star, Today, Vision, Crawl/Walk/Run, Stores, Stories',
      'Anchor-nav scroll layout',
    ],
  },
]

export const currentMissionVersion = missionVersions.find((v) => v.isCurrent)!

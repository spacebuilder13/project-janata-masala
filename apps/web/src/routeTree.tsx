import { createRootRoute, createRoute, createRouter, redirect, Outlet } from '@tanstack/react-router'
import Layout from '@/components/Layout'
import Login from '@/routes/Login'
import Home from '@/routes/Home'
import Mission from '@/routes/Mission'
import ExplorationsIndex from '@/routes/ExplorationsIndex'
import ExplorationsWhatsapp from '@/routes/ExplorationsWhatsapp'
import ExplorationsVoice from '@/routes/ExplorationsVoice'
import ExplorationsBrand from '@/routes/ExplorationsBrand'
import { isAuthed } from '@/lib/auth'

const rootRoute = createRootRoute({
  component: () => <Outlet />,
})

const layoutRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'layout',
  component: Layout,
})

const indexRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/',
  component: Login,
})

const homeRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/home',
  beforeLoad: () => {
    if (!isAuthed()) throw redirect({ to: '/' })
  },
  component: Home,
})

const missionRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/home/mission',
  beforeLoad: () => {
    if (!isAuthed()) throw redirect({ to: '/' })
  },
  component: Mission,
})

const adventureRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/home/adventure',
  beforeLoad: () => {
    if (!isAuthed()) throw redirect({ to: '/' })
    throw redirect({ to: '/home/mission' })
  },
})

const explorationsRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/home/explorations',
  beforeLoad: () => {
    if (!isAuthed()) throw redirect({ to: '/' })
  },
  component: ExplorationsIndex,
})

const explorationsWhatsappRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/home/explorations/whatsapp',
  beforeLoad: () => {
    if (!isAuthed()) throw redirect({ to: '/' })
  },
  component: ExplorationsWhatsapp,
})

const explorationsVoiceRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/home/explorations/voice',
  beforeLoad: () => {
    if (!isAuthed()) throw redirect({ to: '/' })
  },
  component: ExplorationsVoice,
})

const explorationsArchitectureRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/home/explorations/architecture',
  beforeLoad: () => {
    if (!isAuthed()) throw redirect({ to: '/' })
    throw redirect({ href: '/home/mission?tab=roadmap' })
  },
})

const explorationsBrandRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/home/explorations/brand',
  beforeLoad: () => {
    if (!isAuthed()) throw redirect({ to: '/' })
  },
  component: ExplorationsBrand,
})

const routeTree = rootRoute.addChildren([
  layoutRoute.addChildren([
    indexRoute,
    homeRoute,
    missionRoute,
    adventureRoute,
    explorationsRoute,
    explorationsWhatsappRoute,
    explorationsVoiceRoute,
    explorationsArchitectureRoute,
    explorationsBrandRoute,
  ]),
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

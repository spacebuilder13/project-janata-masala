import { createRootRoute, createRoute, createRouter, redirect, Outlet } from '@tanstack/react-router'
import Layout from '@/components/Layout'
import Login from '@/routes/Login'
import Home from '@/routes/Home'
import Adventure from '@/routes/Adventure'
import ExplorationsIndex from '@/routes/ExplorationsIndex'
import ExplorationsWhatsapp from '@/routes/ExplorationsWhatsapp'
import ExplorationsVoice from '@/routes/ExplorationsVoice'
import ExplorationsArchitecture from '@/routes/ExplorationsArchitecture'
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

const adventureRoute = createRoute({
  getParentRoute: () => layoutRoute,
  path: '/home/adventure',
  beforeLoad: () => {
    if (!isAuthed()) throw redirect({ to: '/' })
  },
  component: Adventure,
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
  },
  component: ExplorationsArchitecture,
})

const routeTree = rootRoute.addChildren([
  layoutRoute.addChildren([
    indexRoute,
    homeRoute,
    adventureRoute,
    explorationsRoute,
    explorationsWhatsappRoute,
    explorationsVoiceRoute,
    explorationsArchitectureRoute,
  ]),
])

export const router = createRouter({ routeTree })

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}

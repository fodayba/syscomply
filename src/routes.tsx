import type { RouteObject } from 'react-router'
import { Layout } from './components/Layout'
import { industries } from './content/industries'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'

/*
 * Shared by the browser (main.tsx) and the build-time prerender (entry-server.tsx).
 * Home and 404 ship in the main bundle; every other page is code-split.
 */
export const routes: RouteObject[] = [
  {
    Component: Layout,
    HydrateFallback: () => null,
    children: [
      { path: '/', Component: Home },
      { path: '/platform', lazy: async () => ({ Component: (await import('./pages/Platform')).Platform }) },
      { path: '/solutions', lazy: async () => ({ Component: (await import('./pages/Solutions')).Solutions }) },
      { path: '/solutions/:id', lazy: async () => ({ Component: (await import('./pages/Solution')).Solution }) },
      { path: '/marketplace', lazy: async () => ({ Component: (await import('./pages/Marketplace')).Marketplace }) },
      { path: '/pricing', lazy: async () => ({ Component: (await import('./pages/Pricing')).Pricing }) },
      { path: '/about', lazy: async () => ({ Component: (await import('./pages/About')).About }) },
      { path: '/contact', lazy: async () => ({ Component: (await import('./pages/Contact')).Contact }) },
      { path: '*', Component: NotFound },
    ],
  },
]

/** Every URL that is prerendered to static HTML at build time. */
export const staticPaths = [
  '/',
  '/platform',
  '/solutions',
  ...industries.map((i) => `/solutions/${i.id}`),
  '/marketplace',
  '/pricing',
  '/about',
  '/contact',
]

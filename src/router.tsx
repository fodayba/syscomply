import { createBrowserRouter } from 'react-router'
import { Layout } from './components/Layout'
import { Home } from './pages/Home'
import { NotFound } from './pages/NotFound'

/*
 * Home and 404 ship in the main bundle. Every other page is code-split and loaded on
 * first visit; the router waits for the chunk, so there is no loading flash.
 */
export const router = createBrowserRouter([
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
])

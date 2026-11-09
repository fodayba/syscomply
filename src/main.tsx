import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import { createBrowserRouter, matchRoutes, RouterProvider, type RouteObject } from 'react-router'
import { routes } from './routes'
import './index.css'

/**
 * Pages are prerendered to HTML at build time. Before hydrating, load the code for the
 * page being viewed so the first client render matches the HTML exactly (no flash).
 */
async function resolveLazy(list: RouteObject[]) {
  const matches = matchRoutes(list, window.location) ?? []
  await Promise.all(
    matches.map(async ({ route }) => {
      if (typeof route.lazy !== 'function') return
      Object.assign(route, await route.lazy(), { lazy: undefined })
    }),
  )
}

const container = document.getElementById('root')!

resolveLazy(routes).then(() => {
  const app = (
    <StrictMode>
      <RouterProvider router={createBrowserRouter(routes)} />
    </StrictMode>
  )
  if (container.hasChildNodes()) hydrateRoot(container, app)
  else createRoot(container).render(app)
})

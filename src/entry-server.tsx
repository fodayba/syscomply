import { StrictMode } from 'react'
import { renderToString } from 'react-dom/server'
import { createStaticHandler, createStaticRouter, StaticRouterProvider } from 'react-router'
import { routes, staticPaths } from './routes'

export { staticPaths }

/** Renders one URL to HTML. Used only by scripts/prerender.mjs at build time. */
export async function render(url: string) {
  const handler = createStaticHandler(routes)
  const context = await handler.query(new Request(new URL(url, 'https://sys-comply.web.app')))
  if (context instanceof Response) throw new Error(`Unexpected redirect while prerendering ${url}`)
  const router = createStaticRouter(handler.dataRoutes, context)
  return renderToString(
    <StrictMode>
      <StaticRouterProvider router={router} context={context} hydrate={false} />
    </StrictMode>,
  )
}

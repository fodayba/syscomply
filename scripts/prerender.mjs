/**
 * Build step 3 of 3: turns the client build into static HTML pages.
 *
 * For every path in staticPaths it renders the page with the SSR bundle and writes
 * dist/<path>.html (Firebase serves /platform from platform.html via cleanUrls).
 * It also writes 404.html, robots.txt and sitemap.xml, and preloads the two fonts
 * used above the fold so text paints in its final face sooner.
 */
import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..')
const dist = path.join(root, 'dist')
const SITE = process.env.SITE_URL ?? 'https://sys-comply.web.app'

const { render, staticPaths } = await import(pathToFileURL(path.join(root, 'dist-ssr/entry-server.js')).href)
const template = await fs.readFile(path.join(dist, 'index.html'), 'utf8')

// Preload the regular Newsreader and Albert Sans latin files (the faces used in the hero).
const assets = await fs.readdir(path.join(dist, 'assets'))
const fonts = assets.filter((f) => /^(newsreader-latin-opsz-normal|albert-sans-latin-wght-normal)-.*\.woff2$/.test(f))
if (fonts.length !== 2) throw new Error(`Expected 2 preload fonts, found: ${fonts.join(', ') || 'none'}`)
const preloads = fonts.map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin>`).join('\n    ')

function page(html, url) {
  // React emits the page's <title> with the markup; move it into <head>.
  const title = html.match(/<title>[\s\S]*?<\/title>/)?.[0]
  const body = title ? html.replace(title, '') : html
  let out = template.replace('<div id="root"></div>', `<div id="root">${body}</div>`)
  if (title) out = out.replace(/<title>[\s\S]*?<\/title>/, title)
  out = out.replace('</head>', `    ${preloads}\n    <link rel="canonical" href="${SITE}${url === '/' ? '' : url}">\n  </head>`)
  return out
}

for (const url of staticPaths) {
  const file = url === '/' ? 'index.html' : `${url.slice(1)}.html`
  await fs.mkdir(path.dirname(path.join(dist, file)), { recursive: true })
  await fs.writeFile(path.join(dist, file), page(await render(url), url))
}

const notFound = page(await render('/404'), '/404').replace(/\s*<link rel="canonical"[^>]*>/, '')
await fs.writeFile(path.join(dist, '404.html'), notFound)

await fs.writeFile(path.join(dist, 'robots.txt'), `User-agent: *\nAllow: /\n\nSitemap: ${SITE}/sitemap.xml\n`)
await fs.writeFile(
  path.join(dist, 'sitemap.xml'),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${staticPaths
    .map((u) => `  <url><loc>${SITE}${u === '/' ? '' : u}</loc></url>`)
    .join('\n')}\n</urlset>\n`,
)

await fs.rm(path.join(root, 'dist-ssr'), { recursive: true, force: true })
console.log(`prerendered ${staticPaths.length} pages + 404, robots.txt, sitemap.xml`)

# SysComply website

Marketing site for SysComply, built with React 19, Vite 8, Tailwind CSS 4 and React Router 8.

```sh
npm install
npm run dev      # local dev server
npm run build    # type-check, build, then prerender every page to static HTML in dist/
npm run lint
```

Copy `.env.example` to `.env` to point at a different API or app URL.

## Structure

- `src/pages/` has one file per route: `/`, `/platform`, `/solutions`, `/solutions/:id`, `/marketplace`, `/pricing`, `/about`, `/contact`, plus a 404 page.
- `src/content/` holds all copy and data. Edit text here, not in components. The original extracted copy is in `content/content.md`.
- `src/components/` contains the layout (header, footer), shared UI, the logo and the "Book a demo" dialog.
- `src/lib/` has the API calls and the live pricing hook.

## Deployment notes

- **Continuous deploy:** `.github/workflows/deploy.yml` lints and builds every push and pull request. Pushes to `main` also deploy to Firebase Hosting (`sys-comply` → https://sys-comply.web.app). Auth is keyless (Workload Identity Federation): Google only accepts tokens from `fodayba/syscomply` on `main`, which act as `github-deployer@sys-comply.iam.gserviceaccount.com` (roles: Firebase Hosting Admin, Service Usage Consumer). No GitHub secret is needed.
- **Manual deploy:** `npm run build && npx firebase-tools deploy --only hosting`.
- **Prerendering:** `npm run build` renders every route to its own HTML file (`scripts/prerender.mjs`, using `src/entry-server.tsx`), plus `404.html`, `robots.txt` and `sitemap.xml`. React then hydrates the page in the browser. New routes must be added to `staticPaths` in `src/routes.tsx`. Values only the browser knows (URL query, localStorage) must be read after hydration; see `useHydrated` and `useStoredState` in `src/lib/hooks.ts`.
- **CORS:** the pricing page fetches `/organizations/plan-catalog` and `/exchange-rate`, and the forms post to `/support/demo-request` and `/support/public/contact`. The API currently doesn't send CORS headers for other origins, so those calls fail from `localhost`. Pricing falls back to the built-in prices, and the forms show an error. The API needs to allow the new site's origin.
- **Logo:** the Loop mark lives in `src/components/Logo.tsx`. `public/favicon.svg` and `public/apple-touch-icon.png` use the same geometry on an ink tile. The concept rounds are in `content/logo-concepts/`. The dashboard screenshots in `src/assets/` still show the old logo.
# syscomply

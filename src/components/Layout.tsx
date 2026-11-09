import { useEffect, useRef, useState } from 'react'
import { Outlet, ScrollRestoration, useLocation } from 'react-router'
import { ArrowUp, Menu, X } from 'lucide-react'
import { CONTACT_EMAIL, LOGIN_URL, SIGNUP_URL } from '../config'
import { isoDisclaimer, nav } from '../content/site'
import { industries } from '../content/industries'
import { DemoProvider } from './demo'
import { Link, NavLink } from './Link'
import { Logo } from './Logo'
import { ButtonA, Container } from './ui'

const YEAR = new Date().getFullYear()

export function Layout() {
  return (
    <DemoProvider>
      <a
        href="#main"
        className="sr-only focus:not-sr-only focus:fixed focus:top-3 focus:left-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-paper"
      >
        Skip to content
      </a>
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        <Outlet />
      </main>
      <Footer />
      <RouteAnnouncer />
      <ScrollRestoration />
    </DemoProvider>
  )
}

/**
 * On client-side navigation, moves focus to the new page and announces its title,
 * which is what a full page load would do for keyboard and screen-reader users.
 */
function RouteAnnouncer() {
  const { pathname } = useLocation()
  const live = useRef<HTMLParagraphElement>(null)
  const first = useRef(true)

  useEffect(() => {
    if (first.current) {
      first.current = false
      return
    }
    const id = requestAnimationFrame(() => {
      if (!window.location.hash) document.getElementById('main')?.focus({ preventScroll: true })
      if (live.current) live.current.textContent = document.title
    })
    return () => cancelAnimationFrame(id)
  }, [pathname])

  return <p ref={live} aria-live="polite" className="sr-only" />
}

function useScrolled(threshold = 8) {
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const on = () => setScrolled(window.scrollY > threshold)
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [threshold])
  return scrolled
}

function Header() {
  // The menu stays open only for the path it was opened on, so navigating closes it.
  const { pathname } = useLocation()
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname
  const scrolled = useScrolled()

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => e.key === 'Escape' && setOpenOn(null)
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      window.removeEventListener('keydown', onKey)
    }
  }, [open])

  const link = ({ isActive }: { isActive: boolean }) =>
    `relative text-sm transition-colors duration-200 ${isActive ? 'text-ink' : 'text-muted hover:text-ink'}`

  return (
    <header
      className={`site-header sticky top-0 z-40 transition-[background-color,box-shadow] duration-300 ${
        scrolled || open ? 'bg-paper/85 shadow-[0_1px_0_0_var(--color-line)] backdrop-blur-xl' : 'bg-paper'
      }`}
    >
      <Container className="flex h-16 items-center justify-between md:h-[72px]">
        <Link to="/" aria-label="SysComply home">
          <Logo />
        </Link>

        <nav aria-label="Main" className="hidden items-center gap-9 lg:flex">
          {nav.map((n) => (
            <NavLink key={n.to} to={n.to} className={link}>
              {({ isActive }) => (
                <>
                  {n.label}
                  <span
                    aria-hidden="true"
                    className={`absolute -bottom-2 left-1/2 size-1 -translate-x-1/2 rounded-full bg-sage-ink transition-opacity duration-300 ${isActive ? 'opacity-100' : 'opacity-0'}`}
                  />
                </>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="hidden items-center gap-7 lg:flex">
          <a href={LOGIN_URL} className="text-sm text-muted transition-colors hover:text-ink">
            Log in
          </a>
          <ButtonA href={SIGNUP_URL}>Get started</ButtonA>
        </div>

        <button
          type="button"
          className="-mr-2.5 grid size-11 place-items-center rounded-full active:bg-ink/5 lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          aria-label={open ? 'Close menu' : 'Open menu'}
          onClick={() => setOpenOn(open ? null : pathname)}
        >
          {open ? <X className="size-5" strokeWidth={1.5} /> : <Menu className="size-5" strokeWidth={1.5} />}
        </button>
      </Container>

      {open && (
        <nav id="mobile-nav" aria-label="Main" className="absolute inset-x-0 top-full h-[calc(100dvh-4rem)] animate-rise bg-paper lg:hidden">
          <Container className="flex h-full flex-col overflow-y-auto pt-4 pb-[max(2.5rem,env(safe-area-inset-bottom))]">
            <ul className="grid gap-1">
              {[...nav, { to: '/contact', label: 'Contact' }].map((n) => (
                <li key={n.to}>
                  <NavLink
                    to={n.to}
                    className={({ isActive }) => `block py-3 font-display text-[1.75rem] tracking-[-0.01em] ${isActive ? 'text-ink' : 'text-ink/60'}`}
                  >
                    {n.label}
                  </NavLink>
                </li>
              ))}
            </ul>
            <div className="mt-auto grid gap-3">
              <ButtonA href={SIGNUP_URL} size="lg">
                Get started
              </ButtonA>
              <ButtonA href={LOGIN_URL} variant="outline" size="lg">
                Log in
              </ButtonA>
            </div>
          </Container>
        </nav>
      )}
    </header>
  )
}

function Footer() {
  const cols = [
    {
      title: 'Product',
      links: [
        { to: '/platform', label: 'Platform' },
        { to: '/platform#iso-22000', label: 'ISO 22000 Suite' },
        { to: '/marketplace', label: 'Marketplace' },
        { to: '/pricing', label: 'Pricing' },
      ],
    },
    {
      title: 'Solutions',
      links: industries.map((i) => ({ to: `/solutions/${i.id}`, label: i.title })),
    },
    {
      title: 'Company',
      links: [
        { to: '/about', label: 'About' },
        { to: '/contact', label: 'Contact' },
      ],
    },
  ]

  return (
    <footer className="bg-ink text-paper">
      <Container>
        <div className="grid gap-10 pt-6 pb-12 md:gap-14 md:pt-12 md:pb-20 lg:grid-cols-[1.2fr_2fr]">
          <div className="max-w-xs">
            <Logo tone="light" />
            <p className="mt-6 text-sm leading-relaxed text-paper/50">
              Every ISO management system, in one place. Made in Freetown, Sierra Leone.
            </p>
            <a href={`mailto:${CONTACT_EMAIL}`} className="mt-3 inline-flex min-h-11 items-center text-sm text-paper/80 transition-colors hover:text-paper">
              {CONTACT_EMAIL}
            </a>
          </div>
          <div className="grid grid-cols-2 gap-x-8 gap-y-8 sm:grid-cols-3 md:gap-y-12">
            {cols.map((c) => (
              <div key={c.title}>
                <h2 className="text-xs font-medium tracking-[0.16em] text-paper/55 uppercase">{c.title}</h2>
                <ul className="mt-3 grid md:mt-5 md:gap-3">
                  {c.links.map((l) => (
                    <li key={l.to}>
                      <Link
                        to={l.to}
                        className="flex min-h-11 items-center text-sm text-paper/70 transition-colors hover:text-paper md:inline md:min-h-0"
                      >
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="grid gap-6 pb-10 text-xs leading-relaxed text-paper/55 md:pb-12">
          <p className="max-w-3xl">{isoDisclaimer}</p>
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="flex flex-wrap items-center gap-x-6 gap-y-2">
              <span>© {YEAR} SysComply.ai</span>
              <span className="inline-flex items-center gap-2">
                <span className="size-1.5 rounded-full bg-sage" aria-hidden="true" />
                All systems operational
              </span>
            </p>
            <button
              type="button"
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="-my-3 inline-flex min-h-11 items-center gap-2 text-paper/55 transition-colors hover:text-paper"
            >
              Back to top <ArrowUp className="size-3.5" strokeWidth={1.5} aria-hidden="true" />
            </button>
          </div>
        </div>
      </Container>
    </footer>
  )
}

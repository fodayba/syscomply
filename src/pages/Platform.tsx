import { useDeferredValue, useEffect, useMemo, useState } from 'react'
import { ArrowDown, Search, X } from 'lucide-react'
import dashboardLight from '../assets/dashboard-light.webp'
import dashboardLightSm from '../assets/dashboard-light-960.webp'
import { CtaBand } from '../components/CtaBand'
import { useOpenDemo } from '../components/demo-context'
import { useTabs } from '../components/Tabs'
import {
  Button,
  ButtonA,
  Container,
  IconBadge,
  Num,
  PageHeader,
  Section,
  SectionHeading,
  Tick,
  stack,
} from '../components/ui'
import { SIGNUP_URL } from '../config'
import { domains, ecosystem, foodSuite, moduleCount } from '../content/platform'

export function Platform() {
  const openDemo = useOpenDemo()
  return (
    <>
      <title>Platform — SysComply</title>
      <PageHeader
        eyebrow="Platform"
        title={
          <>
            Every module <em>your management system needs.</em>
          </>
        }
        lead={`${moduleCount} modules across ${domains.length} domains, sharing one set of records, so nothing has to be entered twice.`}
      >
        <ButtonA href={SIGNUP_URL} size="lg">
          Get started
        </ButtonA>
        <Button variant="outline" size="lg" onClick={openDemo}>
          Book a demo
        </Button>
      </PageHeader>

      <Container className="pt-14 md:pt-20">
        <div className="hero-shot rounded-[24px] bg-stone p-2 md:p-3">
          <img
            src={dashboardLight}
            srcSet={`${dashboardLightSm} 960w, ${dashboardLight} 1905w`}
            sizes="(min-width: 1152px) 1088px, 100vw"
            alt="The SysComply dashboard in light mode"
            width={1905}
            height={934}
            className="w-full rounded-[18px] shadow-[0_30px_60px_-30px_rgb(20_22_20/0.25)]"
          />
        </div>
      </Container>

      <Modules />
      <Ecosystem />
      <FoodSuite />
      <CtaBand />
    </>
  )
}

/** Tracks which domain article is nearest the top of the viewport. */
function useScrollSpy(ids: string[]) {
  const [active, setActive] = useState(ids[0])
  useEffect(() => {
    const els = ids.map((id) => document.getElementById(id)).filter(Boolean) as HTMLElement[]
    const io = new IntersectionObserver(
      (entries) => {
        const top = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0]
        if (top) setActive(top.target.id)
      },
      { rootMargin: '-20% 0px -60% 0px' },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [ids])
  return active
}

function Modules() {
  const [query, setQuery] = useState('')
  const q = useDeferredValue(query.trim().toLowerCase())

  const filtered = useMemo(
    () =>
      domains
        .map((d) => ({
          ...d,
          modules:
            q && !d.title.toLowerCase().includes(q) ? d.modules.filter((m) => m.toLowerCase().includes(q)) : d.modules,
        }))
        .filter((d) => d.modules.length > 0),
    [q],
  )
  const ids = useMemo(() => filtered.map((d) => d.id), [filtered])
  const active = useScrollSpy(ids)
  const matches = filtered.reduce((n, d) => n + d.modules.length, 0)

  return (
    <Section>
      <SectionHeading
        index="01"
        eyebrow="Modules"
        title={
          <>
            Seven domains, <em>one record.</em>
          </>
        }
        lead="Search for a module, or move through the domains on the left."
      />
      <div className={`${stack} grid gap-10 lg:grid-cols-[16rem_1fr] lg:gap-16`}>
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="relative">
            <Search
              className="pointer-events-none absolute top-1/2 left-4 size-4 -translate-y-1/2 text-muted"
              strokeWidth={1.5}
              aria-hidden="true"
            />
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => e.key === 'Escape' && setQuery('')}
              placeholder={`Search ${moduleCount} modules`}
              aria-label="Search modules"
              className="h-12 w-full appearance-none rounded-full bg-stone pr-11 pl-11 text-[15px] placeholder:text-muted/70 focus:bg-paper focus:ring-1 focus:ring-ink/40 focus:outline-none [&::-webkit-search-cancel-button]:hidden"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search"
                className="absolute top-1/2 right-2 grid size-8 -translate-y-1/2 place-items-center rounded-full text-muted hover:text-ink"
              >
                <X className="size-4" strokeWidth={1.5} />
              </button>
            )}
          </div>
          <p className="mt-3 h-5 pl-4 text-sm text-muted" aria-live="polite">
            {q ? `${matches} ${matches === 1 ? 'module' : 'modules'} found` : ''}
          </p>

          <nav aria-label="Platform domains" className="mt-4 hidden lg:block">
            <ul className="grid gap-3">
              {filtered.map((d) => (
                <li key={d.id}>
                  <a
                    href={`#${d.id}`}
                    aria-current={active === d.id ? 'true' : undefined}
                    className={`flex items-center gap-3 text-sm transition-colors duration-300 ${active === d.id ? 'text-ink' : 'text-muted hover:text-ink'}`}
                  >
                    <span
                      aria-hidden="true"
                      className={`size-1 rounded-full bg-sage-ink transition-all duration-300 ${active === d.id ? 'opacity-100' : 'opacity-0'}`}
                    />
                    {d.title}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>

        <div className="grid content-start gap-4 md:gap-6">
          {filtered.length === 0 && (
            <div className="rounded-3xl bg-stone p-10 text-center md:p-14">
              <p className="font-display text-2xl">No modules match "{query}".</p>
              <p className="mt-2 text-muted">Try a broader term, such as "audit" or "risk".</p>
            </div>
          )}
          {filtered.map((d) => {
            const n = domains.findIndex((x) => x.id === d.id) + 1
            return (
              <article
                key={d.id}
                id={d.id}
                className="grid scroll-mt-28 gap-8 rounded-3xl bg-stone p-8 md:grid-cols-[1fr_1.1fr] md:gap-10 md:p-10"
              >
                <div>
                  <div className="flex items-center justify-between gap-6">
                    <Num n={n} />
                    <IconBadge icon={d.icon} />
                  </div>
                  <h3 className="mt-6 font-display text-[1.75rem] leading-tight tracking-[-0.01em]">{d.title}</h3>
                  <p className="mt-3 leading-relaxed text-muted">{d.summary}</p>
                </div>
                <ul className="grid content-start gap-3 md:pt-1">
                  {d.modules.map((m) => (
                    <li key={m} className="flex gap-3 text-[15px]">
                      <Tick />
                      <Highlight text={m} query={q} />
                    </li>
                  ))}
                </ul>
              </article>
            )
          })}
        </div>
      </div>
    </Section>
  )
}

function Highlight({ text, query }: { text: string; query: string }) {
  const i = query ? text.toLowerCase().indexOf(query) : -1
  if (i === -1) return <>{text}</>
  return (
    <span>
      {text.slice(0, i)}
      <mark className="rounded-sm bg-sage/40 px-0.5 text-ink">{text.slice(i, i + query.length)}</mark>
      {text.slice(i + query.length)}
    </span>
  )
}

function Ecosystem() {
  return (
    <Section tone="stone">
      <SectionHeading
        index="02"
        eyebrow="How it connects"
        title={
          <>
            From the standard <em>to the certificate.</em>
          </>
        }
        lead="SysComply connects the bodies that license standards, the people who implement them and the auditors who certify them."
      />
      <ol data-stagger className={`${stack} grid gap-3 lg:grid-cols-5 lg:gap-4`}>
        {ecosystem.map((e, i) => {
          const core = i === 2
          const last = i === ecosystem.length - 1
          return (
            <li key={e.label} className="relative flex flex-col">
              <div
                className={`flex h-full flex-col rounded-3xl p-7 lg:min-h-56 ${core ? 'bg-ink text-paper' : 'bg-paper'}`}
              >
                <Num n={i + 1} light={core} />
                <p className="mt-auto pt-10 font-display text-xl leading-snug">{e.label}</p>
                <p className={`mt-2 text-sm leading-relaxed ${core ? 'text-paper/55' : 'text-muted'}`}>{e.note}</p>
              </div>
              {!last && (
                <span
                  aria-hidden="true"
                  className="absolute -bottom-1.5 left-1/2 z-10 grid size-6 -translate-x-1/2 translate-y-1/2 place-items-center rounded-full bg-stone text-muted lg:top-1/2 lg:-right-2 lg:bottom-auto lg:left-auto lg:translate-x-1/2 lg:-translate-y-1/2"
                >
                  <ArrowDown className="size-3.5 lg:-rotate-90" strokeWidth={1.5} />
                </span>
              )}
            </li>
          )
        })}
      </ol>
    </Section>
  )
}

function FoodSuite() {
  const [active, setActive] = useState(foodSuite[0].title)
  const items = foodSuite.map((m) => ({ id: m.title, label: m.title }))
  const { tabProps, panelProps } = useTabs(items, active, setActive)
  const m = foodSuite.find((x) => x.title === active)!

  return (
    <Section tone="ink" id="iso-22000">
      <SectionHeading
        index="03"
        eyebrow="ISO 22000 Suite"
        light
        title={
          <>
            Food science and production, <em>in one suite.</em>
          </>
        }
        lead="For food manufacturers. Formulate, plan, analyse and trace every step of production."
      />

      <div className={`${stack} grid gap-6 lg:grid-cols-[17rem_1fr] lg:gap-10`}>
        <div className="grid content-start">
          <div
            role="tablist"
            aria-label="ISO 22000 modules"
            className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] lg:mx-0 lg:grid lg:content-start lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0"
          >
            {foodSuite.map((x, i) => {
              const on = x.title === active
              return (
                <button
                  key={x.title}
                  {...tabProps(x.title, i)}
                  className={`flex shrink-0 items-center gap-3 rounded-full px-4 py-2.5 text-sm whitespace-nowrap transition-colors duration-300 lg:rounded-2xl lg:px-5 lg:py-3.5 lg:text-[15px] ${
                    on
                      ? 'bg-paper text-ink'
                      : 'bg-ink-2 text-paper/60 hover:text-paper lg:bg-transparent lg:hover:bg-ink-2'
                  }`}
                >
                  <x.icon className="hidden size-4 lg:block" strokeWidth={1.5} aria-hidden="true" />
                  {x.title}
                </button>
              )
            })}
          </div>
          <ButtonA href={SIGNUP_URL} variant="outline-light" className="mt-8 hidden justify-self-start lg:inline-flex">
            Try the suite
          </ButtonA>
        </div>

        <div {...panelProps(active)} className="rounded-3xl bg-ink-2 p-8 outline-none md:p-12">
          <div key={active} className="grid animate-rise gap-10 md:grid-cols-[1.4fr_1fr] md:gap-12">
            <div>
              <IconBadge icon={m.icon} light />
              <h3 className="mt-8 font-display text-[2rem] leading-tight tracking-[-0.015em]">{m.title}</h3>
              <ul className="mt-6 grid gap-3.5 text-paper/70">
                {m.points.map((p) => (
                  <li key={p} className="flex gap-3">
                    <Tick light />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
            <div className="self-end rounded-2xl bg-ink p-6">
              <p className="flex items-center gap-2 text-[11px] tracking-[0.14em] text-paper/40 uppercase">
                <span className="size-1.5 rounded-full bg-sage" aria-hidden="true" />
                {m.stat.label}
              </p>
              <p className="mt-3 font-display text-xl leading-snug">{m.stat.value}</p>
            </div>
          </div>
        </div>

        <ButtonA href={SIGNUP_URL} variant="light" size="lg" className="lg:hidden">
          Try the suite
        </ButtonA>
      </div>
    </Section>
  )
}

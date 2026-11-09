import { Link } from '../components/Link'
import { useState } from 'react'
import { ArrowUpRight, Minus } from 'lucide-react'
import dashboardDark from '../assets/dashboard-dark.webp'
import dashboardDarkSm from '../assets/dashboard-dark-960.webp'
import { useTabs } from '../components/Tabs'
import { Journey } from '../components/Journey'
import { CtaBand } from '../components/CtaBand'
import { useOpenDemo } from '../components/demo-context'
import {
  Button,
  ButtonA,
  Container,
  IconBadge,
  Section,
  SectionHeading,
  TextLink,
  Tick,
  stack,
} from '../components/ui'
import { SIGNUP_URL } from '../config'
import { industries } from '../content/industries'
import { domains, moduleCount } from '../content/platform'
import { plans } from '../content/pricing'
import { comparison, standards } from '../content/site'

export function Home() {
  return (
    <>
      <title>SysComply — Every ISO management system, in one place</title>
      <Hero />
      <Standards />
      <Why />
      <Lifecycle />
      <PlatformPreview />
      <IndustriesPreview />
      <Next />
      <CtaBand />
    </>
  )
}

function Hero() {
  const openDemo = useOpenDemo()
  return (
    <section className="overflow-hidden bg-ink text-paper">
      <Container className="pt-24 md:pt-36">
        <div className="mx-auto max-w-4xl animate-rise text-center">
          <p className="inline-flex items-center gap-2.5 text-xs font-medium tracking-[0.16em] text-paper/50 uppercase">
            <span className="size-1.5 rounded-full bg-sage" aria-hidden="true" />
            Version 1.0 now available
          </p>
          <h1 className="mt-8 font-display text-[2.9rem] leading-[1.02] font-normal tracking-[-0.03em] text-balance md:text-[5.75rem]">
            Every ISO management system, <em>in one place.</em>
          </h1>
          <p className="mx-auto mt-8 max-w-xl text-lg leading-relaxed text-paper/60 md:text-xl">
            Implement, run and maintain ISO 9001, 14001, 22000, 27001 and 45001 with licensed standards, an AI assistant
            and verified consultants, all in SysComply.
          </p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonA href={SIGNUP_URL} variant="light" size="lg">
              Get started
            </ButtonA>
            <Button variant="outline-light" size="lg" onClick={openDemo}>
              Book a demo
            </Button>
          </div>
        </div>

        <div className="relative mx-auto mt-20 max-w-5xl animate-rise [animation-delay:200ms] md:mt-24">
          <div className="hero-shot rounded-t-[20px] bg-paper/[0.06] p-1.5 pb-0 md:p-2.5 md:pb-0">
            <img
              src={dashboardDark}
              srcSet={`${dashboardDarkSm} 960w, ${dashboardDark} 1905w`}
              sizes="(min-width: 1152px) 1024px, 100vw"
              fetchPriority="high"
              alt="The SysComply dashboard showing compliance status across standards"
              width={1905}
              height={934}
              className="w-full rounded-t-[14px]"
            />
          </div>
          <StatusChip className="top-[14%] -left-10" label="HACCP module" value="Monitoring active" />
          <StatusChip className="top-[44%] -right-10" label="Risk analysis" value="Using AI" />
        </div>
      </Container>
    </section>
  )
}

function StatusChip({ label, value, className }: { label: string; value: string; className: string }) {
  return (
    <div
      className={`absolute hidden items-center gap-3 rounded-2xl bg-ink-2/95 px-4 py-3 shadow-[0_20px_40px_-12px_rgb(0_0_0/0.5)] backdrop-blur-md lg:flex ${className}`}
    >
      <span className="size-1.5 rounded-full bg-sage" aria-hidden="true" />
      <span>
        <span className="block text-[11px] tracking-[0.12em] text-paper/45 uppercase">{label}</span>
        <span className="mt-0.5 block text-sm text-paper">{value}</span>
      </span>
    </div>
  )
}

function Standards() {
  return (
    <section aria-label="Supported standards" className="bg-stone">
      <Container className="py-14 md:py-16">
        <p className="text-center text-sm text-muted">
          Licensed standards from National Standards Bodies, included in every plan
        </p>
        <ul className="mt-10 grid grid-cols-2 gap-x-6 gap-y-8 text-center sm:grid-cols-3 md:grid-cols-5">
          {standards.map((s) => (
            <li key={s.code}>
              <span className="block font-display text-2xl tracking-[-0.01em]">{s.code}</span>
              <span className="mt-1 block text-sm text-muted">{s.name}</span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}

function Why() {
  return (
    <Section>
      <SectionHeading
        index="01"
        eyebrow="Why SysComply"
        title={
          <>
            Compliance is usually scattered. <em>It doesn't have to be.</em>
          </>
        }
      />
      <div data-stagger className={`${stack} grid gap-4 md:gap-6 lg:grid-cols-2`}>
        <div className="rounded-3xl bg-stone p-8 md:p-12">
          <h3 className="text-xs font-medium tracking-[0.16em] text-muted uppercase">The traditional way</h3>
          <ul className="mt-8 grid gap-5">
            {comparison.traditional.map((t) => (
              <li key={t} className="flex gap-4 text-muted">
                <Minus className="mt-1 size-4 shrink-0 text-muted/50" strokeWidth={1.5} aria-hidden="true" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="rounded-3xl bg-ink p-8 text-paper md:p-12">
          <h3 className="text-xs font-medium tracking-[0.16em] text-paper/50 uppercase">With SysComply</h3>
          <ul className="mt-8 grid gap-5">
            {comparison.syscomply.map((t) => (
              <li key={t} className="flex gap-4">
                <Tick light />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  )
}

function Lifecycle() {
  return (
    <Section tone="stone">
      <SectionHeading
        index="02"
        eyebrow="How it works"
        title={
          <>
            From buying the standard <em>to keeping the certificate.</em>
          </>
        }
        lead="Three phases, six steps, and a clear view of where you stand at each one."
      />
      <div className={stack}>
        <Journey />
      </div>
    </Section>
  )
}

function PlatformPreview() {
  const [active, setActive] = useState(domains[0].id)
  const items = domains.map((d) => ({ id: d.id, label: d.title }))
  const { tabProps, panelProps } = useTabs(items, active, setActive)
  const d = domains.find((x) => x.id === active)!

  return (
    <Section>
      <div className="flex flex-wrap items-end justify-between gap-8">
        <SectionHeading
          index="03"
          eyebrow="The platform"
          title={
            <>
              {moduleCount} modules, <em>thoughtfully organised.</em>
            </>
          }
          lead="Seven domains cover everything from strategic planning to audits, risk and improvement, with an assistant that knows the clauses."
        />
        <TextLink to="/platform">Explore the platform</TextLink>
      </div>

      <div className={`${stack} grid gap-6 lg:grid-cols-[17rem_1fr] lg:gap-10`}>
        <div
          role="tablist"
          aria-label="Platform domains"
          className="-mx-6 flex gap-2 overflow-x-auto px-6 pb-1 [scrollbar-width:none] lg:mx-0 lg:grid lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0"
        >
          {domains.map((x, i) => {
            const on = x.id === active
            return (
              <button
                key={x.id}
                {...tabProps(x.id, i)}
                className={`shrink-0 rounded-full px-4 py-2.5 text-sm whitespace-nowrap transition-colors duration-300 lg:rounded-2xl lg:px-5 lg:py-3.5 lg:text-left lg:text-[15px] ${
                  on ? 'bg-ink text-paper' : 'bg-stone text-muted hover:text-ink lg:bg-transparent lg:hover:bg-stone'
                }`}
              >
                {x.title}
              </button>
            )
          })}
        </div>

        <div {...panelProps(active)} className="rounded-3xl bg-stone p-8 outline-none md:p-12">
          <div key={active} className="animate-rise">
            <div className="flex items-start justify-between gap-6">
              <div>
                <h3 className="font-display text-[2rem] leading-tight tracking-[-0.015em]">{d.title}</h3>
                <p className="mt-3 max-w-lg leading-relaxed text-muted">{d.summary}</p>
              </div>
              <IconBadge icon={d.icon} />
            </div>
            <ul className="mt-10 grid gap-x-10 gap-y-4 sm:grid-cols-2">
              {d.modules.map((m) => (
                <li key={m} className="flex gap-3">
                  <Tick />
                  {m}
                </li>
              ))}
            </ul>
            <div className="mt-12 flex flex-wrap items-center justify-between gap-6">
              <TextLink to={`/platform#${d.id}`}>See in detail</TextLink>
              <Link
                to="/platform#iso-22000"
                className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-ink"
              >
                Also: the ISO 22000 suite for food production
                <ArrowUpRight className="size-4" strokeWidth={1.5} aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </Section>
  )
}

function IndustriesPreview() {
  return (
    <Section tone="ink">
      <div className="flex flex-wrap items-end justify-between gap-8">
        <SectionHeading
          index="04"
          eyebrow="Solutions"
          light
          title={
            <>
              Built for <em>regulated industries.</em>
            </>
          }
          lead="The same core system, shaped to the standards and risks of your sector."
        />
        <TextLink to="/solutions" light>
          All solutions
        </TextLink>
      </div>
      <ul data-stagger className={`${stack} grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3`}>
        {industries.map((i) => (
          <li key={i.id}>
            <Link
              to={`/solutions/${i.id}`}
              className="group flex h-full flex-col rounded-3xl bg-ink-2 p-8 transition-colors duration-300 hover:bg-ink-3"
            >
              <span className="flex items-center justify-between">
                <IconBadge icon={i.icon} light />
                <ArrowUpRight
                  className="size-5 text-paper/30 transition-colors group-hover:text-paper"
                  strokeWidth={1.5}
                  aria-hidden="true"
                />
              </span>
              <h3 className="mt-10 font-display text-2xl tracking-[-0.01em]">{i.title}</h3>
              <p className="mt-3 leading-relaxed text-paper/55">{i.short}</p>
            </Link>
          </li>
        ))}
      </ul>
    </Section>
  )
}

function Next() {
  const from = plans.find((p) => p.priceUsd !== null)?.priceUsd
  const cards = [
    {
      index: '05',
      eyebrow: 'Marketplace',
      title: 'Verified experts, a click away.',
      body: 'Hire vetted ISO consultants and auditors without leaving SysComply. Or join as an expert and grow your practice.',
      to: '/marketplace',
      link: 'Visit the marketplace',
    },
    {
      index: '06',
      eyebrow: 'Pricing',
      title: 'One subscription, everything included.',
      body: `Plans start at $${from} a year, with licensed standards, the AI assistant and the marketplace included in every one.`,
      to: '/pricing',
      link: 'See pricing',
    },
  ]
  return (
    <Section tone="stone">
      <div data-stagger className="grid gap-4 md:gap-6 lg:grid-cols-2">
        {cards.map((c) => (
          <div key={c.to} className="flex flex-col rounded-3xl bg-paper p-8 md:p-12">
            <SectionHeading index={c.index} eyebrow={c.eyebrow} title={c.title} lead={c.body} />
            <div className="mt-auto pt-12">
              <TextLink to={c.to}>{c.link}</TextLink>
            </div>
          </div>
        ))}
      </div>
    </Section>
  )
}

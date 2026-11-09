import { ChevronDown } from 'lucide-react'
import { CtaBand } from '../components/CtaBand'
import { ButtonA, ButtonLink, IconBadge, PageHeader, Section, SectionHeading, TextLink, Tick, stack } from '../components/ui'
import { SIGNUP_URL } from '../config'
import { addOns, included } from '../content/pricing'
import { standardsLabel, usePricing } from '../lib/usePricing'

export function Pricing() {
  const { plans, currency, setCurrency, currencies, format } = usePricing()

  return (
    <>
      <title>Pricing — SysComply</title>
      <PageHeader
        eyebrow="Pricing"
        title={
          <>
            Simple, <em>transparent pricing.</em>
          </>
        }
        lead="One annual subscription, with standards, guidance and expertise included. Trusted by growing organisations across Africa."
      />

      <Section afterHeader>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm text-muted" aria-live="polite">
            Billed annually{currency !== 'USD' && `, shown in ${currency} at today's rate. Invoiced in USD.`}
          </p>
          <label className="flex items-center gap-3 text-sm">
            <span className="text-muted">Currency</span>
            <span className="relative">
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="h-10 max-w-60 appearance-none rounded-full bg-stone pr-10 pl-4 text-sm font-medium focus:outline-1 focus:outline-ink"
              >
                {currencies.map((c) => (
                  <option key={c.code} value={c.code}>
                    {c.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3.5 size-4 -translate-y-1/2 text-muted" strokeWidth={1.5} />
            </span>
          </label>
        </div>

        <div data-stagger className="grid gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4">
          {plans.map((p) => {
            const dark = p.featured
            const enterprise = p.priceUsd === null
            return (
              <article key={p.tier} className={`flex flex-col rounded-3xl p-8 ${dark ? 'bg-ink text-paper' : 'bg-stone'}`}>
                <div className="flex items-center justify-between gap-3">
                  <h2 className="font-display text-2xl">{p.name}</h2>
                  {p.featured && (
                    <span className="rounded-full bg-paper/10 px-3 py-1 text-[11px] font-medium tracking-[0.12em] text-paper/80 uppercase">
                      Most popular
                    </span>
                  )}
                </div>
                <p className={`mt-3 min-h-12 text-sm leading-relaxed ${dark ? 'text-paper/55' : 'text-muted'}`}>{p.description}</p>
                <p className="mt-8 flex items-baseline gap-1.5">
                  <span className="font-display text-[2.75rem] leading-none tracking-[-0.02em] tabular-nums">
                    {enterprise ? 'Custom' : format(p.priceUsd!)}
                  </span>
                  {!enterprise && <span className={`text-sm ${dark ? 'text-paper/50' : 'text-muted'}`}>/ year</span>}
                </p>
                <ul className="mt-8 grid gap-3 text-[15px]">
                  <li className="flex gap-3 font-medium">
                    <Tick light={dark} />
                    {standardsLabel(p.standardLimit)}
                  </li>
                  {p.features.map((f) => (
                    <li key={f} className={`flex gap-3 ${dark ? 'text-paper/75' : 'text-ink/75'}`}>
                      <Tick light={dark} />
                      {f}
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-10">
                  {enterprise ? (
                    <ButtonLink to="/contact?topic=enterprise" variant="outline" size="lg" className="w-full">
                      {p.cta}
                    </ButtonLink>
                  ) : (
                    <ButtonA href={SIGNUP_URL} variant={dark ? 'light' : 'primary'} size="lg" className="w-full">
                      {p.cta}
                    </ButtonA>
                  )}
                </div>
              </article>
            )
          })}
        </div>

        <div className="mt-4 flex flex-col gap-4 rounded-3xl bg-stone px-8 py-6 text-sm md:mt-6 md:flex-row md:items-center md:gap-12">
          <span className="text-xs font-medium tracking-[0.16em] text-muted uppercase">Add-ons</span>
          {addOns.map((a) => (
            <span key={a.label}>
              <span className="text-muted">{a.label} </span>
              <span className="ml-1 font-medium tabular-nums">
                {a.prefix && `${a.prefix} `}
                {format(a.priceUsd)} {a.suffix}
              </span>
            </span>
          ))}
        </div>
      </Section>

      <Section tone="stone">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Every plan"
            title={
              <>
                Included with <em>every subscription.</em>
              </>
            }
          />
          <TextLink to="/contact?topic=pricing">Questions about pricing?</TextLink>
        </div>
        <ul data-stagger className={`${stack} grid grid-cols-1 gap-x-8 gap-y-10 sm:grid-cols-2 lg:grid-cols-4`}>
          {included.map((i) => (
            <li key={i.title} className="flex items-center gap-4">
              <IconBadge icon={i.icon} />
              <span className="font-medium">{i.title}</span>
            </li>
          ))}
        </ul>
      </Section>

      <CtaBand />
    </>
  )
}

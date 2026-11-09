import type { ReactNode } from 'react'
import type { LucideIcon } from 'lucide-react'
import { CtaBand } from '../components/CtaBand'
import { ButtonA, IconBadge, PageHeader, Section, SectionHeading, TextLink, stack } from '../components/ui'
import { SIGNUP_URL } from '../config'
import { marketplace, roadmap } from '../content/company'

export function Marketplace() {
  return (
    <>
      <title>Marketplace — SysComply</title>
      <PageHeader
        eyebrow="Compliance Marketplace"
        title={
          <>
            Verified ISO experts, <em>working alongside you.</em>
          </>
        }
        lead="Hire consultants and auditors to implement standards, run audits and reach certification sooner, all within SysComply."
      />

      <Section afterHeader>
        <div data-stagger className="grid gap-4 md:gap-6 lg:grid-cols-2">
          <Audience
            label="For organisations"
            title="Find the right expert for your standard and sector."
            items={marketplace.organisations}
            cta={
              <ButtonA href={SIGNUP_URL} size="lg">
                Find a consultant
              </ButtonA>
            }
          />
          <Audience
            dark
            label="For consultants"
            title="Grow your practice and work beside your clients."
            items={marketplace.consultants}
            cta={
              <ButtonA href={SIGNUP_URL} variant="light" size="lg">
                Join as an expert
              </ButtonA>
            }
          />
        </div>
      </Section>

      <Section tone="stone">
        <div className="flex flex-wrap items-end justify-between gap-8">
          <SectionHeading
            eyebrow="Coming soon"
            title={
              <>
                What comes <em>next.</em>
              </>
            }
            lead="Training, testing, certification and regulators, brought into the same place as your management system."
          />
          <TextLink to="/contact?topic=partnership">Partner with us</TextLink>
        </div>
        <ul data-stagger className={`${stack} grid gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3`}>
          {roadmap.map((r) => (
            <li key={r.title} className="rounded-3xl bg-paper p-8">
              <IconBadge icon={r.icon} />
              <h3 className="mt-10 font-display text-xl">{r.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-muted">{r.body}</p>
            </li>
          ))}
          <li className="flex items-end rounded-3xl bg-ink p-8 text-paper">
            <p className="font-display text-2xl leading-snug italic">"Building Africa's digital compliance infrastructure."</p>
          </li>
        </ul>
      </Section>

      <CtaBand />
    </>
  )
}

function Audience({
  label,
  title,
  items,
  cta,
  dark,
}: {
  label: string
  title: string
  items: { title: string; body: string; icon: LucideIcon }[]
  cta: ReactNode
  dark?: boolean
}) {
  return (
    <article className={`flex flex-col rounded-3xl p-8 md:p-12 ${dark ? 'bg-ink text-paper' : 'bg-stone'}`}>
      <p className={`text-xs font-medium tracking-[0.16em] uppercase ${dark ? 'text-paper/50' : 'text-muted'}`}>{label}</p>
      <h2 className="mt-6 font-display text-[2rem] leading-[1.1] tracking-[-0.02em] text-balance">{title}</h2>
      <ul className="mt-12 grid gap-8">
        {items.map((i) => (
          <li key={i.title} className="flex gap-5">
            <IconBadge icon={i.icon} light={dark} />
            <span>
              <span className="block font-medium">{i.title}</span>
              <span className={`mt-1 block leading-relaxed ${dark ? 'text-paper/55' : 'text-muted'}`}>{i.body}</span>
            </span>
          </li>
        ))}
      </ul>
      <div className="mt-auto pt-14">{cta}</div>
    </article>
  )
}

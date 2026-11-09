import { CountUp } from '../components/CountUp'
import { CtaBand } from '../components/CtaBand'
import { Eyebrow, Num, PageHeader, Section, SectionHeading, stack } from '../components/ui'
import { mission, values } from '../content/company'
import { domains, moduleCount } from '../content/platform'
import { standards } from '../content/site'

export function About() {
  const stats = [
    { value: standards.length, label: 'ISO standards supported' },
    { value: moduleCount, label: 'Modules' },
    { value: domains.length, label: 'Operational domains' },
    { value: 1, label: 'Subscription for everything' },
  ]

  return (
    <>
      <title>About — SysComply</title>
      <PageHeader
        eyebrow="About SysComply"
        title={
          <>
            Building Africa's <em>digital compliance infrastructure.</em>
          </>
        }
        lead="We help organisations reach ISO certification with confidence, and help consultants grow their practice."
      />

      <Section afterHeader>
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <Eyebrow index="01">Mission</Eyebrow>
          <p className="font-display text-[1.75rem] leading-snug tracking-[-0.01em] text-pretty md:text-[2.25rem]">{mission}</p>
        </div>
        <dl data-stagger className={`${stack} grid grid-cols-2 gap-4 md:gap-6 lg:grid-cols-4`}>
          {stats.map((s) => (
            <div key={s.label} className="rounded-3xl bg-stone p-8">
              <dt className="text-sm text-muted">{s.label}</dt>
              <dd className="mt-6 font-display text-6xl leading-none tracking-[-0.02em] tabular-nums">
                <CountUp value={s.value} />
              </dd>
            </div>
          ))}
        </dl>
      </Section>

      <Section tone="ink">
        <SectionHeading
          index="02"
          eyebrow="What we value"
          light
          title={
            <>
              How <em>we work.</em>
            </>
          }
        />
        <ul data-stagger className={`${stack} grid gap-4 md:grid-cols-3 md:gap-6`}>
          {values.map((v, i) => (
            <li key={v.title} className="rounded-3xl bg-ink-2 p-8 md:p-10">
              <Num n={i + 1} light />
              <h3 className="mt-10 font-display text-[1.75rem]">{v.title}</h3>
              <p className="mt-3 leading-relaxed text-paper/55">{v.body}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section>
        <div className="grid gap-8 lg:grid-cols-[1fr_2fr] lg:gap-20">
          <Eyebrow index="03">Where we are</Eyebrow>
          <div>
            <p className="font-display text-[1.75rem] tracking-[-0.01em] md:text-[2.25rem]">Freetown, Sierra Leone</p>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-muted">
              Headquartered in West Africa. SysComply delivers ISO standards licensed from National Standards Bodies
              directly inside the platform.
            </p>
          </div>
        </div>
      </Section>

      <CtaBand />
    </>
  )
}

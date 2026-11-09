import { useParams } from 'react-router'
import { Link } from '../components/Link'
import { ArrowLeft, ArrowRight } from 'lucide-react'
import { CtaBand } from '../components/CtaBand'
import { useOpenDemo } from '../components/demo-context'
import { Button, ButtonA, Container, Eyebrow, IconBadge, Section, Tick } from '../components/ui'
import { SIGNUP_URL } from '../config'
import { industries } from '../content/industries'
import { NotFound } from './NotFound'

export function Solution() {
  const { id } = useParams()
  const openDemo = useOpenDemo()
  const index = industries.findIndex((i) => i.id === id)
  if (index === -1) return <NotFound />

  const industry = industries[index]
  const next = industries[(index + 1) % industries.length]

  return (
    <>
      <title>{`${industry.title} — SysComply`}</title>
      <header className="pt-10 md:pt-14">
        <Container>
          <Link to="/solutions" className="-my-3 inline-flex min-h-11 items-center gap-2 text-sm text-muted transition-colors hover:text-ink">
            <ArrowLeft className="size-4" strokeWidth={1.5} /> All solutions
          </Link>
          <div className="mt-10 grid gap-10 md:mt-24 lg:grid-cols-[2fr_1fr] lg:items-end lg:gap-20">
            <div className="animate-rise">
              <Eyebrow>{industry.title}</Eyebrow>
              <h1 className="mt-6 font-display text-[2.4rem] md:mt-8 leading-[1.06] font-normal tracking-[-0.025em] text-balance md:text-[4rem]">
                {industry.short}
              </h1>
              <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap md:mt-10">
                <ButtonA href={SIGNUP_URL} size="lg">
                  Get started
                </ButtonA>
                <Button variant="outline" size="lg" onClick={openDemo}>
                  Book a demo
                </Button>
              </div>
            </div>
            <div className="rounded-3xl bg-ink p-8 text-paper">
              <IconBadge icon={industry.icon} light />
              <p className="mt-12 text-xs font-medium tracking-[0.16em] text-paper/55 uppercase">Standards covered</p>
              <p className="mt-3 font-display text-2xl">{industry.standards.join(', ')}</p>
            </div>
          </div>
        </Container>
      </header>

      <Section>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="grid content-start gap-14">
            <div>
              <Eyebrow index="01">The challenge</Eyebrow>
              <p className="mt-6 font-display text-[1.75rem] leading-snug tracking-[-0.01em] text-pretty">{industry.challenge}</p>
            </div>
            <div>
              <Eyebrow index="02">How SysComply helps</Eyebrow>
              <p className="mt-6 text-lg leading-relaxed text-muted text-pretty">{industry.approach}</p>
            </div>
          </div>
          <div className="rounded-3xl bg-stone p-8 md:p-12 lg:self-start">
            <Eyebrow index="03">What you get</Eyebrow>
            <ul className="mt-8 grid gap-5">
              {industry.outcomes.map((o) => (
                <li key={o} className="flex gap-4 text-lg leading-snug">
                  <Tick />
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <Link
          to={`/solutions/${next.id}`}
          className="group mt-16 flex items-center justify-between rounded-3xl bg-stone px-8 py-8 md:mt-24 transition-colors duration-300 hover:bg-stone-2 md:px-12"
        >
          <span>
            <span className="block text-xs font-medium tracking-[0.16em] text-muted uppercase">Next industry</span>
            <span className="mt-2 block font-display text-[1.75rem] tracking-[-0.01em]">{next.title}</span>
          </span>
          <ArrowRight className="size-5 transition-transform duration-300 group-hover:translate-x-1" strokeWidth={1.5} aria-hidden="true" />
        </Link>
      </Section>

      <CtaBand title={`Bring ${industry.title} compliance into one system.`} />
    </>
  )
}

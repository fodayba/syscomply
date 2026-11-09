import { SIGNUP_URL } from '../config'
import { useOpenDemo } from './demo-context'
import { Button, ButtonA, Container } from './ui'

/**
 * Closing call to action. It sits directly above the footer and shares its dark
 * background, so each page ends in one continuous dark block.
 */
export function CtaBand({
  title = 'Bring your compliance into one place.',
  lead = "Whether you're working towards certification or growing a consulting practice, SysComply is where the work gets done.",
}: {
  title?: string
  lead?: string
}) {
  const openDemo = useOpenDemo()
  return (
    <section className="bg-ink pt-24 pb-20 text-paper md:pt-32 md:pb-24">
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <h2 className="font-display text-[2.25rem] leading-[1.08] font-normal tracking-[-0.02em] text-balance md:text-[3.5rem]">{title}</h2>
          <p className="mx-auto mt-6 max-w-lg text-lg leading-relaxed text-paper/55">{lead}</p>
          <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
            <ButtonA href={SIGNUP_URL} variant="light" size="lg">
              Get started
            </ButtonA>
            <Button variant="outline-light" size="lg" onClick={openDemo}>
              Book a demo
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}

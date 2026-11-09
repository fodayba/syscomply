import { ButtonLink, Container, Eyebrow } from '../components/ui'

export function NotFound() {
  return (
    <section className="py-32 md:py-48">
      <title>Page not found — SysComply</title>
      <Container>
        <div className="mx-auto max-w-2xl text-center">
          <div className="flex justify-center">
            <Eyebrow>404</Eyebrow>
          </div>
          <h1 className="mt-8 font-display text-[2.75rem] leading-[1.05] tracking-[-0.025em] text-balance md:text-7xl">
            This page <em>isn't here.</em>
          </h1>
          <p className="mt-6 text-lg text-muted">The link may be out of date, or the page may have moved.</p>
          <ButtonLink to="/" size="lg" className="mt-10">
            Back to home
          </ButtonLink>
        </div>
      </Container>
    </section>
  )
}

import type { ComponentProps, ReactNode } from 'react'
import { Link } from './Link'
import { useReveal } from '../lib/hooks'
import { ArrowRight, type LucideIcon } from 'lucide-react'

/* ------------------------------------------------------------------ Buttons */

type Variant = 'primary' | 'light' | 'outline' | 'outline-light'
type Size = 'md' | 'lg'

const base =
  'inline-flex items-center justify-center gap-2 rounded-full font-medium tracking-[-0.01em] whitespace-nowrap transition-[color,background-color,border-color,scale] duration-200 active:scale-[0.98] disabled:pointer-events-none disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary: 'bg-ink text-paper hover:bg-ink-3',
  light: 'bg-paper text-ink hover:bg-white',
  outline: 'border border-ink/15 text-ink hover:border-ink/40',
  'outline-light': 'border border-paper/20 text-paper hover:border-paper/50',
}

const sizes: Record<Size, string> = {
  md: 'h-11 px-5 text-sm',
  lg: 'h-12 px-6 text-[15px]',
}

function buttonClass(variant: Variant = 'primary', size: Size = 'md', extra = '') {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra}`
}

type Style = { variant?: Variant; size?: Size }

export function Button({ variant, size, className = '', ...props }: ComponentProps<'button'> & Style) {
  return <button className={buttonClass(variant, size, className)} {...props} />
}

/** Internal route link styled as a button. */
export function ButtonLink({ variant, size, className = '', ...props }: ComponentProps<typeof Link> & Style) {
  return <Link className={buttonClass(variant, size, className)} {...props} />
}

/** External link (e.g. the app) styled as a button. */
export function ButtonA({ variant, size, className = '', ...props }: ComponentProps<'a'> & Style) {
  return <a className={buttonClass(variant, size, className)} {...props} />
}

/** Quiet text link with an arrow, used for secondary navigation. */
export function TextLink({ light, className = '', children, ...props }: ComponentProps<typeof Link> & { light?: boolean }) {
  return (
    <Link
      className={`group -my-2.5 inline-flex min-h-11 items-center gap-1.5 py-2.5 text-[15px] font-medium ${light ? 'text-paper' : 'text-ink'} ${className}`}
      {...props}
    >
      <span className="border-b border-current/25 pb-0.5 transition-colors group-hover:border-current">{children}</span>
      <ArrowRight aria-hidden="true" strokeWidth={1.5} className="size-4 transition-transform duration-200 group-hover:translate-x-0.5" />
    </Link>
  )
}

/* ------------------------------------------------------------------ Layout */

export function Container({ className = '', children }: { className?: string; children: ReactNode }) {
  return <div className={`mx-auto w-full max-w-6xl px-6 md:px-10 ${className}`}>{children}</div>
}

type Tone = 'paper' | 'stone' | 'ink'

const tones: Record<Tone, string> = {
  paper: 'bg-paper text-ink',
  stone: 'bg-stone text-ink',
  ink: 'bg-ink text-paper',
}

/**
 * Every content band uses this so vertical rhythm is identical across the site:
 * 96px on mobile, 128px on desktop. Content fades up once as it scrolls into view;
 * add `data-stagger` to a list inside it to bring its items in one after another.
 */
export function Section({
  tone = 'paper',
  id,
  className = '',
  children,
  afterHeader,
  'aria-label': ariaLabel,
}: {
  tone?: Tone
  id?: string
  className?: string
  children: ReactNode
  /** Tighter top padding when the section directly follows a PageHeader. */
  afterHeader?: boolean
  'aria-label'?: string
}) {
  const pad = afterHeader ? 'pt-12 pb-20 md:pt-20 md:pb-32' : 'py-20 md:py-32'
  const reveal = useReveal<HTMLDivElement>()
  return (
    <section id={id} aria-label={ariaLabel} className={`scroll-mt-16 ${pad} ${tones[tone]} ${className}`}>
      <div ref={reveal} data-reveal>
        <Container>{children}</Container>
      </div>
    </section>
  )
}

/** Space between a section heading and its content. */
export const stack = 'mt-12 md:mt-20'

/* ------------------------------------------------------------- Typography */

export function Eyebrow({ index, children, light }: { index?: string; children: ReactNode; light?: boolean }) {
  return (
    <p className={`flex items-center gap-3 text-xs font-medium tracking-[0.16em] uppercase ${light ? 'text-paper/50' : 'text-muted'}`}>
      {index && <span className={light ? 'text-sage' : 'text-sage-ink'}>{index}</span>}
      {index && <span aria-hidden="true" className={`h-px w-6 ${light ? 'bg-paper/20' : 'bg-ink/15'}`} />}
      {children}
    </p>
  )
}

export function SectionHeading({
  index,
  eyebrow,
  title,
  lead,
  light,
  className = '',
}: {
  index?: string
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  light?: boolean
  className?: string
}) {
  return (
    <div className={`max-w-2xl ${className}`}>
      <Eyebrow index={index} light={light}>
        {eyebrow}
      </Eyebrow>
      <h2 className="mt-6 font-display text-[2.25rem] leading-[1.08] font-normal tracking-[-0.02em] text-balance md:text-[3.25rem]">{title}</h2>
      {lead && (
        <p className={`mt-6 text-lg leading-relaxed text-pretty ${light ? 'text-paper/60' : 'text-muted'}`}>{lead}</p>
      )}
    </div>
  )
}

/** Top-of-page header used by every page except Home. */
export function PageHeader({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string
  title: ReactNode
  lead?: ReactNode
  children?: ReactNode
}) {
  return (
    <header className="pt-14 pb-4 md:pt-32 md:pb-10">
      <Container>
        <div className="max-w-3xl animate-rise">
          <Eyebrow>{eyebrow}</Eyebrow>
          <h1 className="mt-6 font-display text-[2.6rem] leading-[1.04] font-normal tracking-[-0.025em] text-balance md:mt-8 md:text-[4.75rem]">
            {title}
          </h1>
          {lead && <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted text-pretty md:mt-8 md:text-xl">{lead}</p>}
          {children && <div className="mt-8 grid gap-3 sm:flex sm:flex-wrap md:mt-10">{children}</div>}
        </div>
      </Container>
    </header>
  )
}

/* ---------------------------------------------------------------- Pieces */

/**
 * A grid on tablet and desktop; on phones, a horizontal row you swipe through, with
 * the next card peeking in so it's obvious there's more. Children are the cards.
 */
export function Rail({
  children,
  cols = 'md:grid-cols-2 lg:grid-cols-3',
  item = 'w-[84%]',
  className = '',
  label,
}: {
  children: ReactNode[]
  cols?: string
  item?: string
  className?: string
  label: string
}) {
  return (
    <ul
      data-stagger
      aria-label={label}
      className={`-mx-6 flex snap-x snap-mandatory scroll-px-6 gap-3 overflow-x-auto overscroll-x-contain px-6 pb-1 [scrollbar-width:none] md:mx-0 md:grid md:snap-none md:gap-6 md:overflow-visible md:px-0 md:pb-0 [&::-webkit-scrollbar]:hidden ${cols} ${className}`}
    >
      {children.map((c, i) => (
        <li key={i} className={`flex shrink-0 snap-start md:w-auto [&>*]:w-full ${item}`}>
          {c}
        </li>
      ))}
    </ul>
  )
}

/** Icon in a hairline circle. One size, one stroke weight everywhere. */
export function IconBadge({ icon: Icon, light }: { icon: LucideIcon; light?: boolean }) {
  return (
    <span
      className={`grid size-11 shrink-0 place-items-center rounded-full border ${light ? 'border-paper/15 text-paper' : 'border-ink/10 text-ink'}`}
    >
      <Icon className="size-[18px]" strokeWidth={1.5} aria-hidden="true" />
    </span>
  )
}

/** Small sage check used in feature lists. */
export function Tick({ light }: { light?: boolean }) {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true" className={`mt-[5px] size-3.5 shrink-0 ${light ? 'text-sage' : 'text-sage-ink'}`}>
      <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  )
}

export function Num({ n, light }: { n: number; light?: boolean }) {
  return <span className={`font-display text-lg italic tabular-nums ${light ? 'text-sage' : 'text-sage-ink'}`}>{String(n).padStart(2, '0')}</span>
}

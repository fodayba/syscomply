import { useEffect, useRef } from 'react'
import { lifecycle } from '../content/site'
import { useReducedMotion } from '../lib/hooks'

/**
 * "How it works" as a single journey line.
 *
 * Desktop: a horizontal track with six stops, grouped into three phases.
 * Mobile: the same track runs vertically beside the steps.
 * As the visitor scrolls, the line draws itself and each stop fills in once reached.
 * Progress is written straight to the DOM (a CSS variable and data attributes), so
 * scrolling never re-renders React. With reduced motion, the journey is shown complete.
 */
export function Journey() {
  const root = useRef<HTMLDivElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = root.current
    if (!el) return
    const steps = Array.from(el.querySelectorAll<HTMLElement>('[data-step]'))
    const wide = window.matchMedia('(min-width: 1024px)')

    const paint = (p: number) => {
      el.style.setProperty('--p', p.toFixed(4))
      steps.forEach((s, i) => s.toggleAttribute('data-reached', p >= i / (steps.length - 1) - 0.001))
    }

    if (reduced) {
      paint(1)
      return
    }

    let frame = 0
    const update = () => {
      frame = 0
      const r = el.getBoundingClientRect()
      const vh = window.innerHeight
      // Wide: the line fills while the track travels from 80% to 40% of the viewport.
      // Narrow: it follows the reading position down the list of steps.
      const p = wide.matches ? (vh * 0.8 - r.top) / (vh * 0.4) : (vh * 0.65 - r.top) / r.height
      paint(Math.min(1, Math.max(0, p)))
    }
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update)
    }
    update()
    window.addEventListener('scroll', schedule, { passive: true })
    window.addEventListener('resize', schedule)
    wide.addEventListener('change', schedule)
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener('scroll', schedule)
      window.removeEventListener('resize', schedule)
      wide.removeEventListener('change', schedule)
    }
  }, [reduced])

  const phases = [...new Set(lifecycle.map((s) => s.phase))]

  return (
    <div ref={root} className="relative" style={{ '--p': 0 } as React.CSSProperties}>
      {/* Phase labels (desktop): each spans the two steps it contains. */}
      <div aria-hidden="true" className="mb-10 hidden grid-cols-3 lg:grid">
        {phases.map((p, i) => (
          <p key={p} className="flex items-baseline gap-3">
            <span className="font-display text-2xl italic">{p}</span>
            <span className="text-xs tracking-[0.16em] text-muted uppercase">Phase {i + 1}</span>
          </p>
        ))}
      </div>

      <div className="relative">
        {/* Desktop track: runs from the first stop to the last. */}
        <div
          aria-hidden="true"
          className="absolute top-[5px] right-[calc(100%/6)] left-0 hidden h-px bg-ink/10 lg:block"
        >
          <div className="h-full origin-left bg-ink" style={{ transform: 'scaleX(var(--p))' }} />
        </div>

        {/* Mobile track. */}
        <div aria-hidden="true" className="absolute top-2 bottom-2 left-[5px] w-px bg-ink/10 lg:hidden">
          <div className="h-full w-full origin-top bg-ink" style={{ transform: 'scaleY(var(--p))' }} />
        </div>

        <ol className="grid gap-12 lg:grid-cols-6 lg:gap-0">
          {lifecycle.map((s, i) => {
            const startsPhase = i === 0 || lifecycle[i - 1].phase !== s.phase
            return (
              <li key={s.title} data-step className="group relative pl-10 lg:pt-12 lg:pr-8 lg:pl-0">
                {startsPhase && <p className="mb-4 font-display text-xl text-ink/70 italic lg:hidden">{s.phase}</p>}
                <span
                  aria-hidden="true"
                  className={`absolute left-0 size-[11px] rounded-full border border-ink/25 bg-stone transition-[background-color,border-color,scale] duration-500 group-data-reached:scale-110 group-data-reached:border-ink group-data-reached:bg-ink lg:top-0 ${startsPhase ? 'top-[2.85rem]' : 'top-1.5'}`}
                />
                <p className="text-xs tabular-nums tracking-[0.16em] text-muted transition-colors duration-500 group-data-reached:text-sage-ink">
                  {String(i + 1).padStart(2, '0')}
                </p>
                <h3 className="mt-3 text-lg leading-snug font-medium tracking-[-0.01em] text-ink/45 transition-colors duration-500 group-data-reached:text-ink">
                  {s.title}
                </h3>
                <p className="mt-2 text-[15px] leading-relaxed text-muted/70 transition-colors duration-500 group-data-reached:text-muted">
                  {s.body}
                </p>
              </li>
            )
          })}
        </ol>
      </div>
    </div>
  )
}

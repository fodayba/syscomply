import { useEffect, useRef } from 'react'
import { useReducedMotion } from '../lib/hooks'

/** Counts from 0 to `value` the first time it scrolls into view. */
export function CountUp({ value, duration = 1400 }: { value: number; duration?: number }) {
  const ref = useRef<HTMLSpanElement>(null)
  const reduced = useReducedMotion()

  useEffect(() => {
    const el = ref.current
    if (!el || reduced || !('IntersectionObserver' in window)) return
    el.textContent = '0'
    let frame = 0
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return
      io.disconnect()
      const start = performance.now()
      const tick = (now: number) => {
        const t = Math.min(1, (now - start) / duration)
        const eased = 1 - Math.pow(1 - t, 3)
        el.textContent = String(Math.round(eased * value))
        if (t < 1) frame = requestAnimationFrame(tick)
      }
      frame = requestAnimationFrame(tick)
    })
    io.observe(el)
    return () => {
      io.disconnect()
      cancelAnimationFrame(frame)
      el.textContent = String(value)
    }
  }, [value, duration, reduced])

  // Renders the final value by default so it's correct without JS or with reduced motion.
  return (
    <span ref={ref} aria-label={String(value)}>
      {value}
    </span>
  )
}

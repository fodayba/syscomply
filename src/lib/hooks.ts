import { useCallback, useEffect, useRef, useState, useSyncExternalStore } from 'react'

const motionQuery = '(prefers-reduced-motion: reduce)'

/** True when the visitor has asked the OS for reduced motion. */
export function useReducedMotion() {
  return useSyncExternalStore(
    (cb) => {
      const mq = window.matchMedia(motionQuery)
      mq.addEventListener('change', cb)
      return () => mq.removeEventListener('change', cb)
    },
    () => window.matchMedia(motionQuery).matches,
    () => false,
  )
}

/**
 * Ref callback that adds `is-shown` to an element the first time it scrolls into view.
 * Pairs with the `[data-reveal]` styles in index.css.
 */
export function useReveal<T extends HTMLElement>() {
  return useCallback((el: T | null) => {
    if (!el) return
    // Already on screen (or no observer support): leave it visible, never animate it in.
    if (!('IntersectionObserver' in window) || el.getBoundingClientRect().top < window.innerHeight * 0.92) return
    el.classList.add('is-pending')
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.classList.add('is-shown')
          io.disconnect()
        }
      },
      { rootMargin: '0px 0px -8% 0px', threshold: 0.08 },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [])
}

/** Tracks whether an element is currently on screen. */
export function useInView<T extends HTMLElement>() {
  const [inView, setInView] = useState(false)
  const ref = useRef<T>(null)
  useEffect(() => {
    const el = ref.current
    if (!el) return
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.25 })
    io.observe(el)
    return () => io.disconnect()
  }, [])
  return [ref, inView] as const
}

/**
 * True once the page has hydrated in the browser; false in prerendered HTML and during
 * hydration itself. Use it for values only the browser knows (URL query, storage).
 */
const noop = () => () => {}
export function useHydrated() {
  return useSyncExternalStore(noop, () => true, () => false)
}

const STORAGE_EVENT = 'syscomply:storage'

/**
 * State persisted to localStorage. Prerendered HTML and the hydration pass use `initial`,
 * then the stored value takes over, so server and client markup always match.
 */
export function useStoredState<T extends string>(key: string, initial: T) {
  const value = useSyncExternalStore(
    (cb) => {
      window.addEventListener(STORAGE_EVENT, cb)
      window.addEventListener('storage', cb)
      return () => {
        window.removeEventListener(STORAGE_EVENT, cb)
        window.removeEventListener('storage', cb)
      }
    },
    () => {
      try {
        return (localStorage.getItem(key) as T | null) ?? initial
      } catch {
        return initial
      }
    },
    () => initial,
  )
  const set = useCallback(
    (v: T) => {
      try {
        localStorage.setItem(key, v)
      } catch {
        /* storage unavailable (private mode) */
      }
      window.dispatchEvent(new Event(STORAGE_EVENT))
    },
    [key],
  )
  return [value, set] as const
}

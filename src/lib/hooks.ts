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
    if (!('IntersectionObserver' in window)) {
      el.classList.add('is-shown')
      return
    }
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

/** useState that is persisted to localStorage. */
export function useStoredState<T extends string>(key: string, initial: T) {
  const [value, setValue] = useState<T>(() => {
    try {
      return (localStorage.getItem(key) as T | null) ?? initial
    } catch {
      return initial
    }
  })
  const set = useCallback(
    (v: T) => {
      setValue(v)
      try {
        localStorage.setItem(key, v)
      } catch {
        /* storage unavailable (private mode); keep in memory only */
      }
    },
    [key],
  )
  return [value, set] as const
}

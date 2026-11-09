import { useId, useRef, type KeyboardEvent, type ReactNode } from 'react'

type Item = { id: string; label: ReactNode }

/**
 * Accessible tab list (WAI-ARIA tabs pattern): arrow keys, Home and End move between
 * tabs, and only the selected tab is in the tab order.
 */
export function useTabs(items: Item[], value: string, onChange: (id: string) => void) {
  const base = useId()
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const tabId = (id: string) => `${base}-tab-${id}`
  const panelId = (id: string) => `${base}-panel-${id}`

  function onKeyDown(e: KeyboardEvent, i: number) {
    const last = items.length - 1
    const next =
      e.key === 'ArrowDown' || e.key === 'ArrowRight'
        ? i === last ? 0 : i + 1
        : e.key === 'ArrowUp' || e.key === 'ArrowLeft'
          ? i === 0 ? last : i - 1
          : e.key === 'Home'
            ? 0
            : e.key === 'End'
              ? last
              : null
    if (next === null) return
    e.preventDefault()
    onChange(items[next].id)
    refs.current[next]?.focus()
  }

  const tabProps = (id: string, i: number) => ({
    ref: (el: HTMLButtonElement | null) => {
      refs.current[i] = el
    },
    id: tabId(id),
    role: 'tab' as const,
    type: 'button' as const,
    'aria-selected': value === id,
    'aria-controls': panelId(id),
    tabIndex: value === id ? 0 : -1,
    onClick: () => onChange(id),
    onKeyDown: (e: KeyboardEvent) => onKeyDown(e, i),
  })

  const panelProps = (id: string) => ({
    id: panelId(id),
    role: 'tabpanel' as const,
    'aria-labelledby': tabId(id),
    tabIndex: 0,
  })

  return { tabProps, panelProps }
}

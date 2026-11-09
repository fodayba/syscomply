import { useId, useRef, type KeyboardEvent, type ReactNode } from 'react'

type Item = { id: string; label: ReactNode }

/**
 * Tab-row layout shared by the chip rows: a swipeable row of 44px chips on phones with a
 * soft fade at the right edge, a vertical list from `lg` up.
 */
export const chipRow =
  '-mx-6 flex snap-x scroll-px-6 gap-2 overflow-x-auto overscroll-x-contain px-6 pb-1 [scrollbar-width:none] [mask-image:linear-gradient(to_right,black_85%,transparent)] lg:mx-0 lg:grid lg:content-start lg:gap-1 lg:overflow-visible lg:px-0 lg:pb-0 lg:[mask-image:none] [&::-webkit-scrollbar]:hidden'
export const chip = 'min-h-11 shrink-0 snap-start rounded-full px-4 text-sm whitespace-nowrap lg:rounded-2xl lg:px-5 lg:py-3.5 lg:text-[15px]'

/**
 * Accessible tab list (WAI-ARIA tabs pattern): arrow keys, Home and End move between
 * tabs, and only the selected tab is in the tab order.
 */
export function useTabs(items: Item[], value: string, onChange: (id: string) => void) {
  const base = useId()
  const refs = useRef<(HTMLButtonElement | null)[]>([])
  const slug = (id: string) => id.toLowerCase().replace(/[^a-z0-9]+/g, '-')
  const tabId = (id: string) => `${base}-tab-${slug(id)}`
  const panelId = (id: string) => `${base}-panel-${slug(id)}`

  // Keeps the chosen chip in view when the row scrolls sideways (phones). Never scrolls the page.
  function reveal(i: number) {
    const el = refs.current[i]
    const row = el?.parentElement
    if (!el || !row || row.scrollWidth <= row.clientWidth) return
    row.scrollTo({ left: el.offsetLeft - (row.clientWidth - el.offsetWidth) / 2, behavior: 'smooth' })
  }

  function select(i: number) {
    onChange(items[i].id)
    reveal(i)
  }

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
    select(next)
    refs.current[next]?.focus({ preventScroll: true })
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
    onClick: () => select(i),
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

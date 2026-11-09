import type { ComponentProps } from 'react'
import { Link as RRLink, NavLink as RRNavLink } from 'react-router'

/**
 * Router links with the View Transitions API turned on, so page changes cross-fade
 * in supporting browsers. Other browsers navigate normally.
 */
export function Link(props: ComponentProps<typeof RRLink>) {
  return <RRLink viewTransition {...props} />
}

export function NavLink(props: ComponentProps<typeof RRNavLink>) {
  return <RRNavLink viewTransition {...props} />
}

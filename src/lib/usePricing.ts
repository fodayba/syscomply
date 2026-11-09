import { useEffect, useState } from 'react'
import { useStoredState } from './hooks'
import { API_BASE_URL } from '../config'
import { plans as fallbackPlans, type Plan } from '../content/pricing'

type Rates = Record<string, number>

// Used when the exchange-rate API is unavailable.
const FALLBACK_RATES: Rates = { USD: 1, SLE: 23.25 }
// Business rule carried over from the current site: SLE is quoted 0.75 above the market rate.
const SLE_MARKUP = 0.75

const PREFERRED = ['USD', 'SLE', 'EUR', 'GBP', 'NGN', 'ZAR']

function currencyLabel(code: string) {
  try {
    return `${new Intl.DisplayNames(['en'], { type: 'currency' }).of(code)} (${code})`
  } catch {
    return code
  }
}

/**
 * Loads live plan prices and exchange rates from the SysComply API, falling back to the
 * values in content/pricing.ts so the page always renders.
 */
export function usePricing() {
  const [plans, setPlans] = useState<Plan[]>(fallbackPlans)
  const [rates, setRates] = useState<Rates>(FALLBACK_RATES)
  // Remembered between visits. Falls back to USD if the saved currency has no rate.
  const [stored, setCurrency] = useStoredState<string>('syscomply.currency', 'USD')
  const currency = rates[stored] ? stored : 'USD'

  useEffect(() => {
    const ctrl = new AbortController()

    fetch(`${API_BASE_URL}/organizations/plan-catalog`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((rows: { tier: string; priceUsd: number | null; standardLimit: number | null }[]) => {
        const byTier = new Map(rows.map((r) => [r.tier, r]))
        setPlans((prev) =>
          prev.map((p) => {
            const live = byTier.get(p.tier)
            return live ? { ...p, priceUsd: live.priceUsd, standardLimit: live.standardLimit } : p
          }),
        )
      })
      .catch(() => {})

    fetch(`${API_BASE_URL}/exchange-rate`, { signal: ctrl.signal })
      .then((r) => (r.ok ? r.json() : Promise.reject(r.status)))
      .then((data: { rates?: Rates }) => {
        if (!data?.rates) return
        const next = { ...data.rates }
        if (next.SLE) next.SLE += SLE_MARKUP
        setRates(next)
      })
      .catch(() => {})

    return () => ctrl.abort()
  }, [])

  const currencies = Object.keys(rates)
    .sort((a, b) => {
      const ia = PREFERRED.indexOf(a)
      const ib = PREFERRED.indexOf(b)
      if (ia !== -1 || ib !== -1) return (ia === -1 ? 99 : ia) - (ib === -1 ? 99 : ib)
      return a.localeCompare(b)
    })
    .map((code) => ({ code, label: currencyLabel(code) }))

  const format = (usd: number) => {
    const rate = rates[currency] ?? 1
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency,
      maximumFractionDigits: 0,
    }).format(usd * rate)
  }

  return { plans, currency, setCurrency, currencies, format }
}

export function standardsLabel(limit: number | null) {
  if (limit === null) return 'Scalable licensed standards'
  return `${limit} licensed standard${limit === 1 ? '' : 's'}`
}

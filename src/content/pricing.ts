import {
  Bot,
  CloudCog,
  Lock,
  RefreshCw,
  ScrollText,
  Smartphone,
  Store,
  BookMarked,
  type LucideIcon,
} from 'lucide-react'

export type Tier = 'starter' | 'growth' | 'business' | 'enterprise'

export type Plan = {
  tier: Tier
  name: string
  /** Fallback price used if the plan catalog API is unavailable. null = custom. */
  priceUsd: number | null
  /** Fallback standard limit. null = scalable. */
  standardLimit: number | null
  description: string
  features: string[]
  cta: string
  featured?: boolean
}

export const plans: Plan[] = [
  {
    tier: 'starter',
    name: 'Launch',
    priceUsd: 495,
    standardLimit: 1,
    description: 'For organisations implementing their first ISO standard.',
    features: ['AI compliance assistant', 'Document control', 'Risk register', 'Consultant marketplace'],
    cta: 'Start your journey',
  },
  {
    tier: 'growth',
    name: 'Growth',
    priceUsd: 995,
    standardLimit: 2,
    description: 'For organisations running several compliance programmes.',
    features: ['Everything in Launch', 'Internal audits', 'CAPA management', 'Risk management', 'Management reviews'],
    cta: 'Scale compliance',
    featured: true,
  },
  {
    tier: 'business',
    name: 'Business',
    priceUsd: 1950,
    standardLimit: 3,
    description: 'For organisations that want automation and advanced workflows.',
    features: [
      'Everything in Growth',
      'Custom branded PDF reports',
      'FMEA and advanced risk',
      'Supplier audits',
      'Workflow automation',
      'Auditor portal',
    ],
    cta: 'Sustain excellence',
  },
  {
    tier: 'enterprise',
    name: 'Enterprise',
    priceUsd: null,
    standardLimit: null,
    description: 'For national and multi-site deployments with custom requirements.',
    features: [
      'Multi-site management',
      'SSO and advanced security',
      'On-premise options',
      'Dedicated success manager',
      'Custom integrations (API)',
    ],
    cta: 'Talk to sales',
  },
]

export const addOns = [
  { label: 'Staff training', priceUsd: 450, suffix: '/ day' },
  { label: 'Additional ISO standard', priceUsd: 25, prefix: 'NSB fee +', suffix: 'admin' },
]

export const included: { title: string; icon: LucideIcon }[] = [
  { title: 'AI compliance assistant', icon: Bot },
  { title: 'Consultant marketplace', icon: Store },
  { title: 'Secure cloud hosting', icon: CloudCog },
  { title: 'NSB standards integration', icon: BookMarked },
  { title: 'Automatic updates', icon: RefreshCw },
  { title: 'Mobile ready', icon: Smartphone },
  { title: 'Role-based security', icon: Lock },
  { title: 'Audit trail', icon: ScrollText },
]

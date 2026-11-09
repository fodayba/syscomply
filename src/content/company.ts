import {
  Award,
  ShieldCheck,
  Stamp,
  BookOpen,
  Building2,
  ClipboardCheck,
  FlaskConical,
  GraduationCap,
  Inbox,
  Leaf,
  Users,
  type LucideIcon,
} from 'lucide-react'

type Item = { title: string; body: string; icon: LucideIcon }

export const marketplace: { organisations: Item[]; consultants: Item[] } = {
  organisations: [
    { title: 'Implementation support', body: 'Find experts in your industry to help build your management system.', icon: BookOpen },
    { title: 'Internal audits', body: 'Hire objective, independent auditors for your required internal audits.', icon: ClipboardCheck },
    { title: 'Verified credentials', body: 'Every consultant is vetted, and SysComply verifies their ISO credentials.', icon: ShieldCheck },
  ],
  consultants: [
    { title: 'Client acquisition', body: 'Receive requests from organisations actively looking for ISO support.', icon: Inbox },
    { title: 'Collaborative workspace', body: "Work inside your clients' SysComply environments with secure role-based access.", icon: Users },
    { title: 'Trust badge', body: "Earn the Verified Expert badge and stand out in the marketplace.", icon: Award },
  ],
}

export const roadmap: Item[] = [
  { title: 'Compliance Exchange', body: 'Trade carbon credits and compliance assets.', icon: Leaf },
  { title: 'Training Marketplace', body: 'Certified training courses for your team.', icon: GraduationCap },
  { title: 'Laboratory Marketplace', body: 'Connect with accredited testing laboratories.', icon: FlaskConical },
  { title: 'Certification Marketplace', body: 'Find and hire accredited certification bodies.', icon: Stamp },
  { title: 'Government Compliance Portal', body: 'Report to regulators directly from SysComply.', icon: Building2 },
]

export const mission =
  'We make compliance simple to manage. SysComply guides organisations through the detail of ISO standards, and gives consultants what they need to do their best work.'

export const values = [
  { title: 'Simplicity', body: "Compliance shouldn't be complicated. We make ISO standards approachable for every organisation." },
  { title: 'Innovation', body: 'We keep refining SysComply as the needs of organisations and compliance professionals change.' },
  { title: 'Support', body: 'Training, clear documentation and responsive help, whenever you need it.' },
]

export const contactTopics = [
  {
    value: 'demo',
    label: 'Request a demo',
    message:
      'Hi SysComply team,\n\nI would like to request a personalised demo of the platform to see how it can streamline our ISO compliance.\n\nPlease let me know your availability.',
  },
  {
    value: 'pricing',
    label: 'Pricing inquiry',
    message:
      'Hi SysComply team,\n\nI have a question about the pricing plans and which tier would best fit my organisation.\n\nHere are my requirements:\n- ',
  },
  {
    value: 'enterprise',
    label: 'Enterprise sales',
    message:
      'Hi SysComply team,\n\nI am interested in the Enterprise plan and would like to discuss custom features and pricing for my organisation.\n\nPlease get in touch with me.',
  },
  {
    value: 'partnership',
    label: 'Consultant partnership',
    message:
      'Hi SysComply team,\n\nI am an ISO consultant and I am interested in joining the SysComply Consultant Network to manage my clients.\n\nPlease send me more details.',
  },
  {
    value: 'support',
    label: 'Technical support',
    message: 'Hi SysComply support,\n\nI am experiencing the following issue and need some help:\n\n',
  },
  { value: 'other', label: 'Other', message: '' },
]

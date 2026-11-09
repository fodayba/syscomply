export const nav = [
  { to: '/platform', label: 'Platform' },
  { to: '/solutions', label: 'Solutions' },
  { to: '/marketplace', label: 'Marketplace' },
  { to: '/pricing', label: 'Pricing' },
  { to: '/about', label: 'About' },
]

export const standards = [
  { code: 'ISO 9001', name: 'Quality' },
  { code: 'ISO 14001', name: 'Environmental' },
  { code: 'ISO 22000', name: 'Food safety' },
  { code: 'ISO 27001', name: 'Information security' },
  { code: 'ISO 45001', name: 'Health & safety' },
]

export const standardOptions = [
  { value: 'iso-9001', label: 'ISO 9001 — Quality Management' },
  { value: 'iso-14001', label: 'ISO 14001 — Environmental' },
  { value: 'iso-22000', label: 'ISO 22000 — Food Safety' },
  { value: 'iso-27001', label: 'ISO 27001 — Information Security' },
  { value: 'iso-45001', label: 'ISO 45001 — Health and Safety' },
  { value: 'multiple', label: 'Multiple standards' },
  { value: 'other', label: 'Other' },
]

export const isoDisclaimer =
  'ISO® is a registered trademark of the International Organization for Standardization. SysComply is an independent compliance management platform and is not affiliated with or endorsed by ISO. Users should refer to official ISO publications for normative requirements.'

export const comparison = {
  traditional: [
    'Standards bought separately, as PDFs',
    'Software bought separately',
    'Consultants found by email and phone',
    'Documents spread across SharePoint and Google Drive',
    'Clauses mapped to evidence by hand',
  ],
  syscomply: [
    'Licensed digital standards, included',
    'An AI assistant that knows the clauses',
    'Verified consultants on hand',
    'Every record in one place',
    'Clauses mapped to evidence automatically',
  ],
}

export const lifecycle = [
  { phase: 'Set up', title: 'Choose your standard', body: 'Purchase the licensed ISO standard directly in SysComply.' },
  { phase: 'Set up', title: 'Build the system', body: 'Set up policies and procedures from ready-made templates.' },
  { phase: 'Implement', title: 'Implement with guidance', body: 'ComplyAI guides each step and gathers evidence as you work.' },
  { phase: 'Implement', title: 'Bring in an expert', body: 'Hire a verified consultant from the marketplace, if and when you need one.' },
  { phase: 'Certify', title: 'Prepare for audit', body: 'Run internal audits, close non-conformances and check your readiness.' },
  { phase: 'Certify', title: 'Stay certified', body: 'Continuous monitoring keeps you compliant, year after year.' },
]

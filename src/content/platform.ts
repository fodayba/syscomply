import {
  Bot,
  ClipboardCheck,
  Compass,
  FlaskConical,
  Workflow,
  ShieldCheck,
  TrendingUp,
  TriangleAlert,
  Route,
  Factory,
  Timer,
  type LucideIcon,
} from 'lucide-react'

export type Domain = { id: string; title: string; summary: string; icon: LucideIcon; modules: string[] }

export const domains: Domain[] = [
  {
    id: 'planning',
    title: 'Strategic Planning',
    summary: 'Understand your context and stakeholders, and set measurable objectives.',
    icon: Compass,
    modules: ['Context of the Organization', 'SWOT Analysis', 'PESTLE Analysis', 'Interested Parties', 'Customer Requirements', 'Objectives & Targets'],
  },
  {
    id: 'operations',
    title: 'Operations & Supply Chain',
    summary: 'Documents, processes, suppliers and equipment, under control.',
    icon: Workflow,
    modules: ['Document Control', 'Process Management', 'Traceability & Batch Tracking', 'Customer Management & Feedback', 'Supplier Management', 'Equipment & Maintenance'],
  },
  {
    id: 'risk',
    title: 'Risk & Hazards',
    summary: 'Identify, assess and treat risk across quality, safety and security.',
    icon: TriangleAlert,
    modules: ['Risk & Opportunity Register', 'FMEA Analysis', 'HACCP & CCPs', 'Information Security Risks', 'OH&S Hazards & Environmental', 'Risk Treatment Plans'],
  },
  {
    id: 'audits',
    title: 'Audits & Inspections',
    summary: 'Plan internal, supplier and external audits, and follow every finding to close.',
    icon: ClipboardCheck,
    modules: ['Internal Audits', 'Supplier Audits', 'External Audits', 'Audit Schedules', 'Checklists & Protocols', 'Finding Tracking'],
  },
  {
    id: 'improvement',
    title: 'Improvement & Analytics',
    summary: 'Corrective action, management review and live dashboards.',
    icon: TrendingUp,
    modules: ['CAPA (Corrective Actions)', 'Non-Conformances', 'Customer Complaints', 'Management Review', 'Executive Dashboards', 'Data Analytics'],
  },
  {
    id: 'governance',
    title: 'Governance & Security',
    summary: 'Browse standards, map clauses and keep a signed record of every change.',
    icon: ShieldCheck,
    modules: ['Standards Browser', 'Clause Mapping', 'Legal Requirements', 'Role-based Access Control', 'Digital Signatures', 'Audit Trails'],
  },
  {
    id: 'ai',
    title: 'AI Co-Pilot',
    summary: 'Draft documents, find gaps and prepare for audit with an assistant that knows the clauses.',
    icon: Bot,
    modules: ['Document Drafting', 'Risk Identification', 'Gap Analysis', 'Clause Explanation', 'Audit Prep Assistant', 'CAPA Root Cause Generator'],
  },
]

export const moduleCount = domains.reduce((n, d) => n + d.modules.length, 0)

export const ecosystem = [
  { label: 'National Standards Bodies', note: 'License the official ISO standards' },
  { label: 'Licensed digital standards', note: 'Delivered inside SysComply' },
  { label: 'SysComply', note: 'Where your management system is built and run' },
  { label: 'Organisations, consultants and auditors', note: 'Working from the same records' },
  { label: 'A certification-ready management system', note: 'The result' },
]

export type FoodModule = { title: string; icon: LucideIcon; points: string[]; stat: { label: string; value: string } }

export const foodSuite: FoodModule[] = [
  {
    title: 'Recipe Formulation',
    icon: FlaskConical,
    points: [
      'Ingredient listing and formula builder',
      'Live nutrition facts and cost per serving',
      'Facility-wide allergen management with automatic flagging',
      'Version-controlled formulation iterations',
    ],
    stat: { label: 'Allergen warning', value: 'Contains peanuts' },
  },
  {
    title: 'HACCP AI Builder',
    icon: Bot,
    points: [
      'AI identifies Critical Control Points (CCPs)',
      'Automated HACCP plan drafting',
      'Flow diagram designer',
      'Run and record food safety team meetings',
    ],
    stat: { label: 'AI hazard suggestion', value: 'Add a metal detector check at step 4' },
  },
  {
    title: 'Traceability & Mock Recall',
    icon: Route,
    points: [
      'One-click forward and backward batch trace',
      'Upstream and downstream supply chain mapping',
      'Visual mass balance Sankey charts',
      'Mock recall simulation workflows',
    ],
    stat: { label: 'Batch #B-9942', value: '4,200 kg in · 4,185 kg out' },
  },
  {
    title: 'Production Operations',
    icon: Factory,
    points: [
      'Process flow diagram (PFD) designer and mapping',
      'Interactive mass balance reconciliation',
      'Yield and profitability variance analytics',
      'Detailed production run tracking',
    ],
    stat: { label: 'Yield variance', value: '+2.4% optimal' },
  },
  {
    title: 'ShelfSense™',
    icon: Timer,
    points: [
      'Shelf-life tools: calculator, comparison, boundary map, Bayesian estimator',
      'Manage real-time and accelerated studies',
      'Sensory analysis and scoring for organoleptic degradation',
      'Master data and libraries of scientific shelf-life parameters',
      'Regulatory-grade reference data curated for auditors',
    ],
    stat: { label: 'Accelerated model', value: 'Designed to align with FDA predictive-validity principles' },
  },
]

import { Cloud, Factory, HeartPulse, Landmark, Pickaxe, Wheat, type LucideIcon } from 'lucide-react'

export type Industry = {
  id: string
  title: string
  icon: LucideIcon
  standards: string[]
  short: string
  challenge: string
  approach: string
  outcomes: string[]
}

export const industries: Industry[] = [
  {
    id: 'healthcare',
    title: 'Healthcare',
    icon: HeartPulse,
    standards: ['ISO 9001', 'ISO 27001', 'HIPAA'],
    short: 'Protect patient data and patient safety with automated, trackable workflows.',
    challenge:
      "In healthcare, compliance isn't only about passing audits. It's about patient safety and protecting highly sensitive personal health information (PHI).",
    approach:
      'SysComply brings quality management (ISO 9001), information security (ISO 27001) and your compliance protocols into one place. Scattered documents become automated, trackable workflows, so outdated procedures stop causing critical errors.',
    outcomes: [
      'Secure patient data with strict access controls',
      'Automate incident reporting and CAPA workflows',
      'Make sure all staff are trained on the latest protocols',
    ],
  },
  {
    id: 'financial-services',
    title: 'Financial Services',
    icon: Landmark,
    standards: ['ISO 27001', 'SOC 2', 'GLBA'],
    short: 'Meet SOC 2, GLBA and ISO 27001 with continuous control monitoring.',
    challenge:
      'Financial institutions work under close regulatory scrutiny. Manual compliance leaves gaps that can lead to fines or the loss of a licence.',
    approach:
      'SysComply assesses risk in real time and monitors your controls continuously, connecting your IT infrastructure to SOC 2 and ISO 27001 so evidence is always current.',
    outcomes: [
      'Continuous monitoring of security controls',
      'Automated risk registers and impact assessments',
      'Streamlined reporting to regulators',
    ],
  },
  {
    id: 'technology',
    title: 'Technology & SaaS',
    icon: Cloud,
    standards: ['ISO 27001', 'SOC 2'],
    short: 'Fast-track SOC 2 and ISO 27001 to close enterprise deals sooner.',
    challenge:
      'For SaaS companies, certification opens enterprise sales. Without SOC 2 or ISO 27001, deals stall in procurement, and doing the work by hand takes engineers away from the product.',
    approach:
      'SysComply gathers evidence directly from your cloud infrastructure, so compliance runs quietly alongside engineering.',
    outcomes: [
      'Automated evidence collection from AWS, GCP and Azure',
      'Pre-built policies for SOC 2 and ISO 27001',
      'Compliance reports for prospects in a few clicks',
    ],
  },
  {
    id: 'manufacturing',
    title: 'Manufacturing',
    icon: Factory,
    standards: ['ISO 9001', 'ISO 14001'],
    short: 'Run ISO 9001 quality and supply chain standards consistently across every site.',
    challenge:
      'Disconnected quality systems lead to defects, costly recalls and supply chain disruption. Modern manufacturing needs continuous traceability.',
    approach:
      'SysComply digitises your ISO 9001 (quality) and ISO 14001 (environmental) management systems, with one view across all production sites so standard operating procedures are followed everywhere.',
    outcomes: [
      'Unbroken traceability from raw material to finished good',
      'Digital SOPs available on the factory floor',
      'Central non-conformance tracking across all sites',
    ],
  },
  {
    id: 'food-and-beverage',
    title: 'Food & Beverage',
    icon: Wheat,
    standards: ['ISO 22000', 'HACCP'],
    short: 'Run ISO 22000 and HACCP digitally and catch deviations as they happen.',
    challenge:
      'A single food safety incident can damage a brand. Paper logs for temperatures and hazards leave too much to chance.',
    approach:
      'SysComply holds your ISO 22000 and HACCP plans digitally. Hazard thresholds are monitored and deviations are caught as they happen.',
    outcomes: [
      'Cut HACCP documentation time by over 60%',
      'Automated alerts as you approach critical limits',
      'Recall readiness and full traceability',
    ],
  },
  {
    id: 'mining-and-resources',
    title: 'Mining & Resources',
    icon: Pickaxe,
    standards: ['ISO 45001', 'ISO 14001'],
    short: 'Hold every remote site to the same health, safety and environmental standard.',
    challenge:
      'In high-risk, remote environments, health, safety and environmental compliance is a licence to operate. Mistakes cost lives.',
    approach:
      'SysComply connects remote sites to a central hub and enforces ISO 45001 (health and safety). Incidents are reported immediately and preventive actions roll out everywhere.',
    outcomes: [
      'Offline-capable incident reporting for remote sites',
      'Real-time safety dashboards for executives',
      'Automated environmental impact monitoring',
    ],
  },
]

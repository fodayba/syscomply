import { Link } from '../components/Link'
import { ArrowUpRight } from 'lucide-react'
import { CtaBand } from '../components/CtaBand'
import { IconBadge, PageHeader, Section } from '../components/ui'
import { industries } from '../content/industries'

export function Solutions() {
  return (
    <>
      <title>Solutions — SysComply</title>
      <PageHeader
        eyebrow="Solutions"
        title={
          <>
            Compliance shaped to <em>your industry.</em>
          </>
        }
        lead="Every sector has its own standards, risks and auditors. SysComply adapts to the way yours works."
      />
      <Section afterHeader>
        <ul data-stagger className="grid gap-4 md:grid-cols-2 md:gap-6">
          {industries.map((i) => (
            <li key={i.id}>
              <Link
                to={`/solutions/${i.id}`}
                className="group flex h-full flex-col rounded-3xl bg-stone p-8 transition-colors duration-300 hover:bg-stone-2 md:p-12"
              >
                <span className="flex items-center justify-between">
                  <IconBadge icon={i.icon} />
                  <ArrowUpRight
                    className="size-5 text-muted transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-ink"
                    strokeWidth={1.5}
                    aria-hidden="true"
                  />
                </span>
                <h2 className="mt-14 font-display text-[2rem] leading-tight tracking-[-0.015em]">{i.title}</h2>
                <p className="mt-3 max-w-md leading-relaxed text-muted">{i.short}</p>
                <p className="mt-auto pt-10 text-sm text-muted">{i.standards.join('  ·  ')}</p>
              </Link>
            </li>
          ))}
        </ul>
      </Section>
      <CtaBand />
    </>
  )
}

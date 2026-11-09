import type { ComponentProps, ReactNode } from 'react'
import { ChevronDown } from 'lucide-react'

export const inputClass =
  'w-full rounded-xl bg-stone px-4 py-3 text-[15px] text-ink placeholder:text-muted/70 transition-shadow duration-200 focus:bg-paper focus:outline-none focus:ring-1 focus:ring-ink/40 user-invalid:ring-1 user-invalid:ring-danger/60 appearance-none'

export function Select({ className = '', ...props }: ComponentProps<'select'>) {
  return (
    <span className="relative block">
      <select className={`${inputClass} pr-11 ${className}`} {...props} />
      <ChevronDown
        className="pointer-events-none absolute top-1/2 right-4 size-4 -translate-y-1/2 text-muted"
        strokeWidth={1.5}
        aria-hidden="true"
      />
    </span>
  )
}

export function Field({
  label,
  htmlFor,
  hint,
  required,
  children,
}: {
  label: string
  htmlFor: string
  hint?: string
  required?: boolean
  children: ReactNode
}) {
  return (
    <div className="grid gap-2">
      <label htmlFor={htmlFor} className="flex items-baseline justify-between text-sm">
        <span className="font-medium">
          {label}
          {required && (
            <span className="text-muted" aria-hidden="true">
              {' '}
              *
            </span>
          )}
        </span>
        {hint && <span className="text-xs text-muted">{hint}</span>}
      </label>
      {children}
    </div>
  )
}

export function FormError({ children }: { children: ReactNode }) {
  return (
    <p role="alert" className="text-sm text-danger">
      {children}
    </p>
  )
}

export function FormSuccess({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="grid place-items-center py-16 text-center" role="status">
      <span className="grid size-14 place-items-center rounded-full bg-stone">
        <svg viewBox="0 0 16 16" aria-hidden="true" className="size-5 text-sage-ink">
          <path d="M3 8.5 6.5 12 13 4.5" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </span>
      <h2 className="mt-6 font-display text-3xl">{title}</h2>
      <p className="mt-3 max-w-sm leading-relaxed text-muted">{children}</p>
    </div>
  )
}

import { useCallback, useEffect, useRef, useState, type ReactNode } from 'react'
import { Loader2, X } from 'lucide-react'
import { requestDemo, type DemoRequest } from '../lib/api'
import { standardOptions } from '../content/site'
import { DemoContext } from './demo-context'
import { Button } from './ui'
import { Field, FormError, FormSuccess, Select, inputClass } from './form'

const empty: DemoRequest = { fullName: '', email: '', company: '', phone: '', standard: '', message: '' }

export function DemoProvider({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDialogElement>(null)
  const firstField = useRef<HTMLInputElement>(null)
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [form, setForm] = useState(empty)

  const open = useCallback(() => {
    setStatus((s) => (s === 'sent' ? 'idle' : s))
    if (!ref.current?.open) ref.current?.showModal()
    requestAnimationFrame(() => firstField.current?.focus())
  }, [])

  // Any link to #book-demo opens the dialog, so the demo form can be shared or linked to.
  useEffect(() => {
    const check = () => {
      if (window.location.hash !== '#book-demo') return
      history.replaceState(null, '', window.location.pathname + window.location.search)
      open()
    }
    check()
    window.addEventListener('hashchange', check)
    return () => window.removeEventListener('hashchange', check)
  }, [open])
  const close = () => ref.current?.close()
  const set = (k: keyof DemoRequest) => (e: { target: { value: string } }) =>
    setForm((f) => ({ ...f, [k]: e.target.value }))

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('sending')
    try {
      await requestDemo(form)
      setStatus('sent')
      setForm(empty)
    } catch {
      setStatus('error')
    }
  }

  return (
    <DemoContext value={open}>
      {children}
      <dialog
        ref={ref}
        aria-labelledby="demo-title"
        onClick={(e) => e.target === ref.current && close()}
        className="m-auto max-h-[calc(100dvh-2rem)] open:animate-rise w-[calc(100%-2rem)] max-w-lg overflow-y-auto rounded-[28px] bg-paper p-0 text-ink shadow-[0_40px_80px_-20px_rgb(20_22_20/0.35)]"
      >
        <div className="relative p-7 md:p-10">
          <button
            type="button"
            onClick={close}
            aria-label="Close"
            className="absolute top-5 right-5 grid size-10 place-items-center rounded-full text-muted transition-colors hover:bg-stone hover:text-ink"
          >
            <X className="size-5" strokeWidth={1.5} />
          </button>

          {status === 'sent' ? (
            <div id="demo-title">
              <FormSuccess title="Request received">
                Thank you for your interest in SysComply. We'll email your demo login details within 24 hours.
              </FormSuccess>
              <div className="-mt-6 flex justify-center pb-4">
                <Button onClick={close}>Done</Button>
              </div>
            </div>
          ) : (
            <>
              <h2 id="demo-title" className="font-display text-[2rem] leading-tight tracking-[-0.015em]">
                Book a demo
              </h2>
              <p className="mt-3 max-w-sm leading-relaxed text-muted">
                Tell us a little about your organisation and we'll send you demo access within 24 hours.
              </p>
              <form onSubmit={submit} className="mt-8 grid gap-5">
                <Field label="Full name" htmlFor="d-name" required>
                  <input ref={firstField} id="d-name" className={inputClass} placeholder="John Doe" autoComplete="name" required value={form.fullName} onChange={set('fullName')} />
                </Field>
                <div className="grid gap-5 sm:grid-cols-2">
                  <Field label="Work email" htmlFor="d-email" required>
                    <input id="d-email" type="email" className={inputClass} placeholder="john@company.com" autoComplete="email" required value={form.email} onChange={set('email')} />
                  </Field>
                  <Field label="Company" htmlFor="d-company" required>
                    <input id="d-company" className={inputClass} placeholder="Acme Corporation" autoComplete="organization" required value={form.company} onChange={set('company')} />
                  </Field>
                </div>
                <div className="grid gap-4 sm:grid-cols-2">
                  <Field label="Phone" htmlFor="d-phone" hint="Optional">
                    <input id="d-phone" type="tel" className={inputClass} placeholder="+232 …" autoComplete="tel" value={form.phone} onChange={set('phone')} />
                  </Field>
                  <Field label="Standard of interest" htmlFor="d-standard">
                    <Select id="d-standard" value={form.standard} onChange={set('standard')}>
                      <option value="">Select</option>
                      {standardOptions.map((o) => (
                        <option key={o.value} value={o.value}>
                          {o.label}
                        </option>
                      ))}
                    </Select>
                  </Field>
                </div>
                <Field label="Message" htmlFor="d-message" hint="Optional">
                  <textarea id="d-message" rows={3} className={inputClass} placeholder="Tell us about your compliance needs…" value={form.message} onChange={set('message')} />
                </Field>
                {status === 'error' && (
                  <FormError>We couldn't send your request. Please try again, or email us directly.</FormError>
                )}
                <Button type="submit" size="lg" className="mt-2" disabled={status === 'sending'}>
                  {status === 'sending' ? (
                    <>
                      <Loader2 className="size-4 animate-spin" strokeWidth={1.5} /> Submitting…
                    </>
                  ) : (
                    'Request demo access'
                  )}
                </Button>
              </form>
            </>
          )}
        </div>
      </dialog>
    </DemoContext>
  )
}

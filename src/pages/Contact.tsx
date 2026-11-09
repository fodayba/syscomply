import { useState } from 'react'
import { useSearchParams } from 'react-router'
import { Check, Copy, Loader2, Mail, MapPin } from 'lucide-react'
import { Field, FormError, FormSuccess, Select, inputClass } from '../components/form'
import { Button, Container, Eyebrow, IconBadge } from '../components/ui'
import { CONTACT_EMAIL } from '../config'
import { contactTopics } from '../content/company'
import { sendContact } from '../lib/api'

const templateFor = (topic: string) => contactTopics.find((t) => t.value === topic)?.message ?? ''

export function Contact() {
  const [params] = useSearchParams()
  const initialTopic = contactTopics.some((t) => t.value === params.get('topic')) ? params.get('topic')! : ''

  const [topic, setTopic] = useState(initialTopic)
  const [message, setMessage] = useState(templateFor(initialTopic))
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'error'>('idle')
  const [copied, setCopied] = useState(false)

  async function copyEmail() {
    try {
      await navigator.clipboard.writeText(CONTACT_EMAIL)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch {
      window.location.href = `mailto:${CONTACT_EMAIL}`
    }
  }

  function changeTopic(next: string) {
    // Only swap in the new template if the visitor hasn't written their own message.
    const untouched = message.trim() === '' || contactTopics.some((t) => t.message === message)
    if (untouched) setMessage(templateFor(next))
    setTopic(next)
  }

  async function submit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    setStatus('sending')
    try {
      await sendContact({
        firstName: String(f.get('firstName')),
        lastName: String(f.get('lastName')),
        email: String(f.get('email')),
        company: String(f.get('company')),
        topic,
        message,
      })
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  return (
    <section className="pt-20 pb-24 md:pt-32 md:pb-32">
      <title>Contact — SysComply</title>
      <Container className="grid gap-16 lg:grid-cols-[1fr_1.1fr] lg:gap-20">
        <div className="animate-rise">
          <Eyebrow>Contact</Eyebrow>
          <h1 className="mt-8 font-display text-[2.75rem] leading-[1.04] font-normal tracking-[-0.025em] text-balance md:text-[4.25rem]">
            Let's talk about your <em>compliance journey.</em>
          </h1>
          <p className="mt-8 max-w-md text-lg leading-relaxed text-muted">
            Whether it's a question about SysComply, an enterprise setup or a consulting partnership, we usually reply
            within 24 hours.
          </p>
          <dl className="mt-14 grid gap-8">
            <div className="flex gap-5">
              <IconBadge icon={Mail} />
              <div>
                <dt className="font-medium">Email</dt>
                <dd className="mt-1 flex flex-wrap items-center gap-x-4 gap-y-1 text-muted">
                  <a href={`mailto:${CONTACT_EMAIL}`} className="transition-colors hover:text-ink">
                    {CONTACT_EMAIL}
                  </a>
                  <button
                    type="button"
                    onClick={copyEmail}
                    className="inline-flex items-center gap-1.5 text-sm transition-colors hover:text-ink"
                  >
                    {copied ? <Check className="size-3.5" strokeWidth={1.5} /> : <Copy className="size-3.5" strokeWidth={1.5} />}
                    <span aria-live="polite">{copied ? 'Copied' : 'Copy'}</span>
                  </button>
                </dd>
              </div>
            </div>
            <div className="flex gap-5">
              <IconBadge icon={MapPin} />
              <div>
                <dt className="font-medium">Headquarters</dt>
                <dd className="mt-1 text-muted">Freetown, Sierra Leone</dd>
              </div>
            </div>
          </dl>
        </div>

        <div className="rounded-[28px] bg-white/70 p-7 shadow-[0_30px_60px_-40px_rgb(20_22_20/0.3)] md:p-10">
          {status === 'sent' ? (
            <FormSuccess title="Message sent">Our team will get back to you within 24 hours.</FormSuccess>
          ) : (
            <form onSubmit={submit} className="grid gap-5">
              <h2 className="font-display text-[1.75rem] tracking-[-0.01em]">Send us a message</h2>
              <div className="mt-2 grid gap-5 sm:grid-cols-2">
                <Field label="First name" htmlFor="c-first" required>
                  <input id="c-first" name="firstName" className={inputClass} placeholder="John" autoComplete="given-name" required />
                </Field>
                <Field label="Last name" htmlFor="c-last" required>
                  <input id="c-last" name="lastName" className={inputClass} placeholder="Doe" autoComplete="family-name" required />
                </Field>
              </div>
              <Field label="Work email" htmlFor="c-email" required>
                <input id="c-email" name="email" type="email" className={inputClass} placeholder="john@company.com" autoComplete="email" required />
              </Field>
              <Field label="Company" htmlFor="c-company">
                <input id="c-company" name="company" className={inputClass} placeholder="Acme Corp" autoComplete="organization" />
              </Field>
              <Field label="How can we help?" htmlFor="c-topic" required>
                <Select id="c-topic" value={topic} onChange={(e) => changeTopic(e.target.value)} required>
                  <option value="" disabled>
                    Select a topic
                  </option>
                  {contactTopics.map((t) => (
                    <option key={t.value} value={t.value}>
                      {t.label}
                    </option>
                  ))}
                </Select>
              </Field>
              <Field label="Message" htmlFor="c-message" required>
                <textarea
                  id="c-message"
                  rows={6}
                  className={inputClass}
                  placeholder="Tell us a little about what you're looking for"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  required
                />
              </Field>
              {status === 'error' && (
                <FormError>There was a problem sending your message. Please try again, or email {CONTACT_EMAIL}.</FormError>
              )}
              <Button type="submit" size="lg" className="mt-2" disabled={status === 'sending'}>
                {status === 'sending' ? (
                  <>
                    <Loader2 className="size-4 animate-spin" strokeWidth={1.5} /> Sending
                  </>
                ) : (
                  'Send message'
                )}
              </Button>
              <p className="text-center text-xs text-muted">
                By submitting this form, you agree to our privacy policy and terms of service.
              </p>
            </form>
          )}
        </div>
      </Container>
    </section>
  )
}

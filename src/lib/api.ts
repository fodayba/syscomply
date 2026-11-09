import { API_BASE_URL } from '../config'

async function post(path: string, body: unknown) {
  const res = await fetch(`${API_BASE_URL}${path}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  if (!res.ok) throw new Error(`Request failed with ${res.status}`)
}

export type DemoRequest = {
  fullName: string
  email: string
  company: string
  phone: string
  standard: string
  message: string
}

export const requestDemo = (body: DemoRequest) => post('/support/demo-request', body)

export type ContactRequest = {
  firstName: string
  lastName: string
  email: string
  company: string
  topic: string
  message: string
}

export const sendContact = (body: ContactRequest) => post('/support/public/contact', body)

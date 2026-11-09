/** Backend API used by the forms and the pricing page. */
export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'https://api.syscomply.thecompliance.io/api'

/** The SysComply web app (login / signup live here, not on the marketing site). */
export const APP_URL = import.meta.env.VITE_APP_URL ?? 'https://app.syscomply.thecompliance.io'

export const SIGNUP_URL = `${APP_URL}/signup`
export const LOGIN_URL = `${APP_URL}/login`

export const CONTACT_EMAIL = 'hello@syscomply.ai'

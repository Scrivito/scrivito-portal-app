import { load, Obj } from 'scrivito'
import { App } from '../App'
import { WrongContentFormat } from './Components/WrongContentFormat'
import { instanceFromHostname } from './multiTenancy'

export async function getJrPlatformApp() {
  return (await isValidContentFormat()) ? App : WrongContentFormat
}

const CONTENT_FORMAT = 'portal-app:5'
const KNOWN_CONTENT_FORMATS: Record<string, string> = {
  'portal-app:5': 'https://scrivito-portal-app.pages.dev',

  /* Once v6 is released, the list of KNOWN_CONTENT_FORMATS looks like this: */
  // 'portal-app:5': 'https://v5.scrivito-portal-app.pages.dev',
  // 'portal-app:6': 'https://scrivito-portal-app.pages.dev',
}

/** Redirects away, if the content format does not match but is a known format. */
async function isValidContentFormat(): Promise<boolean> {
  const root = await load(() => Obj.root())
  if (!root) return true

  const siteContentFormat = root.get('contentFormat')
  if (siteContentFormat === CONTENT_FORMAT) return true

  // For alias instances it's better to show a half-broken app, then to show a full error page.
  if (instanceFromHostname()) return true

  if (typeof siteContentFormat !== 'string') return false
  if (!siteContentFormat) return false

  const redirectOrigin = KNOWN_CONTENT_FORMATS[siteContentFormat]
  if (!redirectOrigin) return false

  if (location.origin === redirectOrigin) return false

  const url = location.href.replace(location.origin, redirectOrigin)
  location.replace(url)

  return never() // location.replace will trigger a redirect
}

function never() {
  return new Promise<never>(() => {})
}

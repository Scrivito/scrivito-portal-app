import { load, Obj } from 'scrivito'
import { App } from '../App'
import { WrongContentFormat } from './Components/WrongContentFormat'
import { getJrPlatformInstanceId, instanceFromHostname } from './multiTenancy'
import { MissingTenant } from './Components/MissingTenant'

export async function getJrPlatformApp() {
  if (!getJrPlatformInstanceId()) return MissingTenant

  return (await isValidContentFormat()) ? App : WrongContentFormat
}

const CONTENT_FORMAT = 'portal-app:5'
const KNOWN_CONTENT_FORMATS: Record<string, string> = {
  'portal-app:5': 'https://v5.scrivito-portal-app.pages.dev',
  'portal-app:6': 'https://scrivito-portal-app.pages.dev',
}

/**
 * Redirects away, if the content format does not match but is a known format.
 *
 * For alias instances it returns `true` - regardless of the `contentFormat`. It's better to show a half-broken app, then to show a full error page.
 */
async function isValidContentFormat(): Promise<boolean> {
  if (instanceFromHostname()) return true

  const root = await load(() => Obj.root())
  if (!root) return true

  const siteContentFormat = root.get('contentFormat')
  if (siteContentFormat === CONTENT_FORMAT) return true

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

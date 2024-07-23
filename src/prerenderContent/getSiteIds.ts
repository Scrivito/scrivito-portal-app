import { Obj, urlFor } from 'scrivito'
import { loadEnv } from 'vite'

export function getSiteIds(): string[] {
  const env = loadEnv('development', process.cwd(), '')

  const origin = env.SCRIVITO_ORIGIN
  if (!origin) throw new Error('Missing SCRIVITO_ORIGIN.')

  const allSites = Obj.onAllSites().where('_path', 'equals', '/').toArray()

  const siteIds = allSites
    .filter((site) => urlFor(site)?.startsWith(origin))
    .map((site) => site.siteId())
    .filter((siteId): siteId is string => !!siteId)

  if (siteIds.length === 0) {
    throw new Error(`No site found for origin "${origin}".`)
  }

  return siteIds
}

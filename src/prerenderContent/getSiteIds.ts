import { Obj, urlFor } from 'scrivito'

export function getSiteIds(): string[] {
  const origin = import.meta.env.SCRIVITO_ORIGIN
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

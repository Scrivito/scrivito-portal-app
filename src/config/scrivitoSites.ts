import { Obj, currentSiteId, load, navigateTo } from 'scrivito'
import { scrivitoTenantId, isMultitenancyEnabled } from './scrivitoTenants'

const location = typeof window !== 'undefined' ? window.location : undefined

export function baseUrlForSite(siteId: string): string | undefined {
  if (!location) return

  const urlParts = [location.origin]
  const tenant = scrivitoTenantId()

  if (isMultitenancyEnabled()) urlParts.push(tenant)

  const language = Obj.onSite(siteId).root()?.language()
  if (language) urlParts.push(language)

  return urlParts.join('/')
}

export function siteForUrl(
  url: string,
): { baseUrl: string; siteId: string } | undefined {
  const language = /\b\/([0-9a-f]{32}\/)?(?<lang>[a-z]{2})([?/]|$)/.exec(url)
    ?.groups?.lang

  const siteId = Obj.onAllSites()
    .where('_path', 'equals', '/')
    .and('_language', 'equals', language || null)
    .first()
    ?.siteId()

  if (!siteId) return

  const baseUrl = baseUrlForSite(siteId)
  if (baseUrl) return { baseUrl, siteId }
}

export async function ensureSiteIsPresent() {
  if ((await load(currentSiteId)) === null) {
    navigateTo(() =>
      Obj.onAllSites().where('_path', 'equals', '/').order('_language').first(),
    )
  }
}

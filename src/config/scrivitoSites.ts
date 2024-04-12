import { Obj, currentSiteId, load, navigateTo } from 'scrivito'
import { isMultitenancyEnabled } from './scrivitoTenants'

const location = typeof window !== 'undefined' ? window.location : undefined

export function baseUrlForSite(siteId: string): string | undefined {
  const tenant = getTenantFromEnv()
  if (!location || !tenant) return

  const urlParts = [location.origin]

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

export function getTenantFromEnv(): string | undefined {
  if (!isMultitenancyEnabled()) return import.meta.env.SCRIVITO_TENANT

  if (!location) throw new Error('Could not determine tenant!')

  const tenantFromUrl = location.pathname.match(/^\/([0-9a-f]{32})\b/)?.[1]
  const tenantFromQuery = new URLSearchParams(location.search).get('tenantId')
  const tenant = tenantFromUrl || tenantFromQuery

  if (!tenant) {
    if (
      import.meta.env.VITE_MULTITENANCY_FALLBACK_SCRIVITO_TENANT &&
      !tenantFromQuery
    ) {
      const fallbackScrivitoTenant = import.meta.env
        .VITE_MULTITENANCY_FALLBACK_SCRIVITO_TENANT
      if (
        typeof fallbackScrivitoTenant === 'string' &&
        fallbackScrivitoTenant.match(/^[0-9a-f]{32}$/)
      ) {
        location.replace(`${location.origin}/${fallbackScrivitoTenant}`)
        return
      }
    }

    throw new Error('Could not determine tenant!')
  }

  return tenant
}

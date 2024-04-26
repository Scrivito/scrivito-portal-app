import { Obj, currentSiteId, getInstanceId, load, navigateTo } from 'scrivito'
import { scrivitoTenantId, isMultitenancyEnabled } from './scrivitoTenants'

const location = typeof window !== 'undefined' ? window.location : undefined

const NEOLETTER_MAILINGS_SITE_ID = 'mailing-app'

export function baseUrlForSite(siteId: string): string | undefined {
  if (siteId === NEOLETTER_MAILINGS_SITE_ID) {
    return `https://mailing.neoletter.com/${getInstanceId()}`
  }

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
  const neoletterMailingsBaseUrl = baseUrlForSite(NEOLETTER_MAILINGS_SITE_ID)
  if (neoletterMailingsBaseUrl && url.startsWith(neoletterMailingsBaseUrl)) {
    return {
      baseUrl: neoletterMailingsBaseUrl,
      siteId: NEOLETTER_MAILINGS_SITE_ID,
    }
  }

  const language = /\b\/([0-9a-f]{32}\/)?(?<lang>[a-z]{2})([?/]|$)/.exec(url)
    ?.groups?.lang

  return Obj.onAllSites()
    .where('_path', 'equals', '/')
    .and('_language', 'equals', language || null)
    .toArray()
    .map((root) => {
      const siteId = root.siteId()
      const baseUrl = siteId && baseUrlForSite(siteId)
      if (baseUrl) return { baseUrl, siteId }
    })
    .find((site) => site)
}

export async function ensureSiteIsPresent() {
  if ((await load(currentSiteId)) === null) {
    navigateTo(() => {
      const sites = Obj.onAllSites().where('_path', 'equals', '/').toArray()
      const preferredLanguageOrder = [...window.navigator.languages, 'en', null]

      for (const language of preferredLanguageOrder) {
        const site = sites.find((site) => siteHasLanguage(site, language))
        if (site) return site
      }

      return sites[0] || null
    })
  }
}

function siteHasLanguage(site: Obj, language: string | null) {
  const siteLanguage = site.language()
  return language && siteLanguage
    ? language.startsWith(siteLanguage)
    : language === siteLanguage
}

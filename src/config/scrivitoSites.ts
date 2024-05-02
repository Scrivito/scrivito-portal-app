import { Obj, currentSiteId, getInstanceId, load, navigateTo } from 'scrivito'
import { scrivitoTenantId, isMultitenancyEnabled } from './scrivitoTenants'

const location = typeof window !== 'undefined' ? window.location : undefined

const NEOLETTER_MAILINGS_SITE_ID = 'mailing-app'
const SCRIVITO_PORTAL_APP_ROOT_CONTENT_ID = 'c2a0aab78be05a4e'

export function baseUrlForSite(siteId: string): string | undefined {
  if (siteId === NEOLETTER_MAILINGS_SITE_ID) {
    return `https://mailing.neoletter.com/${getInstanceId()}`
  }

  const siteRoot = Obj.onSite(siteId).root()
  if (siteRoot?.contentId() !== SCRIVITO_PORTAL_APP_ROOT_CONTENT_ID) {
    const rawBaseUrl = siteRoot?.get('baseUrl')
    const baseUrl = isStringArray(rawBaseUrl) ? rawBaseUrl[0] : undefined
    return baseUrl ? baseUrl : undefined
  }

  if (!location) return

  const urlParts = [location.origin]
  const tenant = scrivitoTenantId()

  if (isMultitenancyEnabled()) urlParts.push(tenant)

  const language = siteRoot?.language()
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

  const siteId = Obj.onAllSites()
    .where('_path', 'equals', '/')
    .andNot('_siteId', 'equals', NEOLETTER_MAILINGS_SITE_ID)
    .and('_language', 'equals', language || null)
    .first()
    ?.siteId()

  const baseUrl = siteId && baseUrlForSite(siteId)
  if (baseUrl) return { baseUrl, siteId }
}

export async function ensureSiteIsPresent() {
  if ((await load(currentSiteId)) === null) {
    navigateTo(() => {
      const websites = Obj.onAllSites()
        .where('_contentId', 'equals', SCRIVITO_PORTAL_APP_ROOT_CONTENT_ID)
        .toArray()
      const preferredLanguageOrder = [...window.navigator.languages, 'en', null]

      for (const language of preferredLanguageOrder) {
        const site = websites.find((site) => siteHasLanguage(site, language))
        if (site) return site
      }

      return websites[0] || null
    })
  }
}

function siteHasLanguage(site: Obj, language: string | null) {
  const siteLanguage = site.language()
  return language && siteLanguage
    ? language.startsWith(siteLanguage)
    : language === siteLanguage
}

function isStringArray(item: unknown): item is string[] {
  return Array.isArray(item) && item.every((i) => typeof i === 'string')
}

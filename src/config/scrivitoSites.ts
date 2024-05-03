import { Obj, currentSiteId, getInstanceId, load, navigateTo } from 'scrivito'
import { isMultitenancyEnabled } from './scrivitoTenants'

const location = typeof window !== 'undefined' ? window.location : undefined

const NEOLETTER_MAILINGS_SITE_ID = 'mailing-app'
const SCRIVITO_PORTAL_APP_ROOT_CONTENT_ID = 'c2a0aab78be05a4e'

export function baseUrlForSite(siteId: string): string | undefined {
  if (siteId === NEOLETTER_MAILINGS_SITE_ID) {
    return `https://mailing.neoletter.com/${getInstanceId()}`
  }

  const siteRoot = Obj.onSite(siteId).root()
  if (!siteRoot) return

  if (siteRoot.contentId() !== SCRIVITO_PORTAL_APP_ROOT_CONTENT_ID) {
    return buildExternalBaseUrl(siteRoot)
  }

  const baseAppUrl = getBaseAppUrl()
  if (!baseAppUrl) return

  const language = siteRoot.language()
  if (!language) return

  return `${baseAppUrl}/${language}`
}

export function siteForUrl(
  url: string,
): { baseUrl: string; siteId: string } | undefined {
  return Obj.onAllSites()
    .where('_path', 'equals', '/')
    .toArray()
    .filter(
      (website): website is { siteId: () => string } & Obj =>
        !!website.siteId(),
    )
    .map((websiteWithSiteId) => {
      const siteId = websiteWithSiteId.siteId()
      return { siteId, baseUrl: baseUrlForSite(siteId) }
    })
    .find(
      (item): item is { baseUrl: string; siteId: string } =>
        !!item.baseUrl && url.startsWith(item.baseUrl),
    )
}

export async function ensureSiteIsPresent() {
  if ((await load(currentSiteId)) === null) {
    navigateTo(() => {
      const websites = allPortalWebsites().toArray()
      const preferredLanguageOrder = [...window.navigator.languages, 'en', null]

      for (const language of preferredLanguageOrder) {
        const site = websites.find((site) => siteHasLanguage(site, language))
        if (site) return site
      }

      return websites[0] || null
    })
  }
}

function getBaseAppUrl(): string | undefined {
  if (!location) return

  return isMultitenancyEnabled()
    ? `${location.origin}/${getInstanceId()}`
    : location.origin
}

function buildExternalBaseUrl(siteRoot: Obj): string | undefined {
  const rawBaseUrl = siteRoot.get('baseUrl')
  if (!isStringArray(rawBaseUrl)) return

  const baseUrl = rawBaseUrl[0]
  if (baseUrl === '') return

  return baseUrl
}

function allPortalWebsites() {
  return Obj.onAllSites()
    .where('_path', 'equals', '/')
    .and('_contentId', 'equals', SCRIVITO_PORTAL_APP_ROOT_CONTENT_ID)
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

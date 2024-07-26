import {
  Link,
  Obj,
  currentSiteId,
  getInstanceId,
  load,
  navigateTo,
  urlFor,
} from 'scrivito'
import { isMultitenancyEnabled } from './scrivitoTenants'
import { ensureString } from '../utils/ensureString'

const origin =
  typeof window !== 'undefined'
    ? window.location.origin
    : ensureString(import.meta.env.SCRIVITO_ORIGIN)

const rootContentId =
  ensureString(import.meta.env.SCRIVITO_ROOT_CONTENT_ID) || 'c2a0aab78be05a4e'

const NEOLETTER_MAILINGS_SITE_ID = 'mailing-app'

export function baseUrlForSite(siteId: string): string | undefined {
  if (siteId === NEOLETTER_MAILINGS_SITE_ID) {
    return `https://mailing.neoletter.com/${getInstanceId()}`
  }

  const siteRoot = Obj.onSite(siteId).root()
  if (!siteRoot) return

  if (siteRoot.contentId() !== rootContentId) {
    return baseUrlsFor(siteRoot)[0]
  }

  const language = siteRoot.language()
  if (!language) return

  return `${getBaseAppUrl()}/${language}`
}

export function siteForUrl(
  url: string,
): { baseUrl: string; siteId: string } | undefined {
  const neoletterBaseUrl = `https://mailing.neoletter.com/${getInstanceId()}`
  if (url.startsWith(neoletterBaseUrl)) {
    return { baseUrl: neoletterBaseUrl, siteId: NEOLETTER_MAILINGS_SITE_ID }
  }

  const baseAppUrl = getBaseAppUrl()
  const language = languageForUrl(url, baseAppUrl)
  const languageSite = language
    ? appWebsites().and('_language', 'equals', language).first()
    : undefined
  const languageSiteId = languageSite?.siteId()

  if (!languageSiteId) return findSiteForUrl(url)

  return { baseUrl: `${baseAppUrl}/${language}`, siteId: languageSiteId }
}

function languageForUrl(url: string, baseAppUrl?: string) {
  if (!baseAppUrl) return

  const regex = new RegExp(`^${baseAppUrl}\\/(?<lang>[a-z]{2})([?/]|$)`)
  return regex.exec(url)?.groups?.lang
}

function findSiteForUrl(url: string) {
  return Obj.onAllSites()
    .where('_path', 'equals', '/')
    .andNot('_siteId', 'equals', [NEOLETTER_MAILINGS_SITE_ID, null])
    .toArray()
    .flatMap((site) => {
      // null site IDs are excluded by the _siteId query
      const siteId = site.siteId()!
      return baseUrlsFor(site).map((baseUrl) => ({ baseUrl, siteId }))
    })
    .find(({ baseUrl }) => url.startsWith(baseUrl))
}

function baseUrlsFor(site: Obj) {
  const baseUrl = site.get('baseUrl')
  const baseUrlArray = Array.isArray(baseUrl) ? baseUrl : [baseUrl]
  const baseUrls = baseUrlArray.map((value): string | undefined => {
    if (typeof value === 'string') return value
    if (value instanceof Link) return urlFor(value)
  })
  return baseUrls.filter((url): url is string => !!url)
}

export async function ensureSiteIsPresent() {
  if ((await load(currentSiteId)) === null) {
    navigateTo(() => {
      const websites = appWebsites().toArray()
      const preferredLanguageOrder = [...window.navigator.languages, 'en', null]

      for (const language of preferredLanguageOrder) {
        const site = websites.find((site) => siteHasLanguage(site, language))
        if (site) return site
      }

      return websites[0] || null
    })
  }
}

function getBaseAppUrl(): string {
  if (!origin) throw new Error('No origin defined!')

  return isMultitenancyEnabled() ? `${origin}/${getInstanceId()}` : origin
}

function appWebsites() {
  return Obj.onAllSites().where('_contentId', 'equals', rootContentId)
}

function siteHasLanguage(site: Obj, language: string | null) {
  const siteLanguage = site.language()
  return language && siteLanguage
    ? language.startsWith(siteLanguage)
    : language === siteLanguage
}

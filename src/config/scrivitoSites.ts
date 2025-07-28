import {
  Obj,
  currentSiteId,
  ensureUserIsLoggedIn,
  getInstanceId,
  load,
  urlFor,
} from 'scrivito'
import { ensureString } from '../utils/ensureString'
import {
  getJrPlatformInstanceBaseUrl,
  jrPlatformRedirectToSiteUrl,
} from '../privateJrPlatform/multiTenancy'

const origin =
  typeof window !== 'undefined'
    ? window.location.origin
    : ensureString(import.meta.env.SCRIVITO_ORIGIN)

const NEOLETTER_MAILINGS_SITE_ID = 'mailing-app'

export function baseUrlForSite(siteId: string): string | undefined {
  if (siteId === NEOLETTER_MAILINGS_SITE_ID) {
    return `https://mailing.neoletter.com/${getInstanceId()}`
  }

  const siteRoot = Obj.onSite(siteId).root()
  if (!siteRoot) return

  if (siteRoot.contentId() !== defaultSiteContentId()) {
    const configuredBaseUrl = configuredBaseUrlsFor(siteRoot)[0]
    if (configuredBaseUrl) return configuredBaseUrl
  }

  const language = siteRoot.language()
  if (!language) return

  return baseUrlFor(language, siteRoot.contentId())
}

export function siteForUrl(
  url: string,
): { baseUrl: string; siteId: string } | undefined {
  const neoletterBaseUrl = `https://mailing.neoletter.com/${getInstanceId()}`
  if (url.startsWith(neoletterBaseUrl)) {
    return { baseUrl: neoletterBaseUrl, siteId: NEOLETTER_MAILINGS_SITE_ID }
  }

  const { contentId, language, siteId } = findSiteByUrl(url)

  if (language && siteId) {
    return { baseUrl: baseUrlFor(language, contentId), siteId }
  }

  if (defaultSiteLanguageVersions()?.length) return findSiteForUrlExpensive(url)
}

function findSiteByUrl(url: string) {
  const { contentId, language } = extractFromUrl(url)

  if (contentId && language) {
    const siteId = findSiteIdBy({ contentId, language })
    if (siteId) return { contentId, language, siteId }
  }

  return {
    language,
    siteId: defaultSiteLanguageVersions()
      ?.find((site) => site.language() === language)
      ?.siteId(),
  }
}

function extractFromUrl(url: string) {
  return (
    new RegExp(
      `^${instanceBaseUrl()}(\\/(?<contentId>[0-9a-z]{16}))?\\/(?<language>[a-z]{2}(-[A-Z]{2})?)([?/]|$)`,
    ).exec(url)?.groups || {}
  )
}

function findSiteIdBy(query: { contentId: string; language: string }) {
  return Obj.onAllSites()
    .where('_path', 'equals', '/')
    .and('_contentId', 'equals', query.contentId)
    .and('_language', 'equals', query.language)
    .toArray()[0]
    ?.siteId()
}

function findSiteForUrlExpensive(url: string) {
  return Obj.onAllSites()
    .where('_path', 'equals', '/')
    .andNot('_siteId', 'equals', [NEOLETTER_MAILINGS_SITE_ID, null])
    .toArray()
    .flatMap((site) => {
      // null site IDs are excluded by the _siteId query
      const siteId = site.siteId()!
      return configuredBaseUrlsFor(site).map((baseUrl) => ({ baseUrl, siteId }))
    })
    .sort((a, b) => b.baseUrl.length - a.baseUrl.length)
    .find(({ baseUrl }) => url.startsWith(baseUrl))
}

function configuredBaseUrlsFor(site: Obj) {
  const baseUrl = site.get('baseUrl')
  const baseUrls = Array.isArray(baseUrl) ? baseUrl : [baseUrl]
  return baseUrls.filter(
    (url): url is string => typeof url === 'string' && !!url,
  )
}

export function isNoSitePresent(): boolean {
  return !defaultSiteLanguageVersions()?.length
}

export async function ensureSiteIsPresent() {
  if (await load(() => currentSiteId())) return

  if (await load(() => isNoSitePresent())) {
    ensureUserIsLoggedIn()
    return
  }

  const site = await load(() => getPreferredSite())
  if (!site) return

  const siteUrl = await load(() => urlFor(site))
  return redirectToSiteUrl(siteUrl)
}

function redirectToSiteUrl(siteUrl: string) {
  if (import.meta.env.PRIVATE_JR_PLATFORM) {
    return jrPlatformRedirectToSiteUrl(siteUrl)
  }

  const { pathname, search, hash } = window.location
  const path = pathname === '/' ? '' : pathname

  window.location.assign(`${siteUrl}${path}${search}${hash}`)
}

function getPreferredSite() {
  const languageVersions = defaultSiteLanguageVersions() || []
  const preferredLanguageOrder = [...window.navigator.languages, 'en', null]

  for (const language of preferredLanguageOrder) {
    const site = languageVersions.find((site) =>
      siteHasLanguage(site, language),
    )
    if (site) return site
  }

  return languageVersions[0] || null
}

function baseUrlFor(language: string, contentId?: string) {
  const base = instanceBaseUrl()
  return contentId && contentId !== defaultSiteContentId()
    ? `${base}/${contentId}/${language}`
    : `${base}/${language}`
}

function instanceBaseUrl(): string {
  if (!origin) throw new Error('No origin defined!')
  if (import.meta.env.PRIVATE_JR_PLATFORM) {
    return getJrPlatformInstanceBaseUrl(origin)
  }

  return origin
}

function defaultSiteLanguageVersions() {
  return Obj.onAllSites()
    .get(import.meta.env.SCRIVITO_ROOT_OBJ_ID)
    ?.versionsOnAllSites()
}

function defaultSiteContentId() {
  return Obj.onAllSites()
    .get(import.meta.env.SCRIVITO_ROOT_OBJ_ID)
    ?.contentId()
}

function siteHasLanguage(site: Obj, language: string | null) {
  const siteLanguage = site.language()
  return language && siteLanguage
    ? language.startsWith(siteLanguage)
    : language === siteLanguage
}

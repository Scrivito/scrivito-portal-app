import { Obj, getInstanceId } from 'scrivito'
import { ensureString } from '../utils/ensureString'
import { getJrPlatformInstanceBaseUrl } from '../privateJrPlatform/multiTenancy'

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

/**
 * Recognized URLs:
 * - https://mailing.neoletter.com/instance-id
 *   Neoletter mailings
 * - https://current.origin/instance-base-path/1234567890abcdef/xy
 *   XY language version of the root with the content ID 1234567890abcdef (if found)
 * - https://current.origin/instance-base-path/xy
 *   XY language version of the default site root (if found)
 * - https://my-base-url-origin/my-base-url-path
 *   Root object with the according base URL attribute value
 *
 * All other URLs will result in no site present.
 */
export function siteForUrl(
  url: string,
): { baseUrl: string; siteId: string } | undefined {
  const neoletterBaseUrl = `https://mailing.neoletter.com/${getInstanceId()}`
  if (url.startsWith(neoletterBaseUrl)) {
    return { baseUrl: neoletterBaseUrl, siteId: NEOLETTER_MAILINGS_SITE_ID }
  }

  const { contentId, language, siteId } = findSiteByUrl(url)

  if (siteId) return { baseUrl: baseUrlFor(language, contentId), siteId }

  if (getLanguageVersions()?.length) return findSiteForUrlExpensive(url)
}

function findSiteByUrl(url: string) {
  const { contentId, language } = extractFromUrl(url)

  if (!language) return {}

  if (contentId) {
    const siteId = findSiteIdBy({ contentId, language })
    if (!siteId) return {}
    return { contentId, language, siteId }
  }

  const siteId = getLanguageVersions()
    ?.find((site) => site.language() === language)
    ?.siteId()
  if (!siteId) return {}
  return { contentId: defaultSiteContentId(), language, siteId }
}

export function extractFromUrl(url: string): {
  contentId?: string
  defaultLocation?: string
  language?: string
  location?: string
} {
  return (
    new RegExp(
      `^${instanceBaseUrl()}(?<defaultLocation>(/(?<contentId>[0-9a-z]{16}))?(/(?<language>[a-z]{2}(-[A-Z]{2})?))?(?<location>([?/].*)|$))`,
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

export function getLanguageVersions(contentId?: string): Obj[] | undefined {
  const root = contentId
    ? Obj.onAllSites()
        .where('_path', 'equals', '/')
        .and('_contentId', 'equals', contentId)
        .toArray()[0]
    : undefined

  return (
    root || Obj.onAllSites().get(import.meta.env.SCRIVITO_ROOT_OBJ_ID)
  )?.versionsOnAllSites()
}

function defaultSiteContentId() {
  return Obj.onAllSites()
    .get(import.meta.env.SCRIVITO_ROOT_OBJ_ID)
    ?.contentId()
}

import { Obj, getInstanceId } from 'scrivito'
import { instanceBaseUrl } from '../multiSite/instanceBaseUrl'
import { extractFromUrl } from '../multiSite/extractFromUrl'

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

  return findSiteForUrlExpensive(url)
}

function findSiteByUrl(url: string) {
  const { contentId: urlContentId, language } = extractFromUrl(url)
  if (!language) return {}

  if (urlContentId === defaultSiteContentId()) return {}

  const contentId = urlContentId || defaultSiteContentId()
  if (!contentId) return {}

  const siteId = findSiteIdBy({ contentId, language })
  if (!siteId) return {}

  return { contentId, language, siteId }
}

function findSiteIdBy(query: { contentId: string; language: string }) {
  return Obj.onAllSites()
    .where('_contentId', 'equals', query.contentId)
    .andNot('_siteId', 'equals', null)
    .toArray()
    .find((obj) => obj.path() === '/' && obj.language() === query.language)
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

function defaultSiteContentId() {
  return Obj.onAllSites()
    .get(import.meta.env.SCRIVITO_ROOT_OBJ_ID)
    ?.contentId()
}

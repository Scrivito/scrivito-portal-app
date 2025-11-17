import {
  currentSiteId,
  ensureUserIsLoggedIn,
  load,
  Obj,
  urlFor,
} from 'scrivito'
import { extractFromUrl } from './extractFromUrl'
import { defaultSiteVersions } from './defaultSiteVersions'

export async function ensureSiteIsPresent() {
  if (await load(() => currentSiteId())) return

  if (await load(() => !defaultSiteVersions().toArray().length)) {
    ensureUserIsLoggedIn()
    return
  }

  const site = await load(() => getPreferredSite())
  if (!site) return

  const siteUrl = await load(() => urlFor(site))
  return redirectToSiteUrl(siteUrl)
}

function redirectToSiteUrl(siteUrl: string) {
  const { origin, pathname, search, hash } = window.location
  const { contentId, defaultLocation, location } = extractFromUrl(
    origin + pathname,
  )

  const rawPath =
    (extractFromUrl(siteUrl).contentId === contentId
      ? location
      : defaultLocation) || ''
  const path = rawPath.endsWith('/') ? rawPath.slice(0, -1) : rawPath

  window.location.assign(`${siteUrl}${path}${search}${hash}`)
}

function getPreferredSite() {
  const { contentId } = extractFromUrl(
    window.location.origin + window.location.pathname,
  )

  const languageVersions = getLanguageVersions(contentId) || []
  const preferredLanguageOrder = [...window.navigator.languages, 'en', null]

  for (const language of preferredLanguageOrder) {
    const site = languageVersions.find((site) =>
      siteHasLanguage(site, language),
    )
    if (site) return site
  }

  return languageVersions[0]
}

function getLanguageVersions(contentId?: string): Obj[] | undefined {
  const root = contentId
    ? Obj.onAllSites()
        .where('_path', 'equals', '/')
        .and('_contentId', 'equals', contentId)
        .toArray()[0]
    : undefined

  if (root) return root.versionsOnAllSites()

  return defaultSiteVersions().toArray()
}

function siteHasLanguage(site: Obj, language: string | null) {
  const siteLanguage = site.language()
  return language && siteLanguage
    ? language.startsWith(siteLanguage)
    : language === siteLanguage
}

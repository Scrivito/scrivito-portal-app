import {
  currentSiteId,
  ensureUserIsLoggedIn,
  load,
  Obj,
  urlFor,
} from 'scrivito'
import { extractFromUrl } from './extractFromUrl'

export async function ensureSiteIsPresent() {
  if (await load(() => currentSiteId())) return

  if (
    await load(
      () => !Obj.onAllSites().get(import.meta.env.SCRIVITO_ROOT_OBJ_ID),
    )
  ) {
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

  const path =
    (extractFromUrl(siteUrl).contentId === contentId
      ? location
      : defaultLocation) || ''

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

  return (
    root || Obj.onAllSites().get(import.meta.env.SCRIVITO_ROOT_OBJ_ID)
  )?.versionsOnAllSites()
}

function siteHasLanguage(site: Obj, language: string | null) {
  const siteLanguage = site.language()
  return language && siteLanguage
    ? language.startsWith(siteLanguage)
    : language === siteLanguage
}

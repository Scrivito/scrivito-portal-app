import { useEffect } from 'react'
import { sortBy } from 'lodash-es'
import {
  connect,
  ContentTag,
  LinkTag,
  currentLanguage,
  currentSiteId,
  isEditorLoggedIn,
  isUserLoggedIn,
  load,
  Obj,
  NotFoundErrorPage as ScrivitoNotFoundErrorPage,
  urlFor,
} from 'scrivito'
import { ensureString } from '../utils/ensureString'
import { Loading } from './Loading'
import { defaultSiteVersions } from '../multiSite/defaultSiteVersions'
import { portalAppSites } from '../multiSite/portalAppSites'

// Make sure, that you have a proxy running for these URLs, otherwise you'll see an endless loop.
const RELOAD_SUBPATHS = ['/auth']

export const NotFoundErrorPage = connect(
  function NotFoundErrorPage() {
    if (isUserLoggedIn() && !currentSiteId() && !hasDefaultSite()) {
      return <NotFound />
    }

    return (
      <ScrivitoNotFoundErrorPage>
        <NotFound />
      </ScrivitoNotFoundErrorPage>
    )
  },
  { loading: Loading },
)

const NotFound = connect(function NotFound() {
  const root = Obj.root()

  // TODO: Remove workaround for issue #10292
  useEffect(() => {
    if (
      RELOAD_SUBPATHS.some(
        (reloadSubpath) =>
          location.pathname === reloadSubpath ||
          location.pathname.startsWith(`${reloadSubpath}/`),
      )
    ) {
      location.reload()
    }
  }, [])

  useEffect(() => {
    beginEditingIfDefaultSiteIsMissing()

    async function beginEditingIfDefaultSiteIsMissing() {
      if (await load(() => isEditorLoggedIn())) return
      if (await load(() => currentSiteId())) return
      if (await load(() => hasDefaultSite())) return

      location.href = `https://edit.scrivito.com/${location.href}`
    }
  }, [])

  if (isEditorLoggedIn() && !currentSiteId() && !hasDefaultSite()) {
    return <DefaultSiteMissing />
  }

  if (!root) {
    return (
      <main id="main">
        <section className="py-1">
          <div className="container">Page not found.</div>
        </section>
      </main>
    )
  }

  // TODO: Consolidate with HomepageLayoutComponent

  return (
    <>
      <title>{localizePageNotFound()}</title>
      {!!root.get('layoutShowHeader') && (
        <ContentTag tag="header" content={root} attribute="layoutHeader" />
      )}
      <ContentTag
        tag="main"
        id="main"
        content={root}
        attribute="siteNotFound"
      />
      {!!root.get('layoutShowFooter') && (
        <ContentTag tag="footer" content={root} attribute="layoutFooter" />
      )}
    </>
  )
})

const DefaultSiteMissing = connect(function DefaultSiteMissing() {
  const sites = portalAppSites()

  return (
    <main id="main">
      <section className="py-1">
        <div className="container">
          <h6>Default site is missing!</h6>
          {sites.length === 0 && hasSomeContent() ? (
            <div>
              This instance contains content, but none of it is a Portal App
              site.
            </div>
          ) : (
            <div>The default site of the Portal App could not be found.</div>
          )}
          {sites.length > 0 && (
            <>
              <div className="mt-3">Available sites:</div>
              <ul>
                {sortBy(sites, [
                  (site) => site.contentId(),
                  (site) => site.language() || '',
                ]).map((site) => (
                  <li key={site.id()}>
                    <LinkTag to={site}>
                      {ensureString(site.get('title')) || urlFor(site)} (
                      {site.language() || 'no language set'})
                    </LinkTag>
                  </li>
                ))}
              </ul>
            </>
          )}
        </div>
      </section>
    </main>
  )
})

function hasDefaultSite(): boolean {
  return defaultSiteVersions().toArray().length > 0
}

function hasSomeContent(): boolean {
  return Obj.onAllSites().all().count() > 0
}

function localizePageNotFound(): string {
  switch (currentLanguage()) {
    case 'de':
      return 'Seite nicht gefunden'
    case 'fr':
      return 'Page non trouvée'
    case 'pl':
      return 'Nie znaleziono strony'
    default:
      return 'Page not found'
  }
}

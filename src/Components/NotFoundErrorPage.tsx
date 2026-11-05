import { useEffect } from 'react'
import {
  connect,
  ContentTag,
  LinkTag,
  currentLanguage,
  currentSiteId,
  isEditorLoggedIn,
  isUserLoggedIn,
  Obj,
  NotFoundErrorPage as ScrivitoNotFoundErrorPage,
} from 'scrivito'
import { ensureString } from '../utils/ensureString'
import { Loading } from './Loading'
import { defaultSiteVersions } from '../multiSite/defaultSiteVersions'

// Make sure, that you have a proxy running for these URLs, otherwise you'll see an endless loop.
const RELOAD_SUBPATHS = ['/auth']

export const NotFoundErrorPage = connect(
  function NotFoundErrorPage() {
    if (isUserLoggedIn() && !currentSiteId() && isPortalAppContentMissing()) {
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

  if (isPortalAppContentMissing()) return <DefaultSiteMissing />

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
  const sites = Obj.onAllSites()
    .where('_path', 'equals', '/')
    .andNot('_siteId', 'equals', null)
    .toArray()

  return (
    <main id="main">
      <section className="py-1">
        <div className="container">
          <h6>Portal App content is missing!</h6>
          <div>The default site could not be found.</div>
          {isEditorLoggedIn() && sites.length > 0 && (
            <>
              <div className="mt-3">Available sites:</div>
              <ul>
                {sites.map((site) => (
                  <li key={site.id()}>
                    <LinkTag to={site}>
                      {ensureString(site.get('title')) || '-'} ({site.siteId()})
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

function isPortalAppContentMissing(): boolean {
  return !defaultSiteVersions().toArray().length
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

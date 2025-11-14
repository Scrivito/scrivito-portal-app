import { useEffect } from 'react'
import {
  connect,
  ContentTag,
  currentSiteId,
  isEditorLoggedIn,
  isUserLoggedIn,
  load,
  Obj,
  NotFoundErrorPage as ScrivitoNotFoundErrorPage,
} from 'scrivito'
import { Loading } from './Loading'
import { defaultSiteVersions } from '../multiSite/defaultSiteVersions'

// Make sure, that you have a proxy running for these URLs, otherwise you'll see an endless loop.
const RELOAD_SUBPATHS = ['/auth']

export const NotFoundErrorPage = connect(
  function NotFoundErrorPage() {
    if (isUserLoggedIn() && !currentSiteId() && missingPortalAppContent()) {
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
    beginEditingIfContentIsEmpty()

    async function beginEditingIfContentIsEmpty() {
      if (await load(() => isEditorLoggedIn())) return
      if (await load(() => instanceHasContent())) return

      location.href = `https://edit.scrivito.com/${location.href}`
    }
  }, [])

  if (missingPortalAppContent() && instanceHasContent()) {
    return (
      <main id="main">
        <section className="py-1">
          <div className="container">
            <h6>Portal App content is missing!</h6>
            <div>
              Your instance contains content, but the Portal App root object is
              not available.
            </div>
          </div>
        </section>
      </main>
    )
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

function missingPortalAppContent(): boolean {
  return !defaultSiteVersions().toArray().length
}

function instanceHasContent(): boolean {
  return Obj.onAllSites().all().count() > 0
}

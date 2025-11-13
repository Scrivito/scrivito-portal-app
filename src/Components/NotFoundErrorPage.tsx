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
import { defaultSites } from '../multiSite/defaultSites'

// Make sure, that you have a proxy running for these URLs, otherwise you'll see an endless loop.
const RELOAD_SUBPATHS = ['/auth']

export const NotFoundErrorPage = connect(
  function NotFoundErrorPage() {
    if (
      isUserLoggedIn() &&
      !currentSiteId() &&
      !defaultSites().toArray().length
    ) {
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
      if (await load(() => Obj.onAllSites().all().count() > 0)) return

      location.href = `https://edit.scrivito.com/${location.href}`
    }
  }, [])

  if (!root) {
    return (
      <main id="main">
        <section className="py-1">
          <div className="container">
            <div>Page not found.</div>
          </div>
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

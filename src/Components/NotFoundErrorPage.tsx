import { useEffect } from 'react'
import {
  connect,
  ContentTag,
  isEditorLoggedIn,
  isUserLoggedIn,
  Obj,
  NotFoundErrorPage as ScrivitoNotFoundErrorPage,
} from 'scrivito'
import { Loading } from './Loading'
import { isNoSitePresent } from '../config/scrivitoSites'

// Make sure, that you have a proxy running for these URLs, otherwise you'll see an endless loop.
const RELOAD_SUBPATHS = ['/auth']

export const NotFoundErrorPage = connect(
  function NotFoundErrorPage() {
    if (isUserLoggedIn() && isNoSitePresent()) return <NotFound />

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

  // Workaround for issue #10292
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

  if (!root) {
    return (
      <main id="main">
        <section className="py-1">
          <div className="container">
            <div>Page not found.</div>
            <GetStartedButton />
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

const GetStartedButton = connect(
  function GetStartedButton() {
    if (isEditorLoggedIn()) return null
    if (Obj.onAllSites().all().count() > 0) return null

    return (
      <a
        className="btn btn-primary"
        href={`https://edit.scrivito.com/${location.href}`}
      >
        Get started building your website
      </a>
    )
  },
  { loading: Loading },
)

import { useEffect } from 'react'
import { connect, ContentTag, Obj } from 'scrivito'

// Make sure, that you have a proxy running for these URLs, otherwise you'll see an endless loop.
const RELOAD_SUBPATHS = ['/jr-api', '/example-proxy']

export const NotFoundErrorPage = connect(function NotFoundErrorPage() {
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
    return <div>Page not found.</div>
  }

  // TODO: Consolidate with HomepageLayoutComponent

  return (
    <>
      <a href="#main" className="btn skip-to-content">
        Skip to Content
      </a>
      <ContentTag tag="header" content={root} attribute="siteHeader" />
      <main id="main">
        <ContentTag tag="div" content={root} attribute="siteNotFound" />
      </main>
      <ContentTag
        tag="footer"
        content={root}
        attribute="siteFooter"
        className="bg-light-grey py-5"
      />
    </>
  )
})

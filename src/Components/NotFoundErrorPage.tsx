import { connect, ContentTag, Obj } from 'scrivito'

export const NotFoundErrorPage = connect(function NotFoundErrorPage() {
  const root = Obj.root()

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

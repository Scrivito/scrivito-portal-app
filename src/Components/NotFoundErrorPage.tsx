import * as Scrivito from 'scrivito'

export const NotFoundErrorPage = Scrivito.connect(function NotFoundErrorPage() {
  const root = Scrivito.Obj.root()

  if (!root) {
    return <div>Page not found.</div>
  }

  // TODO: Consolidate with HomepageLayoutComponent

  return (
    <>
      <a href="#main" className="btn skip-to-content">
        Skip to Content
      </a>
      <Scrivito.ContentTag tag="header" content={root} attribute="siteHeader" />
      <main id="main">
        <Scrivito.ContentTag
          tag="div"
          content={root}
          attribute="siteNotFound"
        />
      </main>
      <Scrivito.ContentTag
        tag="footer"
        content={root}
        attribute="siteFooter"
        className="bg-light-grey py-5"
      />
    </>
  )
})

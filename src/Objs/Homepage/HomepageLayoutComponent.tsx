import * as Scrivito from 'scrivito'
import { Homepage } from './HomepageObjClass'

Scrivito.provideLayoutComponent(Homepage, ({ page }) => {
  const currentPage = Scrivito.currentPage()
  const showTopContentSection =
    currentPage?.get('showTopContentSection') === true

  return (
    <>
      <a href="#main" className="btn skip-to-content">
        Skip to Content
      </a>
      <Scrivito.ContentTag tag="header" content={page} attribute="siteHeader" />
      <main id="main">
        {showTopContentSection && (
          <Scrivito.ContentTag
            content={currentPage}
            attribute="topContentSection"
          />
        )}
        <Scrivito.CurrentPage />
      </main>
      <Scrivito.ContentTag
        tag="footer"
        content={page}
        attribute="siteFooter"
        className="bg-light-grey py-5"
      />
    </>
  )
})

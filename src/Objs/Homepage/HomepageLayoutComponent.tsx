import { ContentTag, CurrentPage, provideLayoutComponent } from 'scrivito'
import { Homepage } from './HomepageObjClass'

provideLayoutComponent(Homepage, ({ page }) => {
  return (
    <>
      <a href="#main" className="btn skip-to-content">
        Skip to Content
      </a>
      <ContentTag tag="header" content={page} attribute="siteHeader" />
      <main id="main">
        <CurrentPage />
      </main>
      <ContentTag
        tag="footer"
        content={page}
        attribute="siteFooter"
        className="bg-light-grey py-5"
      />
    </>
  )
})

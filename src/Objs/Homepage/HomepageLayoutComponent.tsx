import {
  provideLayoutComponent,
  ContentTag,
  CurrentPage,
  currentPage,
} from 'scrivito'
import { Homepage } from './HomepageObjClass'

provideLayoutComponent(Homepage, ({ page }) => {
  const currentPageObj = currentPage()
  const showTopContentSection =
    currentPageObj?.get('showTopContentSection') === true

  return (
    <>
      <a href="#main" className="btn skip-to-content">
        Skip to Content
      </a>
      <ContentTag tag="header" content={page} attribute="siteHeader" />
      <main id="main">
        {showTopContentSection && (
          <ContentTag content={currentPageObj} attribute="topContentSection" />
        )}
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

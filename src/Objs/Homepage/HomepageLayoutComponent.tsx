import { ContentTag, CurrentPage, provideLayoutComponent } from 'scrivito'
import { Homepage } from './HomepageObjClass'

provideLayoutComponent(Homepage, ({ page }) => {
  return (
    <>
      <ContentTag tag="header" content={page} attribute="siteHeader" />
      <CurrentPage />
      <ContentTag
        tag="footer"
        content={page}
        attribute="siteFooter"
        className="bg-light-grey py-5"
      />
    </>
  )
})

import { ContentTag, CurrentPage, provideLayoutComponent } from 'scrivito'
import { Homepage } from './HomepageObjClass'

provideLayoutComponent(Homepage, ({ page }) => {
  return (
    <>
      <ContentTag tag="header" content={page} attribute="siteHeader" />
      <CurrentPage />
      {!!page.get('layoutShowFooter') && (
        <ContentTag tag="footer" content={page} attribute="layoutFooter" />
      )}
    </>
  )
})

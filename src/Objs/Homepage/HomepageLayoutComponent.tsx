import * as Scrivito from 'scrivito'
import { Homepage } from './HomepageObjClass'

Scrivito.provideLayoutComponent(Homepage, ({ page }) => {
  return (
    <>
      <Scrivito.ContentTag tag="header" content={page} attribute="siteHeader" />
      <main>
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

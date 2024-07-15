import { ContentTag, CurrentPage, provideLayoutComponent } from 'scrivito'

type ObjClass = Parameters<typeof provideLayoutComponent>[0]

export function provideDefaultPageLayoutComponent(objClass: ObjClass) {
  provideLayoutComponent(objClass, ({ page }) => {
    return (
      <>
        {!!page.get('layoutShowHeader') && (
          <ContentTag tag="header" content={page} attribute="layoutHeader" />
        )}
        <CurrentPage />
        {!!page.get('layoutShowFooter') && (
          <ContentTag tag="footer" content={page} attribute="layoutFooter" />
        )}
      </>
    )
  })
}

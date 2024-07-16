import {
  connect,
  ContentTag,
  CurrentPage,
  Obj,
  provideLayoutComponent,
} from 'scrivito'

type ObjClass = Parameters<typeof provideLayoutComponent>[0]

export function provideDefaultPageLayoutComponent(objClass: ObjClass) {
  provideLayoutComponent(objClass, ({ page }) => {
    const showLeftSidebar = !!page.get('layoutShowLeftSidebar')
    const showRightSidebar = !!page.get('layoutShowRightSidebar')
    const showSidebar = showLeftSidebar || showRightSidebar

    return (
      <>
        {!!page.get('layoutShowHeader') && (
          <ContentTag tag="header" content={page} attribute="layoutHeader" />
        )}

        {showSidebar ? (
          <SidebarLayout
            page={page}
            showLeftSidebar={showLeftSidebar}
            showRightSidebar={showRightSidebar}
          />
        ) : (
          <CurrentPage />
        )}

        {!!page.get('layoutShowFooter') && (
          <ContentTag tag="footer" content={page} attribute="layoutFooter" />
        )}
      </>
    )
  })
}

const SidebarLayout = connect(function SidebarLayout({
  page,
  showLeftSidebar,
  showRightSidebar,
}: {
  page: Obj
  showLeftSidebar: boolean
  showRightSidebar: boolean
}) {
  return (
    <div className="container py-2">
      <div className="row">
        {showLeftSidebar && (
          <ContentTag
            content={page}
            attribute="layoutLeftSidebar"
            className="col-lg-2 order-first"
          />
        )}

        <div
          className={
            showLeftSidebar && showRightSidebar ? 'col-lg-8' : 'col-lg-10'
          }
        >
          <CurrentPage />
        </div>

        {showRightSidebar && (
          <ContentTag
            content={page}
            attribute="layoutRightSidebar"
            className="col-lg-2 order-first order-lg-last"
          />
        )}
      </div>
    </div>
  )
})

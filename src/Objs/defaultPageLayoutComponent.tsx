import {
  connect,
  ContentTag,
  CurrentPage,
  Obj,
  ObjClass,
  provideLayoutComponent,
} from 'scrivito'

export function provideDefaultPageLayoutComponent(objClass: ObjClass) {
  provideLayoutComponent(objClass, DefaultPageLayoutComponent)
}

export const DefaultPageLayoutComponent = connect(
  function DefaultPageLayoutComponent({ page }: { page: Obj }) {
    const showLeftSidebar = !!page.get('layoutShowLeftSidebar')
    const showRightSidebar = !!page.get('layoutShowRightSidebar')
    const showSidebar = showLeftSidebar || showRightSidebar

    return (
      <>
        {!!page.get('layoutShowHeader') && (
          <ContentTag tag="header" content={page} attribute="layoutHeader" />
        )}

        <BackgroundWrapper
          backgroundColor={page.get('layoutMainBackgroundColor')}
        >
          {showSidebar ? (
            <SidebarLayout
              page={page}
              showLeftSidebar={showLeftSidebar}
              showRightSidebar={showRightSidebar}
            />
          ) : (
            <CurrentPage />
          )}
        </BackgroundWrapper>

        {!!page.get('layoutShowFooter') && (
          <ContentTag tag="footer" content={page} attribute="layoutFooter" />
        )}
      </>
    )
  },
)

const BackgroundWrapper = connect(function BackgroundWrapper({
  backgroundColor,
  children,
}: {
  children: React.ReactNode
  backgroundColor?: unknown
}) {
  if (typeof backgroundColor !== 'string') return children
  if (backgroundColor === 'transparent') return children

  return <section className={`bg-${backgroundColor}`}>{children}</section>
})

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
          <div className="col-lg-2 order-first">
            <ContentTag
              tag="aside"
              content={page}
              attribute="layoutLeftSidebar"
            />
          </div>
        )}

        <div
          className={
            showLeftSidebar && showRightSidebar ? 'col-lg-8' : 'col-lg-10'
          }
        >
          <CurrentPage />
        </div>

        {showRightSidebar && (
          <div className="col-lg-2 order-first order-lg-last">
            <ContentTag
              tag="aside"
              content={page}
              attribute="layoutRightSidebar"
            />
          </div>
        )}
      </div>
    </div>
  )
})

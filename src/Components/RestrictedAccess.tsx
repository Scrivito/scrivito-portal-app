import {
  ContentTag,
  Obj,
  connect,
  currentPage,
  isEditorLoggedIn,
} from 'scrivito'
import { isHomepage } from '../Objs/Homepage/HomepageObjClass'

export const RestrictedAccess = connect(function RestrictedAccess({
  children,
}: {
  children: React.ReactNode
}) {
  const root = Obj.root()
  if (!isHomepage(root)) return children

  const restrictedAccess = root.get('siteRestrictedAccess').map((o) => o.id())
  if (restrictedAccess.length === 0) return children

  const currentPageId = currentPage()?.id()
  if (!currentPageId) return children
  if (restrictedAccess.includes(currentPageId)) return children

  if (isEditorLoggedIn()) {
    return (
      <>
        <div className="alert alert-warning d-flex m-auto">
          <i className="bi bi-exclamation-circle bi-2x" aria-hidden="true"></i>
          <div className="my-auto mx-2">
            <b>Editor note:</b> This page is not visible for visitors.
          </div>
        </div>

        {children}
      </>
    )
  }

  return (
    <ContentTag tag="main" id="main" content={root} attribute="siteNotFound" />
  )
})

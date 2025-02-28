import {
  connect,
  ContentTag,
  currentPage,
  isEditorLoggedIn,
  Obj,
} from 'scrivito'
import { Loading } from './Loading'
import { isHomepage } from '../Objs/Homepage/HomepageObjClass'

export const SinglePageSite = connect(
  function SinglePageSite({ children }: { children: React.ReactNode }) {
    const root = Obj.root()
    if (!isHomepage(root)) return children

    const singeSitePage = root.get('siteSinglePage')
    if (!singeSitePage) return children

    const currentPageId = currentPage()?.id()
    if (!currentPageId) return children
    if (singeSitePage.id() === currentPageId) return children

    if (isEditorLoggedIn()) {
      return (
        <>
          <div className="alert alert-warning d-flex m-auto">
            <i
              className="bi bi-exclamation-circle bi-2x"
              aria-hidden="true"
            ></i>
            <div className="my-auto mx-2">
              <b>Editor note:</b> This page is not visible for visitors and
              logged-in users, due to the &quot;Single page site&quot; setting.
            </div>
          </div>

          {children}
        </>
      )
    }

    return (
      <ContentTag
        tag="main"
        id="main"
        content={root}
        attribute="siteNotFound"
      />
    )
  },
  { loading: Loading },
)

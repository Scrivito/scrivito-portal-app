import {
  connect,
  ContentTag,
  currentPage,
  isEditorLoggedIn,
  LinkTag,
  Obj,
} from 'scrivito'
import { Loading } from './Loading'
import { isHomepage } from '../Objs/Homepage/HomepageObjClass'
import { ensureString } from '../utils/ensureString'

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
              <b>Editor note:</b> This page is hidden from both visitors and
              logged-in users because the “Single page site” setting is
              currently set to “
              <LinkTag to={singeSitePage}>
                {ensureString(singeSitePage.get('title'))}
              </LinkTag>
              ”.
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

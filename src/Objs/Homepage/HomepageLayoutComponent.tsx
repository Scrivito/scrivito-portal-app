import {
  connect,
  ContentTag,
  currentPage,
  CurrentPage,
  isEditorLoggedIn,
  LinkTag,
  load,
  provideLayoutComponent,
  urlFor,
} from 'scrivito'
import { Homepage, HomepageInstance } from './HomepageObjClass'
import { useEffect } from 'react'

provideLayoutComponent(Homepage, ({ page }) => {
  const portalOnlyMode = page.get('sitePortalOnlyMode')

  return (
    <>
      <a href="#main" className="btn skip-to-content">
        Skip to Content
      </a>
      <ContentTag
        tag="header"
        content={page}
        attribute="siteHeader"
        className={portalOnlyMode ? 'portal-only' : null}
      />
      {portalOnlyMode ? <EditorNoteOrRedirectAwayIfNeeded root={page} /> : null}
      <main id="main">
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

const EditorNoteOrRedirectAwayIfNeeded = connect(
  function EditorNoteOrRedirectAwayIfNeeded({
    root,
  }: {
    root: HomepageInstance
  }) {
    const portalOverviewPage = root.get('sitePortalOverviewPage')
    const portalOverviewPagePath = portalOverviewPage?.path()
    const currentPageObjPath = currentPage()?.path()

    const redirectNeeded =
      !!portalOverviewPage &&
      !!portalOverviewPagePath &&
      !!currentPageObjPath &&
      !currentPageObjPath.startsWith(portalOverviewPagePath)

    useEffect(() => {
      redirectIfNeeded()

      async function redirectIfNeeded() {
        if (!redirectNeeded) return
        if (isEditorLoggedIn()) return

        const url = await load(() => urlFor(portalOverviewPage))
        window.location.replace(url)
      }
    }, [redirectNeeded, portalOverviewPage])

    if (!redirectNeeded) return

    return (
      <div className="alert alert-warning d-flex m-auto my-lg-3">
        <i className="bi bi-exclamation-circle bi-2x" aria-hidden="true"></i>
        <div className="my-auto mx-2">
          <b>Editor note:</b> This page is not part of the portal section.
          Regular visitors will be automatically redirected to the{' '}
          <LinkTag to={portalOverviewPage}>portal section.</LinkTag>
        </div>
      </div>
    )
  },
)

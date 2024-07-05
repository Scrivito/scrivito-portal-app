import * as React from 'react'
import {
  ensureUserIsLoggedIn,
  isEditorLoggedIn,
  isUserLoggedIn,
  load,
  provideComponent,
  urlFor,
} from 'scrivito'
import { Redirect } from './RedirectObjClass'

provideComponent(Redirect, ({ page }) => {
  const requireLogin = page.get('requireLogin')
  const link = page.get('link')

  React.useEffect(() => {
    if (requireLogin && !isUserLoggedIn()) {
      ensureUserIsLoggedIn()
      return
    }

    if (!link) return

    load(() => urlFor(link)).then((url) => {
      if (!url) return

      if (link.isExternal() && window.top) {
        window.top.location.replace(url)
      } else {
        window.location.replace(url)
      }
    })
  }, [requireLogin, link])

  if (!link && isEditorLoggedIn()) {
    return (
      <main id="main">
        <div className="container d-flex h-100">
          <div className="alert alert-warning d-flex m-auto">
            <i
              className="bi bi-exclamation-circle bi-2x"
              aria-hidden="true"
            ></i>
            <div className="my-auto mx-2">
              This obj never renders any content but triggers a redirect to the
              specified target. <br />
              Select a redirect target in the page properties.
            </div>
          </div>
        </div>
      </main>
    )
  }

  return null
})

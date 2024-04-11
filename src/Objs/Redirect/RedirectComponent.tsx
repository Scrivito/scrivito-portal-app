import * as React from 'react'
import {
  ensureUserIsLoggedIn,
  isUserLoggedIn,
  load,
  provideComponent,
  urlFor,
} from 'scrivito'
import { InPlaceEditingPlaceholder } from '../../Components/InPlaceEditingPlaceholder'
import { Redirect } from './RedirectObjClass'

provideComponent(Redirect, ({ page }) => {
  const requireLogin = page.get('requireLogin')
  const link = page.get('link')

  React.useEffect(() => {
    if (requireLogin && !isUserLoggedIn()) {
      ensureUserIsLoggedIn()
      return
    }

    load(() => link && urlFor(link)).then((url) => {
      if (!link || !url) return

      if (link.isExternal() && window.top) {
        window.top.location.replace(url)
      } else {
        window.location.replace(url)
      }
    })
  }, [requireLogin, link])

  if (!link) {
    return (
      <InPlaceEditingPlaceholder center>
        Select a link in the redirect page properties.
      </InPlaceEditingPlaceholder>
    )
  }

  return null
})

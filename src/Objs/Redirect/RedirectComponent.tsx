import * as React from 'react'
import {
  ensureUserIsLoggedIn,
  isUserLoggedIn,
  provideComponent,
  urlFor,
} from 'scrivito'
import { InPlaceEditingPlaceholder } from '../../Components/InPlaceEditingPlaceholder'
import { Redirect } from './RedirectObjClass'

provideComponent(Redirect, ({ page }) => {
  const requireLogin = page.get('requireLogin')
  const link = page.get('link')
  const url = link && urlFor(link)

  React.useEffect(() => {
    if (requireLogin && !isUserLoggedIn()) {
      ensureUserIsLoggedIn()
      return
    }

    if (!link || !url) return

    if (link.isExternal() && window.top) {
      window.top.location.replace(url)
    } else {
      window.location.replace(url)
    }
  }, [requireLogin, link, url])

  if (!link) {
    return (
      <InPlaceEditingPlaceholder center>
        Select a link in the redirect page properties.
      </InPlaceEditingPlaceholder>
    )
  }

  return null
})

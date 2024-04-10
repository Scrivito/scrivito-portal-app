import * as React from 'react'
import { ensureUserIsLoggedIn, provideComponent, urlFor } from 'scrivito'
import { InPlaceEditingPlaceholder } from '../../Components/InPlaceEditingPlaceholder'
import { Redirect } from './RedirectObjClass'

provideComponent(Redirect, ({ page }) => {
  const link = page.get('link')
  const url = link && urlFor(link)

  React.useEffect(() => {
    if (!link || !url) return

    if (link.isExternal() && window.top) {
      window.top.location.replace(url)
    } else {
      window.location.replace(url)
    }
  }, [link, url])

  if (page.get('requireLogin')) ensureUserIsLoggedIn()

  if (!link) {
    return (
      <InPlaceEditingPlaceholder center>
        Select a link in the redirect page properties.
      </InPlaceEditingPlaceholder>
    )
  }

  return null
})

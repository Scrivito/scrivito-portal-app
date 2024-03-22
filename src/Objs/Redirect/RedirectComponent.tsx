import * as React from 'react'
import { load, provideComponent, urlFor } from 'scrivito'
import { InPlaceEditingPlaceholder } from '../../Components/InPlaceEditingPlaceholder'
import { Redirect } from './RedirectObjClass'

provideComponent(Redirect, ({ page }) => {
  React.useEffect(() => {
    load(() => {
      const link = page.get('link')
      const url = link && urlFor(link)

      return { link, url }
    }).then(({ link, url }) => {
      if (!link || !url) return

      if (link.isExternal()) {
        window.top?.location.replace(url)
      } else {
        window.location.replace(url)
      }
    })
  }, [page])

  const link = page.get('link')

  if (!link) {
    return (
      <InPlaceEditingPlaceholder center>
        Select a link in the redirect page properties.
      </InPlaceEditingPlaceholder>
    )
  }

  return null
})

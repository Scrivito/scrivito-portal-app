import * as Scrivito from 'scrivito'
import { Helmet } from 'react-helmet-async'

export const CurrentPageMetadata = Scrivito.connect(() => {
  let lang = 'en'
  let title = ''
  let links = []

  const page = Scrivito.currentPage()

  if (page) {
    lang = page.language() || 'en'

    const pageTitle = page.get('title')
    title = typeof pageTitle === 'string' ? pageTitle : ''

    links.push({ rel: 'canonical', href: Scrivito.urlFor(page) })
  }

  return <Helmet htmlAttributes={{ lang }} title={title} link={links} />
})

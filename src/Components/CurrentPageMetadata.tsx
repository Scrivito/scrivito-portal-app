import * as Scrivito from 'scrivito'
import { Helmet } from 'react-helmet-async'

export const CurrentPageMetadata = Scrivito.connect(() => {
  let lang = 'en'
  let title = ''
  let links = []

  const page = Scrivito.currentPage()

  if (page) {
    lang = page.language() || 'en'

    const receivedTitle = page.get('title')
    title = typeof receivedTitle === 'string' ? receivedTitle : ''

    links.push({ rel: 'canonical', href: Scrivito.urlFor(page) })
  }

  const htmlAttributes = { lang }

  return <Helmet htmlAttributes={htmlAttributes} title={title} link={links} />
})

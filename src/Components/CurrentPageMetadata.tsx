import * as Scrivito from 'scrivito'
import { Helmet, HelmetProps } from 'react-helmet-async'

export const CurrentPageMetadata = Scrivito.connect(() => {
  let lang = 'en'
  let title = ''
  let links: HelmetProps['link'] = []

  const root = Scrivito.Obj.root()
  const favicon = root?.get('siteFavicon')
  if (
    favicon instanceof Scrivito.Obj &&
    favicon.contentType().startsWith('image/')
  ) {
    links.push({
      rel: 'shortcut icon',
      type: 'image/png',
      href: Scrivito.urlFor(favicon),
    })
  }

  const page = Scrivito.currentPage()

  if (page) {
    lang = page.language() || 'en'

    const pageTitle = page.get('title')
    title = typeof pageTitle === 'string' ? pageTitle : ''

    links.push({ rel: 'canonical', href: Scrivito.urlFor(page) })
  }

  return <Helmet htmlAttributes={{ lang }} title={title} link={links} />
})

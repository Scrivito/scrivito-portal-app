import { connect, currentPage, Obj, urlFor } from 'scrivito'
import { Helmet, HelmetProps } from 'react-helmet-async'

export const CurrentPageMetadata = connect(() => {
  let lang = 'en'
  let title = ''
  const links: HelmetProps['link'] = []

  const root = Obj.root()
  const favicon = root?.get('siteFavicon')
  if (favicon instanceof Obj && favicon.contentType().startsWith('image/')) {
    links.push({
      rel: 'shortcut icon',
      type: favicon.contentType(),
      href: urlFor(favicon),
    })
  }

  const page = currentPage()

  if (page) {
    lang = page.language() || 'en'

    const pageTitle = page.get('title')
    title = typeof pageTitle === 'string' ? pageTitle : ''

    links.push({ rel: 'canonical', href: urlFor(page) })
  }

  return <Helmet htmlAttributes={{ lang }} title={title} link={links} />
})

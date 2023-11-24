import { connect, currentPage, Obj, urlFor } from 'scrivito'
import { Helmet, HelmetProps } from 'react-helmet-async'
import { ensureString } from '../utils/ensureString'

export const CurrentPageMetadata = connect(() => {
  const links: HelmetProps['link'] = []
  const meta: HelmetProps['meta'] = []
  let lang = 'en'
  let title = ''

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
    title = ensureString(page.get('title'))
    links.push({ rel: 'canonical', href: urlFor(page) })

    const description = ensureString(page.get('metaDataDescription'))
    if (description) meta.push({ name: 'description', content: description })
  }

  return (
    <Helmet htmlAttributes={{ lang }} link={links} meta={meta} title={title} />
  )
})

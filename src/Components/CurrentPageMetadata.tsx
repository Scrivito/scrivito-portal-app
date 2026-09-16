import { connect, currentPage, urlFor } from 'scrivito'
import { Helmet, HelmetProps } from '@dr.pogodin/react-helmet'
import { ensureString } from '../utils/ensureString'
import { getMetadata } from '../utils/getMetadata'

export const CurrentPageMetadata = connect(() => {
  const links: HelmetProps['link'] = []
  let meta: HelmetProps['meta'] = []
  let lang = 'en'

  const page = currentPage()

  if (page) {
    lang = page.language() || 'en'
    links.push({ rel: 'canonical', href: urlFor(page) })
    meta = getMetadata(page)
  }

  return (
    <>
      <title>{ensureString(page?.get('title'))}</title>
      <Helmet htmlAttributes={{ lang }} link={links} meta={meta} />
    </>
  )
})

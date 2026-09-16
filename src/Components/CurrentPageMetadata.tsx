import { connect, currentPage, urlFor } from 'scrivito'
import { Helmet, HelmetProps } from '@dr.pogodin/react-helmet'
import { ensureString } from '../utils/ensureString'
import { getMetadata } from '../utils/getMetadata'

export const CurrentPageMetadata = connect(() => {
  let meta: HelmetProps['meta'] = []
  let lang = 'en'

  const page = currentPage()

  if (page) {
    lang = page.language() || 'en'
    meta = getMetadata(page)
  }

  return (
    <>
      <title>{ensureString(page?.get('title'))}</title>
      {page && <link rel="canonical" href={urlFor(page)} />}
      <Helmet htmlAttributes={{ lang }} meta={meta} />
    </>
  )
})

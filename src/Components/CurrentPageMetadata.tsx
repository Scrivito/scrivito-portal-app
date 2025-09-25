import { connect, currentPage, urlFor } from 'scrivito'
import { Helmet } from '@dr.pogodin/react-helmet'
import { ensureString } from '../utils/ensureString'
import { getMetadata } from '../utils/getMetadata'

export const CurrentPageMetadata = connect(() => {
  const page = currentPage()

  return (
    <>
      <title>{ensureString(page?.get('title'))}</title>
      {page ? <link rel="canonical" href={urlFor(page)} /> : null}
      <Helmet
        htmlAttributes={{
          lang: page?.language() || 'en',
        }}
        meta={getMetadata(page)}
      />
    </>
  )
})

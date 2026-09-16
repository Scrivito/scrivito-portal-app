import { connect, currentPage, urlFor } from 'scrivito'
import { Helmet } from '@dr.pogodin/react-helmet'
import { ensureString } from '../utils/ensureString'
import { getMetadata } from '../utils/getMetadata'

export const CurrentPageMetadata = connect(() => {
  const page = currentPage()
  const lang = page?.language() || 'en'

  return (
    <>
      <title>{ensureString(page?.get('title'))}</title>
      {page && <link rel="canonical" href={urlFor(page)} />}
      {page &&
        getMetadata(page).map(({ name, property, content }) => (
          <meta
            key={name ?? property}
            name={name}
            property={property}
            content={content}
          />
        ))}
      <Helmet htmlAttributes={{ lang }} />
    </>
  )
})

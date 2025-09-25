import { connect, currentPage, urlFor } from 'scrivito'
import { useEffect } from 'react'
import { ensureString } from '../utils/ensureString'
import { getMetadata } from '../utils/getMetadata'

export const CurrentPageMetadata = connect(() => {
  const page = currentPage()
  const lang = page?.language() || 'en'

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  return (
    <>
      <title>{ensureString(page?.get('title'))}</title>
      {page ? <link rel="canonical" href={urlFor(page)} /> : null}
      {getMetadata(page).map(({ name, property, content }) => (
        <meta
          key={name || property}
          name={name}
          property={property}
          content={content}
        />
      ))}
    </>
  )
})

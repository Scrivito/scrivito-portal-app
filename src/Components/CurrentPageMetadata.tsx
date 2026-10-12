import { useEffect } from 'react'
import { connect, currentPage, urlFor } from 'scrivito'
import { ensureString } from '../utils/ensureString'
import { getMetadata } from '../utils/getMetadata'
import { hreflangAlternates } from '../utils/hreflangAlternates'

export const CurrentPageMetadata = connect(() => {
  const page = currentPage()
  const lang = page?.language() || 'en'

  useEffect(() => {
    document.documentElement.lang = lang
  }, [lang])

  if (!page) return null

  return (
    <>
      <title>{ensureString(page.get('title'))}</title>
      <link rel="canonical" href={urlFor(page)} />
      {hreflangAlternates(page).map(({ hreflang, href }) => (
        <link key={href} rel="alternate" hrefLang={hreflang} href={href} />
      ))}
      {getMetadata(page).map(({ name, property, content }) => (
        <meta
          key={name ?? property}
          name={name}
          property={property}
          content={content}
        />
      ))}
    </>
  )
})

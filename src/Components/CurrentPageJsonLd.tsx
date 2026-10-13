import { connect, currentPage, Obj } from 'scrivito'
import { buildJsonLd } from '../utils/buildJsonLd'

export const CurrentPageJsonLd = connect(() => {
  const page = currentPage()
  if (!page) return null

  const jsonLd = stringifyJsonLd(page)
  if (!jsonLd) return null

  return (
    <script
      type="application/ld+json"
      // eslint-disable-next-line @eslint-react/dom-no-dangerously-set-innerhtml
      dangerouslySetInnerHTML={{
        __html: jsonLd.replace(/<\/script/gi, '<\\/script'),
      }}
    />
  )
})

function stringifyJsonLd(page: Obj): string {
  try {
    return JSON.stringify(buildJsonLd(page), null, 2)
  } catch {
    return ''
  }
}

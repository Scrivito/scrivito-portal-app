import { Obj, urlFor } from 'scrivito'
import { ensureObject } from './ensureObject'
import { ensureString } from './ensureString'
import { hreflangAlternates } from './hreflangAlternates'
import { isCreativeWork } from './isCreativeWork'

/** @throws {SyntaxError} if the JSON-LD is not valid JSON */
export function buildJsonLd(page: Obj): Record<string, unknown> {
  const data: unknown = JSON.parse(ensureString(page.get('structuredData')))
  const record: Record<string, unknown> = {
    ...ensureObject(data),
    url: urlFor(page),
    image: imageUrls(page),
  }
  if (!isCreativeWork(record['@type'])) return record

  const translations = hreflangAlternates(page).filter(
    ({ href }) => href !== record.url,
  )

  return {
    ...record,
    dateModified: page.lastChanged()?.toISOString(),
    datePublished: page.firstPublishedAt()?.toISOString(),
    inLanguage: page.language() || 'en',
    workTranslation: translations.length
      ? translations.map(({ hreflang, href }) => ({
          '@type': record['@type'],
          inLanguage: hreflang,
          url: href,
        }))
      : undefined,
  }
}

function imageUrls(page: Obj): string | string[] | undefined {
  const images = page.get('structuredDataImages')
  if (!Array.isArray(images)) return

  const urls = images.flatMap((image) =>
    image instanceof Obj && image.get('blob') ? [image.contentUrl()] : [],
  )

  if (urls.length === 0) return
  if (urls.length === 1) return urls[0]

  return urls
}

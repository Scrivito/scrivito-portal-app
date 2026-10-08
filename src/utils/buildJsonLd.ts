import { Obj, urlFor } from 'scrivito'
import { ensureObject } from './ensureObject'
import { ensureString } from './ensureString'
import { hreflangAlternates } from './hreflangAlternates'
import { isCreativeWork } from './isCreativeWork'

/** @throws {SyntaxError} if the JSON-LD is not valid JSON */
export function buildJsonLd(page: Obj): Record<string, unknown> {
  const data: unknown = JSON.parse(ensureString(page.get('jsonLd')))
  const record: Record<string, unknown> = {
    ...ensureObject(data),
    url: urlFor(page),
  }
  if (!isCreativeWork(record['@type'])) return record

  const translations = hreflangAlternates(page).filter(
    ({ href }) => href !== record.url,
  )

  return {
    ...record,
    dateCreated: page.createdAt()?.toISOString(),
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

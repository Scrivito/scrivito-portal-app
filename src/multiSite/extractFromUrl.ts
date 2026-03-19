import { instanceBaseUrl } from './instanceBaseUrl'

export function extractFromUrl(url: string): {
  contentId?: string
  defaultLocation?: string
  language?: string
  location?: string
} {
  const contentId = '[0-9a-z]{16}'

  // Subset of BCP 47 (case-sensitive): language + optional script + optional region.
  // Variants, extensions, and private use are not supported.
  // See https://www.codegenes.net/blog/regular-expression-for-a-language-tag-as-defined-by-bcp47/
  const language =
    '[a-z]{2,3}' + // ISO 639 language code
    '(-[A-Z][a-z]{3})?' + // optional script code (e.g. 'Latn')
    '(-([A-Z]{2}|[0-9]{3}))?' // optional region code (e.g. 'US' or '419')

  const location = '([?/].*)|$'

  const defaultLocation =
    `(/(?<contentId>${contentId}))?` +
    `(/(?<language>${language}))?` +
    `(?<location>${location})`

  return (
    new RegExp(
      `^${instanceBaseUrl()}(?<defaultLocation>${defaultLocation})`,
    ).exec(url)?.groups || {}
  )
}

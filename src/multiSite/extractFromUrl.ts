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
  // See https://developer.mozilla.org/en-US/docs/Glossary/BCP_47_language_tag
  const language =
    '[a-z]{2,3}' + // ISO 639 language code (e.g. 'en' or 'bdz')
    '(-[A-Z][a-z]{3})?' + // optional script code (e.g. 'Cyrl' or 'Latn')
    '(-([A-Z]{2}|[0-9]{3}))?' // optional region code (e.g. 'US' or '013')

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

import { instanceBaseUrl } from './instanceBaseUrl'

export function extractFromUrl(url: string): {
  contentId?: string
  defaultLocation?: string
  language?: string
  location?: string
} {
  const contentId = '[0-9a-z]{16}'

  const language = '[a-z]{2,3}(-[A-Z][a-z]{3})?(-([A-Z]{2}|[0-9]{3}))?'

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

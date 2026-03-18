import { instanceBaseUrl } from './instanceBaseUrl'

export function extractFromUrl(url: string): {
  contentId?: string
  defaultLocation?: string
  language?: string
  location?: string
} {
  return (
    new RegExp(
      `^${instanceBaseUrl()}(?<defaultLocation>(/(?<contentId>[0-9a-z]{16}))?(/(?<language>[a-z]{2,3}(-[A-Z][a-z]{3})?(-([A-Z]{2}|[0-9]{3}))?))?(?<location>([?/].*)|$))`,
    ).exec(url)?.groups || {}
  )
}

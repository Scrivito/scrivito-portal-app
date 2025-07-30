import { instanceBaseUrl } from './instanceBaseUrl'

export function extractFromUrl(url: string): {
  contentId?: string
  defaultLocation?: string
  language?: string
  location?: string
} {
  return (
    new RegExp(
      `^${instanceBaseUrl()}(?<defaultLocation>(/(?<contentId>[0-9a-z]{16}))?(/(?<language>[a-z]{2}(-[A-Z]{2})?))?(?<location>([?/].*)|$))`,
    ).exec(url)?.groups || {}
  )
}

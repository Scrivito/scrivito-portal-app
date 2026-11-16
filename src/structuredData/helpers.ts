import { Obj, urlFor } from 'scrivito'

// Private helpers, so that this folder only depends on "scrivito".

export function ensureString(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

export function ensureObject(value: unknown): Record<string, unknown> {
  if (value === null) return {}
  if (typeof value !== 'object') return {}
  if (Array.isArray(value)) return {}

  return Object.fromEntries<unknown>(Object.entries(value))
}

/** The other language versions of the page (on all sites), including itself. */
export function hreflangAlternates(
  page: Obj,
): { hreflang: string; href: string }[] {
  const alternates = page.versionsOnAllSites().flatMap((version) => {
    const hreflang = version.language()
    const href = urlFor(version)
    return hreflang && href ? [{ hreflang, href }] : []
  })

  return alternates.length > 1 ? alternates : []
}

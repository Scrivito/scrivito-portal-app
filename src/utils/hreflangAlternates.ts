import { Obj, urlFor } from 'scrivito'

interface HreflangAlternate {
  hreflang: string
  href: string
}

export function hreflangAlternates(
  obj: Obj,
  { excludeNoindex = false }: { excludeNoindex?: boolean } = {},
): HreflangAlternate[] {
  const versions = obj.versionsOnAllSites()
  const candidates = excludeNoindex
    ? versions.filter((version) => version.get('robotsIndex') === true)
    : versions

  const alternates = candidates.flatMap((version) => {
    const hreflang = version.language()
    const href = urlFor(version)
    return hreflang && href ? [{ hreflang, href }] : []
  })

  return alternates.length > 1 ? alternates : []
}

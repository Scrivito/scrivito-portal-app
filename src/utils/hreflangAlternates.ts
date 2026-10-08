import { Obj, urlFor } from 'scrivito'

interface HreflangAlternate {
  hreflang: string
  href: string
}

export function hreflangAlternates(obj: Obj): HreflangAlternate[] {
  const alternates = obj
    .versionsOnAllSites()
    .filter((version) => version.get('robotsIndex') === true)
    .flatMap((version) => {
      const hreflang = version.language()
      const href = urlFor(version)
      return hreflang && href ? [{ hreflang, href }] : []
    })

  return alternates.length > 1 ? alternates : []
}

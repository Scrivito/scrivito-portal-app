import { Obj, urlFor } from 'scrivito'
import { breadcrumbAncestors } from './breadcrumbAncestors'
import { type JsonLdNode } from './parseJsonLdNodes'
import { objTitle } from './title'

/**
 * The breadcrumb trail of the page, like the one of the breadcrumb widget, as
 * a JSON-LD document of its own. Google needs at least two items, so there is none for a page without
 * (visible) ancestors, e.g. the homepage.
 */
export function buildBreadcrumbJsonLd(page: Obj): JsonLdNode | undefined {
  const trail = [...breadcrumbAncestors(page), page]
  if (trail.length < 2) return

  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((obj, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: objTitle(obj),
      item: urlFor(obj),
    })),
  }
}

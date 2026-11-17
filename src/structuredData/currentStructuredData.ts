import { currentPage, Obj, urlFor } from 'scrivito'
import { ensureString } from './helpers'
import {
  buildStructuredData,
  buildSiteStructuredData,
} from './buildStructuredData'
import { isCreativeWork } from './isCreativeWork'
import { isWebPage } from './isWebPage'
import { type StructuredDataNode } from './parseStructuredDataNodes'

const CONTEXT = 'https://schema.org'

/**
 * Returns the JSON-LD of the current page: its structured data, combined with
 * the organization and the website of the homepage into one `@graph`. The nodes
 * are linked:
 * - the website is published by the organization
 * - a page that is a creative work is part of the website and published by the
 *   organization
 * - a web page has the breadcrumb as its `breadcrumb`
 *
 * The optional `breadcrumbAncestors` are the ancestors of the current page
 * that are shown in its breadcrumb, from the root down to the parent. By
 * default, these are all ancestors of the page. Pass an empty array for no
 * breadcrumb. They become a `BreadcrumbList` that ends with the current page.
 * Google needs at least two items, so there is none for a page without
 * ancestors.
 *
 * Invalid JSON leaves out the nodes of that page, so it cannot take the other
 * nodes down with it. Properties that are already set by the editor are kept.
 *
 * Like `currentPage()`, it is reactive and returns `null` if there is
 * nothing to describe.
 */
export function currentStructuredData(
  breadcrumbAncestors?: Array<Obj | null>,
): Record<string, unknown> | null {
  const page = currentPage()
  const homepage = Obj.root()
  const own = page && tryBuild(() => buildStructuredData(page))
  const site = homepage && tryBuild(() => buildSiteStructuredData(homepage))
  const organization = site?.organization
  const webSite = site?.webSite
  const [main, ...others] = own ?? []
  const breadcrumbList = page && buildBreadcrumbList(page, breadcrumbAncestors)

  const organizationId =
    homepage && organization && idOf(organization, homepage, 'organization')
  const breadcrumbId = page && breadcrumbList && `${urlFor(page)}#breadcrumb`
  const webSiteId = homepage && webSite && idOf(webSite, homepage, 'website')

  const nodes = [
    main && {
      ...(isCreativeWork(main['@type']) && {
        isPartOf: webSiteId && { '@id': webSiteId },
        publisher: organizationId && { '@id': organizationId },
      }),
      ...(isWebPage(main['@type']) && {
        breadcrumb: breadcrumbId && { '@id': breadcrumbId },
      }),
      ...main,
    },
    ...others,
    breadcrumbList && { '@id': breadcrumbId, ...breadcrumbList },
    organization && { '@id': organizationId, ...organization },
    webSite && {
      '@id': webSiteId,
      publisher: organizationId && { '@id': organizationId },
      ...webSite,
    },
  ].flatMap((node) => (node ? [withoutContext(withoutEmpty(node))] : []))
  if (nodes.length === 0) return null

  return { '@context': CONTEXT, '@graph': nodes }
}

// Items without a title are left out, because a "ListItem" needs a name. A
// page without a title has no breadcrumb, because the trail would end at its
// parent and wrongly claim that the parent is the current page.
function buildBreadcrumbList(
  page: Obj,
  breadcrumbAncestors: Array<Obj | null> | undefined,
): StructuredDataNode | undefined {
  const ancestors = (breadcrumbAncestors ?? page.ancestors()).filter(
    (item): item is Obj => item !== null,
  )
  if (!titleOf(page)) return

  const trail = [...ancestors, page].flatMap((obj) => {
    const name = titleOf(obj)

    return name ? [{ name, item: urlFor(obj) }] : []
  })
  if (trail.length < 2) return

  return {
    '@type': 'BreadcrumbList',
    itemListElement: trail.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      ...item,
    })),
  }
}

function titleOf(obj: Obj): string {
  return ensureString(obj.get('title')).trim()
}

function tryBuild<T>(build: () => T): T | undefined {
  try {
    return build()
  } catch {
    return
  }
}

// An "@id" set by the editor wins, so references point to the actual one.
function idOf(
  node: StructuredDataNode,
  homepage: Obj,
  fragment: string,
): string {
  const id = node['@id']

  return typeof id === 'string' && id ? id : `${urlFor(homepage)}#${fragment}`
}

// Drops the references to nodes that are not part of the graph.
function withoutEmpty(node: StructuredDataNode): StructuredDataNode {
  return Object.fromEntries(
    Object.entries(node).filter(
      ([, value]) => value !== null && value !== undefined && value !== '',
    ),
  )
}

// The graph provides the context. A node with a different one keeps its own.
function withoutContext(node: StructuredDataNode): StructuredDataNode {
  if (node['@context'] !== CONTEXT) return node

  const { '@context': _context, ...rest } = node
  return rest
}

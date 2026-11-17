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
 * Returns the structured data of the current page, or `null` if there is none.
 *
 * The result is a schema.org JSON-LD document with a single `@graph`. It
 * consists of the nodes of the page's own structured data, a
 * {@link https://schema.org/BreadcrumbList | BreadcrumbList} for the page, and
 * the Organization and WebSite of the site. Each of them is only included if it
 * is available.
 *
 * Sources, by attribute name:
 * - `structuredData` (every page): the nodes that describe the page. The first
 *   node is the main node. Its `url` is set from the page. Its `image` is set
 *   from `structuredDataImages`.
 * - `siteStructuredData` (homepage, i.e. `Obj.root()`): the site-wide nodes.
 *   The first {@link https://schema.org/Organization | Organization} and the
 *   first {@link https://schema.org/WebSite | WebSite} are used, all others
 *   are ignored. Their `url` is the homepage URL. The Organization's `logo` is
 *   set from `siteOrganizationLogo`.
 *
 * The nodes are linked by `@id`:
 * - The WebSite is published by the Organization.
 * - A main node that is a {@link https://schema.org/CreativeWork | CreativeWork}
 *   is part of the WebSite and published by the Organization. A main node that
 *   is a {@link https://schema.org/WebPage | WebPage} references the
 *   breadcrumb.
 *
 * For a CreativeWork, the Obj also provides
 * {@link https://schema.org/datePublished | datePublished} and
 * {@link https://schema.org/inLanguage | inLanguage} (if the editor has not
 * set them), as well as {@link https://schema.org/dateModified | dateModified}
 * and {@link https://schema.org/workTranslation | workTranslation} (the other
 * language versions, on all sites).
 *
 * @param breadcrumbAncestors The ancestors of the current page that make up
 * its breadcrumb, from the root down to the parent. They are followed by the
 * current page and become a
 * {@link https://schema.org/BreadcrumbList | BreadcrumbList} node. Defaults to
 * all ancestors (`page.ancestors()`). Pass an empty array for no breadcrumb.
 * Items without a `title` are left out, and a page without a `title` has no
 * breadcrumb. A page without ancestors, such as the homepage, has none either,
 * because a breadcrumb needs at least two items.
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

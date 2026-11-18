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
 * Builds the structured data of the current page and the site. Structured data
 * that is not valid JSON is ignored.
 *
 * This function is reactive, so it works inside `connect` and `load`. Outside
 * of them, it throws if content is not yet loaded.
 *
 * The result is a schema.org JSON-LD document with a single `@graph`: the
 * nodes of the page, a
 * {@link https://schema.org/BreadcrumbList | BreadcrumbList}, and the
 * {@link https://schema.org/Organization | Organization} and
 * {@link https://schema.org/WebSite | WebSite} of the site. Each of them is
 * only included if it is available.
 *
 * Any `<` is escaped as `\u003c`, so the JSON can not end the surrounding
 * `<script>` tag early.
 *
 * Sources, by attribute name and Scrivito attribute type:
 * - `structuredData` (`'string'`, every page): the nodes that describe the
 *   page, as a JSON object or array of objects. The first one describes the
 *   page itself (the "main node").
 * - `structuredDataImages` (`['referencelist', { only: ['Image'] }]`, every
 *   page): the images of the main node.
 * - `siteStructuredData` (`'string'`, on `Obj.root()`): the site-wide nodes,
 *   in the same format as `structuredData`. The first Organization and the
 *   first WebSite are used, all others are ignored.
 * - `siteOrganizationLogo` (`['reference', { only: 'Image' }]`, on
 *   `Obj.root()`): the logo of the Organization.
 *
 * The main node is completed with what the Obj knows about the page, such as
 * its dates and language versions.
 *
 * The breadcrumb ends with the current page, and its items are named by their
 * `title`. A page without ancestors, such as the root, has none.
 *
 * @param options.breadcrumbAncestors The ancestors of the current page that
 * make up its breadcrumb, from the root down to the parent. Defaults to
 * `currentPage().ancestors()`. Pass an empty array for no breadcrumb.
 * Should match the visible breadcrumb. Entries that are `null` are skipped.
 * @returns The JSON-LD document as a string, ready for a
 * `<script type="application/ld+json">` tag, or `null` if there is no current
 * page or the page and the site have no structured data.
 */
export function currentStructuredDataJson(options?: {
  breadcrumbAncestors?: Array<Obj | null>
}): string | null {
  const graph = buildGraph(options?.breadcrumbAncestors)

  return graph && serialize(graph)
}

function serialize(graph: Record<string, unknown>): string {
  return JSON.stringify(graph, null, 2).replaceAll('<', '\\u003c')
}

function buildGraph(
  breadcrumbAncestors: Array<Obj | null> | undefined,
): Record<string, unknown> | null {
  const page = currentPage()
  if (!page) return null

  const homepage = Obj.root()
  const own = tryBuild(() => buildStructuredData(page))
  const site = homepage && tryBuild(() => buildSiteStructuredData(homepage))
  const organization = site?.organization
  const webSite = site?.webSite
  const [main, ...others] = own ?? []
  const breadcrumbList = buildBreadcrumbList(page, breadcrumbAncestors)

  const organizationId =
    homepage && organization && idOf(organization, homepage, 'organization')
  const breadcrumbId = breadcrumbList && `${urlFor(page)}#breadcrumb`
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

// Invalid JSON from the editor is ignored. Any other error is rethrown, in
// particular Scrivito's "content not yet loaded" error, which must not be
// swallowed.
function tryBuild<T>(build: () => T): T | undefined {
  try {
    return build()
  } catch (error) {
    if (error instanceof SyntaxError) return
    throw error
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

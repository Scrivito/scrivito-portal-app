import { Obj, urlFor } from 'scrivito'
import { buildJsonLd } from './buildJsonLd'
import { buildOrganizationJsonLd } from './buildOrganizationJsonLd'
import { buildWebSiteJsonLd } from './buildWebSiteJsonLd'
import { isCreativeWork } from './isCreativeWork'

const CONTEXT = 'https://schema.org'

type Node = Record<string, unknown>

/**
 * Combines the structured data of the page, the organization and the website
 * into one `@graph` and links the nodes:
 * - the website is published by the organization
 * - a page that is a creative work is part of the website and published by the
 *   organization
 *
 * A node with invalid JSON is left out, so it cannot take the other nodes down
 * with it. Properties that are already set by the editor are kept.
 */
export function buildGraphJsonLd(
  page: Obj | null,
  homepage: Obj | null,
): Node | undefined {
  const organization =
    homepage && tryBuild(() => buildOrganizationJsonLd(homepage))
  const webSite = homepage && tryBuild(() => buildWebSiteJsonLd(homepage))
  const pageNode = page && tryBuild(() => buildJsonLd(page))

  const organizationId =
    homepage && organization && idOf(organization, homepage, 'organization')
  const webSiteId = homepage && webSite && idOf(webSite, homepage, 'website')

  const nodes = [
    pageNode && {
      ...(isCreativeWork(pageNode['@type']) && {
        isPartOf: webSiteId && { '@id': webSiteId },
        publisher: organizationId && { '@id': organizationId },
      }),
      ...pageNode,
    },
    organization && { '@id': organizationId, ...organization },
    webSite && {
      '@id': webSiteId,
      publisher: organizationId && { '@id': organizationId },
      ...webSite,
    },
  ].flatMap((node) => (node ? [withoutContext(withoutEmpty(node))] : []))
  if (nodes.length === 0) return

  return { '@context': CONTEXT, '@graph': nodes }
}

function tryBuild(build: () => Node | undefined): Node | undefined {
  try {
    return build()
  } catch {
    return
  }
}

// An "@id" set by the editor wins, so references point to the actual one.
function idOf(node: Node, homepage: Obj, fragment: string): string {
  const id = node['@id']

  return typeof id === 'string' && id ? id : `${urlFor(homepage)}#${fragment}`
}

// Drops the references to nodes that are not part of the graph.
function withoutEmpty(node: Node): Node {
  return Object.fromEntries(
    Object.entries(node).filter(
      ([, value]) => value !== null && value !== undefined && value !== '',
    ),
  )
}

// The graph provides the context. A node with a different one keeps its own.
function withoutContext(node: Node): Node {
  if (node['@context'] !== CONTEXT) return node

  const { '@context': _context, ...rest } = node

  return rest
}

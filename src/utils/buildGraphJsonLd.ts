import { Obj, urlFor } from 'scrivito'
import { buildJsonLd, buildSiteJsonLd } from './buildJsonLd'
import { isCreativeWork } from './isCreativeWork'
import { type JsonLdNode } from './parseJsonLdNodes'

const CONTEXT = 'https://schema.org'

/**
 * Combines the structured data of the page and the site structured data of the
 * homepage (the organization and the website) into one `@graph` and links the
 * nodes:
 * - the website is published by the organization
 * - a page that is a creative work is part of the website and published by the
 *   organization
 *
 * Invalid JSON leaves out the nodes of that page, so it cannot take the other
 * nodes down with it. Properties that are already set by the editor are kept.
 */
export function buildGraphJsonLd(
  page: Obj | null,
  homepage: Obj | null,
): JsonLdNode | undefined {
  const own = page && tryBuild(() => buildJsonLd(page))
  const site = homepage && tryBuild(() => buildSiteJsonLd(homepage))
  const organization = site?.organization
  const webSite = site?.webSite
  const [main, ...others] = own ?? []

  const organizationId =
    homepage && organization && idOf(organization, homepage, 'organization')
  const webSiteId = homepage && webSite && idOf(webSite, homepage, 'website')

  const nodes = [
    main && {
      ...(isCreativeWork(main['@type']) && {
        isPartOf: webSiteId && { '@id': webSiteId },
        publisher: organizationId && { '@id': organizationId },
      }),
      ...main,
    },
    ...others,
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

function tryBuild<T>(build: () => T): T | undefined {
  try {
    return build()
  } catch {
    return
  }
}

// An "@id" set by the editor wins, so references point to the actual one.
function idOf(node: JsonLdNode, homepage: Obj, fragment: string): string {
  const id = node['@id']

  return typeof id === 'string' && id ? id : `${urlFor(homepage)}#${fragment}`
}

// Drops the references to nodes that are not part of the graph.
function withoutEmpty(node: JsonLdNode): JsonLdNode {
  return Object.fromEntries(
    Object.entries(node).filter(
      ([, value]) => value !== null && value !== undefined && value !== '',
    ),
  )
}

// The graph provides the context. A node with a different one keeps its own.
function withoutContext(node: JsonLdNode): JsonLdNode {
  if (node['@context'] !== CONTEXT) return node

  const { '@context': _context, ...rest } = node
  return rest
}

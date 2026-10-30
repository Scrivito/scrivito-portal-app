import { Obj } from 'scrivito'
import { buildJsonLd } from './buildJsonLd'
import { buildOrganizationJsonLd } from './buildOrganizationJsonLd'
import { buildWebSiteJsonLd } from './buildWebSiteJsonLd'

const CONTEXT = 'https://schema.org'

/**
 * Combines the structured data of the page, the organization and the website
 * into one `@graph`. A node with invalid JSON is left out, so it cannot take
 * the other nodes down with it.
 */
export function buildGraphJsonLd(
  page: Obj | null,
  homepage: Obj | null,
): Record<string, unknown> | undefined {
  const nodes = [
    page && tryBuild(() => buildJsonLd(page)),
    homepage && tryBuild(() => buildOrganizationJsonLd(homepage)),
    homepage && tryBuild(() => buildWebSiteJsonLd(homepage)),
  ].flatMap((node) => (node ? [withoutContext(node)] : []))
  if (nodes.length === 0) return

  return { '@context': CONTEXT, '@graph': nodes }
}

function tryBuild(
  build: () => Record<string, unknown> | undefined,
): Record<string, unknown> | undefined {
  try {
    return build()
  } catch {
    return
  }
}

// The graph provides the context. A node with a different one keeps its own.
function withoutContext(
  node: Record<string, unknown>,
): Record<string, unknown> {
  if (node['@context'] !== CONTEXT) return node

  const { '@context': _context, ...rest } = node

  return rest
}

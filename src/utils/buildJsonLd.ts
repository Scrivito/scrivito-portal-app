import { Obj, urlFor } from 'scrivito'
import { ensureString } from './ensureString'
import { hreflangAlternates } from './hreflangAlternates'
import { isCreativeWork } from './isCreativeWork'
import { isOrganization } from './isOrganization'
import { type JsonLdNode, parseJsonLdNodes } from './parseJsonLdNodes'

export type StructuredDataNodes = {
  /** The nodes that describe the page itself. The first one is the main node. */
  page: JsonLdNode[]
  /** Only set for the homepage: the Organization behind the whole site. */
  organization?: JsonLdNode
  /** Only set for the homepage: the WebSite as a whole. */
  webSite?: JsonLdNode
}

/**
 * Splits the "structuredData" of a page into its nodes. On the homepage, the
 * first Organization and the first WebSite describe the whole site. All other
 * nodes describe the page itself.
 *
 * @throws {SyntaxError} if the JSON-LD is not valid JSON
 */
export function splitStructuredData(page: Obj): StructuredDataNodes {
  const nodes = parseJsonLdNodes(ensureString(page.get('structuredData')))
  if (page.objClass() !== 'Homepage') return { page: nodes }

  const organization = nodes.find((node) => isOrganization(node['@type']))
  const webSite = nodes.find((node) =>
    [node['@type']].flat().includes('WebSite'),
  )

  return {
    page: nodes.filter((node) => node !== organization && node !== webSite),
    organization,
    webSite,
  }
}

/** @throws {SyntaxError} if the JSON-LD is not valid JSON */
export function buildJsonLd(page: Obj): StructuredDataNodes {
  const { page: nodes, organization, webSite } = splitStructuredData(page)
  const [main, ...others] = nodes

  return {
    page: main ? [buildMainNode(page, main), ...others] : [],
    organization: organization && {
      ...organization,
      url: urlFor(page),
      logo: logoUrl(page.get('siteOrganizationLogo')),
    },
    webSite: webSite && { ...webSite, url: urlFor(page) },
  }
}

function buildMainNode(page: Obj, node: JsonLdNode): JsonLdNode {
  const record: JsonLdNode = {
    ...node,
    url: urlFor(page),
    image: imageUrls(page),
  }
  if (!isCreativeWork(record['@type'])) return record

  const translations = hreflangAlternates(page).filter(
    ({ href }) => href !== record.url,
  )

  return {
    datePublished: page.firstPublishedAt()?.toISOString(),
    inLanguage: page.language() || 'en',
    ...record,
    dateModified: page.publishedAt()?.toISOString(),
    workTranslation: translations.length
      ? translations.map(({ hreflang, href }) => ({
          '@type': record['@type'],
          inLanguage: hreflang,
          url: href,
        }))
      : undefined,
  }
}

function imageUrls(page: Obj): string | string[] | undefined {
  const images = page.get('structuredDataImages')
  if (!Array.isArray(images)) return

  const urls = images.flatMap((image) =>
    image instanceof Obj && image.get('blob') ? [image.contentUrl()] : [],
  )

  if (urls.length === 0) return
  if (urls.length === 1) return urls[0]

  return urls
}

function logoUrl(logo: unknown): string | undefined {
  if (!(logo instanceof Obj) || !logo.get('blob')) return

  return logo.contentUrl()
}

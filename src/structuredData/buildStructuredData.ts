import { Obj, urlFor } from 'scrivito'
import { ensureString, hreflangAlternates } from './helpers'
import { isCreativeWork } from './isCreativeWork'
import { isOrganization } from './isOrganization'
import {
  type StructuredDataNode,
  parseStructuredDataNodes,
} from './parseStructuredDataNodes'

export type SiteNodes = {
  /** The Organization behind the whole site. */
  organization?: StructuredDataNode
  /** The WebSite as a whole. */
  webSite?: StructuredDataNode
}

/**
 * Returns the nodes of the "structuredData" of a page. All of them describe the
 * page itself. The first one is the main node.
 *
 * @throws {SyntaxError} if the JSON-LD is not valid JSON
 */
export function splitStructuredData(page: Obj): StructuredDataNode[] {
  return parseStructuredDataNodes(ensureString(page.get('structuredData')))
}

/**
 * Returns the nodes of the "siteStructuredData" of the homepage. The first
 * Organization and the first WebSite describe the whole site. All other nodes
 * are ignored.
 *
 * @throws {SyntaxError} if the JSON-LD is not valid JSON
 */
export function splitSiteStructuredData(homepage: Obj): SiteNodes & {
  ignored: StructuredDataNode[]
} {
  const nodes = parseStructuredDataNodes(
    ensureString(homepage.get('siteStructuredData')),
  )
  const organization = nodes.find((node) => isOrganization(node['@type']))
  const webSite = nodes.find((node) =>
    [node['@type']].flat().includes('WebSite'),
  )

  return {
    organization,
    webSite,
    ignored: nodes.filter((node) => node !== organization && node !== webSite),
  }
}

/**
 * Returns the nodes that describe the page itself. The first one is the main
 * node.
 *
 * @throws {SyntaxError} if the JSON-LD is not valid JSON
 */
export function buildStructuredData(page: Obj): StructuredDataNode[] {
  const [main, ...others] = splitStructuredData(page)

  return main ? [buildMainNode(page, main), ...others] : []
}

/** @throws {SyntaxError} if the JSON-LD is not valid JSON */
export function buildSiteStructuredData(homepage: Obj): SiteNodes {
  const { organization, webSite } = splitSiteStructuredData(homepage)

  return {
    organization: organization && {
      ...organization,
      url: urlFor(homepage),
      logo: logoUrl(homepage.get('siteOrganizationLogo')),
    },
    webSite: webSite && { ...webSite, url: urlFor(homepage) },
  }
}

function buildMainNode(
  page: Obj,
  node: StructuredDataNode,
): StructuredDataNode {
  const record: StructuredDataNode = {
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

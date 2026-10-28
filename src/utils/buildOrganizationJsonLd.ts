import { Obj, urlFor } from 'scrivito'
import { ensureObject } from './ensureObject'
import { ensureString } from './ensureString'

/** @throws {SyntaxError} if the JSON-LD is not valid JSON */
export function buildOrganizationJsonLd(
  homepage: Obj,
): Record<string, unknown> | undefined {
  const json = ensureString(homepage.get('siteOrganizationStructuredData'))
  if (!json.trim()) return

  return {
    ...ensureObject(JSON.parse(json)),
    url: urlFor(homepage),
    logo: logoUrl(homepage.get('siteOrganizationLogo')),
  }
}

function logoUrl(logo: unknown): string | undefined {
  if (!(logo instanceof Obj) || !logo.get('blob')) return

  return logo.contentUrl()
}

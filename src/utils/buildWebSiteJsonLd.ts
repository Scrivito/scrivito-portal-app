import { Obj, urlFor } from 'scrivito'
import { ensureObject } from './ensureObject'
import { ensureString } from './ensureString'

/** @throws {SyntaxError} if the JSON-LD is not valid JSON */
export function buildWebSiteJsonLd(
  homepage: Obj,
): Record<string, unknown> | undefined {
  const json = ensureString(homepage.get('siteWebSiteStructuredData'))
  if (!json.trim()) return

  return {
    ...ensureObject(JSON.parse(json)),
    url: urlFor(homepage),
  }
}

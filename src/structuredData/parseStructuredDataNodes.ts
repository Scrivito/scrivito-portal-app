import { ensureObject } from './helpers'

export type StructuredDataNode = Record<string, unknown>

/**
 * Returns the nodes of a JSON-LD document: the entries of its "@graph", or the
 * document itself if it has none. Blank input has no nodes.
 *
 * @throws {SyntaxError} if the JSON-LD is not valid JSON
 */
export function parseStructuredDataNodes(json: string): StructuredDataNode[] {
  if (!json.trim()) return []

  const root = ensureObject(JSON.parse(json))
  const nodes = Array.isArray(root['@graph']) ? root['@graph'] : [root]

  return nodes.map(ensureObject).filter((node) => Object.keys(node).length > 0)
}

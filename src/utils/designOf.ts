import { Design } from 'scrivito'

/**
 * The design of an attribute value read from an untyped `Obj` or `Widget`, where `get` cannot
 * tell which kind of value it returns. Narrows instead of casting.
 */
export function designOf(value: unknown): Design | null {
  return value instanceof Design ? value : null
}

export function ensureObject(value: unknown): Record<string, unknown> {
  if (value === null) return {}
  if (typeof value !== 'object') return {}
  if (Array.isArray(value)) return {}

  return Object.fromEntries<unknown>(Object.entries(value))
}

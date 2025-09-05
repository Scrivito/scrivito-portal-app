export function ensureArray(value: unknown): unknown[] {
  return Array.isArray(value) ? value : []
}

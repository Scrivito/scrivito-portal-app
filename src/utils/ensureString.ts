export function ensureString(value: unknown): string {
  return typeof value === 'string' ? value : ''
}

export function isOptionalString(input: unknown): input is undefined | string {
  return typeof input === 'undefined' || typeof input === 'string'
}

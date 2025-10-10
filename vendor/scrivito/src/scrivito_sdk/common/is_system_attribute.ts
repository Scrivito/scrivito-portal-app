export function isSystemAttribute(attributeName: string): boolean {
  return attributeName[0] === '_';
}

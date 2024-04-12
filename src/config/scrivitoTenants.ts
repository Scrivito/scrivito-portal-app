export function isMultitenancyEnabled(): boolean {
  return !import.meta.env.SCRIVITO_TENANT
}

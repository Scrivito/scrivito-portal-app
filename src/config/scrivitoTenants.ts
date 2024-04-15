export function isMultitenancyEnabled(): boolean {
  return !import.meta.env.SCRIVITO_TENANT
}

const location = typeof window !== 'undefined' ? window.location : undefined

export function scrivitoTenantId(): string {
  if (!isMultitenancyEnabled()) return import.meta.env.SCRIVITO_TENANT

  if (!location) throw new Error('Could not determine tenant!')

  const tenantFromUrl = location.pathname.match(/^\/([0-9a-f]{32})\b/)?.[1]
  const tenantFromQuery = new URLSearchParams(location.search).get('tenantId')
  const tenant = tenantFromUrl || tenantFromQuery

  if (!tenant) throw new Error('Could not determine tenant!')

  return tenant
}

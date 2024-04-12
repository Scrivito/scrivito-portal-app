export function isMultitenancyEnabled(): boolean {
  return !import.meta.env.SCRIVITO_TENANT
}

const location = typeof window !== 'undefined' ? window.location : undefined

export function getTenantFromEnv(): string | undefined {
  if (!isMultitenancyEnabled()) return import.meta.env.SCRIVITO_TENANT

  if (!location) throw new Error('Could not determine tenant!')

  const tenantFromUrl = location.pathname.match(/^\/([0-9a-f]{32})\b/)?.[1]
  const tenantFromQuery = new URLSearchParams(location.search).get('tenantId')
  const tenant = tenantFromUrl || tenantFromQuery

  if (!tenant) {
    if (
      import.meta.env.VITE_MULTITENANCY_FALLBACK_SCRIVITO_TENANT &&
      !tenantFromQuery
    ) {
      const fallbackScrivitoTenant = import.meta.env
        .VITE_MULTITENANCY_FALLBACK_SCRIVITO_TENANT
      if (
        typeof fallbackScrivitoTenant === 'string' &&
        fallbackScrivitoTenant.match(/^[0-9a-f]{32}$/)
      ) {
        location.replace(`${location.origin}/${fallbackScrivitoTenant}`)
        return
      }
    }

    throw new Error('Could not determine tenant!')
  }

  return tenant
}

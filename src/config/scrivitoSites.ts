const location = typeof window !== 'undefined' ? window.location : undefined

export function baseUrlForSite(_siteId: string): string | undefined {
  const tenant = getTenantFromEnv()
  if (!location || !tenant) return

  const urlParts = [location.origin]

  // Multitenancy mode
  if (!import.meta.env.SCRIVITO_TENANT) urlParts.push(tenant)

  return urlParts.join('/')
}

export function siteForUrl(
  _url: string,
): { baseUrl: string; siteId: string } | undefined {
  const siteId = 'default'

  const baseUrl = baseUrlForSite(siteId)
  if (baseUrl) return { baseUrl, siteId }
}

export function getTenantFromEnv(): string | undefined {
  if (import.meta.env.SCRIVITO_TENANT) return import.meta.env.SCRIVITO_TENANT

  if (!location) throw new Error('Could not determine tenant!')

  // Multitenancy mode
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

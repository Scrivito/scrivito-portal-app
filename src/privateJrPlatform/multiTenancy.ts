const location = typeof window !== 'undefined' ? window.location : undefined

export function getJrPlatformInstanceId(): string {
  if (!isMultitenancyEnabled()) return import.meta.env.SCRIVITO_TENANT

  if (!location) throw new Error('Could not determine tenant!')

  const tenantFromUrl = location.pathname.match(/^\/([0-9a-f]{32})\b/)?.[1]
  const tenantFromQuery = new URLSearchParams(location.search).get('tenantId')
  const tenant = tenantFromUrl || tenantFromQuery

  if (!tenant) throw new Error('Could not determine tenant!')

  return tenant
}

export function getJrPlatformBaseAppUrl(): string {
  if (!origin) throw new Error('No origin defined!')

  return isMultitenancyEnabled()
    ? `${origin}/${getJrPlatformInstanceId()}`
    : origin
}

export function jrPlatformRedirectToSiteUrl(siteUrl: string) {
  const { pathname: rawPathname, search, hash } = window.location
  const pathname = isMultitenancyEnabled()
    ? rawPathname.slice(getJrPlatformInstanceId().length + 1)
    : rawPathname
  const path = pathname === '/' ? '' : pathname

  window.location.assign(`${siteUrl}${path}${search}${hash}`)
}

function isMultitenancyEnabled(): boolean {
  return !import.meta.env.SCRIVITO_TENANT
}

const location = typeof window !== 'undefined' ? window.location : undefined

export function getJrPlatformInstanceId(): string {
  const scrivitoInstance = import.meta.env.SCRIVITO_TENANT
  if (scrivitoInstance) return scrivitoInstance

  if (!location) throw new Error('Could not determine instance!')

  const pathInstance = location.pathname.match(/^\/([0-9a-f]{32})\b/)?.[1]
  const queryInstance = new URLSearchParams(location.search).get('tenantId')
  const instance = pathInstance || queryInstance

  if (!instance) throw new Error('Could not determine instance!')

  return instance
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

const location = typeof window !== 'undefined' ? window.location : undefined

const INSTANCE_ALIAS: Partial<Record<string, string>> = {
  'tynacoon.com': '13b78a0a81072f996f5010bb59b48957',
  'www.tynacoon.com': '13b78a0a81072f996f5010bb59b48957',
  'my.justrelate.com': '6d226c03f32a8ea4e8ae8e5cbe6c6e2c',
  'my-beta.justrelate.com': '6d226c03f32a8ea4e8ae8e5cbe6c6e2c',
}

export function getJrPlatformInstanceId(): string {
  const scrivitoInstance = import.meta.env.SCRIVITO_TENANT
  if (scrivitoInstance) return scrivitoInstance

  const hostnameInstance = instanceFromHostname()
  if (hostnameInstance) return hostnameInstance

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
  return !import.meta.env.SCRIVITO_TENANT && !instanceFromHostname()
}

export function instanceFromHostname() {
  return (location && INSTANCE_ALIAS[location.hostname]) ?? null
}

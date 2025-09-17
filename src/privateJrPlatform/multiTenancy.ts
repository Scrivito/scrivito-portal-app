const location = typeof window !== 'undefined' ? window.location : undefined

const INSTANCE_ALIAS: Partial<Record<string, string>> = {
  'tynacoon.com': '13b78a0a81072f996f5010bb59b48957',
  'www.tynacoon.com': '13b78a0a81072f996f5010bb59b48957',
  'my.justrelate.com': '6d226c03f32a8ea4e8ae8e5cbe6c6e2c',
  'my-beta.justrelate.com': '6d226c03f32a8ea4e8ae8e5cbe6c6e2c',
  'umbreit-portal-staging.justrelate.io': 'eed237bb541b423a80b7a1f32b565709',
  'umbreit-portal.justrelate.io': '775987b17e784bfe9d8501df021ce84f',
}

export function getJrPlatformInstanceId(): string | null {
  const scrivitoInstance = import.meta.env.SCRIVITO_TENANT
  if (scrivitoInstance) return scrivitoInstance

  const hostnameInstance = instanceFromHostname()
  if (hostnameInstance) return hostnameInstance

  if (!location) return null

  const pathInstance = location.pathname.match(/^\/([0-9a-f]{32})\b/)?.[1]
  const queryInstance = new URLSearchParams(location.search).get('tenantId')
  const instance = pathInstance || queryInstance

  return instance
}

export function getJrPlatformInstanceBaseUrl(origin: string): string {
  if (!isMultitenancyEnabled()) return origin

  const instanceId = getJrPlatformInstanceId()
  if (!instanceId) throw new Error('Could not determine instance!')

  return `${origin}/${instanceId}`
}

function isMultitenancyEnabled(): boolean {
  return !import.meta.env.SCRIVITO_TENANT && !instanceFromHostname()
}

export function instanceFromHostname() {
  return (location && INSTANCE_ALIAS[location.hostname]) ?? null
}

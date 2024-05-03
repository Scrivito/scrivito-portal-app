const aliasLookup: Partial<Record<string, string>> = {
  'tynacoon.com': '13b78a0a81072f996f5010bb59b48957',
  'www.tynacoon.com': '13b78a0a81072f996f5010bb59b48957',
}

function getInstanceIdFromHostname(): string | undefined {
  if (!location) return

  return aliasLookup[location.hostname]
}

export function isMultitenancyEnabled(): boolean {
  if (import.meta.env.SCRIVITO_TENANT) return false
  if (getInstanceIdFromHostname()) return false

  return true
}

const location = typeof window !== 'undefined' ? window.location : undefined

export function scrivitoTenantId(): string {
  if (import.meta.env.SCRIVITO_TENANT) return import.meta.env.SCRIVITO_TENANT

  const instanceIdFromHostname = getInstanceIdFromHostname()
  if (instanceIdFromHostname) return instanceIdFromHostname

  if (!location) throw new Error('Could not determine tenant!')

  const tenantFromUrl = location.pathname.match(/^\/([0-9a-f]{32})\b/)?.[1]
  const tenantFromQuery = new URLSearchParams(location.search).get('tenantId')
  const tenant = tenantFromUrl || tenantFromQuery

  if (!tenant) throw new Error('Could not determine tenant!')

  return tenant
}

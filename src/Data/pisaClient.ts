import { createApiClient } from 'scrivito'
import { scrivitoTenantId } from '../config/scrivitoTenants'

const pisaLookup: Partial<Record<string, string>> = {
  '13b78a0a81072f996f5010bb59b48957': 'https://web106.crm.pisasales.de/portal',
  d0a154d76edf2a7bd991fc658e700a1d: 'https://web102.crm.pisasales.de/portal',
}

export function pisaUrl(): string {
  const instanceId = scrivitoTenantId()
  const url = pisaLookup[instanceId]
  if (!url) {
    if (location.search.includes('ignoreMissingPisaUrl')) return ''
    throw new Error(`No PISA URL for ${instanceId} found!`)
  }

  return url
}

export function pisaClient(subPath: string) {
  const url = `${pisaUrl()}/${subPath}`
  return createApiClient(url)
}

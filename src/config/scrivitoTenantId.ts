import { ensureString } from '../utils/ensureString'

export function scrivitoTenantId(): {
  tenant: string
  isMultitenancy: boolean
} {
  if (import.meta.env.SCRIVITO_TENANT) {
    return {
      tenant: ensureString(import.meta.env.SCRIVITO_TENANT),
      isMultitenancy: false,
    }
  }

  if (typeof window === 'undefined') {
    throw new Error('Could not determine tenant. SCRIVITO_TENANT is missing')
  }

  // Multitenancy mode
  const isMultitenancy = true

  const fromUrl = window.location.pathname.match(/^\/([0-9a-f]{32})\b/)?.[1]
  if (fromUrl) return { tenant: fromUrl, isMultitenancy }

  const fromQuery = new URLSearchParams(window.location.search).get('tenantId')
  if (fromQuery) return { tenant: fromQuery, isMultitenancy }

  if (import.meta.env.VITE_MULTITENANCY_FALLBACK_SCRIVITO_TENANT) {
    const fallback = import.meta.env.VITE_MULTITENANCY_FALLBACK_SCRIVITO_TENANT

    if (typeof fallback === 'string' && fallback.match(/^[0-9a-f]{32}$/)) {
      window.location.replace(`${window.location.origin}/${fallback}`)
      return { tenant: '', isMultitenancy }
    }
  }

  throw new Error('Could not determine tenant!')
}

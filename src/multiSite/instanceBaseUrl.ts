import { getJrPlatformInstanceBaseUrl } from '../privateJrPlatform/multiTenancy'
import { ensureString } from '../utils/ensureString'

const origin =
  typeof window !== 'undefined'
    ? window.location.origin
    : ensureString(import.meta.env.SCRIVITO_ORIGIN)

export function instanceBaseUrl(): string {
  if (!origin) throw new Error('No origin defined!')
  if (import.meta.env.PRIVATE_JR_PLATFORM) {
    return getJrPlatformInstanceBaseUrl(origin)
  }

  return origin
}

import { getJrPlatformInstanceId } from '../privateJrPlatform/multiTenancy'

export function scrivitoTenantId(): string {
  if (import.meta.env.PRIVATE_JR_PLATFORM) return getJrPlatformInstanceId()

  return import.meta.env.SCRIVITO_TENANT
}

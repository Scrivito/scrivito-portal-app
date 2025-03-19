import { configure } from 'scrivito'
import { baseUrlForSite, siteForUrl } from './scrivitoSites'
import { getJrPlatformConfig } from '../privateJrPlatform/getJrPlatformConfig'
import { getJrPlatformInstanceId } from '../privateJrPlatform/multiTenancy'

export function configureScrivito(options?: { priority?: 'background' }) {
  configure({
    activateDataIntegration: true,
    adoptUi: true,
    autoConvertAttributes: true,
    baseUrlForSite,
    contentTagsForEmptyAttributes: false,
    extensionsUrl: `/_scrivito_extensions.html?tenantId=${scrivitoTenantId()}`,
    optimizedWidgetLoading: true,
    siteForUrl,
    strictSearchOperators: true,
    tenant: scrivitoTenantId(),
    ...(import.meta.env.PRIVATE_JR_PLATFORM ? getJrPlatformConfig() : {}),
    ...options,
  })
}

function scrivitoTenantId(): string {
  if (import.meta.env.PRIVATE_JR_PLATFORM) return getJrPlatformInstanceId()

  return import.meta.env.SCRIVITO_TENANT
}

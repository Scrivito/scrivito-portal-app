import { configure } from 'scrivito'
import { baseUrlForSite, siteForUrl } from './scrivitoSites'
import { scrivitoTenantId } from './scrivitoTenants'
import { getJrPlatformConfig } from '../privateJrPlatform/getJrPlatformConfig'

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

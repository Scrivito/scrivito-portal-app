import { configure } from 'scrivito'
import { baseUrlForSite, siteForUrl } from './scrivitoSites'
import { getJrPlatformConfig } from '../privateJrPlatform/getJrPlatformConfig'
import { getJrPlatformInstanceId } from '../privateJrPlatform/multiTenancy'

export function configureScrivito(options?: { priority?: 'background' }) {
  const tenant = scrivitoTenantId()
  if (!tenant) throw new Error('No Scrivito tenant ID found!')

  configure({
    activateDataIntegration: true,
    adoptUi: 'http://localhost:8090',
    autoConvertAttributes: true,
    baseUrlForSite,
    contentTagsForEmptyAttributes: false,
    extensionsUrl: `/_scrivito_extensions.html?tenantId=${tenant}`,
    optimizedWidgetLoading: true,
    siteForUrl,
    strictSearchOperators: true,
    tenant,
    ...(import.meta.env.PRIVATE_JR_PLATFORM
      ? getJrPlatformConfig({ assetUrlBase: 'http://localhost:8091' })
      : {
          unstable: {
            assetUrlBase: 'http://localhost:8091',
            trustedUiOrigins: ['http://localhost:8090'],
          },
        }),
    ...options,
  })
}

function scrivitoTenantId(): string | null {
  if (import.meta.env.PRIVATE_JR_PLATFORM) return getJrPlatformInstanceId()

  return import.meta.env.SCRIVITO_TENANT
}

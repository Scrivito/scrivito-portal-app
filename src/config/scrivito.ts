import { configure } from 'scrivito'
import { baseUrlForSite, siteForUrl } from './scrivitoSites'
import { getJrPlatformConfig } from '../privateJrPlatform/getJrPlatformConfig'
import { getJrPlatformInstanceId } from '../privateJrPlatform/multiTenancy'

export function configureScrivito(options?: { priority?: 'background' }) {
  const instanceId = scrivitoInstanceId()
  if (!instanceId) throw new Error('No Scrivito instance ID found!')

  configure({
    activateDataIntegration: true,
    adoptUi: true,
    autoConvertAttributes: true,
    baseUrlForSite,
    contentTagsForEmptyAttributes: false,
    extensionsUrl: `/_scrivito_extensions.html?instanceId=${instanceId}`,
    instanceId,
    optimizedWidgetLoading: true,
    siteForUrl,
    strictSearchOperators: true,
    ...(import.meta.env.PRIVATE_JR_PLATFORM ? getJrPlatformConfig() : {}),
    ...options,
  })
}

function scrivitoInstanceId(): string | null {
  if (import.meta.env.PRIVATE_JR_PLATFORM) return getJrPlatformInstanceId()

  return import.meta.env.SCRIVITO_INSTANCE_ID
}

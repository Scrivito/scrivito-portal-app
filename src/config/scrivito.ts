import { configure } from 'scrivito'
import {
  baseUrlForSite,
  ensureSiteIsPresent,
  siteForUrl,
} from './scrivitoSites'
import { getTenantFromEnv, isMultitenancyEnabled } from './scrivitoTenants'

export function configureScrivito() {
  const tenant = getTenantFromEnv()
  if (!tenant) return

  const config: Parameters<typeof configure>[0] = {
    adoptUi: true,
    autoConvertAttributes: true,
    baseUrlForSite,
    optimizedWidgetLoading: true,
    strictSearchOperators: true,
    contentTagsForEmptyAttributes: false,
    siteForUrl,
    tenant,
    // @ts-expect-error // TODO: Remove later on
    unstable: {
      trustedUiOrigins: [
        'http://localhost:8090',
        'https://*.netlify.app',
        'https://*.pages.dev',
      ],
    },
  }

  if (isMultitenancyEnabled()) {
    config.extensionsUrl = `/_scrivito_extensions.html?tenantId=${tenant}`
  }

  configure(config)
  ensureSiteIsPresent()
}

import { configure } from 'scrivito'
import {
  baseUrlForSite,
  ensureSiteIsPresent,
  siteForUrl,
} from './scrivitoSites'
import { scrivitoTenantId } from './scrivitoTenants'

export function configureScrivito() {
  const tenant = scrivitoTenantId()

  const config: Parameters<typeof configure>[0] = {
    adoptUi: true,
    autoConvertAttributes: true,
    baseUrlForSite,
    contentTagsForEmptyAttributes: false,
    extensionsUrl: `/_scrivito_extensions.html?tenantId=${tenant}`,
    optimizedWidgetLoading: true,
    siteForUrl,
    strictSearchOperators: true,
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

  configure(config)
  ensureSiteIsPresent()
}

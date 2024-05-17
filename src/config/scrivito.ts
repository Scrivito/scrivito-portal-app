import { configure } from 'scrivito'
import {
  baseUrlForSite,
  ensureSiteIsPresent,
  siteForUrl,
} from './scrivitoSites'
import { scrivitoTenantId } from './scrivitoTenants'

export function configureScrivito() {
  configure({
    adoptUi: true,
    autoConvertAttributes: true,
    baseUrlForSite,
    contentTagsForEmptyAttributes: false,
    extensionsUrl: `/_scrivito_extensions.html?tenantId=${scrivitoTenantId()}`,
    optimizedWidgetLoading: true,
    siteForUrl,
    strictSearchOperators: true,
    tenant: scrivitoTenantId(),
    // @ts-expect-error // TODO: Remove later on
    unstable: {
      trustedUiOrigins: [
        'http://localhost:8090',
        'https://*.scrivito-ui.pages.dev',
      ],
      initialContentDumpUrl:
        'https://demo3-content.scrivito-portal-app.pages.dev/index.json',
    },
  })

  ensureSiteIsPresent()
}

import { configure } from 'scrivito'
import { baseUrlForSite, siteForUrl } from './scrivitoSites'
import { scrivitoTenantId } from './scrivitoTenants'

export function configureScrivito(options?: { priority?: 'background' }) {
  configure({
    adoptUi: 'http://localhost:8090',
    autoConvertAttributes: true,
    baseUrlForSite,
    contentTagsForEmptyAttributes: false,
    extensionsUrl: `/_scrivito_extensions.html?tenantId=${scrivitoTenantId()}`,
    optimizedWidgetLoading: true,
    siteForUrl,
    strictSearchOperators: true,
    tenant: scrivitoTenantId(),
    treatLocalhostLike: 'https://scrivito-portal-app.pages.dev',
    // @ts-expect-error // TODO: Remove later on
    unstable: {
      assetUrlBase: 'http://localhost:8091',
      trustedUiOrigins: [
        'http://localhost:8090',
        'https://*.scrivito-ui.pages.dev',
      ],
    },
    ...options,
  })
}

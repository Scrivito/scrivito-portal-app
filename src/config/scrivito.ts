import { configure } from 'scrivito'
import { scrivitoTenantId } from './scrivitoTenantId'

export function configureScrivito() {
  const { tenant, isMultitenancy } = scrivitoTenantId()

  const config: Parameters<typeof configure>[0] = {
    adoptUi: true,
    autoConvertAttributes: true,
    optimizedWidgetLoading: true,
    strictSearchOperators: true,
    contentTagsForEmptyAttributes: false,
    tenant,
    jrRestApiEndpoint: `${window.location.origin}/jr-api`,
    // @ts-expect-error // TODO: Remove later on
    unstable: {
      trustedUiOrigins: [
        'http://localhost:8090',
        'https://*.netlify.app',
        'https://*.pages.dev',
      ],
    },
  }

  if (isMultitenancy) {
    config.routingBasePath = `/${tenant}`
    config.extensionsUrl = `/_scrivito_extensions.html?tenantId=${tenant}`
  }

  configure(config)
}

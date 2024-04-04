import { configure } from 'scrivito'
import { getTenantFromEnv } from './scrivitoSites'

export function configureScrivito() {
  const tenant = getTenantFromEnv()
  if (!tenant) return

  const config: Parameters<typeof configure>[0] = {
    adoptUi: true,
    autoConvertAttributes: true,
    optimizedWidgetLoading: true,
    strictSearchOperators: true,
    contentTagsForEmptyAttributes: false,
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

  if (!import.meta.env.SCRIVITO_TENANT) {
    // Multitenancy mode
    config.routingBasePath = `/${tenant}`
    config.extensionsUrl = `/_scrivito_extensions.html?tenantId=${tenant}`
  }

  configure(config)
}

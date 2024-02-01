import { configure } from 'scrivito'

export function configureScrivito() {
  const config: Parameters<typeof configure>[0] = {
    adoptUi: true,
    autoConvertAttributes: true,
    optimizedWidgetLoading: true,
    strictSearchOperators: true,
    contentTagsForEmptyAttributes: false,
    tenant: import.meta.env.SCRIVITO_TENANT || '',
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

  if (!import.meta.env.SCRIVITO_TENANT) {
    // Multitenancy mode
    const tenantFromUrl =
      window.location.pathname.match(/^\/([0-9a-f]{32})\b/)?.[1]
    const tenantFromQuery = new URLSearchParams(window.location.search).get(
      'tenantId',
    )
    const tenant = tenantFromUrl || tenantFromQuery

    if (!tenant) {
      if (
        import.meta.env.VITE_MULTITENANCY_FALLBACK_SCRIVITO_TENANT &&
        !tenantFromQuery
      ) {
        const fallbackScrivitoTenant = import.meta.env
          .VITE_MULTITENANCY_FALLBACK_SCRIVITO_TENANT
        if (
          typeof fallbackScrivitoTenant === 'string' &&
          fallbackScrivitoTenant.match(/^[0-9a-f]{32}$/)
        ) {
          window.location.replace(
            `${window.location.origin}/${fallbackScrivitoTenant}`,
          )
          return
        }
      }

      throw new Error('Could not determine tenant!')
    }

    config.tenant = tenant
    config.routingBasePath = `/${tenant}`
    config.extensionsUrl = `/_scrivito_extensions.html?tenantId=${tenant}`
  }

  configure(config)
}

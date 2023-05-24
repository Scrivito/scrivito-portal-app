import * as Scrivito from 'scrivito'

export function configureScrivito() {
  const config: Parameters<typeof Scrivito.configure>[0] = {
    adoptUi: true,
    optimizedWidgetLoading: true,
    strictSearchOperators: true,
    contentTagsForEmptyAttributes: false,
    tenant: import.meta.env.SCRIVITO_TENANT || '',
  }

  if (!import.meta.env.SCRIVITO_TENANT) {
    // Multitenancy mode
    const tenantFromUrl =
      window.location.pathname.match(/^\/([0-9a-f]{32})\b/)?.[1]
    if (!tenantFromUrl) throw new Error('Could not determine tenant!')

    config.tenant = tenantFromUrl
    config.routingBasePath = `/${tenantFromUrl}`
  }

  Scrivito.configure(config)
}

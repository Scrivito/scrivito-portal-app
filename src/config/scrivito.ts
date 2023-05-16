import * as Scrivito from 'scrivito'

export function configureScrivito() {
  const config = {
    adoptUi: true,
    optimizedWidgetLoading: true,
    strictSearchOperators: true,
    contentTagsForEmptyAttributes: false,
    tenant: 'd0a154d76edf2a7bd991fc658e700a1d',
  }

  Scrivito.configure(config)
}

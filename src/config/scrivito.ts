import * as Scrivito from 'scrivito'

export function configureScrivito() {
  const config = {
    adoptUi: true,
    optimizedWidgetLoading: true,
    strictSearchOperators: true,
    contentTagsForEmptyAttributes: false,
    tenant: '11215e19da5de47023db5c142893e6fd',
  }

  Scrivito.configure(config)
}

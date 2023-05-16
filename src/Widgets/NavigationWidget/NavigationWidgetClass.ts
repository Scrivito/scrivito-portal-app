import * as Scrivito from 'scrivito'

export const NavigationWidget = Scrivito.provideWidgetClass(
  'NavigationWidget',
  {
    attributes: {
      metaNavigationObjs: 'referencelist',
    },
  }
)

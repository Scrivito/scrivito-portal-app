import { provideWidgetClass } from 'scrivito'

export const NavigationWidget = provideWidgetClass('NavigationWidget', {
  attributes: {
    metaNavigationObjs: 'referencelist',
    metaNavigationUserDescription: 'string',
    metaNavigationUserTitle: 'string',
    logOutLabel: 'string',
    searchInputLabel: 'string',
  },
})

export type NavigationWidgetInstance = InstanceType<typeof NavigationWidget>

import { provideWidgetClass } from 'scrivito'

export const NavigationWidget = provideWidgetClass('NavigationWidget', {
  attributes: {
    logOutLabel: 'string',
    metaNavigationObjs: 'referencelist',
    metaNavigationUserDescription: 'string',
    metaNavigationUserTitle: 'string',
    searchInputLabel: 'string',
    slimDesign: 'boolean',
  },
})

export type NavigationWidgetInstance = InstanceType<typeof NavigationWidget>

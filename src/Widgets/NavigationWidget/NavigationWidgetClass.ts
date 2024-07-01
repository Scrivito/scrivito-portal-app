import { provideWidgetClass } from 'scrivito'

export const NavigationWidget = provideWidgetClass('NavigationWidget', {
  attributes: {
    metaNavigationObjs: 'referencelist',
    metaNavigationUserDescription: 'string',
    metaNavigationUserTitle: 'string',
    logOutLabel: 'string',
  },
})

export type NavigationWidgetInstance = InstanceType<typeof NavigationWidget>

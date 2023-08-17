import { provideWidgetClass } from 'scrivito'

export const NavigationWidget = provideWidgetClass('NavigationWidget', {
  attributes: {
    metaNavigationObjs: 'referencelist',
    metaNavigationPortalOverview: 'reference',
    metaNavigationUserDescription: 'string',
    metaNavigationUserProfile: 'reference',
    metaNavigationUserTitle: 'string',
  },
})

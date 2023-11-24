import { provideWidgetClass } from 'scrivito'

export const NavigationWidget = provideWidgetClass('NavigationWidget', {
  attributes: {
    metaNavigationCart: 'reference',
    metaNavigationObjs: 'referencelist',
    metaNavigationPortalOverview: 'reference',
    metaNavigationSearchResultsPage: ['reference', { only: 'SearchResults' }],
    metaNavigationUserDescription: 'string',
    metaNavigationUserProfile: 'reference',
    metaNavigationUserTitle: 'string',
  },
})

export type NavigationWidgetInstance = InstanceType<typeof NavigationWidget>

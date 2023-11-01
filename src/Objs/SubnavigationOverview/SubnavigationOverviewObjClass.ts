import { provideObjClass } from 'scrivito'

export const SubnavigationOverview = provideObjClass('SubnavigationOverview', {
  attributes: {
    body: 'widgetlist',
    childOrder: 'referencelist',
    hideInNavigation: 'boolean',
    linkIcon: 'string',
    requireUserLogin: 'boolean',
    showTopContentSection: 'boolean',
    title: 'string',
    topBannerBackground: ['reference', { only: ['Image'] }],
    topContentSection: 'widgetlist',
  },
  extractTextAttributes: ['body'],
})

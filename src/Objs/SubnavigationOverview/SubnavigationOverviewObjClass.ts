import { provideObjClass } from 'scrivito'

export const SubnavigationOverview = provideObjClass('SubnavigationOverview', {
  attributes: {
    body: 'widgetlist',
    childOrder: 'referencelist',
    hideInNavigation: 'boolean',
    linkIcon: 'string',
    showTopContentSection: 'boolean',
    title: 'string',
    topContentSection: 'widgetlist',
  },
  extractTextAttributes: ['body'],
})

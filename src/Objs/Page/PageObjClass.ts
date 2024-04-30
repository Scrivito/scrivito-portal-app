import { provideObjClass } from 'scrivito'

export const Page = provideObjClass('Page', {
  attributes: {
    body: 'widgetlist',
    childOrder: 'referencelist',
    data: 'datalocator',
    excludeFromSearch: 'boolean',
    hideInNavigation: 'boolean',
    linkIcon: 'string',
    metaDataDescription: 'string',
    showAsLandingPage: 'boolean',
    title: 'string',
  },
  extractTextAttributes: ['body'],
})

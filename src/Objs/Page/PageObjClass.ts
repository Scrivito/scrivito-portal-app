import { provideObjClass } from 'scrivito'

export const Page = provideObjClass('Page', {
  attributes: {
    body: 'widgetlist',
    childOrder: 'referencelist',
    data: 'datalocator',
    hideInNavigation: 'boolean',
    linkIcon: 'string',
    showTopContentSection: 'boolean',
    title: 'string',
    topContentSection: 'widgetlist',
    requireUserLogin: 'boolean',
  },
  extractTextAttributes: ['body'],
})

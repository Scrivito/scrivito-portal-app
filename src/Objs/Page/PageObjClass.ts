import { provideObjClass } from 'scrivito'

export const Page = provideObjClass('Page', {
  attributes: {
    body: 'widgetlist',
    childOrder: 'referencelist',
    dataClass: 'string',
    hideInNavigation: 'boolean',
    linkIcon: 'string',
    showTopContentSection: 'boolean',
    title: 'string',
    topContentSection: 'widgetlist',
  },
  extractTextAttributes: ['body'],
})

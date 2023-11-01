import { provideObjClass } from 'scrivito'

export const Page = provideObjClass('Page', {
  attributes: {
    body: 'widgetlist',
    childOrder: 'referencelist',
    data: 'datalocator',
    hideInNavigation: 'boolean',
    linkIcon: 'string',
    title: 'string',
    requireUserLogin: 'boolean',
  },
  extractTextAttributes: ['body'],
})

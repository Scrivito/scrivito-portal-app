import { defaultPageAttributes } from '../defaultPageAttributes'
import { provideObjClass } from 'scrivito'

export const Page = provideObjClass('Page', {
  attributes: {
    ...defaultPageAttributes,
    body: 'widgetlist',
    data: 'datalocator',
    excludeFromSearch: 'boolean',
    hideInNavigation: 'boolean',
    linkIcon: 'string',
    showAsLandingPage: 'boolean',
  },
  extractTextAttributes: ['body'],
})

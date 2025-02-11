import { defaultPageAttributes } from '../defaultPageAttributes'
import { provideObjClass } from 'scrivito'

export const Page = provideObjClass('Page', {
  attributes: {
    ...defaultPageAttributes,
    body: 'widgetlist',
    data: 'datalocator',
    excludeFromSearch: 'boolean',
    hideInNavigation: 'boolean',
    showAsLandingPage: 'boolean',
    hideFooter: 'boolean',
  },
  extractTextAttributes: ['body'],
})

import { defaultPageAttributes } from '../defaultPageAttributes'
import { provideObjClass } from 'scrivito'

export const Page = provideObjClass('DAM', {
  attributes: {
    ...defaultPageAttributes,
    body: 'widgetlist',
    data: 'datalocator',
    excludeFromSearch: 'boolean',
    hideInNavigation: 'boolean',
    layoutIgnoreTopLevelLayout: 'boolean',
  },
  extractTextAttributes: ['body'],
})

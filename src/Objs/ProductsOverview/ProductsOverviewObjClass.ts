import { provideObjClass } from 'scrivito'
import { defaultPageAttributes } from '../defaultPageAttributes'

export const ProductsOverview = provideObjClass('ProductsOverview', {
  attributes: {
    ...defaultPageAttributes,
    body: 'widgetlist',
  },
  extractTextAttributes: ['body'],
})

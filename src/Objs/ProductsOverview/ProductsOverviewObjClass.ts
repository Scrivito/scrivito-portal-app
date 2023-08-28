import { provideObjClass } from 'scrivito'

export const ProductsOverview = provideObjClass('ProductsOverview', {
  attributes: {
    body: 'widgetlist',
    childOrder: 'referencelist',
    showTopContentSection: 'boolean',
    title: 'string',
    topContentSection: 'widgetlist',
  },
  extractTextAttributes: ['body'],
})

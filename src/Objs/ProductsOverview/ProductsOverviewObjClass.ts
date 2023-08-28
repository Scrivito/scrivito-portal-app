import { provideObjClass } from 'scrivito'

export const ProductsOverview = provideObjClass('ProductsOverview', {
  attributes: {
    childOrder: 'referencelist',
    showTopContentSection: 'boolean',
    title: 'string',
    topContentSection: 'widgetlist',
  },
})

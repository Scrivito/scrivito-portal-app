import { provideObjClass } from 'scrivito'

export const ProductsOverview = provideObjClass('ProductsOverview', {
  attributes: {
    body: 'widgetlist',
    childOrder: 'referencelist',
    title: 'string',
    topBannerBackground: ['reference', { only: ['Image'] }],
  },
  extractTextAttributes: ['body'],
})

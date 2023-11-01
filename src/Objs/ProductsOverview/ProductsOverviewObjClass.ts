import { provideObjClass } from 'scrivito'

export const ProductsOverview = provideObjClass('ProductsOverview', {
  attributes: {
    body: 'widgetlist',
    childOrder: 'referencelist',
    showTopContentSection: 'boolean',
    title: 'string',
    topBannerBackground: ['reference', { only: ['Image'] }],
    topContentSection: 'widgetlist',
  },
  extractTextAttributes: ['body'],
})

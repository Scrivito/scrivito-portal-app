import { provideObjClass } from 'scrivito'

export const Product = provideObjClass('Product', {
  attributes: {
    childOrder: 'referencelist',
    dataSection: 'widgetlist',
    dataSectionLabel: 'string',
    descriptionSection: 'widgetlist',
    descriptionSectionLabel: 'string',
    downloadsSection: 'widgetlist',
    downloadsSectionLabel: 'string',
    image: ['reference', { only: ['Image'] }],
    parameters: ['widgetlist', { only: ['ProductParameterWidget'] }],
    subtitle: 'string',
    suitableAccessories: ['referencelist', { only: 'Product' }],
    suitableAccessoriesLabel: 'string',
    title: 'string',
  },
  extractTextAttributes: [
    'subtitle',
    'descriptionSectionLabel',
    'descriptionSection',
    'dataSectionLabel',
    'dataSection',
    'downloadsSectionLabel',
    'downloadsSection',
  ],
})

export type ProductInstance = InstanceType<typeof Product>

export function isProduct(input: unknown): input is ProductInstance {
  return input instanceof Product
}

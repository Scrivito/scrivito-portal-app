import { provideObjClass } from 'scrivito'
import { defaultPageAttributes } from '../defaultPageAttributes'

export const Product = provideObjClass('Product', {
  attributes: {
    ...defaultPageAttributes,
    dataSection: 'widgetlist',
    descriptionSection: 'widgetlist',
    downloadsSection: 'widgetlist',
    image: ['reference', { only: ['Image'] }],
    parameters: ['widgetlist', { only: ['ProductParameterWidget'] }],
    subtitle: 'string',
    suitableAccessories: ['referencelist', { only: 'Product' }],
  },
  extractTextAttributes: [
    'subtitle',
    'descriptionSection',
    'dataSection',
    'downloadsSection',
  ],
})

export type ProductInstance = InstanceType<typeof Product>

export function isProduct(input: unknown): input is ProductInstance {
  return input instanceof Product
}

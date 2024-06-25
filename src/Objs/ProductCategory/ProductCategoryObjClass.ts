import { provideObjClass } from 'scrivito'
import { defaultPageAttributes } from '../defaultPageAttributes'

export const ProductCategory = provideObjClass('ProductCategory', {
  attributes: {
    ...defaultPageAttributes,
    description: 'string',
    image: ['reference', { only: ['Image'] }],
  },
  extractTextAttributes: ['description'],
})

export type ProductCategoryInstance = InstanceType<typeof ProductCategory>

export function isProductCategory(
  input: unknown,
): input is ProductCategoryInstance {
  return input instanceof ProductCategory
}

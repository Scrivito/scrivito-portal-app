import { provideObjClass } from 'scrivito'
import { defaultPageAttributes } from '../defaultPageAttributes'

export const ProductCategory = provideObjClass('ProductCategory', {
  attributes: {
    ...defaultPageAttributes,
    image: ['reference', { only: ['Image'] }],
  },
  extractTextAttributes: ['metaDataDescription'],
})

export type ProductCategoryInstance = InstanceType<typeof ProductCategory>

export function isProductCategory(
  input: unknown,
): input is ProductCategoryInstance {
  return input instanceof ProductCategory
}

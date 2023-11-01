import { provideObjClass } from 'scrivito'

export const ProductCategory = provideObjClass('ProductCategory', {
  attributes: {
    childOrder: 'referencelist',
    description: 'string',
    image: ['reference', { only: ['Image'] }],
    title: 'string',
  },
})

export type ProductCategoryInstance = InstanceType<typeof ProductCategory>

export function isProductCategory(
  input: unknown,
): input is ProductCategoryInstance {
  return input instanceof ProductCategory
}

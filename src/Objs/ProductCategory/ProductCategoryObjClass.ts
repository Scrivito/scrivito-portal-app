import { provideObjClass } from 'scrivito'

export const ProductCategory = provideObjClass('ProductCategory', {
  attributes: {
    childOrder: 'referencelist',
    description: 'string',
    image: ['reference', { only: ['Image'] }],
    showTopContentSection: 'boolean',
    title: 'string',
    topContentSection: 'widgetlist',
  },
})

export type ProductCategoryInstance = InstanceType<typeof ProductCategory>

export function isProductCategory(
  input: unknown,
): input is ProductCategoryInstance {
  return input instanceof ProductCategory
}

import { provideObjClass } from 'scrivito'

export const ProductCategory = provideObjClass('ProductCategory', {
  attributes: {
    childOrder: 'referencelist',
    description: 'string',
    headline: 'string',
    image: ['reference', { only: ['Image'] }],
    resultsHeadline: 'string',
    resultsHeadline0: 'string',
    resultsHeadline1: 'string',
    title: 'string',
  },
  extractTextAttributes: ['description'],
})

export type ProductCategoryInstance = InstanceType<typeof ProductCategory>

export function isProductCategory(
  input: unknown,
): input is ProductCategoryInstance {
  return input instanceof ProductCategory
}

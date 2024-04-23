import { provideEditingConfig } from 'scrivito'
import { ProductCategory } from './ProductCategoryObjClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(ProductCategory, {
  title: 'Product Category',
  thumbnail: Thumbnail,
  attributes: {
    resultsHeadline0: { title: 'Headline for 0 results' },
    resultsHeadline1: { title: 'Headline for 1 result' },
    resultsHeadline: {
      title: 'Headline for multiple results',
      description:
        'The placeholder __count__ represents the total number of results.',
    },
    title: { title: 'Title' },
  },
  properties: [
    'title',
    'description',
    'image',
    'resultsHeadline0',
    'resultsHeadline1',
    'resultsHeadline',
  ],
  thumbnailForContent: (obj) => obj.get('image'),
  initialContent: {
    headline: 'Product category',
    resultsHeadline: '__count__ items',
    resultsHeadline0: 'No items',
    resultsHeadline1: '1 item',
  },
})

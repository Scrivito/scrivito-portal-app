import { provideEditingConfig } from 'scrivito'
import { ProductCategory } from './ProductCategoryObjClass'
import { classNameToThumbnail } from '../../utils/classNameToThumbnail'
import Thumbnail from './thumbnail.svg'
provideEditingConfig(ProductCategory, {
  title: 'Product Category',
  thumbnail: Thumbnail,
  attributes: {
    title: { title: 'Title' },
  },
  properties: ['title', 'description', 'image'],
  thumbnailForContent: (obj) => obj.get('image'),
})

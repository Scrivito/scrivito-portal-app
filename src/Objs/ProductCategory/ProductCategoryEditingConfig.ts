import { provideEditingConfig } from 'scrivito'
import { ProductCategory } from './ProductCategoryObjClass'
import { classNameToThumbnail } from '../../utils/classNameToThumbnail'

provideEditingConfig(ProductCategory, {
  title: 'Product Category',
  thumbnail: classNameToThumbnail('ProductCategory'),
  attributes: {
    title: { title: 'Title' },
  },
  properties: ['title', 'description', 'image'],
  thumbnailForContent: (obj) => obj.get('image'),
})

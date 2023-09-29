import { provideEditingConfig } from 'scrivito'
import { Product } from './ProductObjClass'
import { classNameToThumbnail } from '../../utils/classNameToThumbnail'

provideEditingConfig(Product, {
  title: 'Product',
  thumbnail: classNameToThumbnail('Product'),
  properties: ['title', 'image', 'parameters', 'suitableAccessories'],
  thumbnailForContent: (obj) => obj.get('image'),
})

import { provideEditingConfig } from 'scrivito'
import { Product } from './ProductObjClass'
import { classNameToThumbnail } from '../../utils/classNameToThumbnail'

provideEditingConfig(Product, {
  title: 'Product',
  thumbnail: classNameToThumbnail('Product'),
  attributes: {
    image: { title: 'Image' },
    subtitle: { title: 'Subtitle' },
    title: { title: 'Title' },
  },
  properties: [
    'title',
    'subtitle',
    'image',
    'parameters',
    'suitableAccessories',
  ],
  thumbnailForContent: (obj) => obj.get('image'),
})

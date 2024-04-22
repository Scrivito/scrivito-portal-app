import { provideEditingConfig } from 'scrivito'
import { Product } from './ProductObjClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(Product, {
  title: 'Product',
  thumbnail: Thumbnail,
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
  initialContent: {
    dataSectionLabel: 'Data',
    descriptionSectionLabel: 'Description',
    downloadsSectionLabel: 'Downloads',
    suitableAccessoriesLabel: 'Suitable accessories',
  },
})

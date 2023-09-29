import { provideEditingConfig } from 'scrivito'
import { ProductCategory } from './ProductCategoryObjClass'
import { classNameToThumbnail } from '../../utils/classNameToThumbnail'

provideEditingConfig(ProductCategory, {
  title: 'Product Category',
  thumbnail: classNameToThumbnail('ProductCategory'),
  attributes: {
    showTopContentSection: {
      title: 'Show top content section?',
      description:
        'This section will be visible before the regular content and a potential sub-navigation',
    },
    title: { title: 'Title' },
  },
  properties: ['title', 'description', 'image', 'showTopContentSection'],
  thumbnailForContent: (obj) => obj.get('image'),
})

import { provideEditingConfig } from 'scrivito'
import { ProductsOverview } from './ProductsOverviewObjClass'
import { classNameToThumbnail } from '../../utils/classNameToThumbnail'

provideEditingConfig(ProductsOverview, {
  title: 'Products Overview',
  thumbnail: classNameToThumbnail('ProductsOverview'),
  attributes: {
    showTopContentSection: {
      title: 'Show top content section?',
      description:
        'This section will be visible before the regular content and a potential sub-navigation',
    },
    title: { title: 'Title' },
  },
  properties: ['title', 'showTopContentSection'],
})

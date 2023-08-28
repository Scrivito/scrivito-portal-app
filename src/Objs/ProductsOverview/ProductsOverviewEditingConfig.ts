import { provideEditingConfig } from 'scrivito'
import { ProductsOverview } from './ProductsOverviewObjClass'

provideEditingConfig(ProductsOverview, {
  title: 'Products overview',
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

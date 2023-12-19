import { provideEditingConfig } from 'scrivito'
import { ProductsOverview } from './ProductsOverviewObjClass'
import { classNameToThumbnail } from '../../utils/classNameToThumbnail'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(ProductsOverview, {
  title: 'Products Overview',
  thumbnail: Thumbnail,
  attributes: {
    title: { title: 'Title' },
    topBannerBackground: {
      title: 'Top banner background',
      description:
        'This background will be shown on this page and all sub-pages',
    },
  },
  properties: ['title', 'topBannerBackground'],
})

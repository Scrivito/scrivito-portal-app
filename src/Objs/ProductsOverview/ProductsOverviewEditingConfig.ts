import { provideEditingConfig } from 'scrivito'
import { ProductsOverview } from './ProductsOverviewObjClass'
import Thumbnail from './thumbnail.svg'
import {
  defaultPageEditingConfigAttributes,
  defaultPageInitialContent,
  defaultPageProperties,
  defaultPagePropertiesGroups,
  defaultPageValidations,
} from '../defaultPageEditingConfig'

provideEditingConfig(ProductsOverview, {
  title: 'Products Overview',
  thumbnail: Thumbnail,
  attributes: {
    ...defaultPageEditingConfigAttributes,
    topBannerBackground: {
      title: 'Top banner background',
      description:
        'This background will be shown on this page and all sub-pages',
    },
  },
  properties: [...defaultPageProperties, 'topBannerBackground'],
  propertiesGroups: defaultPagePropertiesGroups,
  initialContent: defaultPageInitialContent,
  validations: defaultPageValidations,
})

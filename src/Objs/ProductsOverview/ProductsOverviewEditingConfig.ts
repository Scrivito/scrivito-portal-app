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
  },
  properties: defaultPageProperties,
  propertiesGroups: defaultPagePropertiesGroups,
  initialContent: defaultPageInitialContent,
  validations: defaultPageValidations,
})

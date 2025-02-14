import { provideEditingConfig } from 'scrivito'
import { ProductCategory } from './ProductCategoryObjClass'
import Thumbnail from './thumbnail.svg'
import {
  defaultPageEditingConfigAttributes,
  defaultPageInitialContent,
  defaultPageProperties,
  defaultPagePropertiesGroups,
  defaultPageValidations,
} from '../defaultPageEditingConfig'

provideEditingConfig(ProductCategory, {
  title: 'Product Category',
  thumbnail: Thumbnail,
  attributes: defaultPageEditingConfigAttributes,
  properties: [...defaultPageProperties, 'image'],
  propertiesGroups: defaultPagePropertiesGroups,
  thumbnailForContent: (obj) => obj.get('image'),
  initialContent: defaultPageInitialContent,
  validations: defaultPageValidations,
})

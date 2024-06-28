import { provideEditingConfig } from 'scrivito'
import { Product } from './ProductObjClass'
import Thumbnail from './thumbnail.svg'
import {
  defaultPageEditingConfigAttributes,
  defaultPageInitialContent,
  defaultPageProperties,
  defaultPagePropertiesGroups,
  defaultPageValidations,
} from '../defaultPageEditingConfig'

provideEditingConfig(Product, {
  title: 'Product',
  thumbnail: Thumbnail,
  attributes: {
    ...defaultPageEditingConfigAttributes,
    image: { title: 'Image' },
    subtitle: { title: 'Subtitle' },
  },
  properties: [
    ...defaultPageProperties,
    'subtitle',
    'image',
    'parameters',
    'suitableAccessories',
  ],
  propertiesGroups: defaultPagePropertiesGroups,
  thumbnailForContent: (obj) => obj.get('image'),
  initialContent: defaultPageInitialContent,
  validations: defaultPageValidations,
})

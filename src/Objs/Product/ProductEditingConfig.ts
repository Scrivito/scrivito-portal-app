import { provideEditingConfig } from 'scrivito'
import { Product } from './ProductObjClass'

provideEditingConfig(Product, {
  title: 'Product',
  properties: ['title', 'image', 'parameters', 'suitableAccessories'],
})

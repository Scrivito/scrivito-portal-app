import { provideEditingConfig } from 'scrivito'
import { CartItem } from './CartItemDataClass'

provideEditingConfig(CartItem, {
  title: 'Cart Item',
  attributes: {
    productId: {
      title: 'Product ID',
    },
  },
})

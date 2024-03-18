import { provideEditingConfig } from 'scrivito'
import { CartItem } from './CartItemDataClass'

provideEditingConfig(CartItem, {
  title: 'Cart item',
  attributes: {
    productId: {
      title: 'Product ID',
    },
  },
})

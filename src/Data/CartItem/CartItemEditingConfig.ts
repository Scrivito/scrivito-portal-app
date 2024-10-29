import { provideEditingConfig } from 'scrivito'
import { CartItem } from './CartItemDataClass'

provideEditingConfig(CartItem, {
  title: 'Cart item',
  attributes: {
    // TODO: Remove the following attributes, once #11338 is resolved:
    product: { title: 'Product' },
  },
})

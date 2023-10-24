import { DataItem, isUserLoggedIn, load } from 'scrivito'
import { ProductInstance } from '../../Objs/Product/ProductObjClass'
import { CartItem } from './CartItemDataClass'

export function addToCart(product: ProductInstance): void {
  const productId = product.id()

  // @ts-expect-error until out of private beta
  CartItem.create({ productId })
}

export async function removeFromCart(product: ProductInstance): Promise<void> {
  const productId = product.id()

  const items: DataItem[] = await load(() =>
    // @ts-expect-error until out of private beta
    CartItem.all().transform({ filters: { productId } }).take(),
  )

  items.forEach((item) => item.delete())
}

export function isInCart(product: ProductInstance): boolean {
  if (!isUserLoggedIn()) return false // TODO: remove, once CartItem itself requires a login

  const productId = product.id()

  // @ts-expect-error until out of private beta
  return CartItem.all().transform({ filters: { productId } }).containsData()
}

export function containsItems(): boolean {
  if (!isUserLoggedIn()) return false // TODO: remove, once CartItem itself requires a login

  // @ts-expect-error until out of private beta
  return CartItem.all().containsData()
}

export async function checkoutCart(): Promise<void> {
  // @ts-expect-error until out of private beta
  const cartItems: DataItem[] = await load(() => CartItem.all().take())

  const checkedOutItems = cartItems.map((item) => ({
    productId: item.get('productId'),
  }))
  // push checkedOutItems to your favorite backend
  console.log('Checked out', checkedOutItems)

  const deletePromises = cartItems.map((item) => item.delete())
  await Promise.all(deletePromises)
}

import {
  DataItem,
  currentLanguage,
  currentUser,
  isUserLoggedIn,
  load,
} from 'scrivito'
import { ProductInstance } from '../../Objs/Product/ProductObjClass'
import { CartItem } from './CartItemDataClass'
import { Opportunity } from '../Opportunity/OpportunityDataClass'
import { isDataItem } from '../types'

export async function addToCart(product: ProductInstance): Promise<void> {
  const productId = product.id()

  await CartItem.create({ product: productId })
}

export async function removeFromCart(product: ProductInstance): Promise<void> {
  const productId = product.id()

  const items: DataItem[] = await load(() =>
    CartItem.all()
      .transform({ filters: { product: productId } })
      .take(),
  )

  items.forEach((item) => item.delete())
}

export function isInCart(product: ProductInstance): boolean {
  if (!isUserLoggedIn()) return false // TODO: remove, once CartItem itself requires a login

  const productId = product.id()

  return CartItem.all()
    .transform({ filters: { product: productId } })
    .containsData()
}

export function containsItems(): boolean {
  if (!isUserLoggedIn()) return false // TODO: remove, once CartItem itself requires a login

  return CartItem.all().containsData()
}

export function numberOfCartItems(): number | null {
  if (!isUserLoggedIn()) return 0 // TODO: remove, once CartItem itself requires a login

  return CartItem.all().count()
}

export async function checkoutCart(): Promise<DataItem> {
  const cartItems: DataItem[] = await load(() => CartItem.all().take())

  const products: DataItem[] = cartItems
    .map((item) => item.get('product'))
    .filter(isDataItem)

  const keyword = await getTitle()
  const description = products
    .map((product) => `1 × ${product.get('title')} (ID: ${product.id()})`)
    .join('\n')

  const opportunity = await Opportunity.create({ keyword, description })

  const deletePromises = cartItems.map((item) => item.delete())
  await Promise.all(deletePromises)

  return opportunity
}

async function getTitle() {
  const name = await load(() => currentUser()?.name())

  switch (await load(currentLanguage)) {
    case 'de':
      return `${name}s Warenkorb vom ${new Date().toLocaleString('de')}`
    default:
      return `${name}’s shopping cart of ${new Date().toLocaleString('en')}`
  }
}

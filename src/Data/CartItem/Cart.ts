import {
  DataItem,
  currentLanguage,
  currentUser,
  isUserLoggedIn,
  load,
} from 'scrivito'
import { Product, ProductInstance } from '../../Objs/Product/ProductObjClass'
import { CartItem } from './CartItemDataClass'
import { OpportunityPromise } from '../Opportunity/OpportunityDataClass'

export async function addToCart(product: ProductInstance): Promise<void> {
  const productId = product.id()

  // @ts-expect-error until out of private beta
  await CartItem.create({ productId })
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

export function numberOfCartItems(): number {
  if (!isUserLoggedIn()) return 0 // TODO: remove, once CartItem itself requires a login

  // @ts-expect-error until out of private beta
  return CartItem.all().count()
}

export async function checkoutCart(): Promise<DataItem> {
  // @ts-expect-error until out of private beta
  const cartItems: DataItem[] = await load(() => CartItem.all().take())

  const products: ProductInstance[] = []
  for (const item of cartItems) {
    const productId = item.get('productId')
    if (typeof productId !== 'string') continue

    const product = await load(() => Product.get(productId))
    if (product) products.push(product)
  }

  const keyword = await getTitle()
  const description = products
    .map((product) => `1 × ${product.get('title')} (ID: ${product.id()})`)
    .join('\n')

  const Opportunity = await OpportunityPromise
  // @ts-expect-error until out of private beta
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

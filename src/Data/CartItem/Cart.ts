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
import { ensureString } from '../../utils/ensureString'

export async function addToCart(product: ProductInstance): Promise<void> {
  const item = await load(() => findInCart(product))

  if (item) {
    item.update({ quantity: Number(item.get('quantity')) + 1 })
    return
  }

  const productId = product.id()

  await CartItem.create({
    product: productId,
    quantity: 1,
    title: product.get('title'),
  })
}

export async function subtractFromCart(
  product: ProductInstance,
): Promise<void> {
  const item = await load(() => findInCart(product))
  const quantity = Number(item?.get('quantity'))
  return item?.update({ quantity: quantity - 1 })
}

export async function updateQuantityInCart(
  product: ProductInstance,
  quantity: number,
): Promise<void> {
  const item = await load(() => findInCart(product))
  return item?.update({ quantity })
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

export function quantityInCart(product: ProductInstance): number {
  return Number(findInCart(product)?.get('quantity'))
}

function findInCart(product: ProductInstance) {
  if (!isUserLoggedIn()) return // TODO: remove, once CartItem itself requires a login

  return CartItem.all()
    .transform({ filters: { product: product.id() }, limit: 1 })
    .take()?.[0]
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

  const cartItemDetails: { id: string; quantity: number; title: string }[] =
    await load(() =>
      cartItems
        .map((item) => {
          const product = item.get('product')
          return product instanceof DataItem
            ? {
                id: product.id(),
                quantity: Number(item.get('quantity')),
                title: ensureString(product.get('title')),
              }
            : null
        })
        .filter((value) => !!value),
    )

  const keyword = await getTitle()
  const description = cartItemDetails
    .map(({ id, quantity, title }) => `${quantity} × ${title} (ID: ${id})`)
    .join('\n')

  const opportunity = await Opportunity.create({ keyword, description })

  const deletePromises = cartItems.map((item) => item.delete())
  await Promise.all(deletePromises)

  return opportunity
}

async function getTitle() {
  const name = await load(() => currentUser()?.name())

  if (name === undefined) throw new Error('Missing current user.')

  switch (await load(currentLanguage)) {
    case 'de':
      return `${name}s Warenkorb vom ${new Date().toLocaleString('de')}`
    default:
      return `${name}’s shopping cart of ${new Date().toLocaleString('en')}`
  }
}

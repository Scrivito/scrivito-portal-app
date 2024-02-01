import { DataItem, isUserLoggedIn, load } from 'scrivito'
import { Product, ProductInstance } from '../../Objs/Product/ProductObjClass'
import { CartItem } from './CartItemDataClass'
import { Ticket } from '../Ticket/TicketDataClass'

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
  return CartItem.all().take().length
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

  const ticketMessage = `This is an automatically generated message.

I would like to request a quote with the following items:
${products
  .map(
    (product) =>
      '- ' +
      [product.get('title'), product.get('subtitle')].join(' - ') +
      ' (ID: ' +
      product.id() +
      ')',
  )
  .join('\n')}

Please send me a quote.
`

  // @ts-expect-error until out of private beta
  const ticket = await Ticket.create({
    title: 'Quote request',
    description: ticketMessage,
  })

  const deletePromises = cartItems.map((item) => item.delete())
  await Promise.all(deletePromises)

  return ticket
}

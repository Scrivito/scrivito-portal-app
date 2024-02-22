import { provideDataClass } from 'scrivito'
import { pisaClient } from '../pisaClient'

const orderClient = pisaClient('order')

export const Order = provideDataClass('Order', {
  // @ts-expect-error until out of private beta
  restApi: orderClient,
})

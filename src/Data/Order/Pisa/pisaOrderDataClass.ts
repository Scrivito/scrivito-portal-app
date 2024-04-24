import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'

export function pisaOrderDataClass() {
  const orderClient = pisaClient('order')

  return provideDataClass('Order', {
    // @ts-expect-error until out of private beta
    restApi: orderClient,
  })
}

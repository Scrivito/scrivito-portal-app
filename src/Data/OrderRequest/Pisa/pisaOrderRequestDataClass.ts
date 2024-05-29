import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'

export function pisaOrderRequestDataClass() {
  const orderRequestClient = pisaClient('order-request')

  return provideDataClass('OrderRequest', {
    // @ts-expect-error until out of private beta
    restApi: orderRequestClient,
  })
}

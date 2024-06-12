import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'

export async function pisaOrderRequestDataClass() {
  const orderRequestClient = await pisaClient('order-request')

  return provideDataClass('OrderRequest', { restApi: orderRequestClient })
}

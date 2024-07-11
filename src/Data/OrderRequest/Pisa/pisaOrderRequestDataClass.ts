import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export async function pisaOrderRequestDataClass() {
  const orderRequestConfig = await pisaConfig('order-request')

  return provideDataClass('OrderRequest', {
    restApi: orderRequestConfig,
    attributes: {},
  })
}

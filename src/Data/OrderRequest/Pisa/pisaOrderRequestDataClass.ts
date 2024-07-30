import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export async function pisaOrderRequestDataClass() {
  return provideDataClass('OrderRequest', {
    restApi: pisaConfig('order-request'),
    attributes: {},
  })
}

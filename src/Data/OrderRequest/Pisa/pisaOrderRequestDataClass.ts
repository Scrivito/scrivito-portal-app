import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export function pisaOrderRequestDataClass() {
  return provideDataClass('OrderRequest', {
    restApi: pisaConfig('order-request'),
    attributes: {},
  })
}

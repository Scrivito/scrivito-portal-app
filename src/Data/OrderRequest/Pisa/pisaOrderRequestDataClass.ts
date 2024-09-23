import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { fetchAndFilterAttributes } from '../../fetchAndFilterAttributes'

export function pisaOrderRequestDataClass() {
  return provideDataClass('OrderRequest', {
    restApi: pisaConfig('order-request'),
    attributes: () => fetchAndFilterAttributes('order-request'),
  })
}

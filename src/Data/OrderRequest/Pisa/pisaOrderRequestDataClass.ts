import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { filterSchema } from '../../filterSchema'

export function pisaOrderRequestDataClass() {
  return provideDataClass('OrderRequest', {
    restApi: pisaConfig('order-request'),
    attributes: () => filterSchema('order-request'),
  })
}

import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { DataClassAttributes } from '../../types'

export function pisaOrderRequestDataClass(attributes: DataClassAttributes) {
  return provideDataClass('OrderRequest', {
    restApi: pisaConfig('order-request'),
    attributes,
  })
}

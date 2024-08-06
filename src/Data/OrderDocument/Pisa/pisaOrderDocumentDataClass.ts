import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { DataClassAttributes } from '../../types'

export function pisaOrderDocumentDataClass(attributes: DataClassAttributes) {
  return provideDataClass('OrderDocument', {
    restApi: pisaConfig('order-document'),
    attributes,
  })
}

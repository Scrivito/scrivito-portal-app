import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export function pisaOrderDocumentDataClass() {
  return provideDataClass('OrderDocument', {
    restApi: pisaConfig('order-document'),
  })
}

import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export async function pisaOrderDocumentDataClass() {
  return provideDataClass('OrderDocument', {
    restApi: pisaConfig('order-document'),
    attributes: {},
  })
}

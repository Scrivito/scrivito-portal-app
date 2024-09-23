import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { fetchAndFilterAttributes } from '../../fetchAndFilterAttributes'

export function pisaOrderDocumentDataClass() {
  return provideDataClass('OrderDocument', {
    restApi: pisaConfig('order-document'),
    attributes: () => fetchAndFilterAttributes('order-document'),
  })
}

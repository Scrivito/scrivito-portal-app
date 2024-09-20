import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { filterSchema } from '../../filterSchema'

export function pisaOrderDocumentDataClass() {
  return provideDataClass('OrderDocument', {
    restApi: pisaConfig('order-document'),
    attributes: () => filterSchema('order-document'),
  })
}

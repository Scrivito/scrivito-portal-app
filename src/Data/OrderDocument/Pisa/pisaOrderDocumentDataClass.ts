import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export async function pisaOrderDocumentDataClass() {
  const orderDocumentConfig = await pisaConfig('order-document')

  return provideDataClass('OrderDocument', {
    restApi: orderDocumentConfig,
    attributes: {},
  })
}

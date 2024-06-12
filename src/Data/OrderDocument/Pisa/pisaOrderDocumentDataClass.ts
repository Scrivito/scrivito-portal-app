import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'

export async function pisaOrderDocumentDataClass() {
  const orderDocumentClient = await pisaClient('order-document')

  return provideDataClass('OrderDocument', {
    restApi: orderDocumentClient,
  })
}

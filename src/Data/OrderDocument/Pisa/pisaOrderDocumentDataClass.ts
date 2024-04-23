import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'

export function pisaOrderDocumentDataClass() {
  const orderDocumentClient = pisaClient('order-document')

  return provideDataClass('OrderDocument', {
    // @ts-expect-error until out of private beta
    restApi: orderDocumentClient,
  })
}

import { provideDataClass } from 'scrivito'
import { pisaClient } from '../pisaClient'

const orderDocumentClient = pisaClient('order-document')

export const OrderDocument = provideDataClass('OrderDocument', {
  // @ts-expect-error until out of private beta
  restApi: orderDocumentClient,
})

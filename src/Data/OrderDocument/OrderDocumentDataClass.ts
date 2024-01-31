import { provideDataClass } from 'scrivito'

const apiPath = '../pisa-api/order-document'

// @ts-expect-error until out of private beta
export const OrderDocument = provideDataClass('OrderDocument', { apiPath })

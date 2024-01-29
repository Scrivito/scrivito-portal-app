import { provideDataClass } from 'scrivito'

const apiPath = '../pisa-api/order'

// @ts-expect-error until out of private beta
export const Order = provideDataClass('Order', { apiPath })

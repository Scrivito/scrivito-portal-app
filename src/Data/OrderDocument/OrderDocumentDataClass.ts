import { provideDataClass } from 'scrivito'
import { scrivitoTenantId } from '../../config/scrivitoTenantId'

const apiPath = `../pisa-api/${scrivitoTenantId().tenant}/order-document`

// @ts-expect-error until out of private beta
export const OrderDocument = provideDataClass('OrderDocument', { apiPath })

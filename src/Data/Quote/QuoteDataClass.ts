import { provideDataClass } from 'scrivito'
import { scrivitoTenantId } from '../../config/scrivitoTenantId'

const apiPath = `../pisa-api/${scrivitoTenantId().tenant}/quote`

// @ts-expect-error until out of private beta
export const Quote = provideDataClass('Quote', { apiPath })

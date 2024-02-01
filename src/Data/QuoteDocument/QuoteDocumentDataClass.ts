import { provideDataClass } from 'scrivito'
import { scrivitoTenantId } from '../../config/scrivitoTenantId'

const apiPath = `../pisa-api/${scrivitoTenantId().tenant}/quote-document`

// @ts-expect-error until out of private beta
export const QuoteDocument = provideDataClass('QuoteDocument', { apiPath })

import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'

export function pisaQuoteDataClass() {
  const orderClient = pisaClient('quote')

  return provideDataClass('Quote', {
    // @ts-expect-error until out of private beta
    restApi: orderClient,
  })
}

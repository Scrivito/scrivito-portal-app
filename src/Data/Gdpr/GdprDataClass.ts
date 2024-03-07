import { provideDataClass } from 'scrivito'
import { pisaClient } from '../pisaClient'

const gdprClient = pisaClient('gdpr')

export const Gdpr = provideDataClass('Gdpr', {
  // @ts-expect-error until out of private beta
  restApi: gdprClient,
})

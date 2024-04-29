import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'

export function pisaGdprDataClass() {
  const gdprClient = pisaClient('gdpr')

  return provideDataClass('Gdpr', {
    // @ts-expect-error until out of private beta
    restApi: gdprClient,
  })
}

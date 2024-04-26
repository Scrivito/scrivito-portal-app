import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'

export function pisaEventRegistrationDataClass() {
  const eventRegistrationClient = pisaClient('event-registration')

  return provideDataClass('EventRegistration', {
    // @ts-expect-error until out of private beta
    restApi: eventRegistrationClient,
  })
}

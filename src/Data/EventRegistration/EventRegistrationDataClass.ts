import { provideDataClass } from 'scrivito'
import { pisaClient } from '../pisaClient'

const eventRegistrationClient = pisaClient('event-registration')

export const EventRegistration = provideDataClass('EventRegistration', {
  // @ts-expect-error until out of private beta
  restApi: eventRegistrationClient,
})

import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'

export async function pisaEventRegistrationDataClass() {
  const eventRegistrationClient = pisaClient('event-registration')

  return provideDataClass('EventRegistration', {
    restApi: eventRegistrationClient,
  })
}

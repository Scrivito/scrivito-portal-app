import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'

export async function pisaEventRegistrationDataClass() {
  const eventRegistrationClient = await pisaClient('event-registration')

  return provideDataClass('EventRegistration', {
    restApi: eventRegistrationClient,
  })
}

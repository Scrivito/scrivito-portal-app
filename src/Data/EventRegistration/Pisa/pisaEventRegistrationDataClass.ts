import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export async function pisaEventRegistrationDataClass() {
  const eventRegistrationConfig = await pisaConfig('event-registration')

  return provideDataClass('EventRegistration', {
    restApi: eventRegistrationConfig,
    attributes: {},
  })
}

import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export async function pisaEventRegistrationDataClass() {
  return provideDataClass('EventRegistration', {
    restApi: pisaConfig('event-registration'),
    attributes: {},
  })
}

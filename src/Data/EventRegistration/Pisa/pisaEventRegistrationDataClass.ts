import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export function pisaEventRegistrationDataClass() {
  return provideDataClass('EventRegistration', {
    restApi: pisaConfig('event-registration'),
    attributes: {},
  })
}

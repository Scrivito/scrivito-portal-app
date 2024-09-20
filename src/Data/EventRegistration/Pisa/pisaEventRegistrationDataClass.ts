import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { filterSchema } from '../../filterSchema'

export function pisaEventRegistrationDataClass() {
  return provideDataClass('EventRegistration', {
    restApi: pisaConfig('event-registration'),
    attributes: () => filterSchema('event-registration'),
  })
}

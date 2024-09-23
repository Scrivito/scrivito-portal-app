import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { fetchAndFilterAttributes } from '../../fetchAndFilterAttributes'

export function pisaEventRegistrationDataClass() {
  return provideDataClass('EventRegistration', {
    restApi: pisaConfig('event-registration'),
    attributes: () => fetchAndFilterAttributes('event-registration'),
  })
}

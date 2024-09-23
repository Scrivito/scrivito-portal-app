import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { fetchAndFilterAttributes } from '../../fetchAndFilterAttributes'

export function pisaEventDataClass() {
  return provideDataClass('Event', {
    restApi: pisaConfig('event'),
    attributes: () => fetchAndFilterAttributes('event'),
  })
}

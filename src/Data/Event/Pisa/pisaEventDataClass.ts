import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { filterSchema } from '../../filterSchema'

export function pisaEventDataClass() {
  return provideDataClass('Event', {
    restApi: pisaConfig('event'),
    attributes: () => filterSchema('event'),
  })
}

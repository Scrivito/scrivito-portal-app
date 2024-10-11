import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export function pisaEventDataClass() {
  return provideDataClass('Event', { restApi: pisaConfig('event') })
}

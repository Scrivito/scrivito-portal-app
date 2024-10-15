import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export function pisaMessageDataClass() {
  return provideDataClass('Message', { restApi: pisaConfig('message') })
}

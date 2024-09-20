import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { filterSchema } from '../../filterSchema'

export function pisaMessageDataClass() {
  return provideDataClass('Message', {
    restApi: pisaConfig('message'),
    attributes: () => filterSchema('message'),
  })
}

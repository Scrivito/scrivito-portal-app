import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { fetchAndFilterAttributes } from '../../fetchAndFilterAttributes'

export function pisaMessageDataClass() {
  return provideDataClass('Message', {
    restApi: pisaConfig('message'),
    attributes: () => fetchAndFilterAttributes('message'),
  })
}

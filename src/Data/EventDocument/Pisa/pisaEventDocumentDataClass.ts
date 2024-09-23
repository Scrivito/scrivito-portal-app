import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { fetchAndFilterAttributes } from '../../fetchAndFilterAttributes'

export function pisaEventDocumentDataClass() {
  return provideDataClass('EventDocument', {
    restApi: pisaConfig('event-document'),
    attributes: () => fetchAndFilterAttributes('event-document'),
  })
}

import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export async function pisaEventDocumentDataClass() {
  return provideDataClass('EventDocument', {
    restApi: pisaConfig('event-document'),
    attributes: {},
  })
}

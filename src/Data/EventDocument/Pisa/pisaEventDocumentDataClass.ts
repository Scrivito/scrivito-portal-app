import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export function pisaEventDocumentDataClass() {
  return provideDataClass('EventDocument', {
    restApi: pisaConfig('event-document'),
  })
}

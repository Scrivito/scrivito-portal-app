import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { filterSchema } from '../../filterSchema'

export function pisaEventDocumentDataClass() {
  return provideDataClass('EventDocument', {
    restApi: pisaConfig('event-document'),
    attributes: () => filterSchema('event-document'),
  })
}

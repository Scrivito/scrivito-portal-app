import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { filterSchema } from '../../filterSchema'

export function pisaServiceObjectDocumentDataClass() {
  return provideDataClass('ServiceObjectDocument', {
    restApi: pisaConfig('service-object-document'),
    attributes: () => filterSchema('service-object-document'),
  })
}

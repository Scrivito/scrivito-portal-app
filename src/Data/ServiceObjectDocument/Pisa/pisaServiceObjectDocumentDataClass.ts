import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export function pisaServiceObjectDocumentDataClass() {
  return provideDataClass('ServiceObjectDocument', {
    restApi: pisaConfig('service-object-document'),
    attributes: {},
  })
}

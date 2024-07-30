import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export async function pisaServiceObjectDocumentDataClass() {
  return provideDataClass('ServiceObjectDocument', {
    restApi: pisaConfig('service-object-document'),
    attributes: {},
  })
}

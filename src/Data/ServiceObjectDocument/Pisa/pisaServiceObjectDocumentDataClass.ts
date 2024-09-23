import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { fetchAndFilterAttributes } from '../../fetchAndFilterAttributes'

export function pisaServiceObjectDocumentDataClass() {
  return provideDataClass('ServiceObjectDocument', {
    restApi: pisaConfig('service-object-document'),
    attributes: () => fetchAndFilterAttributes('service-object-document'),
  })
}

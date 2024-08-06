import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { DataClassAttributes } from '../../types'

export function pisaServiceObjectDocumentDataClass(
  attributes: DataClassAttributes,
) {
  return provideDataClass('ServiceObjectDocument', {
    restApi: pisaConfig('service-object-document'),
    attributes,
  })
}

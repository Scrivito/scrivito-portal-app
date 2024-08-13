import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { DataClassAttributes } from '../../types'

export function pisaDocumentDataClass(attributes: DataClassAttributes) {
  return provideDataClass('Document', {
    restApi: pisaConfig('document'),
    attributes,
  })
}

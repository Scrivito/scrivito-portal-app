import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { DataClassAttributes } from '../../types'

export function pisaEventDocumentDataClass(attributes: DataClassAttributes) {
  return provideDataClass('EventDocument', {
    restApi: pisaConfig('event-document'),
    attributes,
  })
}

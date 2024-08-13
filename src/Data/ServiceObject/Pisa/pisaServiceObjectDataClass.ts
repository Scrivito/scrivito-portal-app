import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { DataClassAttributes } from '../../types'

export function pisaServiceObjectDataClass(attributes: DataClassAttributes) {
  return provideDataClass('ServiceObject', {
    restApi: pisaConfig('service-object'),
    attributes,
  })
}

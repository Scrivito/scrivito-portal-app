import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { DataClassAttributes } from '../../types'

export function pisaEventDataClass(attributes: DataClassAttributes) {
  return provideDataClass('Event', {
    restApi: pisaConfig('event'),
    attributes,
  })
}

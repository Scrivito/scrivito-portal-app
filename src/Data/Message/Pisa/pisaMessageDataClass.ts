import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { DataClassAttributes } from '../../types'

export function pisaMessageDataClass(attributes: DataClassAttributes) {
  return provideDataClass('Message', {
    restApi: pisaConfig('message'),
    attributes,
  })
}

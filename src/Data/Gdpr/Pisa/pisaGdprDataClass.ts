import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { DataClassAttributes } from '../../types'

export function pisaGdprDataClass(attributes: DataClassAttributes) {
  return provideDataClass('Gdpr', {
    restApi: pisaConfig('gdpr'),
    attributes,
  })
}

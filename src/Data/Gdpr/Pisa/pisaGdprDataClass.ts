import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export function pisaGdprDataClass() {
  return provideDataClass('Gdpr', {
    restApi: pisaConfig('gdpr'),
    attributes: {},
  })
}

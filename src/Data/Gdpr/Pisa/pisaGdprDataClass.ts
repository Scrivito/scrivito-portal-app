import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export async function pisaGdprDataClass() {
  return provideDataClass('Gdpr', {
    restApi: pisaConfig('gdpr'),
    attributes: {},
  })
}

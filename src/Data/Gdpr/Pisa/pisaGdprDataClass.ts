import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { fetchAndFilterAttributes } from '../../fetchAndFilterAttributes'

export function pisaGdprDataClass() {
  return provideDataClass('Gdpr', {
    restApi: pisaConfig('gdpr'),
    attributes: () => fetchAndFilterAttributes('gdpr'),
  })
}

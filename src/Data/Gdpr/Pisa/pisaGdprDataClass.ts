import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'
import { filterSchema } from '../../filterSchema'

export function pisaGdprDataClass() {
  return provideDataClass('Gdpr', {
    restApi: pisaConfig('gdpr'),
    attributes: () => filterSchema('gdpr'),
  })
}

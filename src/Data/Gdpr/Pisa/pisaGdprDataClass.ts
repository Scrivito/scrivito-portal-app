import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export async function pisaGdprDataClass() {
  const gdprConfig = await pisaConfig('gdpr')

  return provideDataClass('Gdpr', {
    restApi: gdprConfig,
    attributes: {},
  })
}

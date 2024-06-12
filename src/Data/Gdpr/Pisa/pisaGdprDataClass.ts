import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'

export async function pisaGdprDataClass() {
  const gdprClient = await pisaClient('gdpr')

  return provideDataClass('Gdpr', { restApi: gdprClient })
}

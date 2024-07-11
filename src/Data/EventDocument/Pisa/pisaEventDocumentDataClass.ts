import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export async function pisaEventDocumentDataClass() {
  const eventDocumentConfig = await pisaConfig('event-document')

  return provideDataClass('EventDocument', {
    restApi: eventDocumentConfig,
    attributes: {},
  })
}

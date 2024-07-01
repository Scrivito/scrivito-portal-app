import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'

export async function pisaEventDocumentDataClass() {
  const eventDocumentClient = await pisaClient('event-document')

  return provideDataClass('EventDocument', {
    restApi: eventDocumentClient,
  })
}

import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'

export async function pisaServiceObjectDocumentDataClass() {
  const serviceObjectDocumentClient = await pisaClient(
    'service-object-document',
  )

  return provideDataClass('ServiceObjectDocument', {
    restApi: serviceObjectDocumentClient,
  })
}

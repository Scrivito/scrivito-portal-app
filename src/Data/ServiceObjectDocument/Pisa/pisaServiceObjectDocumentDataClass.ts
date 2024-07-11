import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../../pisaClient'

export async function pisaServiceObjectDocumentDataClass() {
  const serviceObjectDocumentConfig = await pisaConfig(
    'service-object-document',
  )

  return provideDataClass('ServiceObjectDocument', {
    restApi: serviceObjectDocumentConfig,
    attributes: {},
  })
}

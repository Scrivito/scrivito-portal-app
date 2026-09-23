import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../pisaClient'

export const ServiceObjectDocument = provideDataClass(
  'ServiceObjectDocument',
  async () => {
    const restApi = await pisaConfig('portal/service-object-document')
    if (!restApi) {
      return (
        await import('./serviceObjectDocumentParamsFallback')
      ).serviceObjectDocumentParamsFallback()
    }

    return { restApi }
  },
)

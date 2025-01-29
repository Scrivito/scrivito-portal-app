import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../pisaClient'

export const EventDocument = provideDataClass(
  'EventDocument',
  (async () => {
    const restApi = await pisaConfig('event-document')
    if (!restApi) {
      return (
        await import('./eventDocumentParamsFallback')
      ).eventDocumentParamsFallback()
    }

    return { restApi }
  })(),
)

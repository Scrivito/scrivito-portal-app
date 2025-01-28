import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../pisaClient'

export const QuoteDocument = provideDataClass(
  'QuoteDocument',
  (async () => {
    const restApi = await pisaConfig('quote-document')
    if (!restApi) {
      return (
        await import('./quoteDocumentParamsFallback')
      ).quoteDocumentParamsFallback()
    }

    return { restApi }
  })(),
)

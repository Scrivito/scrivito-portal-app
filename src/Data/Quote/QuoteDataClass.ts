import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../pisaClient'

export const Quote = provideDataClass(
  'Quote',
  (async () => {
    const restApi = await pisaConfig('quote')
    if (!restApi) {
      return (await import('./quoteParamsFallback')).quoteParamsFallback()
    }

    return { restApi }
  })(),
)

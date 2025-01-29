import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../pisaClient'

export const Gdpr = provideDataClass(
  'Gdpr',
  (async () => {
    const restApi = await pisaConfig('gdpr')
    if (!restApi) {
      return (await import('./gdprParamsFallback')).gdprParamsFallback()
    }

    return { restApi }
  })(),
)

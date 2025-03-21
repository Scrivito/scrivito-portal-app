import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../pisaClient'

export const ServiceObject = provideDataClass(
  'ServiceObject',
  (async () => {
    const restApi = await pisaConfig('service-object')
    if (!restApi) {
      return (
        await import('./serviceObjectParamsFallback')
      ).serviceObjectParamsFallback()
    }

    return { restApi }
  })(),
)

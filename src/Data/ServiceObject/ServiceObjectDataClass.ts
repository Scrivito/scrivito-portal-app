import { provideDataClass } from 'scrivito'
import { fetchAttributes } from '../fetchAttributes'
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

    return {
      attributes: () => fetchAttributes('service-object', ['parentId']), // TODO: Remove workaround for #11367 once available
      restApi,
    }
  })(),
)

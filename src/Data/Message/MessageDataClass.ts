import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../pisaClient'

export const Message = provideDataClass(
  'Message',
  (async () => {
    const restApi = await pisaConfig('message')

    if (!restApi) {
      return (await import('./messageParamsFallback')).messageParamsFallback()
    }

    return { restApi }
  })(),
)

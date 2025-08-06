import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../pisaClient'

export const Event = provideDataClass('Event', async () => {
  const restApi = await pisaConfig('portal/event')
  if (!restApi) {
    return (await import('./eventParamsFallback')).eventParamsFallback()
  }

  return { restApi }
})

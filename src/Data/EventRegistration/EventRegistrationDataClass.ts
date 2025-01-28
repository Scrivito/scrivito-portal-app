import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../pisaClient'

export const EventRegistration = provideDataClass(
  'EventRegistration',
  (async () => {
    const restApi = await pisaConfig('event-registration')
    if (!restApi) {
      return (
        await import('./eventRegistrationParamsFallback')
      ).eventRegistrationParamsFallback()
    }

    return { restApi }
  })(),
)

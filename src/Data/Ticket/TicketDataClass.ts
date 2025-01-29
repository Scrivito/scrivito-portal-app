import { provideDataClass } from 'scrivito'
import { pisaConfig } from '../pisaClient'

export const Ticket = provideDataClass(
  'Ticket',
  (async () => {
    const restApi = await pisaConfig('ticket')

    if (!restApi) {
      return (await import('./ticketParamsFallback')).ticketParamsFallback()
    }

    return { restApi }
  })(),
)

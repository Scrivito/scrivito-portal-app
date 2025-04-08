import { currentLanguage, load, provideDataClass } from 'scrivito'
import { pisaClient } from '../pisaClient'
import { globalResultsParamsFallback } from './globalResultsParamsFallback'
import { calculateUrl } from './calculateUrl'

export const GlobalResult = provideDataClass(
  'GlobalResult',
  (async () => {
    const globalResultClient = await pisaClient('global-result')
    if (!globalResultClient) return globalResultsParamsFallback()

    return {
      attributes: async () => {
        const lang = await load(currentLanguage)

        return {
          title: ['string', { title: lang === 'de' ? 'Titel' : 'Title' }],
          entity: ['string', { title: lang === 'de' ? 'Entität' : 'Entity' }],
          url: ['string', { title: 'URL' }],
          snippet: [
            'string',
            { title: lang === 'de' ? 'Schnipsel' : 'Snippet' },
          ],
        }
      },
      connection: {
        async index(params) {
          if (!params.search()) return { results: [], count: 0 }

          const classNames = [
            'Ticket',
            'Event',
            'Quote',
            'Order',
            'ServiceObject',
            'Document',
            'Contract',
          ]

          const {
            results: rawResults,
            count,
            continuation,
          } = (await globalResultClient.get('', {
            params: {
              _continuation: params.continuation(),
              _count: params.includeCount().toString(),
              _limit: params.limit().toString(),
              _search: params.search(),
              entity: classNames.join(','),
            },
          })) as {
            results: Array<{
              _id: string
              title: string
              entity: string
              snippet: string
            }>
            count?: number
            continuation?: string
          }

          const results = await Promise.all(
            rawResults.map(async ({ _id, entity, title, snippet }) => {
              return {
                _id,
                entity,
                title,
                url: await calculateUrl(_id, entity),
                snippet,
              }
            }),
          )

          return { results, count, continuation }
        },
      },
    }
  })(),
)

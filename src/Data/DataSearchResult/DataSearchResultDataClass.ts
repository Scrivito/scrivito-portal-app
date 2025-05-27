import { currentLanguage, load, provideDataClass } from 'scrivito'
import { pisaClient } from '../pisaClient'
import { loadDataItemUrl } from './loadDataItemUrl'
import { dataSearchResultIndexFallback } from './dataSearchResultIndexFallback'

export const DataSearchResult = provideDataClass('DataSearchResult', {
  async title() {
    return (await load(() => currentLanguage())) === 'de'
      ? 'Suchtreffer (Daten)'
      : 'Search result (data)'
  },
  async attributes() {
    const lang = await load(() => currentLanguage())

    return {
      entity: ['string', { title: lang === 'de' ? 'Entität' : 'Entity' }],
      snippet: ['string', { title: lang === 'de' ? 'Schnipsel' : 'Snippet' }],
      title: ['string', { title: lang === 'de' ? 'Titel' : 'Title' }],
      url: ['unknown', { title: 'URL' }],
    }
  },
  connection: {
    async index(params) {
      if (Object.keys(params.filters()).length > 0) {
        throw new Error('Search result (data) does not support filtering.')
      }

      if (params.order().length > 0) {
        throw new Error('Search result (data) does not support sorting.')
      }

      if (!params.search()) return { results: [], count: 0 }

      const globalResultClient = await pisaClient('global-result')
      if (!globalResultClient) return dataSearchResultIndexFallback(params)

      const classNames = [
        'Contract',
        'Document',
        'Event',
        'Order',
        'Quote',
        'ServiceObject',
        'Ticket',
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
          entity: string
          matches: Array<[number, number]>
          snippet: string
          title: string
        }>
        count?: number
        continuation?: string
      }

      const results = await Promise.all(
        rawResults.map(async ({ _id, entity, title, snippet }) => {
          return {
            _id,
            entity,
            snippet,
            title,
            url: await loadDataItemUrl(entity, _id),
          }
        }),
      )

      return { results, count, continuation }
    },
  },
})

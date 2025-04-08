import {
  currentLanguage,
  DataAttributeDefinitions,
  DataConnection,
  load,
} from 'scrivito'
import { searchLocalStorageDataConnections } from '../localStorageDataConnection'
import { ensureString } from '../../utils/ensureString'
import { calculateUrl } from './calculateUrl'

export function globalResultsParamsFallback(): {
  attributes: () => Promise<DataAttributeDefinitions>
  connection: Partial<DataConnection>
} {
  return {
    attributes: async () => {
      const lang = await load(currentLanguage)

      return {
        title: ['string', { title: lang === 'de' ? 'Titel' : 'Title' }],
        entity: ['string', { title: lang === 'de' ? 'Entität' : 'Entity' }],
        url: ['string', { title: 'URL' }],
        snippet: ['string', { title: lang === 'de' ? 'Schnipsel' : 'Snippet' }],
      }
    },
    connection: {
      async index(params) {
        const search = params.search()
        if (!search) return { results: [], count: 0 }

        const classNames = [
          'Ticket',
          'Event',
          'Quote',
          'Order',
          'ServiceObject',
          'Document',
          'Contract',
        ]

        const rawResults = await searchLocalStorageDataConnections(
          search,
          classNames,
        )

        const results = await Promise.all(
          rawResults.map(async ({ _id, className: entity, rawItem }) => {
            const title =
              ensureString(rawItem.title) || ensureString(rawItem.keyword)

            return {
              _id,
              entity,
              title,
              url: await calculateUrl(_id, entity),
              snippet: '', // TODO: add more meaningful snippet
            }
          }),
        )

        return { results, count: results.length }
      },
    },
  }
}

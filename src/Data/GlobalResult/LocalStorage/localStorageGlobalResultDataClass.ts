import { DataClass, provideDataClass } from 'scrivito'
import { searchLocalStorageDataClasses } from '../../provideLocalStorageDataClass'

export function localStorageGlobalResultDataClass(): DataClass {
  return provideDataClass('GlobalResult', {
    attributes: { title: 'string' },
    connection: {
      async index(params) {
        const search = params.search()
        if (!search) return { results: [], count: 0 }

        const entities = [
          'Ticket',
          'Event',
          'Quote',
          'Order',
          'ServiceObject',
          'Document',
          'Contract',
        ]

        const results = searchLocalStorageDataClasses(search, [
          'CartItem',
        ]).filter(({ entity }) => entities.includes(entity))

        return { results, count: results.length }
      },
    },
  })
}

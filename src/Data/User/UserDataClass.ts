import { CurrentUser } from '../CurrentUser/CurrentUserDataItem'
import { load, provideDataClass } from 'scrivito'
import { pisaClient } from '../pisaClient'

const userClient = pisaClient('user')

export const User = provideDataClass('User', {
  connection: {
    index: async (params) => {
      const { results, continuation } = await (userClient.get('', {
        params: {
          ...params.filters(),
          _continuation: params.continuation(),
          _order: params.order().length
            ? params
                .order()
                .map((o) => o.join('.'))
                .join(',')
            : undefined,
          _search: params.search() || undefined,
        },
      }) as Promise<{ results: Array<{ _id: string }>; continuation?: string }>)

      return {
        results: await Promise.all(results.map(postProcessData)),
        continuation,
      }
    },
    get: async (id) => {
      const item = await userClient.get(id)
      return item ? postProcessData(item as { _id: string }) : item
    },
  },
})

async function postProcessData(data: { _id: string }) {
  // Use the data item cached by Scrivito instead of connecting to the backend directly
  const pisaUserId = await load(() => CurrentUser.get('pisaUserId'))
  if (data._id !== pisaUserId) return data

  return {
    _id: data._id,
    staff: false,
    email: await load(() => CurrentUser.get('email')),
    familyName: await load(() => CurrentUser.get('familyName')),
    givenName: await load(() => CurrentUser.get('givenName')),
    image: { url: await load(() => CurrentUser.get('picture')) },
    name: await load(() => CurrentUser.get('name')),
    salutation: await load(() => CurrentUser.get('salutation')),
  }
}

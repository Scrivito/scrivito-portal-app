import {
  DataConnectionError,
  DataConnectionResultItem,
  load,
  provideDataClass,
} from 'scrivito'
import { CurrentUser } from '../CurrentUser/CurrentUserDataItem'
import { fetchAttributes } from '../fetchAttributes'
import { fetchTitle } from '../fetchTitle'
import { pisaClient } from '../pisaClient'

export const User = provideDataClass(
  'User',
  (async () => {
    const apiClient = await pisaClient('user')
    if (!apiClient) {
      return (await import('./userParamsFallback')).userParamsFallback()
    }

    return {
      attributes: () => fetchAttributes('user'),
      title: () => fetchTitle('user'),
      connection: {
        index: async () => {
          throw new DataConnectionError(
            'Listing users is not supported due to data protection reasons.',
          )
        },
        get: async (id) => {
          const item = await apiClient.get(id)
          return item ? postProcessUserData(item as { _id: string }) : item
        },
      },
    }
  })(),
)

export async function postProcessUserData(
  data: DataConnectionResultItem,
): Promise<DataConnectionResultItem> {
  // Use the data item cached by Scrivito instead of connecting to the backend directly
  const pisaUserId = await load(() => CurrentUser.get('pisaUserId'))
  if (data._id !== pisaUserId) return data

  return {
    ...data,

    staff: false,
    email: await load(() => CurrentUser.get('email')),
    familyName: await load(() => CurrentUser.get('familyName')),
    givenName: await load(() => CurrentUser.get('givenName')),
    image: { url: await load(() => CurrentUser.get('picture')) },
    name: await load(() => CurrentUser.get('name')),
    // Ignoring `salutation`, since neoletter's attribute is a plain string (e.g. `Frau` or `Herr`), whereas PisaSales responds with an enum value such as `F` or `M`.
  }
}

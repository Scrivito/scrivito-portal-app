import { DataConnection, DataConnectionError, provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'
import { postProcessUserData } from '../UserDataClass'
import { fetchAttributes } from '../../fetchAttributes'

export function pisaUserDataClass() {
  return provideDataClass('User', {
    attributes: () => fetchAttributes('user'),
    connection: pisaClient('user').then(
      (apiClient): Partial<DataConnection> => ({
        index: async () => {
          throw new DataConnectionError(
            'Listing users is not supported due to data protection reasons.',
          )
        },
        get: async (id) => {
          const item = await apiClient.get(id)
          return item ? postProcessUserData(item as { _id: string }) : item
        },
      }),
    ),
  })
}

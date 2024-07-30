import { DataConnectionError, provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'
import { postProcessUserData } from '../UserDataClass'
import { DataConnection } from '../../types'

export function pisaUserDataClass() {
  return provideDataClass('User', {
    connection: pisaClient('user').then(
      (userClient): DataConnection => ({
        index: async () => {
          throw new DataConnectionError(
            'Listing users is not supported due to data protection reasons.',
          )
        },
        get: async (id) => {
          const item = await userClient.get(id)
          return item ? postProcessUserData(item as { _id: string }) : item
        },
      }),
    ),
  })
}

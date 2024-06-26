import { DataConnectionError, provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'
import { postProcessUserData } from '../UserDataClass'

export async function pisaUserDataClass() {
  const userClient = await pisaClient('user')

  return provideDataClass('User', {
    connection: {
      index: async () => {
        throw new DataConnectionError(
          'Listing users is not supported due to data protection reasons.',
        )
      },
      get: async (id) => {
        const item = await userClient.get(id)
        return item ? postProcessUserData(item as { _id: string }) : item
      },
    },
  })
}

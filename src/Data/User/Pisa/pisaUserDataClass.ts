import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'
import { toClientParams } from '../../toClientParams'
import { DataIndexResponse } from '../../types'
import { postProcessUserData } from '../UserDataClass'

export async function pisaUserDataClass() {
  const userClient = await pisaClient('user')

  return provideDataClass('User', {
    connection: {
      index: async (params) => {
        const { results, continuation, count } = await (userClient.get('', {
          params: toClientParams(params),
        }) as Promise<DataIndexResponse>)

        return {
          results: await Promise.all(results.map(postProcessUserData)),
          continuation,
          count,
        }
      },
      get: async (id) => {
        const item = await userClient.get(id)
        return item ? postProcessUserData(item as { _id: string }) : item
      },
    },
  })
}

import { provideDataClass } from 'scrivito'
import { pisaClient } from '../../pisaClient'
import { toClientParams } from '../../toClientParams'
import { DataIndexResponse } from '../../types'
import { postProcessData } from '../UserDataClass'

export function pisaUserDataClass() {
  const userClient = pisaClient('user')

  return provideDataClass('User', {
    connection: {
      index: async (params) => {
        const { results, continuation, count } = await (userClient.get('', {
          params: toClientParams(params),
        }) as Promise<DataIndexResponse>)

        return {
          results: await Promise.all(results.map(postProcessData)),
          continuation,
          count,
        }
      },
      get: async (id) => {
        const item = await userClient.get(id)
        return item ? postProcessData(item as { _id: string }) : item
      },
    },
  })
}

import { isObject } from 'lodash-es'
import { provideDataClass, unstable_JrRestApi } from 'scrivito'

const apiPath = '../pisa-api/user'

// TODO: use `provideDataClass('User', { apiPath })` once available (with 1.39.0?)
export const User = provideDataClass('User', {
  connection: {
    index: (params) =>
      unstable_JrRestApi.fetch(apiPath, {
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
      }) as Promise<{ results: Array<{ _id: string }>; continuation?: string }>,
    get: (id) => unstable_JrRestApi.fetch(`${apiPath}/${id}`),
  },
})

interface UserData {
  name: string
  givenName: string
  familyName: string
  salutation: string
}

export function isUserData(input: unknown): input is UserData {
  return (
    isObject(input) &&
    typeof (input as UserData).name === 'string' &&
    typeof (input as UserData).givenName === 'string' &&
    typeof (input as UserData).familyName === 'string' &&
    typeof (input as UserData).salutation === 'string'
  )
}

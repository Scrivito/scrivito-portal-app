import { DataConnectionError, isUserLoggedIn, provideDataClass } from 'scrivito'
import { pisaConfig } from '../pisaClient'
import { getTokenAuthorization } from '../getTokenAuthorization'

export const Gdpr = provideDataClass(
  'Gdpr',
  (async () => {
    const restApi = await pisaConfig('gdpr')
    if (!restApi) {
      return (await import('./gdprParamsFallback')).gdprParamsFallback()
    }

    if (!isUserLoggedIn()) {
      const tokenAuthorization = getTokenAuthorization()
      if (tokenAuthorization) {
        const { url, headers: baseHeaders } = restApi
        const headers = { ...baseHeaders, Authorization: tokenAuthorization }

        // TODO: Return { url, headers }, once #11616 is resolved
        return {
          connection: {
            async index(params) {
              if (Object.keys(params.filters()).length > 0) {
                throw new DataConnectionError(
                  'GDPR consent does not support filtering.',
                )
              }

              const urlParams = new URLSearchParams()

              const continuation = params.continuation()
              if (continuation) urlParams.set('_continuation', continuation)

              if (params.includeCount()) urlParams.set('_count', 'true')

              const limit = params.limit()
              if (limit) urlParams.set('_limit', limit.toString())

              const order = params
                .order()
                .map((o) => o.join('.'))
                .join(',')
              if (order) urlParams.set('_order', order)

              const search = params.search()
              if (search) urlParams.set('_search', search)

              const urlWithParams = `${url}?${urlParams.toString()}`

              const response = await fetch(urlWithParams, { headers })
              if (!response.ok) {
                throw new DataConnectionError('Failed to fetch GDPR consent')
              }

              return response.json()
            },
            async update(id, data) {
              const response = await fetch(`${url}/${id}`, {
                method: 'PATCH',
                headers: {
                  ...headers,
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
              })
              if (!response.ok) {
                throw new DataConnectionError('Failed to update GDPR consent')
              }

              return response.json()
            },
            async create() {
              throw new DataConnectionError(
                'Creating GDPR consent is not supported.',
              )
            },
            async delete() {
              throw new DataConnectionError(
                'Deleting GDPR consent is not supported.',
              )
            },
            async get() {
              throw new DataConnectionError(
                'Fetching a single GDPR consent is not supported.',
              )
            },
          },
        }
      }
    }

    return { restApi }
  })(),
)

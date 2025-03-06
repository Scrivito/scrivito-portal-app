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
      const Authorization = getTokenAuthorization()
      if (Authorization) {
        const { url, headers: baseHeaders } = restApi
        const headers = { ...baseHeaders, Authorization }

        // TODO: Return { url, headers }, once #11616 is resolved
        return {
          connection: {
            async index(params) {
              if (Object.keys(params.filters()).length > 0) {
                throw new Error('GDPR consent does not support filtering.')
              }

              if (params.order().length > 0) {
                throw new Error('GDPR consent does not support sorting.')
              }

              if (params.search()) {
                throw new Error('GDPR consent does not support searching.')
              }

              const urlParams = new URLSearchParams()

              const limit = params.limit()
              if (limit) urlParams.set('_limit', limit.toString())

              const continuation = params.continuation()
              if (continuation) urlParams.set('_continuation', continuation)

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

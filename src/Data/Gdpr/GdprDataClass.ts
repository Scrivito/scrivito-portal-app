import { DataConnectionError, provideDataClass } from 'scrivito'
import { pisaConfig } from '../pisaClient'
import { errorToast } from '../CurrentUser/errorToast'

export const Gdpr = provideDataClass(
  'Gdpr',
  (async () => {
    const restApi = await pisaConfig('gdpr')
    if (!restApi) {
      return (await import('./gdprParamsFallback')).gdprParamsFallback()
    }

    // TODO: simply return { restApi }, once #11616 is resolved
    if (!restApi.headers.Authorization) return { restApi }

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

          const url = `${restApi.url}?${urlParams.toString()}`

          const response = await fetch(url, { headers: restApi.headers })
          if (!response.ok) {
            const error = new DataConnectionError(
              'Failed to fetch GDPR consent',
            )
            errorToast(error.message, new Error(''))
            throw error
          }

          return response.json()
        },
        async update(id, data) {
          const response = await fetch(`${restApi.url}/${id}`, {
            method: 'PATCH',
            headers: { ...restApi.headers, 'Content-Type': 'application/json' },
            body: JSON.stringify(data),
          })
          if (!response.ok) {
            const error = new DataConnectionError(
              'Failed to update GDPR consent',
            )
            errorToast(error.message, new Error(''))
            throw error
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
  })(),
)

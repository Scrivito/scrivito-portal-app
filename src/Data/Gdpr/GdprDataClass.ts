import { isUserLoggedIn, provideDataClass } from 'scrivito'
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

        return { restApi: { url, headers } }
      }
    }

    return { restApi }
  })(),
)

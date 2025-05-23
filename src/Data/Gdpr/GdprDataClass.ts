import { isUserLoggedIn, load, Obj, provideDataClass } from 'scrivito'
import { pisaConfig } from '../pisaClient'
import { getTokenAuthorization } from '../getTokenAuthorization'
import { jwtPisaSalesApiConfig } from '../jwtPisaSalesApiConfig'

export const Gdpr = provideDataClass(
  'Gdpr',
  (async () => {
    await load(() => Obj.onAllSites().all().count()) // TODO: Remove workaround for issue #11895 or #11924
    if (!isUserLoggedIn()) {
      const Authorization = getTokenAuthorization()

      if (Authorization) {
        const jwtRestApi = await jwtPisaSalesApiConfig({
          Authorization,
          subPath: 'portal/gdpr',
        })

        if (jwtRestApi) {
          return {
            restApi: jwtRestApi,

            // TODO: Remove workaround once #11853 is fixed
            attributes: {},
            title: 'GDPR consent',
          }
        }
      }
    }

    const restApi = await pisaConfig('gdpr')
    if (!restApi) {
      return (await import('./gdprParamsFallback')).gdprParamsFallback()
    }

    return { restApi }
  })(),
)

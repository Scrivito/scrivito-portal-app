import { isUserLoggedIn, load, Obj, provideDataClass } from 'scrivito'
import { pisaConfig } from '../pisaClient'
import { jwtPisaSalesApiConfig } from '../jwtPisaSalesApiConfig'

export const Gdpr = provideDataClass('Gdpr', async () => {
  await load(() => Obj.onAllSites().all().count()) // TODO: Remove workaround for issue #12033
  if (!isUserLoggedIn()) {
    const jwtRestApi = await jwtPisaSalesApiConfig({ subPath: 'portal/gdpr' })

    if (jwtRestApi) return { restApi: jwtRestApi }
  }

  const restApi = await pisaConfig('portal/gdpr')
  if (!restApi) {
    return (await import('./gdprParamsFallback')).gdprParamsFallback()
  }

  return { restApi }
})

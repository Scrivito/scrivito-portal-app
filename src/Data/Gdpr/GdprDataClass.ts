import { isUserLoggedIn, provideDataClass } from 'scrivito'
import { pisaConfig } from '../pisaClient'
import { jwtPisaSalesApiConfig } from '../jwtPisaSalesApiConfig'

export const Gdpr = provideDataClass('Gdpr', async () => {
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

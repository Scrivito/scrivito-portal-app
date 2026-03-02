import { createRestApiClient, ClientError, currentLanguage } from 'scrivito'
import { WhoAmI } from './CurrentUserDataItem'
import { simpleErrorToast } from './errorToast'
import { jwtPisaSalesApiConfig } from '../jwtPisaSalesApiConfig'
import messages from './i18n.visitor.json'
import rosetta from 'rosetta'

const i18n = rosetta(messages)
const lang = currentLanguage() ?? 'en'
i18n.locale(lang in messages ? lang : 'en')

export async function fetchWhoAmIWithToken(): Promise<WhoAmI | null> {
  const jwtConfig = await jwtPisaSalesApiConfig({ subPath: 'portal/whoami' })
  if (!jwtConfig) return null

  const { url, ...options } = jwtConfig
  const client = createRestApiClient(url, options)

  try {
    const response = await client.get('')
    return response as WhoAmI
  } catch (e) {
    console.error(e)

    const errorMessage =
      e instanceof ClientError && e.httpStatus === 401
        ? i18n.t('expiredLink')
        : i18n.t('failedFetch')
    simpleErrorToast(errorMessage)

    return null
  }
}

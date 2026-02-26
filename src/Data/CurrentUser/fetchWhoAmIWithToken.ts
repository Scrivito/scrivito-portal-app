import { setupVisitorI18n } from '../../i18n'
import { createRestApiClient, ClientError } from 'scrivito'
import { WhoAmI } from './CurrentUserDataItem'
import { simpleErrorToast } from './errorToast'
import { jwtPisaSalesApiConfig } from '../jwtPisaSalesApiConfig'
import messages from './i18n.visitor.json'

const t = setupVisitorI18n(messages)

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
        ? t('expiredLink')
        : t('failedFetch')
    simpleErrorToast(errorMessage)

    return null
  }
}

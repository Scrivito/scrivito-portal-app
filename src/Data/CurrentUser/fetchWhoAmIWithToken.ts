import {
  load,
  currentLanguage,
  createRestApiClient,
  ClientError,
} from 'scrivito'
import { WhoAmI } from './CurrentUserDataItem'
import { simpleErrorToast } from './errorToast'
import { jwtPisaSalesApiConfig } from '../jwtPisaSalesApiConfig'

export async function fetchWhoAmIWithToken(): Promise<WhoAmI | null> {
  const jwtConfig = await jwtPisaSalesApiConfig({ subPath: 'portal/whoami' })
  if (!jwtConfig) return null

  const lang = await load(() => currentLanguage() ?? '')

  const { url, ...options } = jwtConfig
  const client = createRestApiClient(url, options)

  try {
    const response = await client.get('')
    return response as WhoAmI
  } catch (e) {
    console.error(e)

    const errorMessage =
      e instanceof ClientError && e.httpStatus === 401
        ? localizeExpiredMessage(lang)
        : localizeFailedFetch(lang)
    simpleErrorToast(errorMessage)

    return null
  }
}

function localizeExpiredMessage(language: string): string {
  switch (language) {
    case 'de':
      return 'Der Link ist abgelaufen oder ungültig. Bitte fordern Sie einen neuen an.'
    case 'fr':
      return 'Le lien est expiré ou invalide. Veuillez en demander un nouveau.'
    case 'pl':
      return 'Link jest wygasły lub nieważny. Proszę o nowy.'
    default:
      return 'The link is expired or invalid. Please request a new one.'
  }
}

function localizeFailedFetch(language: string): string {
  switch (language) {
    case 'de':
      return 'Benutzerprofil konnte nicht abgerufen werden.'
    case 'fr':
      return 'Impossible de récupérer le profil utilisateur.'
    case 'pl':
      return 'Nie udało się pobrać profilu użytkownika.'
    default:
      return 'Failed to fetch user profile.'
  }
}

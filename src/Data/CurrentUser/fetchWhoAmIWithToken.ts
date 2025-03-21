import { load, currentLanguage } from 'scrivito'
import { pisaConfig } from '../pisaClient'
import { WhoAmI } from './CurrentUserDataItem'
import { simpleErrorToast } from './errorToast'
import { getTokenAuthorization } from '../getTokenAuthorization'

export async function fetchWhoAmIWithToken(): Promise<WhoAmI | null> {
  const whoAmIConfig = await pisaConfig('whoami')
  if (!whoAmIConfig) return null

  const tokenAuthorization = getTokenAuthorization()
  if (!tokenAuthorization) return null

  const lang = await load(() => currentLanguage() ?? '')

  const { url, headers: baseHeaders } = whoAmIConfig

  const headers = { ...baseHeaders, Authorization: tokenAuthorization }

  // TODO: Replace fetch with pisaClient, once #11616 is resolved
  let response: Response
  try {
    response = await fetch(url, { method: 'GET', headers })
  } catch (e) {
    console.error(e)
    simpleErrorToast(localizeFailedFetch(lang))

    return null
  }

  if (!response.ok) {
    const errorMessage =
      response.status === 401
        ? localizeExpiredMessage(lang)
        : localizeFailedFetch(lang)
    simpleErrorToast(errorMessage)

    return null
  }

  return response.json() as Promise<WhoAmI>
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

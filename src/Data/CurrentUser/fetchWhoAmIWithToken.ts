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
  const response = await fetch(url, { method: 'GET', headers })
  if (!response.ok) {
    const errorMessage =
      response.status === 401
        ? localizeExpiredMessage(lang)
        : localizeFailedVerify(lang)
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

function localizeFailedVerify(language: string): string {
  switch (language) {
    case 'de':
      return 'Fehler bei der Überprüfung des Benutzerprofils.'
    case 'fr':
      return "Échec de la vérification du profil de l'utilisateur."
    case 'pl':
      return 'Nie udało się zweryfikować profilu użytkownika.'
    default:
      return 'Failed to verify user profile.'
  }
}

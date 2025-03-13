import { load, currentLanguage } from 'scrivito'
import { pisaConfig } from '../pisaClient'
import { WhoAmI } from './CurrentUserDataItem'
import { simpleErrorToast } from './errorToast'

export async function fetchWhoAmIWithToken(
  tokenAuthorization: string,
): Promise<WhoAmI | null> {
  const whoAmIConfig = await pisaConfig('whoami')
  if (!whoAmIConfig) return null

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
      return 'Der von Ihnen gefolgte Link ist ungültig oder abgelaufen. Bitte fordern Sie einen neuen an.'
    case 'fr':
      return 'Le lien que vous avez suivi est invalide ou a expiré. Veuillez en demander un nouveau.'
    case 'pl':
      return 'Link, któremu śledziłeś jest nieważny lub wygasł. Prosimy o poproszenie o nowy.'
    default:
      return 'The link you followed is invalid or has expired. Please request a new one.'
  }
}

function localizeFailedVerify(language: string): string {
  switch (language) {
    case 'de':
      return 'Fehler beim Überprüfen des Benutzerprofils.'
    case 'fr':
      return 'Échec de la vérification du profil utilisateur.'
    case 'pl':
      return 'Nie udało się zweryfikować profilu użytkownika.'
    default:
      return 'Failed to verify user profile.'
  }
}

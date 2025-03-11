import { currentLanguage, currentUser, load } from 'scrivito'
import { pisaUrl } from '../pisaClient'
import { WhoAmI } from './CurrentUserDataItem'
import { simpleErrorToast } from './errorToast'
import { getTokenAuthorization } from '../getTokenAuthorization'

// TODO: Switch function to pisaClient, once #11616 is resolved
export async function verifySameWhoAmIUser() {
  const user = await load(currentUser)
  if (!user) return

  const lang = await load(() => currentLanguage() ?? '')

  const tokenAuthorization = getTokenAuthorization()
  if (!tokenAuthorization) return

  const baseUrl = await pisaUrl()
  if (!baseUrl) return

  const response = await fetch(`${baseUrl}/whoami`, {
    headers: { Authorization: tokenAuthorization },
  })

  if (!response.ok) {
    const errorMessage =
      response.status === 401
        ? localizeExpiredMessage(lang)
        : localizeFailedVerify(lang)
    simpleErrorToast(errorMessage)

    return
  }

  const result = (await response.json()) as WhoAmI

  const currentUserEmail = user.email()
  if (result.email === currentUserEmail) return

  simpleErrorToast(
    localizeEmailMismatch(lang, result.email ?? '', currentUserEmail),
  )
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

function localizeEmailMismatch(
  language: string,
  linkFor: string,
  currentUserEmail: string,
): string {
  switch (language) {
    case 'de':
      return `Dieser Link ist für ${linkFor}, aber Sie haben sich als ${currentUserEmail} eingeloggt. Bitte melden Sie sich zuerst ab.`
    case 'fr':
      return `Ce lien est destiné à ${linkFor}, mais vous êtes connecté en tant que ${currentUserEmail}. Veuillez d'abord vous déconnecter.`
    case 'pl':
      return `Ten link jest dla ${linkFor}, ale jesteś zalogowany jako ${currentUserEmail}. Prosimy najpierw wyloguj się.`
    default:
      return `This link is for ${linkFor} but you are logged in as ${currentUserEmail}. Please log out first.`
  }
}

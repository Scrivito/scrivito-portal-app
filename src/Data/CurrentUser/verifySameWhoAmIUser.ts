import { currentLanguage, currentUser, load } from 'scrivito'
import { WhoAmI } from './CurrentUserDataItem'
import { simpleErrorToast } from './errorToast'
import { getTokenAuthorization } from '../getTokenAuthorization'
import { fetchWhoAmIWithToken } from './fetchWhoAmIWithToken'

// TODO: Switch function to pisaClient, once #11616 is resolved
export async function verifySameWhoAmIUser() {
  const user = await load(currentUser)
  if (!user) return

  const lang = await load(() => currentLanguage() ?? '')

  const tokenAuthorization = getTokenAuthorization()
  if (!tokenAuthorization) return

  const whoAmI = await fetchWhoAmIWithToken(tokenAuthorization)
  if (!whoAmI) return

  const currentUserEmail = user.email()
  if (whoAmI.email === currentUserEmail) return

  simpleErrorToast(
    localizeEmailMismatch(lang, whoAmI.email ?? '', currentUserEmail),
  )
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

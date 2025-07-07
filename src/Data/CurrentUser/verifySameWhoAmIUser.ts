import { currentLanguage, currentUser, load, Obj } from 'scrivito'
import { simpleErrorToast } from './errorToast'
import { fetchWhoAmIWithToken } from './fetchWhoAmIWithToken'

export async function verifySameWhoAmIUser() {
  await load(() => Obj.onAllSites().all().count()) // TODO: Remove workaround for issue #11895
  const user = await load(() => currentUser())
  if (!user) return

  const lang = await load(() => currentLanguage() ?? '')

  const whoAmI = await fetchWhoAmIWithToken()
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
      return `Dieser Link ist für ${linkFor}, aber Sie sind als ${currentUserEmail} eingeloggt. Bitte melden Sie sich zuerst ab.`
    case 'fr':
      return `Ce lien est destiné à ${linkFor}, mais vous êtes connecté en tant que ${currentUserEmail}. Veuillez d'abord vous déconnecter.`
    case 'pl':
      return `Ten link jest przeznaczony dla ${linkFor}, ale jesteś zalogowany jako ${currentUserEmail}. Najpierw się wyloguj.`
    default:
      return `This link is for ${linkFor}, but you are logged in as ${currentUserEmail}. Please log out first.`
  }
}

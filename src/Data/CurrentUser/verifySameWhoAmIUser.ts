import { currentLanguage, currentUser, load } from 'scrivito'
import { simpleErrorToast } from './errorToast'
import { fetchWhoAmIWithToken } from './fetchWhoAmIWithToken'
import messages from './i18n.visitor.json'
import rosetta from 'rosetta'

const i18n = rosetta(messages)
const lang = currentLanguage() ?? 'en'
i18n.locale(lang in messages ? lang : 'en')

export async function verifySameWhoAmIUser() {
  const user = await load(() => currentUser())
  if (!user) return

  const whoAmI = await fetchWhoAmIWithToken()
  if (!whoAmI) return

  const currentUserEmail = user.email()
  if (whoAmI.email === currentUserEmail) return

  simpleErrorToast(
    i18n.t('emailMismatch', { linkFor: whoAmI.email ?? '', currentUserEmail }),
  )
}

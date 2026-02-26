import { setupVisitorI18n } from '../../i18n'
import { currentUser, load } from 'scrivito'
import { simpleErrorToast } from './errorToast'
import { fetchWhoAmIWithToken } from './fetchWhoAmIWithToken'
import messages from './i18n.visitor.json'

const t = setupVisitorI18n(messages)

export async function verifySameWhoAmIUser() {
  const user = await load(() => currentUser())
  if (!user) return

  const whoAmI = await fetchWhoAmIWithToken()
  if (!whoAmI) return

  const currentUserEmail = user.email()
  if (whoAmI.email === currentUserEmail) return

  simpleErrorToast(
    t('emailMismatch', { linkFor: whoAmI.email ?? '', currentUserEmail }),
  )
}

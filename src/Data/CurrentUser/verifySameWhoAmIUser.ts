import { pisaUrl } from '../pisaClient'
import { WhoAmI } from './CurrentUserDataItem'
import { simpleErrorToast } from './errorToast'

// TODO: Switch function to pisaClient, once #11616 is resolved
export async function verifySameWhoAmIUser(
  email: string,
  Authorization: string,
) {
  const baseUrl = await pisaUrl()
  if (!baseUrl) return

  const response = await fetch(`${baseUrl}/whoami`, {
    headers: { Authorization },
  })
  if (response.status === 401) simpleErrorToast('URL token is unauthorized')

  if (!response.ok) return

  const result = (await response.json()) as WhoAmI

  if (result.email === email) return

  simpleErrorToast(`Ignoring URL token for user ${result.email ?? ''}.`)
}

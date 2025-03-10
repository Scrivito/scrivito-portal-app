import { pisaUrl } from '../pisaClient'
import { WhoAmI } from './CurrentUserDataItem'
import { simpleErrorToast } from './errorToast'

// TODO: Switch function to pisaClient, once #11616 is resolved
export async function verifySameWhoAmIUser(
  email: string,
  tokenAuthorization: string,
) {
  const baseUrl = await pisaUrl()
  if (!baseUrl) return

  const response = await fetch(`${baseUrl}/whoami`, {
    headers: { Authorization: tokenAuthorization },
  })
  if (response.status === 401) simpleErrorToast('URL token is unauthorized')

  if (!response.ok) return

  const result = (await response.json()) as WhoAmI

  if (result.email === email) return

  simpleErrorToast(
    `This link is for ${result.email ?? ''} but you are logged in as ${email}. Please log out first.`,
  )
}

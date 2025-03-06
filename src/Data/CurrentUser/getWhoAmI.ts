import { isOptionalString } from '../../utils/isOptionalString'
import { pisaUrl } from '../pisaClient'
import { simpleErrorToast } from './errorToast'

// TODO: Switch function to pisaClient, once #11616 is resolved
export async function verifySameWhoAmIUser(
  email: string,
  pisaAuthorization: string | null,
) {
  if (!pisaAuthorization) return

  const baseUrl = await pisaUrl()
  if (!baseUrl) return

  const response = await fetch(`${baseUrl}/whoami`, {
    headers: { Authorization: pisaAuthorization },
  })
  if (response.status === 401) simpleErrorToast('URL token is unauthorized')

  if (!response.ok) return

  const result = await response.json()
  if (!isRawWhoAmI(result)) return

  if (result.email === email) return

  simpleErrorToast(`Ignoring URL token for user ${result?.email ?? ''}.`)
}

interface WhoAmI {
  pisaUserId: string
  name: string
  salutation: string
  givenName: string
  familyName: string
  email: string
  position: string
  staff: boolean
  image: {
    _id: string
    filename: string
    contentType: string
    contentLength: number
  } | null
  salesUserId: string | null
  serviceUserId: string | null
}

type RawWhoAmI = Partial<Omit<WhoAmI, 'pisaUserId'>> & { _id: string }

function isRawWhoAmI(item: unknown): item is RawWhoAmI {
  if (!item) return false
  if (typeof item !== 'object') return false

  const {
    _id,
    name,
    salutation,
    givenName,
    familyName,
    email,
    staff,
    // image, // TODO: Check image as well
    // salesUserId, // TODO: Check reference more strictly
    // serviceUserId, // TODO: Check reference more strictly
  } = item as RawWhoAmI

  return (
    typeof _id === 'string' &&
    isOptionalString(name) &&
    isOptionalString(salutation) &&
    isOptionalString(givenName) &&
    isOptionalString(familyName) &&
    isOptionalString(email) &&
    typeof staff === 'boolean'
  )
}

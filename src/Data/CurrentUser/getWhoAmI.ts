import {
  createRestApiClient,
  DataConnectionError,
  isUserLoggedIn,
} from 'scrivito'
import { isOptionalString } from '../../utils/isOptionalString'
import { pisaConfig, pisaUrl } from '../pisaClient'
import { errorToast, simpleErrorToast } from './errorToast'
import { getTokenAuthorization } from '../getTokenAuthorization'

export async function getWhoAmI(): Promise<WhoAmI | null> {
  const whoAmIConfig = await pisaConfig('whoami') // TODO: switch back to pisaClient, once #11616 is resolved
  if (!whoAmIConfig) return null

  try {
    const whoAmI = await requestPisa(whoAmIConfig.url, whoAmIConfig.headers)
    if (!isRawWhoAmI(whoAmI)) throw new DataConnectionError('Invalid user ID')

    return {
      pisaUserId: whoAmI._id,

      email: whoAmI.email ?? '',
      familyName: whoAmI.familyName ?? '',
      givenName: whoAmI.givenName ?? '',
      image: whoAmI.image ?? null,
      name: whoAmI.name ?? '',
      position: whoAmI.position ?? '',
      salesUserId: whoAmI.salesUserId ?? null,
      salutation: whoAmI.salutation ?? '',
      serviceUserId: whoAmI.serviceUserId ?? null,
      staff: whoAmI.staff === true,
    }
  } catch (error) {
    errorToast('Failed to fetch whoami', error)
    throw error
  }
}

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

async function requestPisa(url: string, headers: Record<string, string>) {
  if (!isUserLoggedIn()) {
    const Authorization = getTokenAuthorization()
    if (Authorization) {
      // TODO: Replace fetch with pisaClient, once #11616 is resolved
      const response = await fetch(url, {
        method: 'GET',
        headers: { ...headers, Authorization },
      })
      if (!response.ok) throw new DataConnectionError('Failed to fetch WhoAmI')

      return response.json()
    }
  }
  return createRestApiClient(url, { headers }).get('')
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

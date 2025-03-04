import { createRestApiClient, DataConnectionError } from 'scrivito'
import { isOptionalString } from '../../utils/isOptionalString'
import { pisaConfig, pisaUrl } from '../pisaClient'
import { errorToast } from './errorToast'

export async function getWhoAmI(): Promise<WhoAmI | null> {
  const whoAmIConfig = await pisaConfig('whoami') // TODO: switch back to pisaClient, once #11616 is resolved
  if (!whoAmIConfig) return null

  try {
    const whoAmI = await requestPisa(whoAmIConfig.url, whoAmIConfig.headers)
    if (!isWhoAmI(whoAmI)) throw new DataConnectionError('Invalid user ID')

    return whoAmI
  } catch (error) {
    errorToast('Unable to connect to PisaSales', error)
    throw error
  }
}

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
  if (response.status === 401) {
    errorToast('URL token is unauthorized', new Error(''))
  }

  if (!response.ok) return

  const result = await response.json()
  if (!isWhoAmI(result)) return

  if (result.email === email) return

  errorToast(
    `Ignoring URL token for user ${result?.email ?? ''}.`,
    new Error(''),
  )
}

async function requestPisa(url: string, headers: Record<string, string>) {
  if (!headers.Authorization) {
    return createRestApiClient(url, { headers }).get('')
  }

  const response = await fetch(url, { method: 'GET', headers })
  if (!response.ok) throw new DataConnectionError('Failed to fetch WhoAmI')

  return response.json()
}

interface WhoAmI {
  _id: string
  name?: string
  salutation?: string
  givenName?: string
  familyName?: string
  email?: string
  position?: string
  staff?: boolean
  image?: {
    _id: string
    filename: string
    contentType: string
    contentLength: number
  } | null
  salesUserId?: string | null
  serviceUserId?: string | null
}

function isWhoAmI(item: unknown): item is WhoAmI {
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
  } = item as WhoAmI

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

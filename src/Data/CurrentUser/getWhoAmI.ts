import { isOptionalString } from '../../utils/isOptionalString'
import { pisaClient } from '../pisaClient'
import { errorToast } from './errorToast'

export async function getWhoAmI(): Promise<WhoAmI | null> {
  const whoamiClient = await pisaClient('whoami')
  if (!whoamiClient) return null

  try {
    const whoAmI = await whoamiClient.get('')
    if (!isWhoAmI(whoAmI)) throw new Error('Invalid user ID')

    return whoAmI
  } catch (error) {
    errorToast('Unable to connect to PisaSales', error)
    throw error
  }
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

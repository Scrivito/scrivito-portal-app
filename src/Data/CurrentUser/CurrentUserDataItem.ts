import { currentUser, load, provideDataItem } from 'scrivito'
import personCircle from '../../assets/images/person-circle.svg'
import { ensureString } from '../../utils/ensureString'
import { isOptionalString } from '../../utils/isOptionalString'
import { neoletterClient } from '../neoletterClient'
import { pisaClient } from '../pisaClient'

export const CurrentUser = provideDataItem('CurrentUser', {
  async get() {
    const user = await load(currentUser)
    if (!user) return {}

    const neoletterProfile = await neoletterClient().get('my/profile')
    if (!isNeoletterData(neoletterProfile)) {
      throw new Error('Neoletter data is not in the expected format')
    }

    const whoAmI = await pisaClient('whoami').get('')

    if (!isWhoAmI(whoAmI)) {
      throw new Error('Whoami data is not in the expected format')
    }

    const pisaUserId = ensureString(whoAmI._id)
    const salesUserId = ensureString(whoAmI.salesUserId) // TODO: Remove "ensureString" once datalocator filter can handle "null"
    const serviceUserId = ensureString(whoAmI.serviceUserId) // TODO: Remove "ensureString" once datalocator filter can handle "null"

    return {
      email: user.email(),
      picture: ensureString(user.picture()) || personCircle,
      jrUserId: user.id(),

      pisaUserId,
      salesUserId,
      serviceUserId,

      name: ensureString(neoletterProfile.name),
      company: ensureString(neoletterProfile.company),
      familyName: ensureString(neoletterProfile.family_name),
      givenName: ensureString(neoletterProfile.given_name),
      phoneNumber: ensureString(neoletterProfile.phone_number),
      salutation: ensureString(neoletterProfile.salutation),
    }
  },
  async update(params) {
    const {
      company,
      familyName,
      givenName,
      name,
      phoneNumber,
      salutation,
      ...otherArgs
    } = params
    if (Object.keys(otherArgs).length > 0) {
      throw new Error(`Unknown keys - ${Object.keys(otherArgs)}`)
    }

    await neoletterClient().put('my/profile', {
      data: {
        company,
        family_name: familyName,
        given_name: givenName,
        name,
        phone_number: phoneNumber,
        salutation,
      },
    })
  },
})

interface NeoletterData {
  company?: string
  family_name?: string
  given_name?: string
  name?: string
  phone_number?: string
  salutation?: string
}

function isNeoletterData(input: unknown): input is NeoletterData {
  if (!input) return false
  if (typeof input !== 'object') return false

  const item = input as NeoletterData
  return (
    isOptionalString(item.company) &&
    isOptionalString(item.family_name) &&
    isOptionalString(item.given_name) &&
    isOptionalString(item.name) &&
    isOptionalString(item.phone_number) &&
    isOptionalString(item.salutation)
  )
}

interface WhoAmI {
  _id: string
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
    position,
    staff,
    // image, // TODO: Check image as well
    salesUserId,
    serviceUserId,
  } = item as WhoAmI

  return (
    typeof _id === 'string' &&
    typeof name === 'string' &&
    typeof salutation === 'string' &&
    typeof givenName === 'string' &&
    typeof familyName === 'string' &&
    typeof email === 'string' &&
    typeof position === 'string' &&
    typeof staff === 'boolean' &&
    (salesUserId === null || typeof salesUserId === 'string') &&
    (serviceUserId === null || typeof serviceUserId === 'string')
  )
}

import {
  currentUser,
  getInstanceId,
  load,
  provideDataItem,
  unstable_JrRestApi,
} from 'scrivito'
import personCircle from '../../assets/images/person-circle.svg'
import { ensureString } from '../../utils/ensureString'
import { isOptionalString } from '../../utils/isOptionalString'

export const CurrentUser = provideDataItem('CurrentUser', {
  async get() {
    const user = await load(currentUser)
    if (!user) return {}

    const neoletterProfile = await unstable_JrRestApi.get(neoletterProfileUrl())
    if (!isNeoletterData(neoletterProfile)) {
      throw new Error('Neoletter data is not in the expected format')
    }

    // TODO: read data from Pisa
    const pisaUserId: string = 'F87BDC400E41D630E030A8C00D01158A'
    const salesUserId: string = '052601BEBCEC39C8E040A8C00D0107AC'
    const serviceUserId: string = 'D456ACF6FF405922E030A8C02A010C68'

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

    await unstable_JrRestApi.put(neoletterProfileUrl(), {
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

function neoletterProfileUrl() {
  return `neoletter/instances/${getInstanceId()}/my/profile`
}

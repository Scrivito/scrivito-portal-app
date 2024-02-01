import { isObject } from 'lodash-es'
import {
  currentUser,
  getInstanceId,
  load,
  provideDataItem,
  unstable_JrRestApi,
} from 'scrivito'
import personCircle from '../../assets/images/person-circle.svg'
import { ensureString } from '../../utils/ensureString'
import { dataBinaryToUrl, isDataBinary } from '../../utils/dataBinaryToUrl'
import { scrivitoTenantId } from '../../config/scrivitoTenantId'

export const CurrentUser = provideDataItem('CurrentUser', {
  async get() {
    const user = await load(currentUser)
    if (!user) return {}

    const neoletterData = await unstable_JrRestApi.fetch(neoletterProfileUrl())

    let company: string = ''
    let name: string = user.name()
    let phoneNumber: string = ''
    let picture: string = user.picture() || personCircle
    let pisaUserId: string = ''
    let salutation: string = ''
    let salesUserId: string = ''
    let serviceUserId: string = ''

    if (isNeoletterData(neoletterData)) {
      company = neoletterData.company || ''
      phoneNumber = neoletterData.phone_number || ''
      salutation = neoletterData.salutation || ''
    }

    const whoAmI = await unstable_JrRestApi.fetch(
      `../pisa-api/${scrivitoTenantId().tenant}/whoami`,
    )

    if (isWhoAmI(whoAmI)) {
      name = whoAmI.name
      salesUserId = ensureString(whoAmI.salesUserId) // TODO: Remove "ensureString" once datalocator filter can handle "null"
      serviceUserId = ensureString(whoAmI.serviceUserId) // TODO: Remove "ensureString" once datalocator filter can handle "null"
      pisaUserId = ensureString(whoAmI._id)
      if (isDataBinary(whoAmI.image)) {
        const { url } = await dataBinaryToUrl(whoAmI.image)
        picture = url
      }
    }

    return {
      company,
      email: user.email(),
      jrUserId: user.id(),
      pisaUserId,
      name,
      phoneNumber,
      picture,
      salesUserId,
      salutation,
      serviceUserId,
    }
  },
  async update(params) {
    const { company, phoneNumber, salutation, ...otherArgs } = params
    if (Object.keys(otherArgs).length > 0) {
      throw new Error(`Unknown keys - ${Object.keys(otherArgs)}`)
    }

    await unstable_JrRestApi.put(neoletterProfileUrl(), {
      data: { company, phone_number: phoneNumber, salutation },
    })
  },
})

interface NeoletterData {
  company?: string
  phone_number?: string
  salutation?: string
}

function isNeoletterData(input: unknown): input is NeoletterData {
  if (!isObject(input)) return false
  if (!isOptionalString((input as NeoletterData).company)) return false
  if (!isOptionalString((input as NeoletterData).phone_number)) return false
  if (!isOptionalString((input as NeoletterData).salutation)) return false

  return true
}

function isOptionalString(input: unknown): input is undefined | string {
  return typeof input === 'undefined' || typeof input === 'string'
}

function neoletterProfileUrl() {
  return `neoletter/instances/${getInstanceId()}/my/profile`
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

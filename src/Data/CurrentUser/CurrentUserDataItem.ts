import { isObject } from 'lodash-es'
import {
  currentUser,
  load,
  provideDataItem,
  unstable_JrRestApi,
} from 'scrivito'
import { isUserData } from '../User/UserDataClass'

const NEOLETTER_PROFILE_URL = `neoletter/instances/${
  import.meta.env.SCRIVITO_TENANT
}/my/profile`

export const CurrentUser = provideDataItem('CurrentUser', {
  async get() {
    const user = await load(currentUser)
    if (!user) return {}

    const neoletterData = await unstable_JrRestApi.fetch(NEOLETTER_PROFILE_URL)

    let company: string = ''
    let name: string = user.name()
    let phoneNumber: string = ''
    const picture: string | null = user.picture()
    let salutation: string = ''

    if (isNeoletterData(neoletterData)) {
      company = neoletterData.company || ''
      phoneNumber = neoletterData.phone_number || ''
      salutation = neoletterData.salutation || ''
    }

    const pisaUserData = await unstable_JrRestApi.fetch('../pisa-api/whoami')

    if (isUserData(pisaUserData)) {
      name = pisaUserData.name
      // TODO: Read picture from Pisa once available
    }

    return {
      company,
      email: user.email(),
      jrUserId: user.id(),
      name,
      phoneNumber,
      picture,
      salutation,
    }
  },
  async update(params) {
    const { company, phoneNumber, salutation, ...otherArgs } = params
    if (Object.keys(otherArgs).length > 0) {
      throw new Error(`Unknown keys - ${Object.keys(otherArgs)}`)
    }

    await unstable_JrRestApi.put(NEOLETTER_PROFILE_URL, {
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

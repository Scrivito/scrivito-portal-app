import { isObject } from 'lodash-es'
import {
  currentUser,
  load,
  provideDataItem,
  unstable_JrRestApi,
} from 'scrivito'
import personCircle from 'bootstrap-icons/icons/person-circle.svg'

const NEOLETTER_PROFILE_URL = `neoletter/instances/${
  import.meta.env.SCRIVITO_TENANT
}/my/profile`

export const CurrentUser = provideDataItem('CurrentUser', {
  async get() {
    const user = await load(currentUser)
    if (!user) return {}

    const rawNeoletterData = await unstable_JrRestApi.get(NEOLETTER_PROFILE_URL)

    let company: string | undefined
    let phoneNumber: string | undefined
    let salutation: string | undefined
    const pisaUserId: string | undefined = 'F87BDC400E41D630E030A8C00D01158A'
    const picture: string = user.picture() || personCircle

    if (isNeoletterData(rawNeoletterData)) {
      company = rawNeoletterData.company || ''
      phoneNumber = rawNeoletterData.phone_number || ''
      salutation = rawNeoletterData.salutation || ''
    }

    return {
      company,
      email: user.email(),
      jrUserId: user.id(),
      pisaUserId,
      name: user.name(),
      phoneNumber,
      picture,
      salesUserId: '052601BEBCEC39C8E040A8C00D0107AC', // TODO: replace with real Pisa data
      salutation,
      serviceUserId: 'D456ACF6FF405922E030A8C02A010C68', // TODO: replace with real Pisa data
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

import {
  currentUser,
  getInstanceId,
  load,
  provideDataItem,
  unstable_JrRestApi,
} from 'scrivito'
import personCircle from '../../assets/images/person-circle.svg'

export const CurrentUser = provideDataItem('CurrentUser', {
  async get() {
    const user = await load(currentUser)
    if (!user) return {}

    const rawNeoletterData = await unstable_JrRestApi.get(neoletterProfileUrl())

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
  if (!input) return false
  if (typeof input !== 'object') return false

  const item = input as NeoletterData
  return (
    isOptionalString(item.company) &&
    isOptionalString(item.phone_number) &&
    isOptionalString(item.salutation)
  )
}

function isOptionalString(input: unknown): input is undefined | string {
  return typeof input === 'undefined' || typeof input === 'string'
}

function neoletterProfileUrl() {
  return `neoletter/instances/${getInstanceId()}/my/profile`
}

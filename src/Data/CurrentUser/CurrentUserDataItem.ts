import { isObject } from 'lodash-es'
import {
  currentUser,
  load,
  provideDataItem,
  unstable_JrRestApi,
} from 'scrivito'

export const CurrentUserDataItem = provideDataItem('CurrentUser', {
  async get() {
    const user = await load(currentUser)
    if (!user) return {}

    const rawNeoletterData = await unstable_JrRestApi.get(
      `neoletter/instances/${import.meta.env.SCRIVITO_TENANT}/my/profile`,
    )

    let company: string | undefined
    let phoneNumber: string | undefined
    let salutation: string | undefined

    if (isNeoletterData(rawNeoletterData)) {
      company = rawNeoletterData.company || ''
      phoneNumber = rawNeoletterData.phone_number || ''
      salutation = rawNeoletterData.salutation || ''
    }

    return {
      company,
      email: user.email(),
      jrUserId: user.id(),
      name: user.name(),
      phoneNumber,
      salutation,
    }
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

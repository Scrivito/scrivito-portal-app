import {
  currentLanguage,
  currentUser,
  DataAttributeDefinitions,
  load,
  provideDataItem,
} from 'scrivito'
import personCircle from '../../assets/images/person-circle.svg'
import { ensureString } from '../../utils/ensureString'
import { isOptionalString } from '../../utils/isOptionalString'
import { neoletterClient } from '../neoletterClient'
import { pisaClient } from '../pisaClient'
import { errorToast } from './errorToast'

async function attributes(): Promise<DataAttributeDefinitions> {
  const lang = await load(currentLanguage)

  return {
    company: ['string', { title: lang === 'de' ? 'Firma' : 'Company' }],
    email: ['string', { title: lang === 'de' ? 'E-Mail' : 'Email' }],
    familyName: [
      'string',
      { title: lang === 'de' ? 'Nachname' : 'Family name' },
    ],
    givenName: ['string', { title: lang === 'de' ? 'Vorname' : 'Given name' }],
    jrUserId: [
      'string',
      { title: lang === 'de' ? 'JustRelate Nutzer ID' : 'JustRelate user ID' },
    ],
    name: ['string', { title: lang === 'de' ? 'Name' : 'Name' }],
    phoneNumber: [
      'string',
      { title: lang === 'de' ? 'Telefonnummer' : 'Phone number' },
    ],
    picture: ['string', { title: lang === 'de' ? 'Bild' : 'Picture' }],
    pisaUserId: [
      'string',
      { title: lang === 'de' ? 'PisaSales Nutzer ID' : 'PisaSales user ID' },
    ],
    salesUserId: [
      'reference',
      {
        to: 'User',
        title: lang === 'de' ? 'Vertriebskontakt' : 'Sales representative',
      },
    ],
    salutation: ['string', { title: lang === 'de' ? 'Anrede' : 'Salutation' }],
    serviceUserId: [
      'reference',
      {
        to: 'User',
        title: lang === 'de' ? 'Servicekontakt' : 'Support contact',
      },
    ],
  }
}

export const CurrentUser = provideDataItem('CurrentUser', {
  attributes,
  connection: {
    async get() {
      const user = await load(currentUser)
      if (!user) return null

      let neoletterProfile
      try {
        neoletterProfile = await neoletterClient().get('my/profile')
        if (!isNeoletterData(neoletterProfile)) {
          throw new Error('Invalid user profile')
        }
      } catch (error) {
        errorToast('Unable to connect to Neoletter', error)
        throw error
      }

      const { pisaUserId, salesUserId, serviceUserId } = await pisaIds()

      return {
        email: user.email(),
        picture: user.picture() || personCircle,
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
        throw new Error(`Unknown keys - ${Object.keys(otherArgs).join(', ')}`)
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
  },
})

async function pisaIds() {
  if (!import.meta.env.ENABLE_PISA) {
    return {
      pisaUserId: 'F87BDC400E41D630E030A8C00D01158A',
      salesUserId: '052601BEBCEC39C8E040A8C00D0107AC',
      serviceUserId: 'D456ACF6FF405922E030A8C02A010C68',
    }
  }

  const whoamiClient = await pisaClient('whoami')
  let whoAmI
  try {
    whoAmI = await whoamiClient.get('')
    if (!isWhoAmI(whoAmI)) throw new Error('Invalid user ID')
  } catch (error) {
    errorToast('Unable to connect to PisaSales', error)
    throw error
  }

  return {
    pisaUserId: whoAmI._id,
    salesUserId: whoAmI.salesUserId,
    serviceUserId: whoAmI.serviceUserId,
  }
}

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
    position,
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
    isOptionalString(position) &&
    typeof staff === 'boolean'
  )
}

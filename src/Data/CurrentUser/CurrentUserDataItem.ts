import {
  currentLanguage,
  currentUser,
  DataAttributeDefinitions,
  DataConnectionError,
  isUserLoggedIn,
  load,
  provideDataItem,
} from 'scrivito'
import personCircle from '../../assets/images/person-circle.svg'
import { ensureString } from '../../utils/ensureString'
import { isOptionalString } from '../../utils/isOptionalString'
import { neoletterClient } from '../neoletterClient'
import { getTokenAuthorization } from '../getTokenAuthorization'
import { errorToast, simpleErrorToast } from './errorToast'
import { pisaClient, pisaConfig } from '../pisaClient'

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
      { title: lang === 'de' ? 'JustRelate-Nutzer-ID' : 'JustRelate user ID' },
    ],
    name: ['string', { title: lang === 'de' ? 'Name' : 'Name' }],
    phoneNumber: [
      'string',
      { title: lang === 'de' ? 'Telefonnummer' : 'Phone number' },
    ],
    picture: ['string', { title: lang === 'de' ? 'Bild' : 'Picture' }],
    pisaUserId: [
      'string',
      { title: lang === 'de' ? 'PisaSales-Nutzer-ID' : 'PisaSales user ID' },
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
        title: lang === 'de' ? 'Supportkontakt' : 'Support contact',
      },
    ],
  }
}

export const CurrentUser = provideDataItem('CurrentUser', {
  attributes,
  title: async () =>
    (await load(currentLanguage)) === 'de'
      ? 'Aktueller Benutzer'
      : 'Current user',
  connection: {
    async get() {
      const user = await load(currentUser)

      if (!user) {
        const tokenAuthorization = getTokenAuthorization()
        if (tokenAuthorization) {
          return getTokenBasedCurrentUser(tokenAuthorization)
        }

        return null
      }

      let neoletterProfile
      try {
        neoletterProfile = await neoletterClient().get('my/profile')
        if (!isNeoletterData(neoletterProfile)) {
          throw new DataConnectionError('Invalid user profile')
        }
      } catch (error) {
        errorToast('Failed to fetch user profile', error)
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
      if (getTokenAuthorization()) {
        throw new DataConnectionError('Update not supported.')
      }

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
        throw new DataConnectionError(
          `Unknown keys - ${Object.keys(otherArgs).join(', ')}`,
        )
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

async function pisaIds(): Promise<{
  pisaUserId: string
  salesUserId: string | null
  serviceUserId: string | null
}> {
  const whoamiClient = await pisaClient('whoami')
  if (!whoamiClient) {
    return {
      pisaUserId: 'F87BDC400E41D630E030A8C00D01158A',
      salesUserId: '052601BEBCEC39C8E040A8C00D0107AC',
      serviceUserId: 'D456ACF6FF405922E030A8C02A010C68',
    }
  }

  try {
    const whoAmI = (await whoamiClient.get('')) as WhoAmI

    return {
      pisaUserId: whoAmI._id,
      salesUserId: whoAmI.salesUserId ?? null,
      serviceUserId: whoAmI.serviceUserId ?? null,
    }
  } catch (error) {
    errorToast('Unable to connect to PisaSales', error)
    throw error
  }
}

async function getTokenBasedCurrentUser(tokenAuthorization: string) {
  if (isUserLoggedIn()) return null // Safeguard

  const whoAmIConfig = await pisaConfig('whoami')
  if (!whoAmIConfig) return null

  const { url, headers: baseHeaders } = whoAmIConfig

  const headers = { ...baseHeaders, Authorization: tokenAuthorization }

  // TODO: Replace fetch with pisaClient, once #11616 is resolved
  const response = await fetch(url, { method: 'GET', headers })
  if (!response.ok) {
    const errorMessage =
      response.status === 401
        ? 'The link you followed is invalid or has expired. Please request a new one.'
        : 'Failed to fetch user profile.'
    simpleErrorToast(errorMessage)

    throw new DataConnectionError(errorMessage)
  }

  const whoAmI = (await response.json()) as WhoAmI

  return {
    company: '',
    jrUserId: '',
    phoneNumber: '',
    picture: personCircle,

    pisaUserId: whoAmI._id,

    email: whoAmI.email ?? '',
    familyName: whoAmI.familyName ?? '',
    givenName: whoAmI.givenName ?? '',
    image: whoAmI.image ?? null,
    name: whoAmI.name ?? '',
    position: whoAmI.position ?? '',
    salesUserId: whoAmI.salesUserId ?? null,
    salutation: whoAmI.salutation ?? '',
    serviceUserId: whoAmI.serviceUserId ?? null,
    staff: whoAmI.staff === true,
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

export interface WhoAmI {
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

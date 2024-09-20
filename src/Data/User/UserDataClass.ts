import { currentLanguage, load } from 'scrivito'
import { localStorageUserDataClass } from './LocalStorage/localStorageUserDataClass'
import { CurrentUser } from '../CurrentUser/CurrentUserDataItem'
import { DataClassSchema, RawItem } from '../types'
import { pisaUserDataClass } from './Pisa/pisaUserDataClass'

async function attributes(): Promise<DataClassSchema> {
  const lang = await load(currentLanguage)

  const salutation = [
    'enum',
    lang === 'de'
      ? {
          title: 'Anrede',
          values: [
            { value: 'M', title: 'Herr' },
            { value: 'F', title: 'Frau' },
            { value: 'ME', title: 'Mr.' },
            { value: 'FE', title: 'Ms.' },
            { value: 'MS', title: 'Hr.' },
            { value: 'FS', title: 'Fr.' },
            { value: 'MSP', title: 'Señor' },
            { value: 'FSP', title: 'Señora' },
            { value: 'MF', title: 'Monsieur' },
            { value: 'FF', title: 'Madame' },
          ],
        }
      : {
          title: 'Saluation',
          values: [
            { value: 'M', title: 'Herr' },
            { value: 'F', title: 'Frau' },
            { value: 'ME', title: 'Mr.' },
            { value: 'FE', title: 'Ms.' },
            { value: 'MS', title: 'Hr.' },
            { value: 'FS', title: 'Fr.' },
            { value: 'MSP', title: 'Señor' },
            { value: 'FSP', title: 'Señora' },
            { value: 'MF', title: 'Monsieur' },
            { value: 'FF', title: 'Madame' },
          ],
        },
  ] as const

  return {
    _id: ['string', { title: 'ID' }],
    email: [
      'string',
      { title: lang === 'de' ? 'E-Mailadresse' : 'Email address' },
    ],
    familyName: [
      'string',
      { title: lang === 'de' ? 'Nachname' : 'Family name' },
    ],
    givenName: ['string', { title: lang === 'de' ? 'Vorname' : 'Given name' }],
    name: ['string', { title: 'Name' }],
    position: ['string', { title: 'Position' }],
    salutation,
  }
}

export const User = import.meta.env.ENABLE_PISA
  ? pisaUserDataClass(attributes)
  : localStorageUserDataClass(attributes)

export async function postProcessUserData(data: RawItem): Promise<RawItem> {
  // Use the data item cached by Scrivito instead of connecting to the backend directly
  const pisaUserId = await load(() => CurrentUser.get('pisaUserId'))
  if (data._id !== pisaUserId) return data

  return {
    _id: data._id,
    staff: false,
    email: await load(() => CurrentUser.get('email')),
    familyName: await load(() => CurrentUser.get('familyName')),
    givenName: await load(() => CurrentUser.get('givenName')),
    image: { url: await load(() => CurrentUser.get('picture')) },
    name: await load(() => CurrentUser.get('name')),
    salutation: await load(() => CurrentUser.get('salutation')),
  }
}

import { load } from 'scrivito'
import { localStorageUserDataClass } from './LocalStorage/localStorageUserDataClass'
import { CurrentUser } from '../CurrentUser/CurrentUserDataItem'
import { ResultItem } from '../types'
import { pisaUserDataClass } from './Pisa/pisaUserDataClass'

export const User = import.meta.env.ENABLE_PISA
  ? pisaUserDataClass()
  : localStorageUserDataClass()

export async function postProcessUserData(
  data: ResultItem,
): Promise<ResultItem> {
  // Use the data item cached by Scrivito instead of connecting to the backend directly
  const pisaUserId = await load(() => CurrentUser.get('pisaUserId'))
  if (data._id !== pisaUserId) return data

  return {
    ...data,

    staff: false,
    email: await load(() => CurrentUser.get('email')),
    familyName: await load(() => CurrentUser.get('familyName')),
    givenName: await load(() => CurrentUser.get('givenName')),
    image: { url: await load(() => CurrentUser.get('picture')) },
    name: await load(() => CurrentUser.get('name')),
    // Ignoring `salutation`, since neoletter's attribute is a plain string (e.g. `Frau` or `Herr`), whereas PisaSales responds with an enum value such as `F` or `M`.
  }
}

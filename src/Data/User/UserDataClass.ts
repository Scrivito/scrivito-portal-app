import { provideLocalStorageDataClass } from '../../utils/provideLocalStorageDataClass'
import richterImage from './FakeBinaries/richter.jpg'
import braschauImage from './FakeBinaries/braschau.jpg'
import { CurrentUser } from '../CurrentUser/CurrentUserDataItem'
import { load } from 'scrivito'

export const User = provideLocalStorageDataClass('User', {
  postProcessData: async (data) => {
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
  },
  initialContent: [
    {
      _id: '052601BEBCEC39C8E040A8C00D0107AC',
      name: 'Thomas Richter',
      salutation: 'Herr',
      givenName: 'Thomas',
      familyName: 'Richter',
      staff: true,
      position: 'Vertriebsmanager',
      email: 't.richter@example.com',
      image: { url: richterImage },
    },
    {
      _id: '18EEEAEC56D37397E040A8C00F012319',
      name: 'Adrian Schärli',
      salutation: 'Herr',
      givenName: 'Adrian',
      familyName: 'Schärli',
      staff: false,
    },
    {
      _id: '228C5C6067EF486FB72F8D4BAAE6AB08',
      name: 'Olaf Behrends',
      salutation: 'Herr',
      givenName: 'Olaf',
      familyName: 'Behrends',
      staff: false,
    },
    {
      _id: 'D38D7FBFA277856DE030A8C02A010460',
      name: 'Frank Goosens',
      salutation: 'Herr',
      givenName: 'Frank',
      familyName: 'Goosens',
      staff: false,
    },
    {
      _id: 'D456ACF6FF405922E030A8C02A010C68',
      name: 'Benjamin Braschau',
      salutation: 'Herr',
      givenName: 'Benjamin',
      familyName: 'Braschau',
      staff: true,
      position: 'Serviceleiter',
      email: 'b.braschau@example.com',
      image: { url: braschauImage },
    },
    {
      _id: 'F87BDC400E41D630E030A8C00D01158A',
      name: 'Markus Neumann',
      salutation: 'Herr',
      givenName: 'Markus',
      familyName: 'Neumann',
      staff: false,
    },
    {
      _id: 'F9E1B255870E5EEEE030A8C00D012D39',
      name: 'Heinrich Siebert',
      salutation: 'Herr',
      givenName: 'Heinrich',
      familyName: 'Siebert',
      staff: false,
    },
    {
      _id: '4668C6ADEF0443BE80FB4049097A901A',
      name: 'Administrator',
      salutation: '',
      givenName: '',
      familyName: 'Administrator',
      staff: true,
    },
  ],
})

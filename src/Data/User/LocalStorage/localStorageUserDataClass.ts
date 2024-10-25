import { provideLocalStorageDataClass } from '../../provideLocalStorageDataClass'
import richterImage from './FakeBinaries/richter.jpg'
import braschauImage from './FakeBinaries/braschau.jpg'
import fuchsImage from './FakeBinaries/fuchs.jpg'
import bachImage from './FakeBinaries/bach.jpg'
import { postProcessUserData } from '../UserDataClass'
import { currentLanguage, load } from 'scrivito'

async function attributes() {
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
    staff: [
      'boolean',
      { title: lang === 'de' ? 'Interner Mitarbeiter?' : 'Internal staff?' },
    ],
  }
}

export function localStorageUserDataClass() {
  return provideLocalStorageDataClass('User', {
    attributes,
    postProcessData: postProcessUserData,
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
        email: 'asc@example.com',
        position: '',
        staff: true,
      },
      {
        _id: '228C5C6067EF486FB72F8D4BAAE6AB08',
        name: 'Olaf Behrends',
        salutation: 'Herr',
        givenName: 'Olaf',
        familyName: 'Behrends',
        email: 'behrends@example.de',
        position: 'Produktmanager',
        staff: true,
      },
      {
        _id: 'D38D7FBFA277856DE030A8C02A010460',
        name: 'Frank Goosens',
        salutation: 'Herr',
        givenName: 'Frank',
        familyName: 'Goosens',
        email: 'goosens@example.de',
        position: 'Leiter Wareneingang',
        staff: true,
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
        email: 'siebert@example.com',
        position: 'Servicemitarbeiter',
        staff: true,
      },
      {
        _id: '4668C6ADEF0443BE80FB4049097A901A',
        name: 'Administrator',
        salutation: '',
        givenName: '',
        familyName: 'Administrator',
        email: '',
        position: '',
        staff: true,
      },
      {
        _id: 'F203EF15869B46509B2BE0AB12D480D2',
        name: 'Martin Fuchs',
        salutation: 'Herr',
        givenName: 'Martin',
        familyName: 'Fuchs',
        email: 'm.fuchs@tynacoon.com',
        position: 'Leiter Einkauf',
        staff: true,
        image: { url: fuchsImage },
      },
      {
        _id: '0BD5DC0F9DA442C5946FA7ECAF870D7B',
        name: 'Irene Bach',
        salutation: 'Frau',
        givenName: 'Irene',
        familyName: 'Bach',
        email: 'bach@tynacoon.de',
        position: 'Schulungsleiterin',
        staff: true,
        image: { url: bachImage },
      },
    ],
  })
}

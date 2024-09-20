import { currentLanguage, load } from 'scrivito'
import { provideLocalStorageDataClass } from '../../../utils/provideLocalStorageDataClass'
import { DataClassSchema } from '../../types'
import spiderImage from './FakeBinaries/Schulung_Spider_30.png'
import roadshowImage from './FakeBinaries/TYNACOON_Roadshow.jpg'

async function attributes(): Promise<DataClassSchema> {
  const lang = await load(currentLanguage)

  const language = [
    'enum',
    lang === 'de'
      ? {
          title: 'Sprache',
          values: [
            { value: 'ENG', title: 'Englisch' },
            { value: 'FRA', title: 'Französisch' },
            { value: 'GER', title: 'Deutsch' },
            { value: 'ITA', title: 'Italienisch' },
            { value: 'SPA', title: 'Spanisch' },
          ],
        }
      : {
          title: 'Language',
          values: [
            { value: 'ENG', title: 'English' },
            { value: 'FRA', title: 'French' },
            { value: 'GER', title: 'German' },
            { value: 'ITA', title: 'Italian' },
            { value: 'SPA', title: 'Spanish' },
          ],
        },
  ] as const

  const status = [
    'enum',
    lang === 'de'
      ? {
          title: 'Status',
          values: [
            { value: 'PSA_PRO_EVT_BRK', title: 'unterbrochen' },
            { value: 'PSA_PRO_EVT_CLS', title: 'abgeschlossen' },
            { value: 'PSA_PRO_EVT_CNL', title: 'vorzeitig abgebrochen' },
            { value: 'PSA_PRO_EVT_EXE', title: 'Durchführung' },
            { value: 'PSA_PRO_EVT_PRE', title: 'geplant' },
            { value: 'PSA_PRO_EVT_PRP', title: 'in Vorbereitung' },
            { value: 'PSA_PRO_EVT_REG_CLS', title: 'Anmeldephase geschlossen' },
            { value: 'PSA_PRO_EVT_REG_OPN', title: 'Anmeldephase offen' },
            { value: 'PSA_PRO_EVT_REW', title: 'in Nachbearbeitung' },
            { value: 'PSA_PRO_EVT_WRK', title: 'in Arbeit' },
          ],
        }
      : {
          title: 'Status',
          values: [
            { value: 'PSA_PRO_EVT_BRK', title: 'broken' },
            { value: 'PSA_PRO_EVT_CLS', title: 'finished' },
            { value: 'PSA_PRO_EVT_CNL', title: 'cancelled early' },
            { value: 'PSA_PRO_EVT_EXE', title: 'execution' },
            { value: 'PSA_PRO_EVT_PRE', title: 'planned' },
            { value: 'PSA_PRO_EVT_PRP', title: 'in preparation' },
            { value: 'PSA_PRO_EVT_REG_CLS', title: 'registration closed' },
            { value: 'PSA_PRO_EVT_REG_OPN', title: 'registration open' },
            { value: 'PSA_PRO_EVT_REW', title: 'in postprocess' },
            { value: 'PSA_PRO_EVT_WRK', title: 'in progress' },
          ],
        },
  ] as const

  return {
    _id: ['string', { title: 'ID' }],
    attendanceFee: [
      'number',
      { title: lang === 'de' ? 'Teilnehmergebühr' : 'Attendance fee' },
    ],
    beginsAt: ['date', { title: lang === 'de' ? 'Beginnt am' : 'Begins  at' }],
    description: [
      'string',
      { title: lang === 'de' ? 'Beschreibung' : 'Description' },
    ],
    endsAt: ['date', { title: lang === 'de' ? 'Endet am' : 'Ends at' }],
    freeSeats: [
      'number',
      { title: lang === 'de' ? 'Freie Plätze' : 'Free seats' },
    ],
    keyword: ['string', { title: lang === 'de' ? 'Stichwort' : 'Keyword' }],
    language,
    location: ['string', { title: lang === 'de' ? 'Ort' : 'Location' }],
    number: ['string', { title: lang === 'de' ? 'Nummer' : 'Number' }],
    organizer: [
      'string',
      { title: lang === 'de' ? 'Veranstalter' : 'Organizer' },
    ],
    status,
    url: ['string', { title: 'URL' }],
  }
}

export function localStorageEventDataClass() {
  return provideLocalStorageDataClass('Event', {
    attributes,
    initialContent: [
      {
        _id: 'DD6585A543FE48018F497D3631332C6F',
        keyword: 'Schulung: Wirkungsprinzipien Typ Spider 30',
        number: 'P-11-007950',
        beginsAt: '2024-04-29T13:30:00Z',
        endsAt: '2024-04-29T14:30:00Z',
        location: 'Schulungszentrum 1',
        organizer: '',
        responsibleAgent: '0BD5DC0F9DA442C5946FA7ECAF870D7B',
        status: 'PSA_PRO_EVT_REG_OPN',
        url: '',
        logo: { url: spiderImage },
        language: 'GER',
        freeSeats: null,
        attendanceFee: 0.0,
        description: '',
      },
      {
        _id: '4100600152A8FFCBE040007F01002CE3',
        keyword: 'TYNACOON - Roadshow',
        number: 'P-07.006325',
        beginsAt: '2024-05-06T12:19:00Z',
        endsAt: '2024-05-06T13:19:00Z',
        location: 'Nürnberg',
        organizer: 'K & R Messe GmbH & Co.KG (Karlsruhe)',
        responsibleAgent: 'F203EF15869B46509B2BE0AB12D480D2',
        status: 'PSA_PRO_EVT_REG_OPN',
        url: 'http://www.tynacoon-roadshow.de',
        logo: { url: roadshowImage },
        language: 'GER',
        freeSeats: null,
        attendanceFee: 0.0,
        description:
          'Pilotveranstaltung: Roadshow mit einem Show-Truck. Auf dem Truck sind Maschinen und Geräte installiert und können von den Besuchern teilweise im Betrieb begutachtet werden. Der Show-Truck fährt eine Woche die aktuellen Interessenten ab.',
      },
    ],
  })
}

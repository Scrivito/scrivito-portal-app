import { currentLanguage, DataAttributeDefinitions, load } from 'scrivito'
import { emptyDataConnection } from '../emptyDataConnection'

async function attributes(): Promise<DataAttributeDefinitions> {
  const lang = await load(() => currentLanguage())

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
    attendanceFee: [
      'number',
      { title: lang === 'de' ? 'Teilnehmergebühr' : 'Attendance fee' },
    ],
    beginsAt: ['date', { title: lang === 'de' ? 'Beginnt am' : 'Begins at' }],
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
    responsibleAgent: [
      'reference',
      {
        title: lang === 'de' ? 'Zuständiger Bearbeiter' : 'Responsible agent',
        to: 'User',
      },
    ],
    status,
    url: ['string', { title: 'URL' }],
  }
}

export function eventParamsFallback() {
  return {
    attributes,
    title: async () =>
      (await load(() => currentLanguage())) === 'de'
        ? 'Veranstaltung'
        : 'Event',
    connection: emptyDataConnection('Event'),
  }
}

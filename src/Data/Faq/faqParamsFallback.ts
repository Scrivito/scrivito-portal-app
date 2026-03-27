import { currentLanguage, DataAttributeDefinitions, load } from 'scrivito'
import { localStorageDataConnection } from '../localStorageDataConnection'

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
            { value: 'POL', title: 'Polnisch' },
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
            { value: 'POL', title: 'Polish' },
          ],
        },
  ] as const

  const type1 = [
    'enum',
    lang === 'de'
      ? {
          title: 'Typ 1',
          values: [
            { value: 'PSA_FAQ_TYP_11', title: 'Verteiler' },
            { value: 'PSA_FAQ_TYP_21', title: 'Pumpe' },
            { value: 'PSA_FAQ_TYP_31', title: 'Temperaturüberwachung' },
            { value: 'PSA_FAQ_TYP_41', title: 'Pumpenträger' },
            { value: 'PSA_FAQ_TYP_51', title: 'Kühlblock' },
            { value: 'PSA_FAQ_TYP_61', title: 'Röhre allgemein' },
            { value: 'PSA_FAQ_TYP_71', title: 'Schmiereinheit' },
            { value: 'PSA_FAQ_TYP_80', title: 'Schmieranlagen' },
            { value: 'PSA_FAQ_TYP_90', title: 'Leitungssystem' },
            { value: 'PSA_FAQ_TYP_100', title: 'Pumpenanschluß' },
            { value: 'PSA_FAQ_TYP_110', title: 'PC-Steuereinheit' },
            { value: 'PSA_FAQ_TYP_120', title: 'Netzwerkkarte' },
            {
              value: 'PSA_FAQ_TYP_130',
              title: 'Schnittstelle Kommunikationseinheit',
            },
          ],
        }
      : {
          title: 'Type 1',
          values: [
            { value: 'PSA_FAQ_TYP_11', title: 'splitter' },
            { value: 'PSA_FAQ_TYP_21', title: 'pump' },
            { value: 'PSA_FAQ_TYP_31', title: 'temperature control' },
            { value: 'PSA_FAQ_TYP_41', title: 'pump carrier' },
            { value: 'PSA_FAQ_TYP_51', title: 'cooling unit' },
            { value: 'PSA_FAQ_TYP_61', title: 'tube' },
            { value: 'PSA_FAQ_TYP_71', title: 'lubrication unit' },
            { value: 'PSA_FAQ_TYP_80', title: 'lubrication system' },
            { value: 'PSA_FAQ_TYP_90', title: 'lubrication pipe system' },
            { value: 'PSA_FAQ_TYP_100', title: 'pump connector' },
            { value: 'PSA_FAQ_TYP_110', title: 'control unit' },
            { value: 'PSA_FAQ_TYP_120', title: 'network interface card' },
            { value: 'PSA_FAQ_TYP_130', title: 'Communication interface' },
          ],
        },
  ] as const

  const type2 = [
    'enum',
    lang === 'de'
      ? {
          title: 'Typ 2',
          values: [
            { value: 'PSA_FAQ_TY2_11', title: 'Undichte Schraubverbindungen' },
            { value: 'PSA_FAQ_TY2_21', title: 'Pumpe verschmutzt' },
            { value: 'PSA_FAQ_TY2_31', title: 'Messfühler defekt' },
            { value: 'PSA_FAQ_TY2_41', title: 'frühzeitige Materialermüdung' },
            { value: 'PSA_FAQ_TY2_51', title: 'techn. Defekt' },
            { value: 'PSA_FAQ_TY2_61', title: 'Elektrik' },
            { value: 'PSA_FAQ_TY2_71', title: 'Mechanik' },
            { value: 'PSA_FAQ_TY2_81', title: 'Hydraulik' },
            { value: 'PSA_FAQ_TY2_91', title: 'Pumpe defekt' },
            { value: 'PSA_FAQ_TY2_101', title: 'Lecks' },
            { value: 'PSA_FAQ_TY2_111', title: 'Leckagen' },
            { value: 'PSA_FAQ_TY2_121', title: 'Pumpenmotor defekt' },
            { value: 'PSA_FAQ_TY2_131', title: 'Verschmutzung' },
            { value: 'PSA_FAQ_TY2_141', title: 'neuer Typ' },
            { value: 'PSA_FAQ_TY2_151', title: 'Ölaustritt' },
          ],
        }
      : {
          title: 'Type 2',
          values: [
            { value: 'PSA_FAQ_TY2_11', title: 'screw coupling' },
            { value: 'PSA_FAQ_TY2_21', title: 'draggled pump' },
            { value: 'PSA_FAQ_TY2_31', title: 'not working sensor' },
            { value: 'PSA_FAQ_TY2_41', title: 'fatigue of material' },
            { value: 'PSA_FAQ_TY2_51', title: 'bug' },
            { value: 'PSA_FAQ_TY2_61', title: 'electric' },
            { value: 'PSA_FAQ_TY2_71', title: 'mechanics' },
            { value: 'PSA_FAQ_TY2_81', title: 'Hydraulics' },
            { value: 'PSA_FAQ_TY2_91', title: 'not working pump' },
            { value: 'PSA_FAQ_TY2_101', title: 'leaks' },
            { value: 'PSA_FAQ_TY2_111', title: 'leaks' },
            { value: 'PSA_FAQ_TY2_121', title: 'not working pump' },
            { value: 'PSA_FAQ_TY2_131', title: 'pollution' },
            { value: 'PSA_FAQ_TY2_141', title: 'new type' },
            { value: 'PSA_FAQ_TY2_151', title: 'oil leakage' },
          ],
        },
  ] as const

  return {
    answer: ['string', { title: lang === 'de' ? 'Antwort' : 'Answer' }],
    createdAt: ['date', { title: lang === 'de' ? 'Erzeugt am' : 'Created at' }],
    keyword: ['string', { title: lang === 'de' ? 'Stichwort' : 'Keyword' }],
    language,
    number: ['string', { title: lang === 'de' ? 'Nummer' : 'Number' }],
    question: ['string', { title: lang === 'de' ? 'Frage' : 'Question' }],
    type1,
    type2,
  }
}

export function faqParamsFallback() {
  return {
    attributes,
    title: async () =>
      (await load(() => currentLanguage())) === 'de' ? 'FAQ' : 'FAQ',
    connection: localStorageDataConnection('Faq', {
      initialContent: [
        {
          _id: '04AF72A23ABA40A6966A41E168001A7B',
          keyword: "Oil pump of lubrication system dosn't work",
          number: 'FAQ-09.000287',
          question: "What can I do, if the gear oil pump dosn't work?",
          answer:
            'Follow the instructions:\n\n1. Check the electrical installation including all connectors.\n2. Check the connector between electric motor and gear oil pump.\n3. Check, if oil leaks from the unit-injector.',
          language: 'ENG',
          createdAt: '2009-01-22T15:39:28Z',
        },
        {
          _id: '47CD3C11259148DFBA9FE79C61AABB5B',
          keyword: 'Ölaustritt zwischen Motor und Pumpe',
          number: 'FAQ-08.000131',
          question:
            'Welche Maßnahmen sind bei starkem Ölaustritt zwischen Pumpenmotor und Pumpengehäuse vorzunehmen?',
          answer:
            'Bei Dauerbelastung und maximaler Förderleistung kann es durch Vibrationen zu Rissen an den Verbindungselementen des Motors oder der Pumpe kommen. In diesem Fall sind folgende Maßnahmen durchzuführen.\n\n1. Pumpenmotor auf Risse an der Grundplatte prüfen. ggf. Pumpenmotor austauschen\n\n2.Tritt der Fehler auch nach Austausch des Motors auf. wurde auch das Pumpengehäuse in Mitleidenschaft gezogen. In diesem Fall muss die gesamte Pumpe ausgetauscht werden.',
          type1: 'PSA_FAQ_TYP_21',
          type2: 'PSA_FAQ_TY2_151',
          language: 'GER',
          createdAt: '2008-11-02T11:18:31Z',
        },
        {
          _id: '176C76A4C956A6D8E040A8C00F011EFC',
          keyword: 'Röhrenstörung nach Ablauf des ersten Einsatzjahres',
          number: 'FAQ-06.000040',
          question:
            'Kurzschluss in der Kathodenseite [Interface] nach ca. 12 Monaten.',
          answer: 'Austausch der Röhre wird empfohlen.',
          type1: 'PSA_FAQ_TYP_61',
          type2: 'PSA_FAQ_TY2_51',
          language: 'GER',
          createdAt: '2006-07-03T10:07:32Z',
        },
        {
          _id: '176C6E506416741CE040A8C00F011EF8',
          keyword: 'Kühlblock Klebnaht defekt',
          number: 'FAQ-06.000039',
          question:
            'Einsatz unter extrem korrosionsfördernden Bedingungen: Die Klebnaht bricht.',
          answer:
            'Reparatur mit der Klebmasse X44 wird empfohlen. Diese ist gegenüber Vibrationen robuster.',
          type1: 'PSA_FAQ_TYP_51',
          type2: 'PSA_FAQ_TY2_41',
          language: 'GER',
          createdAt: '2006-07-03T10:04:58Z',
        },
      ],
    }),
  }
}

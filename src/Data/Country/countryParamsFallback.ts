import { currentLanguage, DataAttributeDefinitions, load } from 'scrivito'
import { localStorageDataConnection } from '../localStorageDataConnection'

async function attributes(): Promise<DataAttributeDefinitions> {
  const lang = await load(() => currentLanguage())

  return {
    countryCode: [
      'string',
      { title: lang === 'de' ? 'Telefonvorwahl' : 'Telephone country code' },
    ],
    iso3166A2: [
      'string',
      {
        title:
          lang === 'de' ? 'ISO-3166 Alpha 2 Code' : 'ISO-3166 Alpha 2 code',
      },
    ],
    iso3166A3: [
      'string',
      {
        title:
          lang === 'de' ? 'ISO-3166 Alpha 3 Code' : 'ISO-3166 Alpha 3 code',
      },
    ],
    iso3166Numeric: [
      'string',
      {
        title:
          lang === 'de' ? 'ISO-3166 numerischer Code' : 'ISO-3166 numeric code',
      },
    ],
    name: ['string', { title: 'Name' }],
  }
}

export function countryParamsFallback() {
  return {
    attributes,
    title: async () =>
      (await load(() => currentLanguage())) === 'de' ? 'Land' : 'Country',
    connection: localStorageDataConnection('Country', {
      initialContent: [
        {
          _id: '2B5C81D0D1C04B828CD7FAFDB1E6B737',
          name: 'France',
          iso3166A3: 'FRA',
          iso3166A2: 'FR',
          iso3166Numeric: '250',
          countryCode: '+33',
        },
        {
          _id: '330ACF5ACC1C45FAB21F01035A61433C',
          name: 'Germany',
          iso3166A3: 'DEU',
          iso3166A2: 'DE',
          iso3166Numeric: '276',
          countryCode: '+49',
        },
        {
          _id: '9D6114B0D6B7436A97E33B4FDF85468A',
          name: 'Poland',
          iso3166A3: 'POL',
          iso3166A2: 'PL',
          iso3166Numeric: '616',
          countryCode: '+48',
        },
        {
          _id: '5AEEB5393FDC4A29A38A90BC50269259',
          name: 'United Kingdom',
          iso3166A3: 'GBR',
          iso3166A2: 'GB',
          iso3166Numeric: '826',
          countryCode: '+44',
        },
        {
          _id: '41FF558B95694E9EA84525922F3335E7',
          name: 'United States of America',
          iso3166A3: 'USA',
          iso3166A2: 'US',
          iso3166Numeric: '840',
          countryCode: '+1',
        },
      ],
    }),
  }
}

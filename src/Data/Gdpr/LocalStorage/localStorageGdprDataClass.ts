import { currentLanguage, load } from 'scrivito'
import { provideLocalStorageDataClass } from '../../../utils/provideLocalStorageDataClass'
import { DataClassSchema } from '../../types'

async function attributes(): Promise<DataClassSchema> {
  const lang = await load(currentLanguage)

  return {
    _id: ['string', { title: 'ID' }],
    description: [
      'string',
      { title: lang === 'de' ? 'Beschreibung' : 'Description' },
    ],
    name: ['string', { title: 'Name' }],
  }
}

export function localStorageGdprDataClass() {
  return provideLocalStorageDataClass('Gdpr', {
    attributes,
    prepareData: async (data) => ({
      active: data.active,
      _id: 'F9BB0AAA22C947BAE030A8C00C015B91',
      name: 'Contact by telephone',
      description: 'I agree to be contacted by telephone.',
    }),
    initialContent: [
      {
        _id: 'F9BB0AAA22C947BAE030A8C00C015B91',
        name: 'Contact by telephone',
        description: 'I agree to be contacted by telephone.',
        active: true,
      },
    ],
  })
}

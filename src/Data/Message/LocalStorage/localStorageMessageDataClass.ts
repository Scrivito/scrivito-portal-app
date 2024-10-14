import { currentLanguage, load } from 'scrivito'
import { provideLocalStorageDataClass } from '../../provideLocalStorageDataClass'
import { DataClassSchema } from '../../types'

async function attributes(): Promise<DataClassSchema> {
  const lang = await load(currentLanguage)

  return {
    createdAt: ['string', { title: lang === 'de' ? 'Gesendet am' : 'Sent at' }],
    createdBy: [
      'reference',
      {
        title: lang === 'de' ? 'Gesendet von' : 'Sent by',
        to: 'User',
      },
    ],
    text: ['string', { title: 'Text' }],
  }
}

export function localStorageMessageDataClass() {
  return provideLocalStorageDataClass('Message', {
    attributes,
    prepareData: async (data) => ({
      ...data,
      createdBy: data.createdBy || 'F87BDC400E41D630E030A8C00D01158A',
      createdAt: data.createdAt || new Date().toISOString(),
    }),
    initialContent: [
      {
        _id: '5095866DEFF74DCDBE56B016898137491',
        subjectId: '5095866DEFF74DCDBE56B01689813749',
        text: 'Sorry to hear. Did you try turning it off and back on again?',
        createdBy: 'D456ACF6FF405922E030A8C02A010C68',
        createdAt: '2024-01-12T09:39:04Z',
        attachments: [],
      },
      {
        _id: '5095866DEFF74DCDBE56B016898137492',
        subjectId: '5095866DEFF74DCDBE56B01689813749',
        text: "I just tried it. Now it's working again. Thanks!",
        createdBy: 'F87BDC400E41D630E030A8C00D01158A',
        createdAt: '2024-01-12T09:39:29Z',
        attachments: [],
      },
      {
        _id: '5095866DEFF74DCDBE56B016898137493',
        subjectId: '5095866DEFF74DCDBE56B01689813749',
        text: 'Great to hear',
        createdBy: 'D456ACF6FF405922E030A8C02A010C68',
        createdAt: '2024-01-12T09:39:49Z',
        attachments: [],
      },
    ],
  })
}

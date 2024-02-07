import { convertBlobAttributes } from '../../utils/convertBlobAttributes'
import { provideLocalStorageDataClass } from '../../utils/provideLocalStorageDataClass'

export const TicketMessage = provideLocalStorageDataClass('TicketMessage', {
  prepareData: async (data) => {
    const newData = await convertBlobAttributes(data)

    return {
      ...newData,
      createdBy: newData.createdBy || 'F87BDC400E41D630E030A8C00D01158A',
      createdAt: newData.createdAt || new Date().toISOString(),
    }
  },
  initialContent: [
    {
      _id: '5095866DEFF74DCDBE56B016898137491',
      ticketId: '5095866DEFF74DCDBE56B01689813749',
      text: 'Sorry to hear. Did you try turning it off and back on again?',
      createdBy: 'D456ACF6FF405922E030A8C02A010C68',
      createdAt: '2024-01-12T09:39:04Z',
    },
    {
      _id: '5095866DEFF74DCDBE56B016898137492',
      ticketId: '5095866DEFF74DCDBE56B01689813749',
      text: "I just tried it. Now it's working again. Thanks!",
      createdBy: 'F87BDC400E41D630E030A8C00D01158A',
      createdAt: '2024-01-12T09:39:29Z',
    },
    {
      _id: '5095866DEFF74DCDBE56B016898137493',
      ticketId: '5095866DEFF74DCDBE56B01689813749',
      text: 'Great to hear',
      createdBy: 'D456ACF6FF405922E030A8C02A010C68',
      createdAt: '2024-01-12T09:39:49Z',
    },
  ],
})

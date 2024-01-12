import { provideLocalStorageDataClass } from '../../utils/provideLocalStorageDataClass'

export const TicketMessage = provideLocalStorageDataClass('TicketMessage', {
  initialContent: [
    {
      _id: '8F3799FADAA4437ABB83942F4B251BDE1',
      ticketId: '8F3799FADAA4437ABB83942F4B251BDE',
      text: 'Sure - did you try turning it off and back on again?',
      createdBy: '052601BEBCEC39C8E040A8C00D0107AC',
      createdAt: '2024-01-12T08:37:56Z',
    },
    {
      _id: '8F3799FADAA4437ABB83942F4B251BDE2',
      ticketId: '8F3799FADAA4437ABB83942F4B251BDE',
      text: 'Great, this solved my problem!',
      createdBy: 'F87BDC400E41D630E030A8C00D01158A',
      createdAt: '2024-01-12T08:38:17Z',
    },
  ],
})

import { provideLocalStorageDataClass } from '../../utils/provideLocalStorageDataClass'

export const Ticket = provideLocalStorageDataClass('Ticket', {
  initialContent: [
    {
      _id: '8F3799FADAA4437ABB83942F4B251BDE',
      title: 'My pump is no longer working',
      type: 'Question',
      description:
        'Starting this morning my pump is no longer working. Can you help?',
      referenceNumber: '',
      number: 'CL-24-001406',
      status: 'captured',
      updatedAt: '2024-01-12T08:38:17Z',
      responsibleAgent: '4668C6ADEF0443BE80FB4049097A901A',
      createdBy: 'F87BDC400E41D630E030A8C00D01158A',
      createdAt: '2024-01-12T08:37:15Z',
    },
  ],
})

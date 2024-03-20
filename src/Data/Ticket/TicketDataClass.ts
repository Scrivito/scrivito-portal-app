import { convertBlobAttributes } from '../../utils/convertBlobAttributes'
import { provideLocalStorageDataClass } from '../../utils/provideLocalStorageDataClass'
import { pseudoRandom32CharHex } from '../../utils/pseudoRandom32CharHex'

export const Ticket = provideLocalStorageDataClass('Ticket', {
  prepareData: async (data) => {
    const newData = await convertBlobAttributes(data)

    return {
      ...newData,
      type: newData.type || 'PSA_SVC_TRB',
      status: newData.status || 'PSA_SVC_CAL_ACQ',
      open: newData.open || true,
      referenceNumber: newData.referenceNumber || '',
      responsibleAgent:
        newData.responsibleAgent || '4668C6ADEF0443BE80FB4049097A901A',
      number: newData.number || pseudoRandom32CharHex(),
      updatedAt: new Date().toISOString(),
      createdBy: newData.createdBy || 'F87BDC400E41D630E030A8C00D01158A',
      createdAt: newData.createdAt || new Date().toISOString(),
    }
  },
  initialContent: [
    {
      _id: '581BDB4B108D45579E7D3DE087C13D65',
      title: 'This is a claim',
      type: 'PSA_SVC_CPL',
      description: 'Please send me a box, so I can return it to you.',
      referenceNumber: '',
      number: 'CP-24-001411',
      status: 'PSA_SVC_CPL_DCS',
      open: true,
      updatedAt: '2024-01-12T10:16:34Z',
      responsibleAgent: '4668C6ADEF0443BE80FB4049097A901A',
      createdBy: 'F87BDC400E41D630E030A8C00D01158A',
      createdAt: '2024-01-12T09:46:08Z',
      attachments: [],
    },
    {
      _id: '205D0CBE0B6B4DF088D12442A0B84428',
      title: 'This is a fault report',
      type: 'PSA_SVC_TRB',
      description: 'Can you help me?',
      referenceNumber: '',
      number: 'TT-24-001410',
      status: 'PSA_SVC_TRB_CLS',
      open: false,
      updatedAt: '2024-01-12T10:14:55Z',
      responsibleAgent: '4668C6ADEF0443BE80FB4049097A901A',
      createdBy: 'F87BDC400E41D630E030A8C00D01158A',
      createdAt: '2024-01-12T09:45:21Z',
      attachments: [],
    },
    {
      _id: '5095866DEFF74DCDBE56B01689813749',
      title: 'My pump is no longer working',
      type: 'PSA_SVC_CAL',
      description: 'This morning it stopped working.',
      referenceNumber: '',
      number: 'CL-24-001409',
      status: 'PSA_SVC_CAL_CLS',
      open: false,
      updatedAt: '2024-01-12T10:10:08Z',
      responsibleAgent: '4668C6ADEF0443BE80FB4049097A901A',
      createdBy: 'F87BDC400E41D630E030A8C00D01158A',
      createdAt: '2024-01-12T09:38:41Z',
      attachments: [],
    },
  ],
})

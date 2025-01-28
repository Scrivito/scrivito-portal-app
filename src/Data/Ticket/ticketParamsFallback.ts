import { currentLanguage, DataAttributeDefinitions, load } from 'scrivito'
import { localStorageDataConnection } from '../localStorageDataConnection'
import { pseudoRandom32CharHex } from '../../utils/pseudoRandom32CharHex'

async function attributes(): Promise<DataAttributeDefinitions> {
  const lang = await load(currentLanguage)

  const status = [
    'enum',
    lang === 'de'
      ? {
          title: 'Status',
          values: [
            { value: 'PSA_SVC_C8D_ACQ', title: 'erfasst' },
            { value: 'PSA_SVC_C8D_CLS', title: 'abgeschlossen' },
            { value: 'PSA_SVC_C8D_DCS', title: 'entschieden' },
            { value: 'PSA_SVC_C8D_DON', title: 'erledigt' },
            { value: 'PSA_SVC_C8D_DSP', title: 'disponiert' },
            { value: 'PSA_SVC_C8D_FLW', title: 'nachbereitet' },
            { value: 'PSA_SVC_C8D_NBE', title: 'nicht begonnen' },
            { value: 'PSA_SVC_CAL_ACQ', title: 'erfasst' },
            { value: 'PSA_SVC_CAL_CLS', title: 'beantwortet' },
            { value: 'PSA_SVC_CAL_FRW', title: 'weitergeleitet' },
            { value: 'PSA_SVC_CAL_WRK', title: 'in Bearbeitung' },
            { value: 'PSA_SVC_CPL_ACQ', title: 'erfasst' },
            { value: 'PSA_SVC_CPL_CLS', title: 'abgeschlossen' },
            {
              value: 'PSA_SVC_CPL_DCS',
              title: 'Abstellmaßnahme festgelegt',
            },
            { value: 'PSA_SVC_CPL_DON', title: 'Auftrag abgeschlossen' },
            { value: 'PSA_SVC_CPL_FLW', title: 'nachbereitet' },
            { value: 'PSA_SVC_CPL_ORD', title: 'Auftrag angelegt' },
            { value: 'PSA_SVC_SUP_CPL_ASQ', title: 'erfasst' },
            {
              value: 'PSA_SVC_SUP_CPL_BEA',
              title: 'in Bearbeitung durch Lieferanten',
            },
            { value: 'PSA_SVC_SUP_CPL_ERL', title: 'erledigt' },
            {
              value: 'PSA_SVC_SUP_CPL_RUE',
              title: 'rückgemeldet durch Lieferanten',
            },
            {
              value: 'PSA_SVC_SUP_CPL_SEN',
              title: 'an Lieferanten gemeldet',
            },
            { value: 'PSA_SVC_TRB_ACQ', title: 'erfasst' },
            { value: 'PSA_SVC_TRB_CLS', title: 'beseitigt' },
            {
              value: 'PSA_SVC_TRB_DCS',
              title: 'Abstellmaßnahme festgelegt',
            },
            { value: 'PSA_SVC_TRB_DON', title: 'Auftrag abgeschlossen' },
            { value: 'PSA_SVC_TRB_DSP', title: 'Auftrag angelegt' },
          ],
        }
      : {
          title: 'Status',
          values: [
            { value: 'PSA_SVC_C8D_ACQ', title: 'captured' },
            { value: 'PSA_SVC_C8D_CLS', title: 'closed' },
            { value: 'PSA_SVC_C8D_DCS', title: 'decided' },
            { value: 'PSA_SVC_C8D_DON', title: 'done' },
            { value: 'PSA_SVC_C8D_DSP', title: 'disposed' },
            { value: 'PSA_SVC_C8D_FLW', title: 'reinforced' },
            { value: 'PSA_SVC_C8D_NBE', title: 'not started' },
            { value: 'PSA_SVC_CAL_ACQ', title: 'captured' },
            { value: 'PSA_SVC_CAL_CLS', title: 'answered' },
            { value: 'PSA_SVC_CAL_FRW', title: 'forwarded' },
            { value: 'PSA_SVC_CAL_WRK', title: 'in progress' },
            { value: 'PSA_SVC_CPL_ACQ', title: 'captured' },
            { value: 'PSA_SVC_CPL_CLS', title: 'closed' },
            {
              value: 'PSA_SVC_CPL_DCS',
              title: 'defined containment action',
            },
            { value: 'PSA_SVC_CPL_DON', title: 'order completed' },
            { value: 'PSA_SVC_CPL_FLW', title: 'reinforced' },
            { value: 'PSA_SVC_CPL_ORD', title: 'order created' },
            { value: 'PSA_SVC_SUP_CPL_ASQ', title: 'captured' },
            {
              value: 'PSA_SVC_SUP_CPL_BEA',
              title: 'in progress by supplier',
            },
            { value: 'PSA_SVC_SUP_CPL_ERL', title: 'done' },
            {
              value: 'PSA_SVC_SUP_CPL_RUE',
              title: 'reported by supplier',
            },
            {
              value: 'PSA_SVC_SUP_CPL_SEN',
              title: 'reported to suppliers',
            },
            { value: 'PSA_SVC_TRB_ACQ', title: 'captured' },
            { value: 'PSA_SVC_TRB_CLS', title: 'closed' },
            { value: 'PSA_SVC_TRB_DCS', title: 'decided' },
            { value: 'PSA_SVC_TRB_DON', title: 'done' },
            { value: 'PSA_SVC_TRB_DSP', title: 'disposed' },
          ],
        },
  ] as const

  const type = [
    'enum',
    lang === 'de'
      ? {
          title: 'Type',
          values: [
            { value: 'PSA_SVC_CAL', title: 'Anfrage' },
            { value: 'PSA_SVC_CPL', title: 'Reklamation' },
            { value: 'PSA_SVC_TRB', title: 'Störung' },
          ],
        }
      : {
          title: 'Type',
          values: [
            { value: 'PSA_SVC_CAL', title: 'Question' },
            { value: 'PSA_SVC_CPL', title: 'Claim' },
            { value: 'PSA_SVC_TRB', title: 'Fault' },
          ],
        },
  ] as const

  return {
    createdAt: ['date', { title: lang === 'de' ? 'Erzeugt am' : 'Created at' }],
    createdBy: [
      'reference',
      {
        title: lang === 'de' ? 'Erzeugt von' : 'Created by',
        to: 'User',
      },
    ],
    description: [
      'string',
      { title: lang === 'de' ? 'Beschreibung' : 'Description' },
    ],
    number: ['string', { title: lang === 'de' ? 'Nummer' : 'Number' }],
    open: ['boolean', { title: lang === 'de' ? 'Offen?' : 'Open?' }],
    referenceNumber: [
      'string',
      { title: lang === 'de' ? 'Referenznummer' : 'Reference number' },
    ],
    responsibleAgent: [
      'reference',
      {
        title: lang === 'de' ? 'Zuständiger Agent' : 'Responsible agent',
        to: 'User',
      },
    ],
    serviceObject: [
      'reference',
      {
        reverseTitle: lang === 'de' ? 'Tickets' : 'Tickets',
        title: lang === 'de' ? 'Serviceobjekt' : 'Service object',
        to: 'ServiceObject',
      },
    ],
    status,
    title: ['string', { title: lang === 'de' ? 'Stichwort' : 'Keyword' }],
    type,
    updatedAt: [
      'date',
      { title: lang === 'de' ? 'Geändert am' : 'Updated at' },
    ],
  }
}

export function ticketParamsFallback() {
  return {
    attributes,
    connection: localStorageDataConnection('Ticket', {
      prepareData: async (data) => ({
        ...data,
        type: data.type || 'PSA_SVC_TRB',
        status: data.status || 'PSA_SVC_CAL_ACQ',
        open: data.open || true,
        referenceNumber: data.referenceNumber || '',
        responsibleAgent:
          data.responsibleAgent || '4668C6ADEF0443BE80FB4049097A901A',
        number: data.number || pseudoRandom32CharHex(),
        updatedAt: new Date().toISOString(),
        createdBy: data.createdBy || 'F87BDC400E41D630E030A8C00D01158A',
        createdAt: data.createdAt || new Date().toISOString(),
      }),
      initialContent: [
        {
          _id: '581BDB4B108D45579E7D3DE087C13D65',
          title: 'This is a claim',
          type: 'PSA_SVC_CPL',
          description: 'Please send me a box, so I can return it to you.',
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
          number: 'CL-24-001409',
          status: 'PSA_SVC_CAL_CLS',
          open: false,
          updatedAt: '2024-01-12T10:10:08Z',
          responsibleAgent: '4668C6ADEF0443BE80FB4049097A901A',
          serviceObject: 'FA1992410CA54287948E84D2695A154C',
          createdBy: 'F87BDC400E41D630E030A8C00D01158A',
          createdAt: '2024-01-12T09:38:41Z',
          attachments: [],
        },
      ],
    }),
  }
}

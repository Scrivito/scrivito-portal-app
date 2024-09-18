import { currentLanguage, load } from 'scrivito'
import { DataClassSchema } from '../types'
import { localStorageTicketDataClass } from './LocalStorage/localStorageTicketDataClass'
import { pisaTicketDataClass } from './Pisa/pisaTicketDataClass'

async function attributes(): Promise<DataClassSchema> {
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
            { value: 'PSA_SVC_C8D', title: 'Reklamation / 8D' },
            { value: 'PSA_SVC_CAL', title: 'Anfrage' },
            { value: 'PSA_SVC_CPL', title: 'Reklamation' },
            { value: 'PSA_SVC_SUP_CPL', title: 'Lieferantenreklamation' },
            { value: 'PSA_SVC_TRB', title: 'Störung' },
          ],
        }
      : {
          title: 'Type',
          values: [
            { value: 'PSA_SVC_C8D', title: 'Claim / 8D' },
            { value: 'PSA_SVC_CAL', title: 'Question' },
            { value: 'PSA_SVC_CPL', title: 'Claim' },
            { value: 'PSA_SVC_SUP_CPL', title: 'Supplier claim' },
            { value: 'PSA_SVC_TRB', title: 'Fault' },
          ],
        },
  ] as const

  return {
    createdAt: 'date',
    description: 'string',
    number: 'string',
    referenceNumber: 'string',
    status,
    title: 'string',
    type,
    updatedAt: 'date',
  }
}

export const Ticket = import.meta.env.ENABLE_PISA
  ? pisaTicketDataClass(attributes)
  : localStorageTicketDataClass(attributes)

import { currentLanguage, load } from 'scrivito'
import { DataClassSchema } from '../types'
import { localStorageOrderDataClass } from './LocalStorage/localStorageOrderDataClass'
import { pisaOrderDataClass } from './Pisa/pisaOrderDataClass'

async function attributes(): Promise<DataClassSchema> {
  const lang = await load(currentLanguage)

  const mainStatus = [
    'enum',
    lang === 'de'
      ? {
          title: 'Hauptstatus',
          values: [
            { value: 'PSA_SAP_MAI_ORD_CNC_BEA', title: 'Auftragsbearbeitung' },
            { value: 'PSA_SAP_MAI_ORD_CNC_EIN', title: 'Auftragseingang' },
            {
              value: 'PSA_SAP_MAI_QUO_ORD_PRP',
              title: 'Auftrag abgeschlossen',
            },
          ],
        }
      : {
          title: 'Main status',
          values: [
            { value: 'PSA_SAP_MAI_ORD_CNC_BEA', title: 'Order processing' },
            { value: 'PSA_SAP_MAI_ORD_CNC_EIN', title: 'Order inflow' },
            { value: 'PSA_SAP_MAI_QUO_ORD_PRP', title: 'Evaluation' },
          ],
        },
  ] as const

  const status = [
    'enum',
    lang === 'de'
      ? {
          title: 'Status',
          values: [
            { value: 'PSA_PRO_ORD_CLS', title: 'Auftrag abgeschlossen' },
            { value: 'PSA_PRO_ORD_INC', title: 'Auftragseingang' },
            { value: 'PSA_PRO_ORD_PSI_0', title: 'In ERP erfasst' },
            {
              value: 'PSA_PRO_ORD_PSI_1',
              title: 'In ERP terminiert/abgesichert',
            },
            { value: 'PSA_PRO_ORD_PSI_2', title: 'In ERP mit Rechnung' },
            { value: 'PSA_PRO_ORD_PSI_3', title: 'In ERP Teillieferung' },
            {
              value: 'PSA_PRO_ORD_PSI_4',
              title: 'In ERP Teillieferung/Teilrechnung',
            },
            {
              value: 'PSA_PRO_ORD_PSI_5',
              title: 'In ERP Teillieferung/Vollrechnung',
            },
            { value: 'PSA_PRO_ORD_PSI_6', title: 'In ERP Lieferung' },
            {
              value: 'PSA_PRO_ORD_PSI_7',
              title: 'In ERP Lieferung/Teilrechnung',
            },
            { value: 'PSA_PRO_ORD_PSI_8', title: 'In ERP storniert' },
            { value: 'PSA_PRO_ORD_PSI_9', title: 'In ERP erledigt' },
            {
              value: 'PSA_PRO_ORD_VER',
              title: 'abgelegt; auf neue Version kopiert',
            },
            { value: 'PSA_PRO_ORD_WRK', title: 'Auftrag in Bearbeitung' },
          ],
        }
      : {
          title: 'Status',
          values: [
            { value: 'PSA_PRO_ORD_CLS', title: 'order completed' },
            { value: 'PSA_PRO_ORD_INC', title: 'order entry' },
            { value: 'PSA_PRO_ORD_PSI_0', title: 'In ERP entered' },
            { value: 'PSA_PRO_ORD_PSI_1', title: 'In ERP scheduled/allocated' },
            { value: 'PSA_PRO_ORD_PSI_2', title: 'In ERP with invoice' },
            { value: 'PSA_PRO_ORD_PSI_3', title: 'In ERP partial delivery' },
            {
              value: 'PSA_PRO_ORD_PSI_4',
              title: 'In ERP partial delivery/partial invoice',
            },
            {
              value: 'PSA_PRO_ORD_PSI_5',
              title: 'In ERP partial delivery/full invoice',
            },
            { value: 'PSA_PRO_ORD_PSI_6', title: 'In ERP delivery' },
            {
              value: 'PSA_PRO_ORD_PSI_7',
              title: 'In ERP delivery/partial invoice',
            },
            { value: 'PSA_PRO_ORD_PSI_8', title: 'In ERP canceled' },
            { value: 'PSA_PRO_ORD_PSI_9', title: 'In ERP completed' },
            {
              value: 'PSA_PRO_ORD_VER',
              title: 'discarded; copied to new version',
            },
            { value: 'PSA_PRO_ORD_WRK', title: 'order in progress' },
          ],
        },
  ] as const

  const termsOfDelivery = [
    'enum',
    lang === 'de'
      ? {
          title: 'Lieferbedingungen',
          values: [
            { value: 'FOA', title: 'FOB Flughafen' },
            { value: 'FOR', title: 'Frei Waggon' },
            { value: 'PSI_TOD_DAP', title: 'Geliefert benannter Ort' },
            { value: 'PSI_TOD_DAT', title: 'Geliefert Terminal' },
            { value: 'RFC_TOD_CFR', title: 'Kosten und Fracht' },
            { value: 'RFC_TOD_CIF', title: 'Kosten, Versicherung und Fracht' },
            { value: 'RFC_TOD_CIP', title: 'frachtfrei, versichert' },
            { value: 'RFC_TOD_CPT', title: 'frachtfrei' },
            { value: 'RFC_TOD_DAF', title: 'geliefert Grenze' },
            { value: 'RFC_TOD_DCP', title: 'Frachtfrei' },
            { value: 'RFC_TOD_DDP', title: 'geliefert verzollt' },
            { value: 'RFC_TOD_DDU', title: 'geliefert unverzollt' },
            { value: 'RFC_TOD_DEQ', title: 'geliefert ab Kai' },
            { value: 'RFC_TOD_DES', title: 'geliefert ab Schiff' },
            { value: 'RFC_TOD_EXQ', title: 'Geliefert ab Kai (verzollt)' },
            { value: 'RFC_TOD_EXW', title: 'ab Werk' },
            { value: 'RFC_TOD_FAS', title: 'frei Längsseite Schiff' },
            { value: 'RFC_TOD_FCA', title: 'frei Frachtführer' },
            { value: 'RFC_TOD_FH', title: 'Frei Haus' },
            { value: 'RFC_TOD_FOB', title: 'frei an Bord' },
            { value: 'RFC_TOD_UN', title: 'Unfrei' },
          ],
        }
      : {
          title: 'Terms of delivery',
          values: [
            { value: 'FOA', title: 'FOB Airport Named airport of departure' },
            { value: 'FOR', title: 'Free on Rail Named departure point' },
            { value: 'PSI_TOD_DAP', title: 'Delivered At Place' },
            { value: 'PSI_TOD_DAT', title: 'Delivered At Terminal' },
            { value: 'RFC_TOD_CFR', title: 'cost and freight' },
            { value: 'RFC_TOD_CIF', title: 'cost, insurance & freight' },
            { value: 'RFC_TOD_CIP', title: 'carriage and insurance paid to' },
            { value: 'RFC_TOD_CPT', title: 'carriage paid to' },
            { value: 'RFC_TOD_DAF', title: 'delivered at frontier' },
            { value: 'RFC_TOD_DCP', title: '' },
            { value: 'RFC_TOD_DDP', title: 'delivered duty paid' },
            { value: 'RFC_TOD_DDU', title: 'delivered duty unpaid' },
            { value: 'RFC_TOD_DEQ', title: 'delivered ex quay' },
            { value: 'RFC_TOD_DES', title: 'delivered ex ship' },
            { value: 'RFC_TOD_EXQ', title: '' },
            { value: 'RFC_TOD_EXW', title: 'ex works' },
            { value: 'RFC_TOD_FAS', title: 'free alongside ship' },
            { value: 'RFC_TOD_FCA', title: 'free carrier' },
            { value: 'RFC_TOD_FH', title: '' },
            { value: 'RFC_TOD_FOB', title: 'free on board' },
            { value: 'RFC_TOD_UN', title: '' },
          ],
        },
  ] as const

  const termsOfPayment = [
    'enum',
    lang === 'de'
      ? {
          title: 'Bezahlbedingungen',
          values: [
            { value: 'PSA_TOP_10', title: 'bar innerhalb von 14 Tagen' },
            { value: 'PSA_TOP_20', title: 'bar' },
            { value: 'PSA_TOP_50', title: 'per Nachnahme' },
            { value: 'PSA_TOP_60', title: 'per Bestellung' },
            { value: 'PSI_TOP_00', title: '[00] ERP Zahlungsziel' },
            { value: 'PSI_TOP_10', title: '[10] 8 Tage 2%, 30 Tage netto' },
            { value: 'PSI_TOP_20', title: '[20] sofort netto' },
            { value: 'PSI_TOP_30', title: '[30] 30 Tage netto' },
            { value: 'PSI_TOP_40', title: 'Zahlungsziel (ERP 40)' },
            { value: 'RFC_TOP_NT60', title: 'Netto 60' },
          ],
        }
      : {
          title: 'Terms of payment',
          values: [
            { value: 'PSA_TOP_10', title: 'cash payable within 14 days' },
            { value: 'PSA_TOP_20', title: 'cash' },
            { value: 'PSA_TOP_50', title: 'by C.O.D.' },
            { value: 'PSA_TOP_60', title: 'by order' },
            { value: 'PSI_TOP_00', title: '[00] ERP Payment target' },
            { value: 'PSI_TOP_10', title: '[10] 8 days 2%, 30 days net' },
            { value: 'PSI_TOP_20', title: '[20] immediate net' },
            { value: 'PSI_TOP_30', title: '[30] 30 days net' },
            { value: 'PSI_TOP_40', title: 'Payment target (ERP 40)' },
            { value: 'RFC_TOP_NT60', title: 'Net 60' },
          ],
        },
  ] as const

  const type = [
    'enum',
    lang === 'de'
      ? {
          title: 'Type',
          values: [
            { value: 'PSA_ORD_STY_GEN_OVR', title: 'Generalüberholung' },
            { value: 'PSA_ORD_STY_NEW', title: 'Neumaschine' },
            { value: 'PSA_ORD_STY_SRV', title: 'Dienstleistung' },
            { value: 'PSA_ORD_STY_STD', title: 'Anlage' },
          ],
        }
      : {
          title: 'Type',
          values: [
            { value: 'PSA_ORD_STY_GEN_OVR', title: 'General overhaul' },
            { value: 'PSA_ORD_STY_NEW', title: 'Re-equip machine' },
            { value: 'PSA_ORD_STY_SRV', title: 'Services' },
            { value: 'PSA_ORD_STY_STD', title: 'Plant' },
          ],
        },
  ] as const

  return {
    customer: 'string',
    deliveryAt: 'date',
    description: 'string',
    keyword: 'string',
    mainStatus,
    number: 'string',
    orderAt: 'date',
    quoteAt: 'date',
    salesPartner: 'string',
    status,
    termsOfDelivery,
    termsOfPayment,
    totalPrice: 'number',
    totalPriceCurrency: 'string',
    type,
  }
}

export const Order = import.meta.env.ENABLE_PISA
  ? pisaOrderDataClass(attributes)
  : localStorageOrderDataClass(attributes)

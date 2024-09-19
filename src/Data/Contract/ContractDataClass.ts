import { currentLanguage, load } from 'scrivito'
import { DataClassSchema } from '../types'
import { localContractDataClass } from './LocalStorage/localContractDataClass'
import { pisaContractDataClass } from './Pisa/pisaContractDataClass'

async function attributes(): Promise<DataClassSchema> {
  const lang = await load(currentLanguage)

  const category = [
    'enum',
    lang === 'de'
      ? {
          title: 'Vertragsart',
          values: [
            { value: 'PSA_CTR_KND_70', title: 'Wartungs- und Supportvertrag' },
            { value: 'PSA_CTR_KND_10', title: 'Kaufvertrag' },
            { value: 'PSA_CTR_KND_20', title: 'Gesellschaftervertrag' },
            { value: 'PSA_CTR_KND_30', title: 'Beratervertrag' },
            { value: 'PSA_CTR_KND_40', title: 'Handelsvertrag' },
            { value: 'PSA_CTR_KND_50', title: 'Darlehensvertrag' },
            { value: 'PSA_CTR_KND_60', title: 'Lieferantenvertrag' },
            { value: 'PSA_CTR_KND_80', title: 'Werksvertrag' },
            { value: 'PSA_CTR_KND_90', title: 'Versicherungsvertrag' },
            { value: 'PSA_CTR_KND_100', title: 'Hard- und Softwarevertrag' },
            { value: 'PSA_CTR_KND_110', title: 'Mietvertrag' },
            { value: 'PSA_CTR_KND_120', title: 'Pachtvertrag' },
            { value: 'PSA_CTR_KND_130', title: 'Arbeitsvertrag' },
            { value: 'PSA_CTR_KND_140', title: 'Lizenzvertrag' },
            { value: 'PSA_CTR_KND_150', title: 'Leasingvertrag' },
            { value: 'PSA_CTR_KND_160', title: 'Projektvertrag' },
            { value: 'PSA_CTR_KND_170', title: 'Partnervertrag' },
          ],
        }
      : {
          title: 'Contract category',
          values: [
            { value: 'PSA_CTR_KND_10', title: 'Sales contract' },
            { value: 'PSA_CTR_KND_20', title: 'Shareholders agreement' },
            { value: 'PSA_CTR_KND_30', title: 'Consultancy contract' },
            { value: 'PSA_CTR_KND_40', title: 'Trade agreement' },
            { value: 'PSA_CTR_KND_50', title: 'Loan contract' },
            { value: 'PSA_CTR_KND_60', title: 'Supply contract' },
            {
              value: 'PSA_CTR_KND_70',
              title: 'Maintenance & support contract',
            },
            {
              value: 'PSA_CTR_KND_80',
              title: 'Contract for work and services',
            },
            { value: 'PSA_CTR_KND_90', title: 'Insurance contract' },
            { value: 'PSA_CTR_KND_100', title: 'Hardware & software contract' },
            { value: 'PSA_CTR_KND_110', title: 'Hiring contract' },
            { value: 'PSA_CTR_KND_120', title: 'Contract of lease' },
            { value: 'PSA_CTR_KND_130', title: 'Employment contract' },
            { value: 'PSA_CTR_KND_140', title: 'License agreement' },
            { value: 'PSA_CTR_KND_150', title: 'Lease contract' },
            { value: 'PSA_CTR_KND_160', title: 'Project contract' },
            { value: 'PSA_CTR_KND_170', title: 'Partner contract' },
          ],
        },
  ] as const

  const minimumTermUnit = [
    'enum',
    lang === 'de'
      ? {
          title: 'Einheit der Mindestlaufzeit',
          values: [{ value: 'PSA_CTR_CYC_YEA', title: 'Jahre' }],
        }
      : {
          title: 'Minimum term unit',
          values: [{ value: 'PSA_CTR_CYC_YEA', title: 'Years' }],
        },
  ] as const

  const status = [
    'enum',
    lang === 'de'
      ? {
          title: 'Status',
          values: [
            { value: 'PSA_PRO_CTR_ACT', title: 'aktiv' },
            { value: 'PSA_PRO_CTR_CNC', title: 'storniert' },
            { value: 'PSA_PRO_CTR_INI', title: 'Vertragsanlage' },
            {
              value: 'PSA_PRO_CTR_VER',
              title: 'abgelegt; auf neue Version kopiert',
            },
            { value: 'PSA_PRO_CTR_NAC', title: 'inaktiv' },
            { value: 'PSA_PRO_CTR_TPL', title: 'Muster' },
            { value: 'PSA_PRO_CTR_QSU', title: 'Angebot abgegeben' },
            { value: 'PSA_PRO_CTR_QIN', title: 'Angebotsanlage' },
            { value: 'PSA_PRO_CTR_QSC', title: 'Angebot erfolgreich' },
            { value: 'PSA_PRO_CTR_QLS', title: 'Angebot verloren' },
            { value: 'PSA_PRO_CTR_MOD', title: 'Vertrag geändert' },
          ],
        }
      : {
          title: 'Status',
          values: [
            { value: 'PSA_PRO_CTR_ACT', title: 'active' },
            { value: 'PSA_PRO_CTR_CNC', title: 'cancelled' },
            { value: 'PSA_PRO_CTR_INI', title: 'drawn up' },
            {
              value: 'PSA_PRO_CTR_VER',
              title: 'discarded; copied to new version',
            },
            { value: 'PSA_PRO_CTR_NAC', title: 'inactive' },
            { value: 'PSA_PRO_CTR_TPL', title: 'Template' },
            { value: 'PSA_PRO_CTR_QSU', title: 'quote submitted' },
            { value: 'PSA_PRO_CTR_QIN', title: 'quote created' },
            { value: 'PSA_PRO_CTR_QSC', title: 'quote successful' },
            { value: 'PSA_PRO_CTR_QLS', title: 'quote lost' },
            { value: 'PSA_PRO_CTR_MOD', title: 'contract modified' },
          ],
        },
  ] as const

  const type = [
    'enum',
    lang === 'de'
      ? {
          title: 'Vertragstyp',
          values: [
            { value: 'PSA_CTR_TYP_10', title: 'Rahmenvertrag' },
            { value: 'PSA_CTR_TYP_20', title: 'Einzelvertrag' },
            { value: 'PSA_CTR_TYP_30', title: 'Normaler Vertrag' },
            { value: 'PSA_CTR_TYP_MAI', title: 'Wartungsvertrag' },
            { value: 'PSA_CTR_TYP_SVC', title: 'Servicevertrag' },
          ],
        }
      : {
          title: 'Contract type',
          values: [
            { value: 'PSA_CTR_TYP_10', title: 'Basic agreement' },
            { value: 'PSA_CTR_TYP_20', title: 'Single contract' },
            { value: 'PSA_CTR_TYP_30', title: 'Normal contract' },
            { value: 'PSA_CTR_TYP_MAI', title: 'Maintenance contract' },
            { value: 'PSA_CTR_TYP_SVC', title: 'Service contract' },
          ],
        },
  ] as const

  return {
    _id: ['string', { title: 'ID' }],
    cancelationEndAt: [
      'date',
      { title: lang === 'de' ? 'Kündigungsfrist' : 'Cancelation period' },
    ],
    category,
    endAt: ['date', { title: lang === 'de' ? 'Vertragsende' : 'Contract end' }],
    // TODO: pisa schema: remove internalDepartment for now
    keyword: ['string', { title: lang === 'de' ? 'Stichwort' : 'Keyword' }],
    minimumTerm: [
      'number',
      { title: lang === 'de' ? 'Mindestlaufzeit' : 'Minimum term' },
    ],
    minimumTermUnit,
    number: ['string', { title: lang === 'de' ? 'Nummer' : 'Number' }],
    partner: [
      'string',
      { title: lang === 'de' ? 'Vertragspartner' : 'Sales partner' },
    ],
    startAt: [
      'date',
      { title: lang === 'de' ? 'Vertragsbeginn' : 'Contract start' },
    ],
    status,
    termExtensionDays: [
      'number',
      {
        title:
          lang === 'de'
            ? 'Laufzeitverlängerung (Tage)'
            : 'Term extension (days)',
      },
    ],
    termExtensionEndAt: [
      'date',
      {
        title:
          lang === 'de'
            ? 'Ende der Laufzeitverlängerung'
            : 'End of the term extension',
      },
    ],
    termExtensionMonths: [
      'number',
      {
        title:
          lang === 'de'
            ? 'Laufzeitverlängerung (Monate)'
            : 'Term extension (months)',
      },
    ],
    termExtensionYears: [
      'number',
      {
        title:
          lang === 'de'
            ? 'Laufzeitverlängerung (Jahre)'
            : 'Term extension (years)',
      },
    ],
    totalPrice: [
      'number',
      { title: lang === 'de' ? 'Eingangswert' : 'Total value' },
    ],
    type,
  }
}

export const Contract = import.meta.env.ENABLE_PISA
  ? pisaContractDataClass(attributes)
  : localContractDataClass(attributes)

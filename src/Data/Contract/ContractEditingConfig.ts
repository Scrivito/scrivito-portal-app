import { provideEditingConfig } from 'scrivito'
import { Contract } from './ContractDataClass'

provideEditingConfig(Contract, {
  title: 'Contract',
  attributes: {
    // TODO: Remove the following attributes, once #11338 is resolved:
    agent: { title: 'Agent' },
    cancelationEndAt: { title: 'Cancelation period' },
    category: { title: 'Contract category' },
    endAt: { title: 'Contract end' },
    internalDepartment: { title: 'Department' },
    keyword: { title: 'Keyword' },
    minimumTerm: { title: 'Minimum term' },
    minimumTermUnit: { title: 'Minimum term unit' },
    number: { title: 'Number' },
    partner: { title: 'Sales partner' },
    startAt: { title: 'Contract start' },
    status: { title: 'Status' },
    termExtensionDays: { title: 'Term extension (days)' },
    termExtensionEndAt: { title: 'End of the term extension' },
    termExtensionMonths: { title: 'Term extension (months)' },
    termExtensionYears: { title: 'Term extension (years)' },
    totalPrice: { title: 'Total value' },
    type: { title: 'Contract type' },
  },
})

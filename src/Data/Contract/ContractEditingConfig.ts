import { provideEditingConfig } from 'scrivito'
import { ContractPromise } from './ContractDataClass'

ContractPromise.then((Contract) => {
  provideEditingConfig(Contract, {
    title: 'Contract',
    attributes: {
      _id: { title: 'Contract ID' },
      agent: { title: 'Agent ID' },
      cancelationEndAt: { title: 'Cancelation end at' },
      category: { title: 'Category' },
      endAt: { title: 'End at' },
      internalDepartment: { title: 'Internal department' },
      keyword: { title: 'Keyword' },
      minimumTerm: { title: 'Minimum term' },
      minimumTermUnit: { title: 'Minimum term unit' },
      number: { title: 'Number' },
      partner: { title: 'Partner' },
      startAt: { title: 'Start at' },
      status: { title: 'Status' },
      termExtensionEndAt: { title: 'Term extension end at' },
      totalPrice: { title: 'Total price' },
      type: { title: 'Type' },
    },
  })
})

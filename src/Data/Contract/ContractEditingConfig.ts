import { provideEditingConfig } from 'scrivito'
import { Contract } from './ContractDataClass'

provideEditingConfig(Contract, {
  title: 'Contract',
  attributes: {
    agent: { title: 'Agent ID' },
    internalDepartment: { title: 'Internal department ID' },
  },
})

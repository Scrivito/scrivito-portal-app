import { provideEditingConfig } from 'scrivito'
import { ContractDocument } from './ContractDocumentDataClass'

provideEditingConfig(ContractDocument, {
  title: 'Contract document',
})

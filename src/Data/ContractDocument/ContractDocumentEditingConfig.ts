import { provideEditingConfig } from 'scrivito'
import { ContractDocument } from './ContractDocumentDataClass'

provideEditingConfig(ContractDocument, {
  title: 'Contract document',
  attributes: {
    contractId: { title: 'Contract ID' },
    documentId: { title: 'Document ID' },
  },
})

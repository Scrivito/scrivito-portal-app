import { provideEditingConfig } from 'scrivito'
import { ContractDocument } from './ContractDocumentDataClass'

provideEditingConfig(ContractDocument, {
  title: 'Contract document',
  attributes: {
    // TODO: Remove the following attributes, once #11338 is resolved:
    contractId: { title: 'Contract' },
    documentId: { title: 'Document' },
  },
})

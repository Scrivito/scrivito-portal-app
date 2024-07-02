import { provideEditingConfig } from 'scrivito'
import { ContractDocumentPromise } from './ContractDocumentDataClass'

ContractDocumentPromise.then((ContractDocument) => {
  provideEditingConfig(ContractDocument, {
    title: 'Contract document',
    attributes: {
      contractId: { title: 'Contract ID' },
      documentId: { title: 'Document ID' },
    },
  })
})

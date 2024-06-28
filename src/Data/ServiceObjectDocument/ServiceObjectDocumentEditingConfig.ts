import { provideEditingConfig } from 'scrivito'
import { ServiceObjectDocumentPromise } from './ServiceObjectDocumentDataClass'

ServiceObjectDocumentPromise.then((ServiceObjectDocument) => {
  provideEditingConfig(ServiceObjectDocument, {
    title: 'Equipment document',
    attributes: {
      serviceObjectId: { title: 'Equipment ID' },
      documentId: { title: 'Document ID' },
    },
  })
})

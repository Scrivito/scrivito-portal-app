import { provideEditingConfig } from 'scrivito'
import { ServiceObjectDocumentPromise } from './ServiceObjectDocumentDataClass'

ServiceObjectDocumentPromise.then((ServiceObjectDocument) => {
  provideEditingConfig(ServiceObjectDocument, {
    title: 'Service object document',
    attributes: {
      serviceObjectId: { title: 'Service object ID' },
      documentId: { title: 'Document ID' },
    },
  })
})

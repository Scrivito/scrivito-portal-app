import { provideEditingConfig } from 'scrivito'
import { ServiceObjectDocument } from './ServiceObjectDocumentDataClass'

provideEditingConfig(ServiceObjectDocument, {
  title: 'Service object document',
  attributes: {
    serviceObjectId: { title: 'Service object ID' },
    documentId: { title: 'Document ID' },
  },
})

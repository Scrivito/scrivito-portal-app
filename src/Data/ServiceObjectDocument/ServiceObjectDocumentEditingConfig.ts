import { provideEditingConfig } from 'scrivito'
import { ServiceObjectDocument } from './ServiceObjectDocumentDataClass'

provideEditingConfig(ServiceObjectDocument, {
  title: 'Service object document',
  attributes: {
    // TODO: Remove the following attributes, once #11338 is resolved:
    documentId: { title: 'Document' },
    serviceObjectId: { title: 'Service object' },
  },
})

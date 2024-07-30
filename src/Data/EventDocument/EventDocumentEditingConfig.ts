import { provideEditingConfig } from 'scrivito'
import { EventDocument } from './EventDocumentDataClass'

provideEditingConfig(EventDocument, {
  title: 'Event document',
  attributes: {
    documentId: { title: 'Document ID' },
    eventId: { title: 'Event ID' },
  },
})

import { provideEditingConfig } from 'scrivito'
import { EventDocumentPromise } from './EventDocumentDataClass'

EventDocumentPromise.then((EventDocument) => {
  provideEditingConfig(EventDocument, {
    title: 'Event document',
    attributes: {
      documentId: { title: 'Document ID' },
      eventId: { title: 'Event ID' },
    },
  })
})

import { provideEditingConfig } from 'scrivito'
import { EventDocument } from './EventDocumentDataClass'

provideEditingConfig(EventDocument, {
  title: 'Event document',
  attributes: {
    // TODO: Remove the following attributes, once #11338 is resolved:
    documentId: { title: 'Document' },
    eventId: { title: 'Event' },
  },
})

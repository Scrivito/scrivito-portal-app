import { provideEditingConfig } from 'scrivito'
import { EventDocument } from './EventDocumentDataClass'

provideEditingConfig(EventDocument, {
  title: 'Event document',
})

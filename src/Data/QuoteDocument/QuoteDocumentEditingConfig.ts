import { provideEditingConfig } from 'scrivito'
import { QuoteDocument } from './QuoteDocumentDataClass'

provideEditingConfig(QuoteDocument, {
  title: 'Quote document',
  attributes: {
    // TODO: Remove the following attributes, once #11338 is resolved:
    documentId: { title: 'Document' },
    quoteId: { title: 'Quote' },
  },
})

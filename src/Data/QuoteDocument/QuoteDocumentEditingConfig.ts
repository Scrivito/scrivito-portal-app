import { provideEditingConfig } from 'scrivito'
import { QuoteDocument } from './QuoteDocumentDataClass'

provideEditingConfig(QuoteDocument, {
  title: 'Quote document',
  attributes: {
    quoteId: { title: 'Quote ID' },
    documentId: { title: 'Document ID' },
  },
})

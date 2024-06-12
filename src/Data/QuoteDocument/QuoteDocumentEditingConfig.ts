import { provideEditingConfig } from 'scrivito'
import { QuoteDocumentPromise } from './QuoteDocumentDataClass'

QuoteDocumentPromise.then((QuoteDocument) => {
  provideEditingConfig(QuoteDocument, {
    title: 'Quote document',
    attributes: {
      quoteId: { title: 'Quote ID' },
      documentId: { title: 'Document ID' },
    },
  })
})

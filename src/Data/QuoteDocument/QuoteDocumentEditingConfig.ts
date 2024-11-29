import { provideEditingConfig } from 'scrivito'
import { QuoteDocument } from './QuoteDocumentDataClass'

provideEditingConfig(QuoteDocument, {
  title: 'Quote document',
})

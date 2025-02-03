import { provideEditingConfig } from 'scrivito'
import { Document } from './DocumentDataClass'

provideEditingConfig(Document, {
  attributes: {
    body: { title: 'Body' },
  },
})

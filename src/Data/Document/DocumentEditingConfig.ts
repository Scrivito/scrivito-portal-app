import { provideEditingConfig } from 'scrivito'
import { Document } from './DocumentDataClass'

provideEditingConfig(Document, {
  title: 'Document',
  attributes: {
    title: { title: 'Title' },
    number: { title: 'Number' },
    type: { title: 'Type' },
    createdAt: { title: 'Created at' },
    language: { title: 'Language' },
    format: { title: 'Format' },
    size: { title: 'Size' },
    version: { title: 'Version' },
  },
})

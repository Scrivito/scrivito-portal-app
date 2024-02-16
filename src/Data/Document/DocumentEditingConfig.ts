import { provideEditingConfig } from 'scrivito'
import { Document } from './DocumentDataClass'

provideEditingConfig(Document, {
  title: 'Document',
  attributes: {
    title: { title: 'Title' },
    number: { title: 'Number' },
    type: { title: 'Type (code)' },
    typeLocalized: { title: 'Type (human readable)' },
    createdAt: { title: 'Created at' },
    language: { title: 'Language (code)' },
    languageLocalized: { title: 'Language (human readable)' },
    format: { title: 'Format' },
    size: { title: 'Size' },
    version: { title: 'Version' },
  },
})

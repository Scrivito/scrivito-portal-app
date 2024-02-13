import { provideEditingConfig } from 'scrivito'
import { Document } from './DocumentDataClass'

provideEditingConfig(Document, {
  title: 'Document',
  attributes: {
    title: { title: 'Title' },
    number: { title: 'Number' },
    type: { title: 'Type (enum)' },
    typeLocalized: { title: 'Type (localized)' },
    createdAt: { title: 'Created at' },
    language: { title: 'Language (enum)' },
    languageLocalized: { title: 'Language (localized)' },
    format: { title: 'Format' },
    size: { title: 'Size' },
    version: { title: 'Version' },
  },
})

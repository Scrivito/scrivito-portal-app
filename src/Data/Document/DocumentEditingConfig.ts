import { provideEditingConfig } from 'scrivito'
import { Document } from './DocumentDataClass'

provideEditingConfig(Document, {
  title: 'Document',
  attributes: {
    body: { title: 'Body' },

    // TODO: Remove the following attributes, once #11338 is resolved:
    createdAt: { title: 'Created at' },
    format: { title: 'File format' },
    language: { title: 'Language' },
    number: { title: 'Number' },
    size: { title: 'File size in MB' },
    title: { title: 'Title' },
    type: { title: 'Type' },
    version: { title: 'Version' },
  },
})

import { provideEditingConfig } from 'scrivito'
import { DocumentPromise } from './DocumentDataClass'

DocumentPromise.then((Document) => {
  provideEditingConfig(Document, {
    title: 'Document',
    attributes: {
      _id: { title: 'Document ID' },
      title: { title: 'Title' },
      body: { title: 'Body' },
      number: { title: 'Number' },
      type: { title: 'Type' },
      createdAt: { title: 'Created at' },
      language: { title: 'Language' },
      format: { title: 'Format' },
      size: { title: 'Size' },
      version: { title: 'Version' },
    },
  })
})

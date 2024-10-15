import { provideEditingConfig } from 'scrivito'
import { ServiceObjectDocument } from './ServiceObjectDocumentDataClass'

provideEditingConfig(ServiceObjectDocument, {
  title: 'Service object document',
})

import { provideEditingConfig } from 'scrivito'
import { OrderDocument } from './OrderDocumentDataClass'

provideEditingConfig(OrderDocument, {
  title: 'Order document',
})

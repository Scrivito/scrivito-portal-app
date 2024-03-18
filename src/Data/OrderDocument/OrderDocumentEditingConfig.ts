import { provideEditingConfig } from 'scrivito'
import { OrderDocument } from './OrderDocumentDataClass'

provideEditingConfig(OrderDocument, {
  title: 'Order document',
  attributes: {
    orderId: { title: 'Order ID' },
    documentId: { title: 'Document ID' },
  },
})

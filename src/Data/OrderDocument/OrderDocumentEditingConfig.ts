import { provideEditingConfig } from 'scrivito'
import { OrderDocument } from './OrderDocumentDataClass'

provideEditingConfig(OrderDocument, {
  title: 'Order Document',
  attributes: {
    orderId: { title: 'Order ID' },
    documentId: { title: 'Document ID' },
  },
})

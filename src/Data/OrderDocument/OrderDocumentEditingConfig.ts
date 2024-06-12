import { provideEditingConfig } from 'scrivito'
import { OrderDocumentPromise } from './OrderDocumentDataClass'

OrderDocumentPromise.then((OrderDocument) => {
  provideEditingConfig(OrderDocument, {
    title: 'Order document',
    attributes: {
      orderId: { title: 'Order ID' },
      documentId: { title: 'Document ID' },
    },
  })
})

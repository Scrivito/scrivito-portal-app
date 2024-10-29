import { provideEditingConfig } from 'scrivito'
import { OrderDocument } from './OrderDocumentDataClass'

provideEditingConfig(OrderDocument, {
  title: 'Order document',
  attributes: {
    // TODO: Remove the following attributes, once #11338 is resolved:
    documentId: { title: 'Document ' },
    orderId: { title: 'Order ' },
  },
})

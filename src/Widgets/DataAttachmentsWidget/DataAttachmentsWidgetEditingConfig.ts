import { provideEditingConfig } from 'scrivito'
import { DataAttachmentsWidget } from './DataAttachmentsWidgetClass'

provideEditingConfig(DataAttachmentsWidget, {
  title: 'Data Attachments',
  attributes: {
    attributeName: {
      title: 'Name of the data attribute in question',
    },
  },
  properties: ['attributeName'],
})

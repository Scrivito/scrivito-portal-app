import { provideEditingConfig } from 'scrivito'
import { DataAttachmentsWidget } from './DataAttachmentsWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(DataAttachmentsWidget, {
  title: 'Data Attachments',
  thumbnail: Thumbnail,
  attributes: {
    attributeName: {
      title: 'Name of the data attribute in question',
    },
  },
  properties: ['attributeName'],
})

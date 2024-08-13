import { provideEditingConfig } from 'scrivito'
import { DataAttachmentsWidget } from './DataAttachmentsWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(DataAttachmentsWidget, {
  title: 'Data Attachments',
  attributes: {
    data: {
      restrictDataTo: ['itemAttribute'],
    },
  },
  thumbnail: Thumbnail,
  initialContent: {
    label: 'Label',
  },
})

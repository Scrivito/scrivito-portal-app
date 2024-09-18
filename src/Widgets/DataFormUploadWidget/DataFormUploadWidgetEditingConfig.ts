import { provideEditingConfig } from 'scrivito'
import { DataFormUploadWidget } from './DataFormUploadWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(DataFormUploadWidget, {
  title: 'Data Form Upload',
  thumbnail: Thumbnail,
  attributes: {
    attributeName: {
      title: 'Name of the data attribute in question',
    },
    data: {
      restrictDataTo: ['scopeAttribute'],
    },
    required: { title: 'Mandatory?' },
    multiple: { title: 'Allow multiple files?' },
    helpText: { title: 'Help text' },
  },
  properties: ['attributeName', 'label', 'required', 'helpText', 'multiple'],
  initialContent: {
    label: 'File',
  },
})

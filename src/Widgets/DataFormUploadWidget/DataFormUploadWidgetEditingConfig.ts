import { provideEditingConfig } from 'scrivito'
import { DataFormUploadWidget } from './DataFormUploadWidgetClass'

provideEditingConfig(DataFormUploadWidget, {
  title: 'Data Form Upload',
  attributes: {
    attributeName: {
      title: 'Name of the data attribute in question',
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

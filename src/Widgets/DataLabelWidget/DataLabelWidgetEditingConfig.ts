import { provideEditingConfig } from 'scrivito'
import { DataLabelWidget } from './DataLabelWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(DataLabelWidget, {
  title: 'Data Label',
  thumbnail: Thumbnail,
  attributes: {
    attributeName: { title: 'Data item attribute name' },
    showAs: {
      title: 'Show as',
      description: 'Default: Text',
      values: [
        { value: 'text', title: 'Text' },
        { value: 'currency', title: 'Currency' },
        { value: 'datetime', title: 'Date' },
        { value: 'link', title: 'Link' },
      ],
    },
    marginBottom: {
      title: 'Add margin bottom?',
    },
  },
  properties: ['attributeName', 'showAs', 'valueSize', 'marginBottom'],
  initialContent: {
    label: 'Label',
    showAs: 'text',
    valueSize: 'body-font-size',
    marginBottom: false,
  },
})

import { provideEditingConfig } from 'scrivito'
import { DataFormBooleanWidget } from './DataFormBooleanWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(DataFormBooleanWidget, {
  title: 'Data Form Boolean',
  thumbnail: Thumbnail,
  attributes: {
    attributeName: {
      title: 'Name of the data attribute in question',
    },
    required: { title: 'Mandatory' },
    defaultValue: {
      title: 'Default value',
      description:
        'Only relevant for a create form. An update form will utilize the existing boolean value.',
    },
    helpText: { title: 'Help text' },
  },
  properties: [
    'attributeName',
    'label',
    'required',
    'helpText',
    'defaultValue',
  ],
  initialContent: {
    label: 'Custom field',
  },
})

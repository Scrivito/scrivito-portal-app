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
    data: {
      restrictDataTo: ['scopeAttribute', 'itemAttribute'],
    },
    required: { title: 'Mandatory?' },
    defaultValue: {
      title: 'Default value',
      description:
        'Only relevant for a create form. An update form will utilize the existing boolean value.',
    },
    helpText: { title: 'Help text' },
    style: {
      title: 'Style',
      description: 'Default: Checkbox',
      values: [
        { value: 'check', title: 'Checkbox' },
        { value: 'switch', title: 'Switch' },
      ],
    },
  },
  properties: [
    'attributeName',
    'style',
    'label',
    'required',
    'helpText',
    'defaultValue',
  ],
  initialContent: {
    label: 'Custom field',
    style: 'check',
  },
})

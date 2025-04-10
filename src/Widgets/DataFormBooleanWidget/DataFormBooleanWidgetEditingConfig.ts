import { provideEditingConfig } from 'scrivito'
import { DataFormBooleanWidget } from './DataFormBooleanWidgetClass'
import Thumbnail from './thumbnail.svg'
import { insideDataFormContainerValidation } from '../DataFormContainerWidget/insideDataFormContainerValidation'

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
    offLabel: {
      title: 'Off label',
      description: 'Default: Off',
    },
    onLabel: {
      title: 'On label',
      description: 'Default: On',
    },
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
    'onLabel',
    'offLabel',
    'required',
    'helpText',
    'defaultValue',
  ],
  initialContent: {
    offLabel: 'Off',
    onLabel: 'On',
    style: 'check',
  },
  validations: [insideDataFormContainerValidation],
})

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
    required: { title: 'Mandatory?' },
    dataForNo: {
      title: 'Attribute value for “no” (optional)',
      description: 'Default: boolean false',
    },
    dataForYes: {
      title: 'Attribute value for “yes” (optional)',
      description: 'Default: boolean true',
    },
    defaultValue: {
      title: 'Default value',
      description:
        'Only relevant for a create form. An update form will utilize the existing boolean value.',
    },
    helpText: { title: 'Help text' },
    submitOnChange: { title: 'Submit on change?' },
  },
  properties: [
    'attributeName',
    'label',
    'required',
    'submitOnChange',
    'helpText',
    'defaultValue',
  ],
  propertiesGroups: [
    {
      title: 'Value mapping',
      key: 'DataFormBooleanWidgetMapping',
      properties: ['dataForNo', 'dataForYes'],
    },
  ],
  initialContent: {
    label: 'Custom field',
  },
})

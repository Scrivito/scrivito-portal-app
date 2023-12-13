import { provideEditingConfig } from 'scrivito'
import { DataFormInputFieldWidget } from './DataFormInputFieldWidgetClass'
import Thumbnail from './thumbnail.svg'


provideEditingConfig(DataFormInputFieldWidget, {
  title: 'Data Form Input Field',
  thumbnail: Thumbnail,
  attributes: {
    attributeName: {
      title: 'Name of the data attribute in question',
    },
    required: { title: 'Mandatory' },
    type: {
      title: 'Type of the input',
      values: [
        { value: 'single_line', title: 'Single line' },
        { value: 'email', title: 'Email' },
        { value: 'phone_number', title: 'Phone number' },
        { value: 'multi_line', title: 'Multi line' },
      ],
    },
    helpText: { title: 'Help text' },
  },
  properties: [
    'attributeName',
    'type',
    'label',
    'placeholder',
    'required',
    'helpText',
  ],
  initialContent: {
    label: 'Custom field',
    type: 'single_line',
  },
})

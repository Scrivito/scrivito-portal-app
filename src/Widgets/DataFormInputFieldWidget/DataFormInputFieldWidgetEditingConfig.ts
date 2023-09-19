import { provideEditingConfig } from 'scrivito'
import { DataFormInputFieldWidget } from './DataFormInputFieldWidgetClass'

provideEditingConfig(DataFormInputFieldWidget, {
  title: 'Data Form Input Field',
  attributes: {
    attributeName: {
      title: 'Name of the data attribute in question',
    },
    required: { title: 'Mandatory' },
    type: {
      title: 'Type of the input',
      values: [
        { value: 'single_line', title: 'Single line' },
        { value: 'multi_line', title: 'Multi line' },
      ],
    },
    helpText: { title: 'Help text' },
  },
  properties: ['attributeName', 'type', 'placeholder', 'required', 'helpText'],
  initialContent: {
    placeholder: 'Your custom field',
    type: 'single_line',
  },
})

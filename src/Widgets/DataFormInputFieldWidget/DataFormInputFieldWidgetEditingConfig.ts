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
  },
  properties: ['attributeName', 'type', 'required'],
  initialContent: {
    type: 'single_line',
  },
})

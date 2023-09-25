import { provideEditingConfig } from 'scrivito'
import { DataFormOptionsWidget } from './DataFormOptionsWidgetClass'

provideEditingConfig(DataFormOptionsWidget, {
  title: 'Data Form Options',
  attributes: {
    attributeName: {
      title: 'Name of the data attribute in question',
    },
    required: { title: 'Mandatory' },
    helpText: { title: 'Help text' },
  },
  properties: ['attributeName', 'options', 'label', 'required', 'helpText'],
  initialContent: {
    label: 'Custom field',
  },
})

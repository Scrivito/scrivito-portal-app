import { provideEditingConfig } from 'scrivito'
import { DataFormOptionsWidget } from './DataFormOptionsWidgetClass'
import Thumbnail from './thumbnail.svg'

provideEditingConfig(DataFormOptionsWidget, {
  title: 'Data Form Options',
  thumbnail: Thumbnail,
  attributes: {
    attributeName: {
      title: 'Name of the data attribute in question',
    },
    required: { title: 'Mandatory' },
    helpText: { title: 'Help text' },
  },
  properties: [
    'attributeName',
    'options',
    'defaultValue',
    'label',
    'required',
    'helpText',
  ],
  validations: [
    [
      'defaultValue',
      (defaultValue, { widget }) => {
        if (!defaultValue) return
        if (widget.get('options').includes(defaultValue.toString())) return

        return `Value not included in the options.`
      },
    ],
  ],
  initialContent: {
    label: 'Custom field',
  },
})

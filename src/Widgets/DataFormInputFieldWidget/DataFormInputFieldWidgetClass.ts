import { provideWidgetClass } from 'scrivito'

export const DataFormInputFieldWidget = provideWidgetClass(
  'DataFormInputFieldWidget',
  {
    attributes: {
      attributeName: 'string',
      label: 'string',
      placeholder: 'string',
      required: 'boolean',
      helpText: 'html',
      type: ['enum', { values: ['single_line', 'multi_line'] }],
    },
  },
)

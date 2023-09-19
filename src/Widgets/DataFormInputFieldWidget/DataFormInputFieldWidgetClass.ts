import { provideWidgetClass } from 'scrivito'

export const DataFormInputFieldWidget = provideWidgetClass(
  'DataFormInputFieldWidget',
  {
    attributes: {
      attributeName: 'string',
      label: 'string',
      required: 'boolean',
      type: ['enum', { values: ['single_line', 'multi_line'] }],
    },
  },
)

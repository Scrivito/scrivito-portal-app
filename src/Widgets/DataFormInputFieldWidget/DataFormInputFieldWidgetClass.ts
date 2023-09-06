import { provideWidgetClass } from 'scrivito'

export const DataFormInputFieldWidget = provideWidgetClass(
  'DataFormInputFieldWidget',
  {
    attributes: {
      attributeName: 'string',
      label: 'string',
      type: ['enum', { values: ['single_line', 'multi_line'] }],
    },
  },
)

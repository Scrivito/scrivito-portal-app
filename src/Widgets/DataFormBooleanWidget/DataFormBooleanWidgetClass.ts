import { provideWidgetClass } from 'scrivito'

export const DataFormBooleanWidget = provideWidgetClass(
  'DataFormBooleanWidget',
  {
    attributes: {
      attributeName: 'string',
      defaultValue: 'boolean',
      helpText: 'html',
      label: 'string',
      required: 'boolean',
      style: ['enum', { values: ['check', 'switch'] }],
    },
  },
)

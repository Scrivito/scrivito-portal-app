import { provideWidgetClass } from 'scrivito'

export const DataFormBooleanWidget = provideWidgetClass(
  'DataFormBooleanWidget',
  {
    attributes: {
      data: 'datalocator',
      defaultValue: 'boolean',
      helpText: 'html',
      offLabel: 'string',
      onLabel: 'string',
      required: 'boolean',
      style: ['enum', { values: ['check', 'switch'] }],
    },
  },
)

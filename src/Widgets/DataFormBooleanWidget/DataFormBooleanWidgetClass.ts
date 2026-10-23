import { provideWidgetClass } from 'scrivito'

export const DataFormBooleanWidget = provideWidgetClass(
  'DataFormBooleanWidget',
  {
    attributes: {
      data: 'datalocator',
      defaultValue: 'boolean',
      design: ['design', { kind: 'text' }],
      helpText: 'html',
      offLabel: 'string',
      onLabel: 'string',
      required: 'boolean',
      style: ['enum', { values: ['check', 'switch'] }],
    },
  },
)

import { provideWidgetClass } from 'scrivito'

export const DataFormOptionsWidget = provideWidgetClass(
  'DataFormOptionsWidget',
  {
    attributes: {
      data: 'datalocator',
      defaultValue: 'string',
      design: ['design', { kind: 'text' }],
      helpText: 'html',
      label: 'string',
      required: 'boolean',
    },
  },
)

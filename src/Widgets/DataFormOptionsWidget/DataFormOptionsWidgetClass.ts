import { provideWidgetClass } from 'scrivito'

export const DataFormOptionsWidget = provideWidgetClass(
  'DataFormOptionsWidget',
  {
    attributes: {
      data: 'datalocator',
      defaultValue: 'string',
      design: 'design',
      helpText: 'html',
      label: 'string',
      required: 'boolean',
    },
  },
)

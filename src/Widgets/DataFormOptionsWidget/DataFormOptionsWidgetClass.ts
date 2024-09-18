import { provideWidgetClass } from 'scrivito'

export const DataFormOptionsWidget = provideWidgetClass(
  'DataFormOptionsWidget',
  {
    attributes: {
      data: 'datalocator',
      defaultValue: 'string',
      helpText: 'html',
      label: 'string',
      required: 'boolean',
    },
  },
)

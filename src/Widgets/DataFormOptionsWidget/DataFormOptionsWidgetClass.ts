import { provideWidgetClass } from 'scrivito'

export const DataFormOptionsWidget = provideWidgetClass(
  'DataFormOptionsWidget',
  {
    attributes: {
      attributeName: 'string',
      data: 'datalocator',
      defaultValue: 'string',
      helpText: 'html',
      label: 'string',
      required: 'boolean',
    },
  },
)

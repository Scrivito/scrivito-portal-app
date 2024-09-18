import { provideWidgetClass } from 'scrivito'

export const DataFormInputFieldWidget = provideWidgetClass(
  'DataFormInputFieldWidget',
  {
    attributes: {
      data: 'datalocator',
      label: 'string',
      placeholder: 'string',
      required: 'boolean',
      helpText: 'html',
      type: [
        'enum',
        { values: ['single_line', 'email', 'phone_number', 'multi_line'] },
      ],
    },
  },
)

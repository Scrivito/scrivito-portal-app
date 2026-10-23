import { provideWidgetClass } from 'scrivito'

export const DataFormInputFieldWidget = provideWidgetClass(
  'DataFormInputFieldWidget',
  {
    attributes: {
      data: 'datalocator',
      design: ['design', { kind: 'text' }],
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

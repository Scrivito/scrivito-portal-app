import { provideWidgetClass } from 'scrivito'

export const DataFormInputFieldWidget = provideWidgetClass(
  'DataFormInputFieldWidget',
  {
    attributes: {
      data: 'datalocator',
      design: 'design',
      // The field itself, which the widget's design cannot reach: it styles the row.
      fieldDesign: 'design',
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
